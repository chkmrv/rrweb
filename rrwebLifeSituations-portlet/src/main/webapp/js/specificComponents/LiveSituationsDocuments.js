import React from 'react';
import FilteredMultiSelect from './../../../../../../../common/components/react-filtered-multiselect.min';

import library from 'library';
let lib = library.lib;

class LiveSituationsDocuments extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			edit: false,
			developedDocument: {},
			currentDocument: 0,
			archiveOfSelectObjects: {},
			archiveOfSelectOperations: {},
			errors: [],
		}
	}

	componentDidUpdate(state) {
		if (state.documentsList != this.props.documentsList) {
			this.setState({
				archiveOfSelectObjects: lib.createArchiveElements(this.props.documentsList, this.props.objectsList, "objectIds"),
				archiveOfSelectOperations: lib.createArchiveElements(this.props.documentsList, this.props.operationsList, "operationIds"),
			})
		}
	}

	clearState = () => {
		let onChange = this.props.onChange;

		this.setState({
			developedDocument: {},
			edit: false,
			currentDocument: 0,
			errors: [],
		}, () => {
			onChange()
		});
	};

	selectChangeDocument = (e) => {
		let currentId = e.target.value;
		let currentDocument;

		this.props.documentsList.map((item, index) => {
			if (index == currentId) {
				currentDocument = index;
			}
		});

		this.setState({currentDocument});
	};

	createDocument = () => {
		this.setState({
			currentDocument: {},
			developedDocument: {
				"name": "",
				"description": "",
				"documentGroup": "",
				"defaultView": false,
				"objectIds": [],
				"operationIds": [],
			},
			edit: true,
		});
	};

	editDocument = () => {
		let {currentDocument, archiveOfSelectObjects, archiveOfSelectOperations} = this.state;
		let currentId = this.props.documentsList[currentDocument].id;

		lib.getAJAXCall({
			method: 'GET',
			url: lib.urlsLibrary.document + currentId,
			callback: (document) => {
				document.objectIds = archiveOfSelectObjects[currentId];
				document.operationIds = archiveOfSelectOperations[currentId];

				this.setState({
					developedDocument: document,
					edit: true,
				});
			}
		});
	};

	saveDocument = () => {
		let {developedDocument} = this.state;
		let tests = {
			name: {
				approve: developedDocument.name.length <= 0,
				descr: "Введите название документа"
			},
			description: {
				approve: developedDocument.description.length <= 0,
				descr: "Введите описание"
			},
			objectIds: {
				approve: developedDocument.objectIds.length <= 0,
				descr: "Необходимо привязать к объектам"
			},
			operationIds: {
				approve: developedDocument.operationIds.length <= 0,
				descr: "Необходимо привязать к операциям"
			},
		};

		lib.checkValidation(tests, () => {
			if (Object.keys(this.state.errors).length === 0) {
				let method = 'PUT';

				if (!developedDocument.id && developedDocument.id !== 0) {
					method = 'POST';
				}

				developedDocument.objectIds = developedDocument.objectIds.map((obj) => {
					return obj.id
				});

				developedDocument.operationIds = developedDocument.operationIds.map((obj) => {
					return obj.id
				});

				lib.getAJAXCall({
					method: method,
					url: lib.urlsLibrary.document,
					data: developedDocument,
					callback: this.clearState
				});
			}
		}, this);
	};

	deleteDocument = () => {
		let developedDocument = this.state.developedDocument;

		if (lib.deleteConfirmation()) {
			lib.getAJAXCall({
				method: 'DELETE',
				url: lib.urlsLibrary.document + developedDocument.id,
				deleteCallback: this.clearState
			});
		};
	};

	handleDeselectObject = (index) => {
		let {developedDocument} = this.state;
		let selectedObjects = developedDocument.objectIds.slice();

		selectedObjects.splice(index, 1);
		developedDocument.objectIds = selectedObjects;

		this.setState({developedDocument})
	};

	handleSelectionChangeObject = (selectedObjects) => {
		let {developedDocument} = this.state;

		developedDocument.objectIds = selectedObjects;

		this.setState({developedDocument})
	};

	handleDeselectOperation = (index) => {
		let {developedDocument} = this.state;
		let selectedObjects = developedDocument.operationIds.slice();

		selectedObjects.splice(index, 1);
		developedDocument.operationIds = selectedObjects;

		this.setState({developedDocument})
	};

	handleSelectionChangeOperation = (selectedObjects) => {
		let {developedDocument} = this.state;

		developedDocument.operationIds = selectedObjects;

		this.setState({developedDocument})
	};

	render() {
		let {documentsList, objectsList, operationsList} = this.props;
		let {currentDocument, edit, developedDocument, errors} = this.state;

		return (
			<div>
				<h2>Документы</h2>

				{!edit
					? <div>
					<select onChange={this.selectChangeDocument} className="form-control">
						{documentsList.map((item, id) => {
							return (
								<option key={id}
								        value={id}
								        className={(currentDocument === item) ? 'active' : '' }>
									{item.name}
								</option>
							)
						})}
					</select>

					<div className="bs-example">
						<button type="button" className="btn btn-primary" onClick={this.editDocument}>Редактировать</button>
						<button type="button" className="btn btn-primary" onClick={this.createDocument}>Создать</button>
					</div>

				</div>
					: <div>
					<label className="row">
						<p className="col-xs-12">Название:</p>

						<div className="col-xs-12">
							<input className="form-control"
							       value={developedDocument.name}
							       onChange={(e) => {
								       let obj = developedDocument;
								       obj.name = e.target.value;

								       this.setState({developedDocument: obj})
							       }}
							/>
						</div>

						{(errors['name']) ? (
							<div className="clearfix col-xs-12">
								<span className="has-error-text">{errors['name']}</span>
							</div>
						):(null)}
					</label>

					<label className="row">
						<p className="col-xs-12">Описание:</p>

						<div className="col-xs-12">
							<input className="form-control"
							       value={developedDocument.description}
							       onChange={(e) => {
								       let obj = developedDocument;
								       obj.description = e.target.value;

								       this.setState({developedDocument: obj})
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
						<p className="col-xs-4">Документ виден по умолчанию:</p>

						<div className="col-xs-2">
							<input className="form-control"
							       type="checkbox"
							       style={{height: 'auto'}}
							       checked={developedDocument.defaultView}
							       onChange={() => {
								       let obj = developedDocument;
								       obj.defaultView = !obj.defaultView;

								       this.setState({developedDocument: obj})
							       }}
							/>
						</div>
					</label>

					<div className="row">
						<p className="col-xs-12">Относится к объектам:</p>
						<div className="col-xs-5">
							<FilteredMultiSelect
								onChange={this.handleSelectionChangeObject}
								options={objectsList}
								selectedOptions={developedDocument.objectIds}
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

							{developedDocument.objectIds.length === 0 && <p>(ничего не выбрано)</p>}

							{developedDocument.objectIds.length > 0 &&
							<ol>
								{developedDocument.objectIds.map((object, i) => <li key={i}>
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
								selectedOptions={developedDocument.operationIds}
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

							{developedDocument.operationIds.length === 0 && <p>(ничего не выбрано)</p>}

							{developedDocument.operationIds.length > 0 &&
							<ol>
								{developedDocument.operationIds.map((object, i) => <li key={i}>
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
						{(developedDocument.id || developedDocument.id === 0) &&
						<button type="button" className="btn btn-danger" onClick={this.deleteDocument}>Удалить</button>
						}

						<button type="button" className="btn " onClick={this.clearState}>Отменить</button>
						<button type="button" className="btn btn-success" onClick={this.saveDocument}>Сохранить</button>
					</div>
				</div>
				}
			</div>
		);
	}
}

LiveSituationsDocuments.propTypes = {
	objectsList: React.PropTypes.array,
	operationsList: React.PropTypes.array,
	documentsList: React.PropTypes.array,
};

LiveSituationsDocuments.defaultProps = {
	objectsList: [],
	operationsList: [],
	documentsList: [],
};

export default LiveSituationsDocuments;