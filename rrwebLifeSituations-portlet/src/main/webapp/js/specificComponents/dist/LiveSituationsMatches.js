define(['exports', 'react', 'library'], function (exports, _react, _library) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _library2 = _interopRequireDefault(_library);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var lib = _library2.default.lib;

	var LiveSituationsMatches = function (_React$Component) {
		_inherits(LiveSituationsMatches, _React$Component);

		function LiveSituationsMatches(props) {
			_classCallCheck(this, LiveSituationsMatches);

			var _this = _possibleConstructorReturn(this, (LiveSituationsMatches.__proto__ || Object.getPrototypeOf(LiveSituationsMatches)).call(this, props));

			_this.clearState = function () {
				var onChange = _this.props.onChange;

				_this.setState({
					developedMatch: {},
					edit: false,
					create: false,
					documentsArchive: [],
					createMatch: {},
					errors: []
				}, function () {
					onChange();
				});
			};

			_this.createMatch = function () {
				_this.setState({
					currentMatch: {},
					developedMatch: {
						"documentId": null,
						"operationId": null,
						"questionId": null,
						"answerId": null
					},
					createMatch: {
						currentOperation: 0,
						currentQuestion: 0,
						currentAnswer: 0,
						currentDocuments: 0,
						questionsArchive: [],
						answersArchive: [],
						documentsArchive: []
					},
					create: true
				}, _this.selectChangeOperations);
			};

			_this.editMatch = function (index) {
				var currentMatch = _this.props.matchesList[index];
				var createMatch = {
					currentOperation: 0,
					currentQuestion: 0,
					currentAnswer: 0,
					currentDocuments: 0,
					questionsArchive: [],
					answersArchive: [],
					documentsArchive: []
				};

				lib.getAJAXCall({
					method: 'GET',
					url: lib.urlsLibrary.match + "id/" + currentMatch.matcherid,
					callback: function callback(match) {
						_this.props.questionsList.map(function (item, id) {
							if (item.operationIds.indexOf(match.operationId) != -1) {
								createMatch.questionsArchive.push(item);
								createMatch.answersArchive.push(item.answers);
							}
						});

						_this.props.documentsList.map(function (document) {
							if (document.operationIds.indexOf(match.operationId) != -1) {
								createMatch.documentsArchive.push(document);
							}
						});

						_this.props.operationsList.map(function (item, id) {
							if (item.id == match.operationId) {
								createMatch.currentOperation = id;
							}
						});

						createMatch.questionsArchive.map(function (item, id) {
							if (item.id == match.questionId) {
								createMatch.currentQuestion = id;

								item.answers.map(function (item, id) {
									if (item.id == match.answerId) {
										createMatch.currentAnswer = id;
									}
								});
							}
						});

						createMatch.documentsArchive.map(function (item, id) {
							if (item.id == match.documentId) {
								createMatch.currentDocuments = id;
							}
						});

						_this.setState({
							developedMatch: match,
							create: true,
							createMatch: createMatch
						});
					}
				});
			};

			_this.saveMatch = function () {
				var _this$state = _this.state;
				var developedMatch = _this$state.developedMatch;
				var createMatch = _this$state.createMatch;

				var tests = {
					match: {
						approve: developedMatch.documentId == null || developedMatch.questionId == null || developedMatch.answerId == null,
						descr: "К документу должны быть привязаны операции и ответы на вопросы"
					}
				};

				lib.checkValidation(tests, function () {
					if (Object.keys(_this.state.errors).length === 0) {
						var method = 'PUT';

						if (!developedMatch.matcherId && developedMatch.matcherId !== 0) {
							method = 'POST';
						}

						lib.getAJAXCall({
							method: method,
							url: lib.urlsLibrary.match,
							data: developedMatch,
							callback: _this.clearState
						});
					}
				}, _this);
			};

			_this.deleteMatch = function () {
				var developedMatch = _this.state.developedMatch;

				if (lib.deleteConfirmation()) {
					lib.getAJAXCall({
						method: 'DELETE',
						url: lib.urlsLibrary.match + developedMatch.matcherId,
						deleteCallback: _this.clearState
					});
				}
			};

			_this.selectChangeOperations = function (e) {
				var currentId = e && e.target.value || _this.state.createMatch.currentOperation;
				var _this$state2 = _this.state;
				var developedMatch = _this$state2.developedMatch;
				var createMatch = _this$state2.createMatch;


				createMatch.questionsArchive = [];
				createMatch.currentQuestion = 0;
				createMatch.answersArchive = [];
				createMatch.currentAnswer = 0;
				createMatch.documentsArchive = [];
				createMatch.currentDocuments = 0;

				_this.setState({ createMatch: createMatch });

				developedMatch.operationId = _this.props.operationsList[currentId].id;

				_this.props.operationsList.map(function (item, index) {
					if (index == currentId) {
						createMatch.currentOperation = index;
					}
				});

				_this.props.questionsList.map(function (item) {
					if (item.operationIds.indexOf(developedMatch.operationId) != -1) {
						createMatch.questionsArchive.push(item);
					}
				});

				if (createMatch.questionsArchive[createMatch.currentQuestion]) {
					developedMatch.questionId = createMatch.questionsArchive[createMatch.currentQuestion].id;
				} else {
					developedMatch.questionId = null;
					developedMatch.answerId = null;
				}

				_this.setState({ developedMatch: developedMatch, createMatch: createMatch }, function () {
					_this.selectChangeDocuments();

					if (createMatch.questionsArchive[createMatch.currentQuestion]) {
						_this.selectChangeQuestions();
					}
				});
			};

			_this.selectChangeQuestions = function (e) {
				var currentId = e && e.target.value || _this.state.createMatch.currentQuestion;
				var _this$state3 = _this.state;
				var developedMatch = _this$state3.developedMatch;
				var createMatch = _this$state3.createMatch;


				createMatch.answersArchive = [];
				createMatch.currentAnswer = 0;

				_this.props.questionsList.map(function (item) {
					if (item.operationIds.indexOf(developedMatch.operationId) != -1) {
						createMatch.answersArchive.push(item.answers);
					}
				});

				createMatch.questionsArchive.map(function (item, index) {
					if (index == currentId) {
						createMatch.currentQuestion = index;
						developedMatch.questionId = createMatch.questionsArchive[currentId].id;
					}
				});

				_this.setState({ developedMatch: developedMatch, createMatch: createMatch }, _this.selectChangeAnswers);
			};

			_this.selectChangeAnswers = function (e) {
				var currentId = e && e.target.value || _this.state.createMatch.currentAnswer;
				var _this$state4 = _this.state;
				var developedMatch = _this$state4.developedMatch;
				var createMatch = _this$state4.createMatch;


				createMatch.answersArchive[createMatch.currentQuestion].map(function (item, index) {

					if (index == currentId) {
						createMatch.currentAnswer = index;
						developedMatch.answerId = Number(item.id);
					}
				});

				_this.setState({ developedMatch: developedMatch, createMatch: createMatch });
			};

			_this.selectChangeDocuments = function (e) {
				var _this$state5 = _this.state;
				var developedMatch = _this$state5.developedMatch;
				var createMatch = _this$state5.createMatch;

				var currentId = e && e.target.value || createMatch.currentDocuments;

				createMatch.documentsArchive = [];
				createMatch.currentDocuments = 0;

				_this.props.documentsList.map(function (document) {
					if (document.operationIds.indexOf(developedMatch.operationId) != -1) {
						createMatch.documentsArchive.push(document);
					}
				});

				createMatch.documentsArchive.map(function (item, index) {

					if (index == currentId) {
						createMatch.currentDocuments = index;
						developedMatch.documentId = item.id;
					}
				});

				if (!createMatch.documentsArchive.length) {
					developedMatch.documentId = null;
				}

				_this.setState({ developedMatch: developedMatch, createMatch: createMatch });
			};

			_this.state = {
				edit: false,
				create: false,
				developedMatch: {},
				archiveOfSelectOperations: {},
				archiveOfSelectDocuments: {},
				archiveOfSelectQuestions: {},
				archiveOfSelectAnswers: {},
				currentMatch: 0,
				documentsArchive: [],
				createMatch: {},
				errors: []
			};
			return _this;
		}

		_createClass(LiveSituationsMatches, [{
			key: 'componentDidUpdate',
			value: function componentDidUpdate(state) {
				if (state.matchesList != this.props.matchesList || state.operationsList != this.props.operationsList || state.documentsList != this.props.documentsList || state.questionsList != this.props.questionsList || state.answersList != this.props.answersList) {
					this.setState({
						archiveOfSelectOperations: lib.createArchiveElementsMatcher(this.props.matchesList, this.props.operationsList, "operationid"),
						archiveOfSelectDocuments: lib.createArchiveElementsMatcher(this.props.matchesList, this.props.documentsList, "documentid"),
						archiveOfSelectQuestions: lib.createArchiveElementsMatcher(this.props.matchesList, this.props.questionsList, "questionid"),
						archiveOfSelectAnswers: lib.createArchiveElementsMatcher(this.props.matchesList, this.props.answersList, "answerid")
					});
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var _props = this.props;
				var matchesList = _props.matchesList;
				var operationsList = _props.operationsList;
				var _state = this.state;
				var edit = _state.edit;
				var currentMatch = _state.currentMatch;
				var developedMatch = _state.developedMatch;
				var archiveOfSelectOperations = _state.archiveOfSelectOperations;
				var archiveOfSelectDocuments = _state.archiveOfSelectDocuments;
				var archiveOfSelectQuestions = _state.archiveOfSelectQuestions;
				var archiveOfSelectAnswers = _state.archiveOfSelectAnswers;
				var createMatch = _state.createMatch;
				var create = _state.create;
				var errors = _state.errors;


				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'h2',
						null,
						'Связи вывода документов'
					),
					_react2.default.createElement(
						'div',
						{ className: 'matches' },
						_react2.default.createElement(
							'div',
							{ className: 'row' },
							_react2.default.createElement(
								'div',
								{ className: 'col-xs-2' },
								_react2.default.createElement(
									'strong',
									null,
									'Операция'
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-xs-3' },
								_react2.default.createElement(
									'strong',
									null,
									'Вопрос'
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-xs-2' },
								_react2.default.createElement(
									'strong',
									null,
									'Ответ'
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-xs-3' },
								_react2.default.createElement(
									'strong',
									null,
									'Документ'
								)
							),
							_react2.default.createElement('div', { className: 'col-xs-2' })
						),
						matchesList.map(function (match, id) {

							return _react2.default.createElement(
								'div',
								{ className: 'matches-body row', key: id, style: { "borderBottom": "1px solid #ccc" } },
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-2 cell' },
									archiveOfSelectOperations[match.matcherid] ? archiveOfSelectOperations[match.matcherid].name : ""
								),
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-3 cell' },
									archiveOfSelectQuestions[match.matcherid] ? archiveOfSelectQuestions[match.matcherid].name : ""
								),
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-2 cell' },
									archiveOfSelectAnswers[match.matcherid] ? archiveOfSelectAnswers[match.matcherid].name : ''
								),
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-3 cell' },
									edit && developedMatch.matcherId == match.matcherid ? _react2.default.createElement(
										'select',
										{ onChange: _this2.selectChangeDocuments, className: 'form-control' },
										createMatch.documentsArchive.map(function (item, id) {
											return _react2.default.createElement(
												'option',
												{ key: id,
													value: id,
													className: currentMatch === item.id ? 'active' : '' },
												item.name
											);
										})
									) : _react2.default.createElement(
										'span',
										null,
										archiveOfSelectDocuments[match.matcherid] ? archiveOfSelectDocuments[match.matcherid].name : ''
									)
								),
								_react2.default.createElement(
									'div',
									{ className: 'col-xs-2 cell' },
									!create ? _react2.default.createElement(
										'button',
										{ type: 'button', className: 'btn btn-primary', onClick: _this2.editMatch.bind(null, id) },
										'Редактировать'
									) : null
								)
							);
						})
					),
					create ? _react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'h2',
							null,
							'Создание связи вывода документов'
						),
						'Операции',
						_react2.default.createElement(
							'select',
							{ defaultValue: createMatch.currentOperation, onChange: this.selectChangeOperations, className: 'form-control' },
							operationsList.map(function (item, id) {
								return _react2.default.createElement(
									'option',
									{ key: id,
										value: id,
										className: createMatch.currentOperation === item.id ? 'active' : ''
									},
									item.name
								);
							})
						),
						'Вопрос',
						_react2.default.createElement(
							'select',
							{ disabled: !createMatch.questionsArchive.length,
								defaultValue: createMatch.currentQuestion,
								onChange: this.selectChangeQuestions,
								className: 'form-control'
							},
							createMatch.questionsArchive.map(function (item, id) {
								return _react2.default.createElement(
									'option',
									{ key: id,
										value: id,
										className: currentMatch === item.id ? 'active' : ''
									},
									item.name
								);
							})
						),
						'Ответ',
						_react2.default.createElement(
							'select',
							{ disabled: !createMatch.answersArchive.length,
								onChange: this.selectChangeAnswers,
								className: 'form-control',
								defaultValue: createMatch.currentAnswer
							},
							createMatch.answersArchive[createMatch.currentQuestion] && createMatch.answersArchive[createMatch.currentQuestion].map(function (item, id) {
								return _react2.default.createElement(
									'option',
									{ key: id,
										value: id,
										className: currentMatch === item.id ? 'active' : ''
									},
									item.name
								);
							})
						),
						'Документ',
						_react2.default.createElement(
							'select',
							{ disabled: !createMatch.documentsArchive.length,
								onChange: this.selectChangeDocuments,
								className: 'form-control',
								defaultValue: createMatch.currentDocuments
							},
							createMatch.documentsArchive.map(function (item, id) {
								return _react2.default.createElement(
									'option',
									{ key: id,
										value: id,
										className: currentMatch === item.id ? 'active' : ''
									},
									item.name
								);
							})
						),
						errors['match'] ? _react2.default.createElement(
							'div',
							{ className: 'clearfix col-xs-12' },
							_react2.default.createElement(
								'span',
								{ className: 'has-error-text' },
								errors['match']
							)
						) : null,
						_react2.default.createElement(
							'div',
							{ className: 'bs-example' },
							(developedMatch.matcherId || developedMatch.matcherId === 0) && _react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-danger', onClick: this.deleteMatch },
								'Удалить'
							),
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn ', onClick: this.clearState },
								'Отменить'
							),
							_react2.default.createElement(
								'button',
								{ type: 'button',
									className: 'btn btn-success',
									onClick: this.saveMatch
								},
								'Сохранить'
							)
						)
					) : _react2.default.createElement(
						'div',
						{ className: 'bs-example' },
						_react2.default.createElement(
							'button',
							{ type: 'button', className: 'btn btn-primary', onClick: this.createMatch },
							'Создать'
						)
					)
				);
			}
		}]);

		return LiveSituationsMatches;
	}(_react2.default.Component);

	LiveSituationsMatches.propTypes = {
		operationsList: _react2.default.PropTypes.array,
		questionsList: _react2.default.PropTypes.array,
		answersList: _react2.default.PropTypes.array,
		documentsList: _react2.default.PropTypes.array
	};

	LiveSituationsMatches.defaultProps = {
		operationsList: [],
		questionsList: [],
		answersList: [],
		documentsList: []
	};

	exports.default = LiveSituationsMatches;
});