import React from 'react';
import FilteredMultiSelect from './../../../../../../../common/components/react-filtered-multiselect.min';

import library from 'library';
let lib = library.lib;

class LiveSituationsStandards extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			edit: false,
			developedStandard: {},
			currentStandard: 0,
			archiveOfSelectObjects: {},
			archiveOfSelectOperations: {},
			errors: [],
		}
	}

	componentDidUpdate(state) {
		if (state.standardsList != this.props.standardsList) {
			this.setState({
				archiveOfSelectObjects: lib.createArchiveElements(this.props.standardsList, this.props.objectsList, "objectIds"),
				archiveOfSelectOperations: lib.createArchiveElements(this.props.standardsList, this.props.operationsList, "operationIds"),
			})
		}
	}

	clearState = () => {
		let onChange = this.props.onChange;

		this.setState({
			developedStandard: {},
			edit: false,
			currentStandard: 0,
			errors: [],
		}, () => {
			onChange()
		});
	};

	selectChangeStandard = (e) => {
		let currentId = e.target.value;
		let currentStandard;

		this.props.standardsList.map((item, index) => {
			if (index == currentId) {
				currentStandard = index;
			}
		});

		this.setState({currentStandard});
	};

	createStandard = () => {
		this.setState({
			currentStandard: {},
			developedStandard: {
				"description": "",
				"maxtime": "",
				"paymentTitle": "",
				"paymentPrivate": "",
				"paymentLegal": "",
				"link": "",
				"objectIds": [],
				"operationIds": [],
			},
			edit: true,
		});
	};

	editStandard = () => {
		let {currentStandard, archiveOfSelectObjects, archiveOfSelectOperations} = this.state;
		let currentId = this.props.standardsList[currentStandard].id;

		lib.getAJAXCall({
			method: 'GET',
			url: lib.urlsLibrary.standard + currentId,
			callback: (standard) => {
				standard.objectIds = archiveOfSelectObjects[currentId];
				standard.operationIds = archiveOfSelectOperations[currentId];

				this.setState({
					developedStandard: standard,
					edit: true,
				});
			}
		});
	};

	saveStandard = () => {
		let {developedStandard} = this.state;

		let tests = {
			description: {
				approve: developedStandard.description.length <= 0,
				descr: "Введите название стандарта"
			},
			maxtime: {
				approve: developedStandard.maxtime.length <= 0,
				descr: "Введите максимальный срок предоставления услуги"
			},
			paymentPrivate: {
				approve: developedStandard.paymentPrivate.length <= 0,
				descr: "Введите cтоимость для физических лиц"
			},
			paymentLegal: {
				approve: developedStandard.paymentLegal.length <= 0,
				descr: "Введите cтоимость для юридических лиц"
			},
			link: {
				approve: developedStandard.link.length <= 0,
				descr: "Введите ссылку"
			},
			objectIds: {
				approve: developedStandard.objectIds.length <= 0,
				descr: "Необходимо привязать к объектам"
			},
			operationIds: {
				approve: developedStandard.operationIds.length <= 0,
				descr: "Необходимо привязать к операциям"
			},
		};

		lib.checkValidation(tests, () => {
			if (Object.keys(this.state.errors).length === 0) {
				let method = 'PUT';

				if (!developedStandard.id && developedStandard.id !== 0) {
					method = 'POST';
				}

				developedStandard.objectIds = developedStandard.objectIds.map((obj) => {
					return obj.id
				});

				developedStandard.operationIds = developedStandard.operationIds.map((obj) => {
					return obj.id
				});

				lib.getAJAXCall({
					method: method,
					url: lib.urlsLibrary.standard,
					data: developedStandard,
					callback: this.clearState
				});
			}
		}, this);
	};

	deleteStandard = () => {
		let developedStandard = this.state.developedStandard;

		if (lib.deleteConfirmation()) {
			lib.getAJAXCall({
				method: 'DELETE',
				url: lib.urlsLibrary.standard + developedStandard.id,
				deleteCallback: this.clearState
			});
		}
	};

	handleDeselectObject = (index) => {
		let {developedStandard} = this.state;
		let selectedObjects = developedStandard.objectIds.slice();

		selectedObjects.splice(index, 1);
		developedStandard.objectIds = selectedObjects;

		this.setState({developedStandard})
	};

	handleSelectionChangeObject = (selectedObjects) => {
		let {developedStandard} = this.state;

		developedStandard.objectIds = selectedObjects;

		this.setState({developedStandard})
	};

	handleDeselectOperation = (index) => {
		let {developedStandard} = this.state;
		let selectedObjects = developedStandard.operationIds.slice();

		selectedObjects.splice(index, 1);
		developedStandard.operationIds = selectedObjects;

		this.setState({developedStandard})
	};

	handleSelectionChangeOperation = (selectedObjects) => {
		let {developedStandard} = this.state;

		developedStandard.operationIds = selectedObjects;

		this.setState({developedStandard})
	};

	render() {
		let {standardsList, objectsList, operationsList} = this.props;
		let {currentStandard, edit, developedStandard, errors} = this.state;

		return (
			<div>
				<h2>Стандарты</h2>

				{!edit
					? <div>
					<select onChange={this.selectChangeStandard} className="form-control">
						{standardsList.map((item, id) => {
							return (
								<option key={id}
								        value={id}
								        className={(currentStandard === item) ? 'active' : '' }>
									{item.description}
								</option>
							)
						})}
					</select>

					<div className="bs-example">
						<button type="button" className="btn btn-primary" onClick={this.editStandard}>Редактировать</button>
						<button type="button" className="btn btn-primary" onClick={this.createStandard}>Создать</button>
					</div>

				</div>
					: <div>
					<label className="row">
						<p className="col-xs-12">Название:</p>

						<div className="col-xs-12">
							<input className="form-control"
							       value={developedStandard.description}
							       onChange={(e) => {
								       let obj = developedStandard;
								       obj.description = e.target.value;

								       this.setState({developedStandard: obj})
							       }}
							/>
						</div>

						{(errors['description']) ? (
							<div className="clearfix col-xs-12">
								<span className="has-error-text">{errors['description']}</span>
							</div>
						):(null)}
					</label>

					<label className="row">
						<p className="col-xs-12">Максимальный срок предоставления услуги:</p>

						<div className="col-xs-2">
							<input className="form-control"
							       type="number"
							       value={developedStandard.maxtime}
							       onChange={(e) => {
								       let obj = developedStandard;
								       obj.maxtime = Number(e.target.value);

								       this.setState({developedStandard: obj})
							       }}
							/>
						</div>

						{(errors['maxtime']) ? (
							<div className="clearfix col-xs-12">
								<span className="has-error-text">{errors['maxtime']}</span>
							</div>
						):(null)}
					</label>

					<label className="row">
						<p className="col-xs-12">Стоимость для физических лиц:</p>

						<div className="col-xs-12">
							<input className="form-control"
							       value={developedStandard.paymentPrivate}
							       onChange={(e) => {
								       let obj = developedStandard;
								       obj.paymentPrivate = e.target.value;

								       this.setState({developedStandard: obj})
							       }}
							/>
						</div>

						{(errors['paymentPrivate']) ? (
							<div className="clearfix col-xs-12">
								<span className="has-error-text">{errors['paymentPrivate']}</span>
							</div>
						):(null)}
					</label>

					<label className="row">
						<p className="col-xs-12">Стоимость для юридических лиц:</p>

						<div className="col-xs-12">
							<input className="form-control"
							       value={developedStandard.paymentLegal}
							       onChange={(e) => {
								       let obj = developedStandard;
								       obj.paymentLegal = e.target.value;

								       this.setState({developedStandard: obj})
							       }}
							/>
						</div>

						{(errors['paymentLegal']) ? (
							<div className="clearfix col-xs-12">
								<span className="has-error-text">{errors['paymentLegal']}</span>
							</div>
						):(null)}
					</label>

					<label className="row">
						<p className="col-xs-12">Ссылка:</p>

						<div className="col-xs-12">
							<input className="form-control"
							       value={developedStandard.link}
							       onChange={(e) => {
								       let obj = developedStandard;
								       obj.link = e.target.value;

								       this.setState({developedStandard: obj})
							       }}
							/>
						</div>

						{(errors['link']) ? (
							<div className="clearfix col-xs-12">
								<span className="has-error-text">{errors['link']}</span>
							</div>
						):(null)}
					</label>

					<div className="row">
						<p className="col-xs-12">Относится к объектам:</p>
						<div className="col-xs-5">
							<FilteredMultiSelect
								onChange={this.handleSelectionChangeObject}
								options={objectsList}
								selectedOptions={developedStandard.objectIds}
								textProp="name"
								valueProp="id"
								buttonText="Выбрать"
								classNames={{
									button: "btn btn btn-block btn-default",
									buttonActive: "btn btn btn-block btn-primary",
									filter: "form-control",
									select: "form-control",
								}}
							/>
						</div>

						<div className="col-xs-5">

							{developedStandard.objectIds.length === 0 && <p>(ничего не выбрано)</p>}

							{developedStandard.objectIds.length > 0 &&
							<ol>
								{developedStandard.objectIds.map((object, i) => <li key={i}>
									{`${object.name} `}
									<span style={{cursor: "pointer"}} onClick={this.handleDeselectObject.bind(null, i)}>
										&times;
									</span>
								</li>)}
							</ol>
							}
						</div>

						{(errors['objectIds']) ? (
							<div className="clearfix col-xs-12">
								<span className="has-error-text">{errors['objectIds']}</span>
							</div>
						):(null)}
					</div>

					<div className="row">
						<p className="col-xs-12">Относится к операциям:</p>
						<div className="col-xs-5">
							<FilteredMultiSelect
								onChange={this.handleSelectionChangeOperation}
								options={operationsList}
								selectedOptions={developedStandard.operationIds}
								textProp="name"
								valueProp="id"
								buttonText="Выбрать"
								classNames={{
									button: "btn btn btn-block btn-default",
									buttonActive: "btn btn btn-block btn-primary",
									filter: "form-control",
									select: "form-control",
								}}
							/>
						</div>

						<div className="col-xs-5">
							{developedStandard.operationIds.length === 0 && <p>(ничего не выбрано)</p>}

							{developedStandard.operationIds.length > 0 &&
							<ol>
								{developedStandard.operationIds.map((object, i) => <li key={i}>
									{`${object.name} `}
									<span style={{cursor: "pointer"}} onClick={this.handleDeselectOperation.bind(null, i)}>
										&times;
									</span>
								</li>)}
							</ol>
							}
						</div>

						{(errors['operationIds']) ? (
							<div className="clearfix col-xs-12">
								<span className="has-error-text">{errors['operationIds']}</span>
							</div>
						):(null)}
					</div>

					<div className="bs-example">
						{(developedStandard.id || developedStandard.id === 0) &&
						<button type="button" className="btn btn-danger" onClick={this.deleteStandard}>Удалить</button>
						}

						<button type="button" className="btn " onClick={this.clearState}>Отменить</button>
						<button type="button" className="btn btn-success" onClick={this.saveStandard}>Сохранить</button>
					</div>
				</div>
				}
			</div>
		);
	}
}

LiveSituationsStandards.propTypes = {
	objectsList: React.PropTypes.array,
	operationsList: React.PropTypes.array,
	standardsList: React.PropTypes.array,
};

LiveSituationsStandards.defaultProps = {
	objectsList: [],
	operationsList: [],
	standardsList: [],
};

export default LiveSituationsStandards;