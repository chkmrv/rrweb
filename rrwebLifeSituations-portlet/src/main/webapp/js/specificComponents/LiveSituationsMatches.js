import React from 'react';

import library from 'library';
let lib = library.lib;

class LiveSituationsMatches extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			edit: false,
			create: false,
			developedMatch: {},
			archiveOfSelectOperations: {},
			archiveOfSelectDocuments: {},
			archiveOfSelectQuestions: {},
			archiveOfSelectAnswers: {},
			currentMatch: 0,
			documentsArchive: [],
			createMatch : {},
			errors: [],
		}
	}

	componentDidUpdate(state) {
		if ((state.matchesList != this.props.matchesList)
			|| (state.operationsList != this.props.operationsList)
			|| (state.documentsList != this.props.documentsList)
			|| (state.questionsList != this.props.questionsList)
			|| (state.answersList != this.props.answersList)
		) {
			this.setState({
				archiveOfSelectOperations: lib.createArchiveElementsMatcher(this.props.matchesList, this.props.operationsList, "operationid"),
				archiveOfSelectDocuments: lib.createArchiveElementsMatcher(this.props.matchesList, this.props.documentsList, "documentid"),
				archiveOfSelectQuestions: lib.createArchiveElementsMatcher(this.props.matchesList, this.props.questionsList, "questionid"),
				archiveOfSelectAnswers: lib.createArchiveElementsMatcher(this.props.matchesList, this.props.answersList, "answerid"),
			})
		}
	}

	clearState = () => {
		let onChange = this.props.onChange;

		this.setState({
			developedMatch: {},
			edit: false,
			create: false,
			documentsArchive: [],
			createMatch: {},
			errors: [],
		}, () => {
			onChange()
		});
	};

	createMatch = () => {
		this.setState({
			currentMatch: {},
			developedMatch: {
				"documentId": null,
				"operationId": null,
				"questionId": null,
				"answerId": null,
			},
			createMatch : {
				currentOperation: 0,
				currentQuestion: 0,
				currentAnswer: 0,
				currentDocuments: 0,
				questionsArchive: [],
				answersArchive: [],
				documentsArchive: [],
			},
			create: true,
		}, this.selectChangeOperations);
	};

	editMatch = (index) => {
		let currentMatch = this.props.matchesList[index];
		let createMatch = {
			currentOperation: 0,
			currentQuestion: 0,
			currentAnswer: 0,
			currentDocuments: 0,
			questionsArchive: [],
			answersArchive: [],
			documentsArchive: [],
		};

		lib.getAJAXCall({
			method: 'GET',
			url: lib.urlsLibrary.match + "id/"+ currentMatch.matcherid,
			callback: (match) => {
				this.props.questionsList.map((item, id) => {
					if( item.operationIds.indexOf(match.operationId) != -1){
						createMatch.questionsArchive.push(item);
						createMatch.answersArchive.push(item.answers);
					}
				});

				this.props.documentsList.map((document) => {
					if( document.operationIds.indexOf(match.operationId) != -1){
						createMatch.documentsArchive.push(document);
					}
				});

				this.props.operationsList.map((item, id) => {
					if (item.id == match.operationId) {
						createMatch.currentOperation = id;
					}
				});

				createMatch.questionsArchive.map((item, id) => {
					if (item.id == match.questionId) {
						createMatch.currentQuestion = id;

						item.answers.map((item, id) => {
							if (item.id == match.answerId) {
								createMatch.currentAnswer = id;
							}
						});
					}
				});

				createMatch.documentsArchive.map((item, id) => {
					if (item.id == match.documentId) {
						createMatch.currentDocuments = id;
					}
				});

				this.setState({
					developedMatch: match,
					create: true,
					createMatch
				});
			}
		});
	};

	saveMatch = () => {
		let {developedMatch, createMatch} = this.state;
		let tests = {
			match: {
				approve: developedMatch.documentId == null || developedMatch.questionId == null || developedMatch.answerId == null,
				descr: "К документу должны быть привязаны операции и ответы на вопросы"
			},
		};

		lib.checkValidation(tests, () => {
			if (Object.keys(this.state.errors).length === 0) {
				let method = 'PUT';

				if (!developedMatch.matcherId && developedMatch.matcherId !== 0) {
					method = 'POST';
				}

				lib.getAJAXCall({
					method: method,
					url: lib.urlsLibrary.match,
					data: developedMatch,
					callback: this.clearState
				});
			}
		}, this);
	};

	deleteMatch = () => {
		let developedMatch = this.state.developedMatch;

		if (lib.deleteConfirmation()) {
			lib.getAJAXCall({
				method: 'DELETE',
				url: lib.urlsLibrary.match + developedMatch.matcherId,
				deleteCallback: this.clearState
			});
		}
	};

	selectChangeOperations = (e) => {
		let currentId = (e && e.target.value) || this.state.createMatch.currentOperation;
		let {developedMatch, createMatch} = this.state;

		createMatch.questionsArchive = [];
		createMatch.currentQuestion = 0;
		createMatch.answersArchive = [];
		createMatch.currentAnswer = 0;
		createMatch.documentsArchive = [];
		createMatch.currentDocuments = 0;

		this.setState({createMatch});

		developedMatch.operationId = this.props.operationsList[currentId].id;

		this.props.operationsList.map((item, index) => {
			if (index == currentId) {
				createMatch.currentOperation = index;
			}
		});

		this.props.questionsList.map((item) => {
			if( item.operationIds.indexOf(developedMatch.operationId) != -1){
				createMatch.questionsArchive.push(item);
			}
		});

		if (createMatch.questionsArchive[createMatch.currentQuestion]) {
			developedMatch.questionId = createMatch.questionsArchive[createMatch.currentQuestion].id;
		}  else {
			developedMatch.questionId = null;
			developedMatch.answerId = null;
		}

		this.setState({developedMatch, createMatch}, () => {
			this.selectChangeDocuments();

			if(createMatch.questionsArchive[createMatch.currentQuestion]) {
				this.selectChangeQuestions();
			}
		})

	};

	selectChangeQuestions = (e) => {
		let currentId = (e && e.target.value) || this.state.createMatch.currentQuestion;
		let {developedMatch, createMatch} = this.state;

		createMatch.answersArchive = [];
		createMatch.currentAnswer = 0;

		this.props.questionsList.map((item) => {
			if( item.operationIds.indexOf(developedMatch.operationId) != -1){
				createMatch.answersArchive.push(item.answers);
			}
		});

		createMatch.questionsArchive.map((item, index) => {
			if (index == currentId) {
				createMatch.currentQuestion = index;
				developedMatch.questionId = createMatch.questionsArchive[currentId].id;
			}
		});

		this.setState({developedMatch, createMatch}, this.selectChangeAnswers);

	};

	selectChangeAnswers = (e) => {
		let currentId = (e && e.target.value) || this.state.createMatch.currentAnswer;
		let {developedMatch, createMatch} = this.state;

		createMatch.answersArchive[createMatch.currentQuestion].map((item, index) => {

			if (index == currentId) {
				createMatch.currentAnswer = index;
				developedMatch.answerId = Number(item.id);
			}
		});

		this.setState({developedMatch, createMatch});

	};

	selectChangeDocuments = (e) => {
		let {developedMatch, createMatch} = this.state;
		let currentId = (e && e.target.value)  || createMatch.currentDocuments;

		createMatch.documentsArchive = [];
		createMatch.currentDocuments = 0;

		this.props.documentsList.map((document) => {
			if( document.operationIds.indexOf(developedMatch.operationId) != -1){
				createMatch.documentsArchive.push(document);
			}
		});

		createMatch.documentsArchive.map((item, index) => {

			if (index == currentId) {
				createMatch.currentDocuments = index;
				developedMatch.documentId = item.id;
			}
		});

		if (!createMatch.documentsArchive.length) {
			developedMatch.documentId = null;
		}

		this.setState({developedMatch, createMatch});
	};

	render() {
		let {matchesList, operationsList} = this.props;
		let {edit,
			currentMatch,
			developedMatch,
			archiveOfSelectOperations,
			archiveOfSelectDocuments,
			archiveOfSelectQuestions,
			archiveOfSelectAnswers,
			createMatch,
			create,
			errors
		} = this.state;

		return (
			<div>
				<h2>Связи вывода документов</h2>

				<div className="matches">
					<div className="row">
						<div className="col-xs-2"><strong>Операция</strong></div>
						<div className="col-xs-3"><strong>Вопрос</strong></div>
						<div className="col-xs-2"><strong>Ответ</strong></div>
						<div className="col-xs-3"><strong>Документ</strong></div>
						<div className="col-xs-2"></div>
					</div>

					{matchesList.map((match, id) => {

						return (
							<div className="matches-body row" key={id} style={{"borderBottom": "1px solid #ccc"}}>
								<div className="col-xs-2 cell">{archiveOfSelectOperations[match.matcherid] ? archiveOfSelectOperations[match.matcherid].name : "" }</div>
								<div className="col-xs-3 cell">{archiveOfSelectQuestions[match.matcherid] ? archiveOfSelectQuestions[match.matcherid].name : ""}</div>
								<div className="col-xs-2 cell">{archiveOfSelectAnswers[match.matcherid] ? archiveOfSelectAnswers[match.matcherid].name : ''}</div>
								<div className="col-xs-3 cell">

									{(edit && developedMatch.matcherId == match.matcherid)
										? <select onChange={this.selectChangeDocuments} className="form-control">
										{createMatch.documentsArchive.map((item, id) => {
											return (
												<option key={id}
												        value={id}
												        className={(currentMatch=== item.id) ? 'active' : '' }>
													{item.name}
												</option>
											)
										})}
									</select>
										: <span>{archiveOfSelectDocuments[match.matcherid] ? archiveOfSelectDocuments[match.matcherid].name : ''}</span>
									}
								</div>
								<div className="col-xs-2 cell">

									{!create
										? <button type="button" className="btn btn-primary" onClick={this.editMatch.bind(null, id)}>
										Редактировать
									</button>
										: null
									}
								</div>
							</div>
						)
					})}
				</div>

				{create ?
					<div>
						<h2>Создание связи вывода документов</h2>

						Операции
						<select defaultValue={createMatch.currentOperation} onChange={this.selectChangeOperations} className="form-control" >
							{operationsList.map((item, id) => {
								return (
									<option key={id}
									        value={id}
									        className={(createMatch.currentOperation === item.id) ? 'active' : '' }
									>

										{item.name}
									</option>
								)
							})}
						</select>

						Вопрос
						<select disabled={!createMatch.questionsArchive.length}
						        defaultValue={createMatch.currentQuestion}
						        onChange={this.selectChangeQuestions}
						        className="form-control"
						>
							{createMatch.questionsArchive.map((item, id) => {
								return (
									<option key={id}
									        value={id}
									        className={(currentMatch=== item.id) ? 'active' : '' }
									>
										{item.name}
									</option>
								)
							})}
						</select>

						Ответ
						<select disabled={!createMatch.answersArchive.length}
						        onChange={this.selectChangeAnswers}
						        className="form-control"
						        defaultValue={createMatch.currentAnswer}
						>
							{createMatch.answersArchive[createMatch.currentQuestion] &&
							createMatch.answersArchive[createMatch.currentQuestion].map((item, id) => {
								return (
									<option key={id}
									        value={id}
									        className={(currentMatch=== item.id) ? 'active' : '' }
									>
										{item.name}
									</option>
								)
							})}
						</select>

						Документ
						<select disabled={!createMatch.documentsArchive.length}
						        onChange={this.selectChangeDocuments}
						        className="form-control"
						        defaultValue={createMatch.currentDocuments}
						>
							{createMatch.documentsArchive.map((item, id) => {
								return (
									<option key={id}
									        value={id}
									        className={(currentMatch=== item.id) ? 'active' : '' }
									>
										{item.name}
									</option>
								)
							})}
						</select>



						{(errors['match']) ? (
							<div className="clearfix col-xs-12">
								<span className="has-error-text">{errors['match']}</span>
							</div>
						):(null)}


						<div className="bs-example">
							{(developedMatch.matcherId || developedMatch.matcherId === 0) &&
							<button type="button" className="btn btn-danger" onClick={this.deleteMatch}>Удалить</button>
							}

							<button type="button" className="btn " onClick={this.clearState}>Отменить</button>
							<button type="button"
							        className="btn btn-success"
							        onClick={this.saveMatch}
							>
								Сохранить
							</button>
						</div>
					</div>
					: <div className="bs-example">
					<button type="button" className="btn btn-primary" onClick={this.createMatch}>Создать</button>
				</div>
				}
			</div>
		);
	}
}

LiveSituationsMatches.propTypes = {
	operationsList: React.PropTypes.array,
	questionsList: React.PropTypes.array,
	answersList: React.PropTypes.array,
	documentsList: React.PropTypes.array,
};

LiveSituationsMatches.defaultProps = {
	operationsList: [],
	questionsList: [],
	answersList: [],
	documentsList: [],
};

export default LiveSituationsMatches;