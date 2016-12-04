import React from 'react';

import library from 'library';
let lib = library.lib;

class FAQQuestions extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentQuestion: 0,
			edit: false,
			developedQuestion: {},
			errors: [],
		}
	};

	clearState = () => {
		let onChange = this.props.onChange;

		this.setState({
			developedQuestion: {},
			edit: false,
			currentQuestion: 0,
			errors: [],
		}, () => {
			onChange()
		});
	};

	selectChangeOption = (e) => {
		let currentId = e.target.value;
		let currentQuestion;

		this.props.questionsList.map((item, index) => {
			if (index == currentId) {
				currentQuestion = index;
			}
		});

		this.setState({currentQuestion});
	};

	createQuestion = () => {
		this.setState({
			developedQuestion: {
				"name": '',
				"questionText": '',
				"answerText": '',
				"sort": 0
			},
			edit: true,
		});
	};

	editQuestion = () => {
		let {currentQuestion} = this.state;
		let developedQuestion = this.props.questionsList[currentQuestion];

		lib.getAJAXCall({
			method: 'GET',
			url: lib.urlsLibrary.faq + developedQuestion.id,
			callback: (question) => {
				this.setState({
					developedQuestion: question,
					edit: true,
				});
			}
		});
	};

	saveQuestion = () => {
		let developedQuestion = this.state.developedQuestion;
		let tests = {
			name: {
				approve: developedQuestion.name.length <= 0,
				descr: "Введите название вопрос"
			},
			questionText: {
				approve: developedQuestion.questionText.length <= 0,
				descr: "Введите вопрос"
			},
			answerText: {
				approve: developedQuestion.answerText.length <= 0,
				descr: "Введите ответ"
			},
			sort: {
				approve: developedQuestion.sort.length < 0,
				descr: "Введите сортировку вопроса в теме"
			},
		};

		lib.checkValidation(tests, () => {
			if (Object.keys(this.state.errors).length === 0) {
				let method = 'PUT';

				if (!developedQuestion.id && developedQuestion.id !== 0) {
					method = 'POST';
				}

				lib.getAJAXCall({
					method: method,
					url: lib.urlsLibrary.faq,
					data: developedQuestion,
					callback: this.clearState
				});
			}
		}, this);
	};

	deleteQuestion = () => {
		let developedQuestion = this.state.developedQuestion;

		if (lib.deleteConfirmation()) {
			lib.getAJAXCall({
				method: 'DELETE',
				url: lib.urlsLibrary.faq + developedQuestion.id,
				deleteCallback: this.clearState
			});
		}
	};

	render() {
		let {questionsList} = this.props;
		let {currentQuestion, edit, developedQuestion, errors} = this.state;

		return (
			<div>
				<h2>Вопросы</h2>

				{!edit
					? <div>
					<select onChange={this.selectChangeOption} className="form-control">
						{questionsList.map((item, id) => {
							return (
								<option key={id}
								        value={id}
								        className={(currentQuestion === id) ? 'active' : '' }>
									{`${item.sort} - ${item.name}`}
								</option>
							)
						})}
					</select>

					<div className="bs-example">
						<button type="button" className="btn btn-primary" onClick={this.editQuestion}>Редактировать</button>
						<button type="button" className="btn btn-primary" onClick={this.createQuestion}>Создать</button>
					</div>

				</div>
					: <div>
					<label className="row">
						<p className="col-xs-12">Название:</p>

						<div className="col-xs-12">
							<input className="form-control"
							       value={developedQuestion.name}
							       onChange={(e) => {
								       let obj = developedQuestion;
								       obj.name = e.target.value;

								       this.setState({developedQuestion: obj})
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
						<p className="col-xs-12">Вопрос:</p>

						<div className="col-xs-12">
							<textarea className="form-control"
							       value={developedQuestion.questionText}
				             rows="4"
							       onChange={(e) => {
								       let obj = developedQuestion;
								       obj.questionText = e.target.value;

								       this.setState({developedQuestion: obj})
							       }}
							></textarea>
						</div>

						{(errors['questionText']) ? (
							<div className="clearfix col-xs-12">
								<span className="has-error-text">{errors['questionText']}</span>
							</div>
						):(null)}
					</label>

					<label className="row">
						<p className="col-xs-12">Ответ:</p>

						<div className="col-xs-12">
							<textarea className="form-control"
							       value={developedQuestion.answerText}
					           rows="10"
							       onChange={(e) => {
								       let obj = developedQuestion;
								       obj.answerText = e.target.value;

								       this.setState({developedQuestion: obj})
							       }}
							></textarea>
						</div>

						{(errors['answerText']) ? (
							<div className="clearfix col-xs-12">
								<span className="has-error-text">{errors['answerText']}</span>
							</div>
						):(null)}
					</label>


					<label className="row">
						<p className="col-xs-12">Сортировка:</p>

						<div className="col-xs-12">
							<input className="form-control"
							       type='number'
							       value={developedQuestion.sort}
							       onChange={(e) => {
								       let obj = developedQuestion;
								       obj.sort = Number(e.target.value);

								       this.setState({developedQuestion: obj})
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
						{(developedQuestion.id || developedQuestion.id === 0) &&
						<button type="button" className="btn btn-danger" onClick={this.deleteQuestion}>Удалить</button>
						}

						<button type="button" className="btn " onClick={this.clearState}>Отменить</button>
						<button type="button" className="btn btn-success" onClick={this.saveQuestion}>Сохранить</button>
					</div>
				</div>
				}
			</div>
		);
	}
}

FAQQuestions.propTypes = {
	questionsList: React.PropTypes.array,
};

FAQQuestions.defaultProps = {
	questionsList: [],
};

export default FAQQuestions;