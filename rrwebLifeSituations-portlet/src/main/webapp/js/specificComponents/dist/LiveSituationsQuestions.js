define(['exports', 'react', './../../../../../../../common/components/react-filtered-multiselect.min', './LiveSituationsAnswers', 'library'], function (exports, _react, _reactFilteredMultiselect, _LiveSituationsAnswers, _library) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _reactFilteredMultiselect2 = _interopRequireDefault(_reactFilteredMultiselect);

	var _LiveSituationsAnswers2 = _interopRequireDefault(_LiveSituationsAnswers);

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

	var LiveSituationsQuestions = function (_React$Component) {
		_inherits(LiveSituationsQuestions, _React$Component);

		function LiveSituationsQuestions(props) {
			_classCallCheck(this, LiveSituationsQuestions);

			var _this = _possibleConstructorReturn(this, (LiveSituationsQuestions.__proto__ || Object.getPrototypeOf(LiveSituationsQuestions)).call(this, props));

			_this.clearState = function () {
				var onChange = _this.props.onChange;

				_this.setState({
					developedQuestion: {},
					edit: false,
					currentQuestion: 0,
					answersList: [],
					errors: []
				}, function () {
					onChange();
				});
			};

			_this.getAnswerList = function () {
				var currentQuestion = _this.state.currentQuestion;


				lib.getAJAXCall({
					method: 'GET',
					url: lib.urlsLibrary.answer + _this.props.questionsList[currentQuestion].id,
					callback: function callback(answers) {

						_this.setState({
							answersList: answers
						});
					}
				});
			};

			_this.selectChangeQuestion = function (e) {
				var currentId = e.target.value;
				var currentQuestion = void 0;

				_this.props.questionsList.map(function (item, index) {
					if (index == currentId) {
						currentQuestion = index;
					}
				});

				_this.setState({ currentQuestion: currentQuestion });
			};

			_this.createQuestion = function () {
				_this.setState({
					currentQuestion: {},
					developedQuestion: {
						"name": "",
						"objectIds": [],
						"operationIds": [],
						"answers": []
					},
					edit: true
				});
			};

			_this.editQuestion = function () {
				var _this$state = _this.state;
				var currentQuestion = _this$state.currentQuestion;
				var archiveOfSelectObjects = _this$state.archiveOfSelectObjects;
				var archiveOfSelectOperations = _this$state.archiveOfSelectOperations;

				var currentId = _this.props.questionsList[currentQuestion].id;

				lib.getAJAXCall({
					method: 'GET',
					url: lib.urlsLibrary.question + currentId,
					callback: function callback(question) {
						question.objectIds = archiveOfSelectObjects[currentId];
						question.operationIds = archiveOfSelectOperations[currentId];

						_this.setState({
							developedQuestion: question,
							edit: true
						}, _this.getAnswerList);
					}
				});
			};

			_this.saveQuestion = function () {
				var _this$state2 = _this.state;
				var developedQuestion = _this$state2.developedQuestion;
				var answersList = _this$state2.answersList;

				var tests = {
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
					}
				};

				lib.checkValidation(tests, function () {
					if (Object.keys(_this.state.errors).length === 0) {
						var method = 'PUT';

						if (!developedQuestion.id && developedQuestion.id !== 0) {
							method = 'POST';
						}

						developedQuestion.objectIds = developedQuestion.objectIds.map(function (obj) {
							return obj.id;
						});

						developedQuestion.operationIds = developedQuestion.operationIds.map(function (obj) {
							return obj.id;
						});

						developedQuestion.answers = answersList;

						lib.getAJAXCall({
							method: method,
							url: lib.urlsLibrary.question,
							data: developedQuestion,
							callback: _this.clearState
						});
					}
				}, _this);
			};

			_this.deleteQuestion = function () {
				var developedQuestion = _this.state.developedQuestion;

				if (lib.deleteConfirmation()) {
					lib.getAJAXCall({
						method: 'DELETE',
						url: lib.urlsLibrary.question + developedQuestion.id,
						deleteCallback: _this.clearState
					});
				}
			};

			_this.handleDeselectObject = function (index) {
				var developedQuestion = _this.state.developedQuestion;

				var selectedObjects = developedQuestion.objectIds.slice();

				selectedObjects.splice(index, 1);
				developedQuestion.objectIds = selectedObjects;

				_this.setState({ developedQuestion: developedQuestion });
			};

			_this.handleSelectionChangeObject = function (selectedObjects) {
				var developedQuestion = _this.state.developedQuestion;


				developedQuestion.objectIds = selectedObjects;

				_this.setState({ developedQuestion: developedQuestion });
			};

			_this.handleDeselectOperation = function (index) {
				var developedQuestion = _this.state.developedQuestion;

				var selectedObjects = developedQuestion.operationIds.slice();

				selectedObjects.splice(index, 1);
				developedQuestion.operationIds = selectedObjects;

				_this.setState({ developedQuestion: developedQuestion });
			};

			_this.handleSelectionChangeOperation = function (selectedObjects) {
				var developedQuestion = _this.state.developedQuestion;


				developedQuestion.operationIds = selectedObjects;

				_this.setState({ developedQuestion: developedQuestion });
			};

			_this.handleDeselectAnswer = function (index) {
				var answersList = _this.state.answersList;

				var selectedObjects = answersList.slice();

				selectedObjects.splice(index, 1);

				_this.setState({ answersList: selectedObjects });
			};

			_this.saveAnswer = function () {
				var _this$state3 = _this.state;
				var answersList = _this$state3.answersList;
				var tmpAnswer = _this$state3.tmpAnswer;

				var obj = { "name": '' };
				obj.name = tmpAnswer;

				answersList.push(obj);

				_this.setState({ answersList: answersList, tmpAnswer: '' });
			};

			_this.state = {
				edit: false,
				developedQuestion: {},
				currentQuestion: 0,
				answersList: [],
				archiveOfSelectObjects: {},
				archiveOfSelectOperations: {},
				errors: [],
				tmpAnswer: ''
			};
			return _this;
		}

		_createClass(LiveSituationsQuestions, [{
			key: 'componentDidUpdate',
			value: function componentDidUpdate(state) {
				if (state.questionsList != this.props.questionsList) {
					this.setState({
						archiveOfSelectObjects: lib.createArchiveElements(this.props.questionsList, this.props.objectsList, "objectIds"),
						archiveOfSelectOperations: lib.createArchiveElements(this.props.questionsList, this.props.operationsList, "operationIds")
					});
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var _props = this.props;
				var questionsList = _props.questionsList;
				var objectsList = _props.objectsList;
				var operationsList = _props.operationsList;
				var _state = this.state;
				var currentQuestion = _state.currentQuestion;
				var edit = _state.edit;
				var developedQuestion = _state.developedQuestion;
				var answersList = _state.answersList;
				var tmpAnswer = _state.tmpAnswer;
				var errors = _state.errors;


				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'h2',
						null,
						'Вопросы'
					),
					!edit ? _react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'select',
							{ onChange: this.selectChangeQuestion, className: 'form-control' },
							questionsList.map(function (item, id) {
								return _react2.default.createElement(
									'option',
									{ key: id,
										value: id,
										className: currentQuestion === item ? 'active' : '' },
									item.name
								);
							})
						),
						_react2.default.createElement(
							'div',
							{ className: 'bs-example' },
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-primary', onClick: this.editQuestion },
								'Редактировать'
							),
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-primary', onClick: this.createQuestion },
								'Создать'
							)
						)
					) : _react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'label',
							{ className: 'row' },
							_react2.default.createElement(
								'p',
								{ className: 'col-xs-12' },
								'Название:'
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-xs-12' },
								_react2.default.createElement('input', { className: 'form-control',
									value: developedQuestion.name,
									onChange: function onChange(e) {
										var obj = developedQuestion;
										obj.name = e.target.value;

										_this2.setState({ developedQuestion: obj });
									}
								})
							),
							errors['name'] ? _react2.default.createElement(
								'div',
								{ className: 'clearfix col-xs-12' },
								_react2.default.createElement(
									'span',
									{ className: 'has-error-text' },
									errors['name']
								)
							) : null
						),
						_react2.default.createElement(
							'div',
							{ className: 'row' },
							_react2.default.createElement(
								'p',
								{ className: 'col-xs-12' },
								'Относится к объектам:'
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-xs-5' },
								_react2.default.createElement(_reactFilteredMultiselect2.default, {
									onChange: this.handleSelectionChangeObject,
									options: objectsList,
									selectedOptions: developedQuestion.objectIds,
									textProp: 'name',
									valueProp: 'id',
									buttonText: 'Выбрать',
									classNames: {
										button: "btn btn btn-block btn-default",
										buttonActive: "btn btn btn-block btn-primary",
										filter: "form-control",
										select: "form-control"
									}
								})
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-xs-5' },
								developedQuestion.objectIds.length === 0 && _react2.default.createElement(
									'p',
									null,
									'(ничего не выбрано)'
								),
								developedQuestion.objectIds.length > 0 && _react2.default.createElement(
									'ol',
									null,
									developedQuestion.objectIds.map(function (object, i) {
										return _react2.default.createElement(
											'li',
											{ key: i },
											object.name + ' ',
											_react2.default.createElement(
												'span',
												{ style: { cursor: "pointer" }, onClick: _this2.handleDeselectObject.bind(null, i) },
												'×'
											)
										);
									})
								)
							),
							errors['objectIds'] ? _react2.default.createElement(
								'div',
								{ className: 'clearfix col-xs-12' },
								_react2.default.createElement(
									'span',
									{ className: 'has-error-text' },
									errors['objectIds']
								)
							) : null
						),
						_react2.default.createElement(
							'div',
							{ className: 'row' },
							_react2.default.createElement(
								'p',
								{ className: 'col-xs-12' },
								'Относится к операциям:'
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-xs-5' },
								_react2.default.createElement(_reactFilteredMultiselect2.default, {
									onChange: this.handleSelectionChangeOperation,
									options: operationsList,
									selectedOptions: developedQuestion.operationIds,
									textProp: 'name',
									valueProp: 'id',
									buttonText: 'Выбрать',
									classNames: {
										button: "btn btn btn-block btn-default",
										buttonActive: "btn btn btn-block btn-primary",
										filter: "form-control",
										select: "form-control"
									}
								})
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-xs-5' },
								developedQuestion.operationIds.length === 0 && _react2.default.createElement(
									'p',
									null,
									'(ничего не выбрано)'
								),
								developedQuestion.operationIds.length > 0 && _react2.default.createElement(
									'ol',
									null,
									developedQuestion.operationIds.map(function (object, i) {
										return _react2.default.createElement(
											'li',
											{ key: i },
											object.name + ' ',
											_react2.default.createElement(
												'span',
												{ style: { cursor: "pointer" }, onClick: _this2.handleDeselectOperation.bind(null, i) },
												'×'
											)
										);
									})
								)
							),
							errors['operationIds'] ? _react2.default.createElement(
								'div',
								{ className: 'clearfix col-xs-12' },
								_react2.default.createElement(
									'span',
									{ className: 'has-error-text' },
									errors['operationIds']
								)
							) : null
						),
						_react2.default.createElement(
							'h3',
							null,
							'Ответы'
						),
						developedQuestion.id || developedQuestion.id == 0 ? _react2.default.createElement(_LiveSituationsAnswers2.default, {
							answersList: answersList,
							currentQuestion: developedQuestion,
							onChange: this.getAnswerList
						}) : _react2.default.createElement(
							'div',
							null,
							answersList.map(function (answer, id) {

								return _react2.default.createElement(
									'p',
									{ key: id },
									answer.name + ' ',
									_react2.default.createElement(
										'span',
										{ style: { cursor: "pointer" }, onClick: _this2.handleDeselectAnswer.bind(null, id) },
										'×'
									)
								);
							}),
							_react2.default.createElement(
								'label',
								null,
								_react2.default.createElement('input', { type: 'text',
									className: 'form-control',
									value: tmpAnswer,
									onChange: function onChange(e) {
										_this2.setState({ tmpAnswer: e.target.value });
									}
								}),
								errors['answersList'] ? _react2.default.createElement(
									'div',
									{ className: 'clearfix col-xs-12' },
									_react2.default.createElement(
										'span',
										{ className: 'has-error-text' },
										errors['answersList']
									)
								) : null,
								_react2.default.createElement(
									'button',
									{ disabled: !tmpAnswer.length, type: 'button', className: 'btn btn-success', onClick: this.saveAnswer },
									'Добавить'
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'bs-example' },
							(developedQuestion.id || developedQuestion.id === 0) && _react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-danger', onClick: this.deleteQuestion },
								'Удалить'
							),
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn ', onClick: this.clearState },
								'Отменить'
							),
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-success', onClick: this.saveQuestion },
								'Сохранить'
							)
						)
					)
				);
			}
		}]);

		return LiveSituationsQuestions;
	}(_react2.default.Component);

	LiveSituationsQuestions.propTypes = {
		objectsList: _react2.default.PropTypes.array,
		operationsList: _react2.default.PropTypes.array,
		questionsList: _react2.default.PropTypes.array
	};

	LiveSituationsQuestions.defaultProps = {
		objectsList: [],
		operationsList: [],
		questionsList: []
	};

	exports.default = LiveSituationsQuestions;
});