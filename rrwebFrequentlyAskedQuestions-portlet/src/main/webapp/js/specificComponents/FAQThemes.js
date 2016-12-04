import React from 'react';
import FilteredMultiSelect from './../../../../../../../common/components/react-filtered-multiselect.min';

import library from 'library';
let lib = library.lib;

class FAQThemes extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			edit: false,
			currentTheme: 0,
			developedTheme: {},
			archiveOfSelectQuestions: {},
			errors: [],
		}
	};

	componentDidUpdate(state) {
		if (state.themesList != this.props.themesList) {
			this.setState({
				archiveOfSelectQuestions: lib.createArchiveElements(this.props.themesList, this.props.questionsList, "faqIds")
			})
		}
	}

	clearState = () => {
		let onChange = this.props.onChange;

		this.setState({
			developedTheme: {},
			edit: false,
			currentTheme: 0,
			errors: [],
		}, () => {
			onChange()
		});
	};

	selectChangeTheme = (e) => {
		let currentId = e.target.value;
		let currentTheme;

		this.props.themesList.map((item, index) => {
			if (index == currentId) {
				currentTheme = index;
			}
		});

		this.setState({currentTheme});
	};

	createTheme = () => {
		this.setState({
			developedTheme: {"name": "", "sort": 0, "faqIds": []},
			edit: true,
		});
	};

	editTheme = () => {
		let {currentTheme, archiveOfSelectQuestions} = this.state;
		let currentId = this.props.themesList[currentTheme].id;

		lib.getAJAXCall({
			method: 'GET',
			url: lib.urlsLibrary.theme + currentId,
			callback: (theme) => {
				theme.faqIds = archiveOfSelectQuestions[currentId];

				this.setState({
					developedTheme: theme,
					edit: true,
				});
			}
		});
	};

	saveTheme = () => {
		let {developedTheme} = this.state;

		let tests = {
			name: {
				approve: developedTheme.name.length <= 0,
				descr: "Введите название темы"
			},
			sort: {
				approve: developedTheme.sort.length <= 0,
				descr: "Введите сортировку тем"
			},
			faqIds: {
				approve: developedTheme.faqIds.length <= 0,
				descr: "Необходимо привязать к вопросам"
			},
		};

		lib.checkValidation(tests, () => {
			if (Object.keys(this.state.errors).length === 0) {
				let method = 'PUT';

				if (!developedTheme.id && developedTheme.id !== 0) {
					method = 'POST';
				}

				developedTheme.faqIds = developedTheme.faqIds.map((obj) => {
					return obj.id
				});

				lib.getAJAXCall({
					method: method,
					url: lib.urlsLibrary.theme,
					data: developedTheme,
					callback: this.clearState,
				});
			}
		}, this);
	};

	deleteTheme = () => {
		let {developedTheme} = this.state;

		if (lib.deleteConfirmation()) {
			lib.getAJAXCall({
				method: 'DELETE',
				url: lib.urlsLibrary.theme + developedTheme.id,
				deleteCallback: this.clearState,
			})
		}
	};

	handleDeselect = (index) => {
		let {developedTheme} = this.state;
		let selectedObjects = developedTheme.faqIds.slice();

		selectedObjects.splice(index, 1);
		developedTheme.faqIds = selectedObjects;

		this.setState({developedTheme})
	};

	handleSelectionChange = (selectedObjects) => {
		let {developedTheme} = this.state;

		developedTheme.faqIds = selectedObjects;

		this.setState({developedTheme})
	};

	render() {
		let {themesList, questionsList} = this.props;
		let {currentTheme, edit, developedTheme, errors} = this.state;

		return (
			<div>
				<h2>Темы</h2>

				{!edit
					? <div>
					<select onChange={this.selectChangeTheme} className="form-control">
						{themesList.map((item, id) => {
							return (
								<option key={id}
								        value={id}
								        className={(currentTheme === item.id) ? 'active' : '' }>
									{`${item.sort} - ${item.name}`}
								</option>
							)
						})}
					</select>

					<div className="bs-example">
						<button type="button" className="btn btn-primary" onClick={this.editTheme}>Редактировать</button>
						<button type="button" className="btn btn-primary" onClick={this.createTheme}>Создать</button>
					</div>

				</div>
					: <div>
					<label className="row">
						<p className="col-xs-12">Название:</p>

						<div className="col-xs-12">
							<input className="form-control"
							       value={developedTheme.name}
							       onChange={(e) => {
								       let obj = developedTheme;
								       obj.name = e.target.value;

								       this.setState({developedTheme: obj})
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
						<p className="col-xs-12">Относится к вопросам:</p>
						<div className="col-xs-5">
							<FilteredMultiSelect
								onChange={this.handleSelectionChange}
								options={questionsList}
								selectedOptions={developedTheme.faqIds}
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
							{developedTheme.faqIds.length === 0 && <p>(ничего не выбрано)</p>}

							{developedTheme.faqIds.length > 0 &&
							<ol>
								{developedTheme.faqIds.map((object, i) => <li key={i}>
									{`${object.name} `}
									<span style={{cursor: "pointer"}} onClick={this.handleDeselect.bind(null, i)}>
										&times;
									</span>
								</li>)}
							</ol>
							}
						</div>

						{(errors['faqIds']) ? (
							<div className="clearfix col-xs-12">
								<span className="has-error-text">{errors['faqIds']}</span>
							</div>
						):(null)}
					</div>



					<label className="row">
						<p className="col-xs-12">Сортировка тем:</p>

						<div className="col-xs-2">
							<input className="form-control"
							       type="number"
							       value={developedTheme.sort}
							       onChange={(e) => {
								       let obj = developedTheme;
								       obj.sort = Number(e.target.value);

								       this.setState({developedTheme: obj})
							       }}
							/>
						</div>

						{(errors['sort']) ? (
							<div className="clearfix col-xs-12">
								<span className="has-error-text">{errors['sort']}</span>
							</div>
						):(null)}
					</label>

					<div className="bs-example">
						<button type="button" className="btn" onClick={this.clearState}>Отменить</button>
						<button type="button" className="btn btn-success" onClick={this.saveTheme}>Сохранить</button>


						{(developedTheme.id || developedTheme.id === 0) &&
						<button type="button" className="btn btn-danger" onClick={this.deleteTheme}>Удалить</button>
						}
					</div>
				</div>
				}
			</div>
		);
	}
}

FAQThemes.propTypes = {
	questionsList: React.PropTypes.array,
	themesList: React.PropTypes.array,
};

FAQThemes.defaultProps = {
	questionsList: [],
	themesList: [],
};

export default FAQThemes;