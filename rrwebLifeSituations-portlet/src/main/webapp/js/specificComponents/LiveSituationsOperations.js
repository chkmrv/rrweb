import React from 'react';
import FilteredMultiSelect from './../../../../../../../common/components/react-filtered-multiselect.min';

import library from 'library';
let lib = library.lib;

class LiveSituationsOperations extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			edit: false,
			currentOperation: 0,
			developedOperation: {},
			archiveOfSelectObjects: {},
			errors: [],
		}
	};

	componentDidUpdate(state) {
		if (state.operationsList != this.props.operationsList) {
			this.setState({
				archiveOfSelectObjects: lib.createArchiveElements(this.props.operationsList, this.props.objectsList, "objectIds")
			})
		}
	}

	clearState = () => {
		let onChange = this.props.onChange;

		this.setState({
			developedOperation: {},
			edit: false,
			currentOperation: 0,
			errors: [],
		}, () => {
			onChange()
		});
	};

	selectChangeOperation = (e) => {
		let currentId = e.target.value;
		let currentOperation;

		this.props.operationsList.map((item, index) => {
			if (index == currentId) {
				currentOperation = index;
			}
		});

		this.setState({currentOperation});
	};

	createOperation = () => {
		this.setState({
			developedOperation: {"name": "", "category": "", "objectIds": []},
			edit: true,
		});
	};

	editOperation = () => {
		let {currentOperation, archiveOfSelectObjects} = this.state;
		let currentId = this.props.operationsList[currentOperation].id;

		lib.getAJAXCall({
			method: 'GET',
			url: lib.urlsLibrary.operation + currentId,
			callback: (operation) => {
				operation.objectIds = archiveOfSelectObjects[currentId];

				this.setState({
					developedOperation: operation,
					edit: true,
				});
			}
		});
	};

	saveOperation = () => {
		let {developedOperation} = this.state;

		let tests = {
			name: {
				approve: developedOperation.name.length <= 0,
				descr: "Введите название операции"
			},
			category: {
				approve: developedOperation.category.length <= 0,
				descr: "Введите номер категории"
			},
			objectIds: {
				approve: developedOperation.objectIds.length <= 0,
				descr: "Необходимо привязать к объектам"
			},
		};

		lib.checkValidation(tests, () => {
			if (Object.keys(this.state.errors).length === 0) {
				let method = 'PUT';

				if (!developedOperation.id && developedOperation.id !== 0) {
					method = 'POST';
				}

				developedOperation.objectIds = developedOperation.objectIds.map((obj) => {
					return obj.id
				});

				lib.getAJAXCall({
					method: method,
					url: lib.urlsLibrary.operation,
					data: developedOperation,
					callback: this.clearState,
				});
			}
		}, this);
	};

	deleteOperation = () => {
		let {developedOperation} = this.state;

		if (lib.deleteConfirmation()) {
			lib.getAJAXCall({
				method: 'DELETE',
				url: lib.urlsLibrary.operation + developedOperation.id,
				deleteCallback: this.clearState,
			})
		}
	};

	handleDeselect = (index) => {
		let {developedOperation} = this.state;
		let selectedObjects = developedOperation.objectIds.slice();

		selectedObjects.splice(index, 1);
		developedOperation.objectIds = selectedObjects;

		this.setState({developedOperation})
	};

	handleSelectionChange = (selectedObjects) => {
		let {developedOperation} = this.state;

		developedOperation.objectIds = selectedObjects;

		this.setState({developedOperation})
	};

	handleCategoryChange = (event) => {
		let {developedOperation} = this.state;
		developedOperation.category = Number(event.target.value);
	
		this.setState({
			developedOperation,
		})
	};

	render() {
		let {operationsList, objectsList} = this.props;
		let {currentOperation, edit, developedOperation, errors} = this.state;

		return (
			<div>
				<h2>Операции</h2>

				{!edit
					? <div>
					<select onChange={this.selectChangeOperation} className="form-control">
						{operationsList.map((item, id) => {
							return (
								<option key={id}
								        value={id}
								        className={(currentOperation === item.id) ? 'active' : '' }>
									{item.name}
								</option>
							)
						})}
					</select>

					<div className="bs-example">
						<button type="button" className="btn btn-primary" onClick={this.editOperation}>Редактировать</button>
						<button type="button" className="btn btn-primary" onClick={this.createOperation}>Создать</button>
					</div>

				</div>
					: <div>
					<label className="row">
						<p className="col-xs-12">Название:</p>

						<div className="col-xs-12">
							<input className="form-control"
							       value={developedOperation.name}
							       onChange={(e) => {
								       let obj = developedOperation;
								       obj.name = e.target.value;

								       this.setState({developedOperation: obj})
							       }}
							/>
						</div>

						{(errors['name']) ? (
							<div className="clearfix col-xs-12">
								<span className="has-error-text">{errors['name']}</span>
							</div>
						):(null)}
					</label>
					
					<div className="row">
						<p className="col-xs-12">Категория:</p>
						
						<label className="col-xs-12">
							<input 
								type="radio"
								name="category"
								value="0"
								checked={developedOperation.category === 0}
								onChange={this.handleCategoryChange} />
							
							<span>Кадастровый учет</span>
						</label>
						
						<label className="col-xs-12">
							<input
								type="radio"
								name="category"
								value="1"
								checked={developedOperation.category === 1}
								onChange={this.handleCategoryChange} />
							
							<span>Регистрация права</span>
						</label>
					</div>

					<div className="row">
						<p className="col-xs-12">Относится к объектам:</p>
						<div className="col-xs-5">
							<FilteredMultiSelect
								onChange={this.handleSelectionChange}
								options={objectsList}
								selectedOptions={developedOperation.objectIds}
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
							{developedOperation.objectIds.length === 0 && <p>(ничего не выбрано)</p>}

							{developedOperation.objectIds.length > 0 &&
							<ol>
								{developedOperation.objectIds.map((object, i) => <li key={i}>
									{`${object.name} `}
									<span style={{cursor: "pointer"}} onClick={this.handleDeselect.bind(null, i)}>
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

					<div className="bs-example">
						<button type="button" className="btn" onClick={this.clearState}>Отменить</button>
						<button type="button" className="btn btn-success" onClick={this.saveOperation}>Сохранить</button>


						{(developedOperation.id || developedOperation.id === 0) &&
						<button type="button" className="btn btn-danger" onClick={this.deleteOperation}>Удалить</button>
						}
					</div>
				</div>
				}
			</div>
		);
	}
}

LiveSituationsOperations.propTypes = {
	objectsList: React.PropTypes.array,
	operationsList: React.PropTypes.array,
};

LiveSituationsOperations.defaultProps = {
	objectsList: [],
	operationsList: [],
};

export default LiveSituationsOperations;