import React from 'react';
import FilteredMultiSelect from './../../../../../../../common/components/react-filtered-multiselect.min';
import LiveSituationsAnswers from './LiveSituationsAnswers';

import library from 'library';
let lib = library.lib;

class LiveSituationsQuestions extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			edit: false,
			developedQuestion: {},
			currentQuestion: 0,
			answersList: [],
			archiveOfSelectObjects: {},
			archiveOfSelectOperations: {},
			errors: [],
			tmpAnswer: '',
		}
	}

	componentDidUpdate(state) {
		if (state.questionsList != this.props.questionsList) {
			this.setState({
				archiveOfSelectObjects: lib.createArchiveElements(this.props.questionsList, this.props.objectsList, "objectIds"),
				archiveOfSelectOperations: lib.createArchiveElements(this.props.questionsList, this.props.operationsList, "operationIds"),
			})
		}
	}

	clearState = () => {
		let onChange = this.props.onChange;

		this.setState({
			developedQuestion: {},
			edit: false,
			currentQuestion: 0,
			answersList: [],
			errors: []
		}, () => {
			onChange()
		});
	};

	getAnswerList = () => {
		let {currentQuestion} = this.state;

		lib.getAJAXCall({
			method: 'GET',
			url: lib.urlsLibrary.answer + this.props.questionsList[currentQuestion].id,
			callback: (answers) => {

				this.setState({
					answersList: answers,
				});
			}
		});
	};

	selectChangeQuestion = (e) => {
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
			currentQuestion: {},
			developedQuestion: {
				"name": "",
				"objectIds": [],
				"operationIds": [],
				"answers": []
			},
			edit: true,
		});
	};

	editQuestion = () => {
		let {currentQuestion, archiveOfSelectObjects, archiveOfSelectOperations} = this.state;
		let currentId = this.props.questionsList[currentQuestion].id;

		lib.getAJAXCall({
			method: 'GET',
			url: lib.urlsLibrary.question + currentId,
			callback: (question) => {
				question.objectIds = archiveOfSelectObjects[currentId];
				question.operationIds = archiveOfSelectOperations[currentId];

				this.setState({
					developedQuestion: question,
					edit: true,
				}, this.getAnswerList);
			}
		});
	};

	saveQuestion = () => {
		let {developedQuestion, answersList} = this.state;
		let tests = {
			name: {
				approve: developedQuestion.name.length <= 0,
				descr: "Введите вопрос"
			},
			objectIds: {
				approve: developedQuestion.objectIds.length <= 0,
				descr: "Необходимо привязать к объектам"
			},
			operationIds: {
				approve: developedQuestion.operationIds.length <= 0,
				descr: "Необходимо привязать к операциям"
			},
			answersList: {
				approve: answersList.length <= 0,
				descr: "Добавьте ответы"
			},
		};

		lib.checkValidation(tests, () => {
			if (Object.keys(this.state.errors).length === 0) {
				let method = 'PUT';

				if (!developedQuestion.id && developedQuestion.id !== 0) {
					method = 'POST';
				}

				developedQuestion.objectIds = developedQuestion.objectIds.map((obj) => {
					return obj.id
				});

				developedQuestion.operationIds = developedQuestion.operationIds.map((obj) => {
					return obj.id
				});

				developedQuestion.answers = answersList;

				lib.getAJAXCall({
					method: method,
					url: lib.urlsLibrary.question,
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
				url: lib.urlsLibrary.question + developedQuestion.id,
				deleteCallback: this.clearState
			});
		}
	};

	handleDeselectObject = (index) => {
		let {developedQuestion} = this.state;
		let selectedObjects = developedQuestion.objectIds.slice();

		selectedObjects.splice(index, 1);
		developedQuestion.objectIds = selectedObjects;

		this.setState({developedQuestion})
	};

	handleSelectionChangeObject = (selectedObjects) => {
		let {developedQuestion} = this.state;

		developedQuestion.objectIds = selectedObjects;

		this.setState({developedQuestion})
	};

	handleDeselectOperation = (index) => {
		let {developedQuestion} = this.state;
		let selectedObjects = developedQuestion.operationIds.slice();

		selectedObjects.splice(index, 1);
		developedQuestion.operationIds = selectedObjects;

		this.setState({developedQuestion})
	};

	handleSelectionChangeOperation = (selectedObjects) => {
		let {developedQuestion} = this.state;

		developedQuestion.operationIds = selectedObjects;

		this.setState({developedQuestion})
	};

	handleDeselectAnswer = (index) => {
		let {answersList} = this.state;
		let selectedObjects = answersList.slice();

		selectedObjects.splice(index, 1);

		this.setState({answersList: selectedObjects})
	};

	saveAnswer = () => {
		let {answersList, tmpAnswer} = this.state;
		let obj = {"name": ''};
		obj.name = tmpAnswer;

		answersList.push(obj);

		this.setState({answersList, tmpAnswer: ''})
	}

	render() {
		let {questionsList, objectsList, operationsList} = this.props;
		let {currentQuestion, edit, developedQuestion, answersList, tmpAnswer, errors} = this.state;

		return (
			<div>
				<h2>Вопросы</h2>

				{!edit
					? <div>
					<select onChange={this.selectChangeQuestion} className="form-control">
						{questionsList.map((item, id) => {
							return (
								<option key={id}
								        value={id}
								        className={(currentQuestion === item) ? 'active' : '' }>
									{item.name}
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

					<div className="row">
						<p className="col-xs-12">Относится к объектам:</p>
						<div className="col-xs-5">
							<FilteredMultiSelect
								onChange={this.handleSelectionChangeObject}
								options={objectsList}
								selectedOptions={developedQuestion.objectIds}
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

							{developedQuestion.objectIds.length === 0 && <p>(ничего не выбрано)</p>}

							{developedQuestion.objectIds.length > 0 &&
							<ol>
								{developedQuestion.objectIds.map((object, i) => <li key={i}>
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
								selectedOptions={developedQuestion.operationIds}
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

							{developedQuestion.operationIds.length === 0 && <p>(ничего не выбрано)</p>}

							{developedQuestion.operationIds.length > 0 &&
							<ol>
								{developedQuestion.operationIds.map((object, i) => <li key={i}>
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

					<h3>Ответы</h3>

					{developedQuestion.id || developedQuestion.id == 0
						? <LiveSituationsAnswers
						answersList={answersList}
						currentQuestion={developedQuestion}
						onChange={this.getAnswerList}
					/>
						: <div>
						{answersList.map((answer, id) => {

							return (
								<p key={id}>{`${answer.name} `}
									<span style={{cursor: "pointer"}} onClick={this.handleDeselectAnswer.bind(null, id)}>
											&times;
										</span>
								</p>
							)
						})}

						<label>
							<input type="text"
							       className="form-control"
							       value={tmpAnswer}
							       onChange={(e) => {
								       this.setState({tmpAnswer: e.target.value});
							       }}
							/>

							{(errors['answersList']) ? (
								<div className="clearfix col-xs-12">
									<span className="has-error-text">{errors['answersList']}</span>
								</div>
							):(null)}

							<button disabled={!tmpAnswer.length} type="button" className="btn btn-success" onClick={this.saveAnswer}>Добавить</button>
						</label>
					</div>
					}

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

LiveSituationsQuestions.propTypes = {
	objectsList: React.PropTypes.array,
	operationsList: React.PropTypes.array,
	questionsList: React.PropTypes.array,
};

LiveSituationsQuestions.defaultProps = {
	objectsList: [],
	operationsList: [],
	questionsList: [],
};

export default LiveSituationsQuestions;