import React from 'react';

import library from 'library';
let lib = library.lib;

class LiveSituationsObjects extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentObject: 0,
			edit: false,
			developedObject: {},
			errors: [],
		}
	};

	clearState = () => {
		let onChange = this.props.onChange;

		this.setState({
			developedObject: {},
			edit: false,
			currentObject: 0,
			errors: [],
		}, () => {
			onChange()
		});
	};

	selectChangeOption = (e) => {
		let currentId = e.target.value;
		let currentObject;

		this.props.objectsList.map((item, index) => {
			if (index == currentId) {
				currentObject = index;
			}
		});

		this.setState({currentObject});
	};

	createObject = () => {
		this.setState({
			developedObject: {"name": ''},
			edit: true,
		});
	};

	editObject = () => {
		let {currentObject} = this.state;
		let developedObject = this.props.objectsList[currentObject];

		lib.getAJAXCall({
			method: 'GET',
			url: lib.urlsLibrary.object + developedObject.id,
			callback: (object) => {
				this.setState({
					developedObject: object,
					edit: true,
				});
			}
		});
	};

	saveObject = () => {
		let developedObject = this.state.developedObject;
		let tests = {
			name: {
				approve: developedObject.name.length <= 0,
				descr: "Введите название объекта"
			},
		};

		lib.checkValidation(tests, () => {
			if (Object.keys(this.state.errors).length === 0) {
				let method = 'PUT';

				if (!developedObject.id && developedObject.id !== 0) {
					method = 'POST';
				}

				lib.getAJAXCall({
					method: method,
					url: lib.urlsLibrary.object,
					data: developedObject,
					callback: this.clearState
				});
			}
		}, this);
	};

	deleteObject = () => {
		let developedObject = this.state.developedObject;

		if (lib.deleteConfirmation()) {
			lib.getAJAXCall({
				method: 'DELETE',
				url: lib.urlsLibrary.object + developedObject.id,
				deleteCallback: this.clearState
			});
		}
	};

	render() {
		let {objectsList} = this.props;
		let {currentObject, edit, developedObject, errors} = this.state;

		return (
			<div>
				<h2>Объекты</h2>

				{!edit
					? <div>
					<select onChange={this.selectChangeOption} className="form-control">
						{objectsList.map((item, id) => {
							return (
								<option key={id}
								        value={id}
								        className={(currentObject === id) ? 'active' : '' }>
									{item.name}
								</option>
							)
						})}
					</select>

					<div className="bs-example">
						<button type="button" className="btn btn-primary" onClick={this.editObject}>Редактировать</button>
						<button type="button" className="btn btn-primary" onClick={this.createObject}>Создать</button>
					</div>

				</div>
					: <div>
					<label className="row">
						<p className="col-xs-12">Название:</p>

						<div className="col-xs-12">
							<input className="form-control"
							       value={developedObject.name}
							       onChange={(e) => {
								       let obj = developedObject;
								       obj.name = e.target.value;

								       this.setState({developedObject: obj})
							       }}
							/>
						</div>

						{(errors['name']) ? (
							<div className="clearfix col-xs-12">
								<span className="has-error-text">{errors['name']}</span>
							</div>
						):(null)}
					</label>

					<div className="bs-example">
						{(developedObject.id || developedObject.id === 0) &&
						<button type="button" className="btn btn-danger" onClick={this.deleteObject}>Удалить</button>
						}

						<button type="button" className="btn " onClick={this.clearState}>Отменить</button>
						<button type="button" className="btn btn-success" onClick={this.saveObject}>Сохранить</button>
					</div>
				</div>
				}
			</div>
		);
	}
}

LiveSituationsObjects.propTypes = {
	objectsList: React.PropTypes.array,
};

LiveSituationsObjects.defaultProps = {
	objectsList: [],
};

export default LiveSituationsObjects;