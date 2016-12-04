define('library',["exports", "react"], function (exports, _react) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var getAJAXCall = function getAJAXCall(_ref) {
		var method = _ref.method;
		var data = _ref.data;
		var url = _ref.url;
		var deleteCallback = _ref.deleteCallback;
		var callback = _ref.callback;

		$.ajax({
			type: method,
			url: url,
			data: JSON.stringify(data),
			success: callback,
			contentType: "application/json",
			statusCode: deleteCallback && {
				200: deleteCallback
			}
		});
	};

	var createArchiveElements = function createArchiveElements(source, compare, optionByCompare) {
		var archive = {};

		source.map(function (item) {
			var archiveOfItems = [];

			item[optionByCompare] = item[optionByCompare] || [];

			item[optionByCompare].map(function (id) {
				compare.map(function (compareElement) {
					if (id == compareElement.id) {
						archiveOfItems.push(compareElement);
					}
				});
			});

			archive[item.id] = archiveOfItems;
		});

		return archive;
	};

	var createArchiveElementsMatcher = function createArchiveElementsMatcher(source, compare, optionByCompare) {
		var archive = {};

		source.map(function (item) {
			var id = item[optionByCompare];

			compare.map(function (compareElement) {
				if (id == compareElement.id) {
					archive[item.matcherid] = compareElement;
				}
			});
		});

		return archive;
	};

	var checkValidation = function checkValidation(tests, callback, that) {
		var result = {};

		for (var key in tests) {
			if (tests[key]["approve"]) {
				result[key] = tests[key]["descr"];
			}
		}

		that.setState({
			errors: result
		}, callback);
	};

	var deleteConfirmation = function deleteConfirmation() {
		return confirm('Подтверждение удаления');
	};

	var urlsLibrary = {
		contacts: '/rest-service/api/contacts/by/',
		region: '/rest-service/api/contacts/region',
		object: '/rest-service/api/object/',
		operation: '/rest-service/api/operation/',
		answer: '/rest-service/api/answer/',
		question: '/rest-service/api/question/',
		standard: '/rest-service/api/standard/',
		document: '/rest-service/api/document/',
		match: '/rest-service/api/match/',
		theme: '/rest-service/api/theme/',
		faq: '/rest-service/api/faq/'

	};

	exports.default = {
		lib: {
			getAJAXCall: getAJAXCall,
			createArchiveElements: createArchiveElements,
			createArchiveElementsMatcher: createArchiveElementsMatcher,
			checkValidation: checkValidation,
			deleteConfirmation: deleteConfirmation,
			urlsLibrary: urlsLibrary
		}
	};
});
require(["library"], function () {});
define('rrwebLifeSituations-portlet',['react', 'react-dom', 'library'], function (_react, _reactDom, _library) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _reactDom2 = _interopRequireDefault(_reactDom);

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

	var LiveSituations = function (_React$Component) {
		_inherits(LiveSituations, _React$Component);

		function LiveSituations(props) {
			_classCallCheck(this, LiveSituations);

			var _this = _possibleConstructorReturn(this, (LiveSituations.__proto__ || Object.getPrototypeOf(LiveSituations)).call(this, props));

			_this.state = {
				defaultOperations: 'Выбрать операцию',
				openOperations: false, //открыт ли дропдаун операций
				changeObject: true, //нажал ли кто на другой обьект
				getObjectsList: [],
				getOperationsList: [],
				currentObject: {},
				currentOperation: {}
			};
			return _this;
		}

		_createClass(LiveSituations, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var _this2 = this;

				lib.getAJAXCall({
					method: 'GET',
					url: lib.urlsLibrary.object,
					callback: function callback(getObjects) {
						var getObjectsList = getObjects.map(function (item) {
							return {
								id: item.id,
								img: item.img,
								name: item.name
							};
						});
						_this2.setState({
							getObjectsList: getObjectsList,
							currentObject: getObjectsList[0].id
						});
					}
				});

				lib.getAJAXCall({
					method: 'GET',
					url: lib.urlsLibrary.operation,
					callback: function callback(getOperations) {
						var getOperationsList = getOperations.map(function (item) {
							return {
								id: item.id,
								name: item.name,
								category: item.category,
								objectIds: item.objectIds
							};
						});
						_this2.setState({
							getOperationsList: getOperationsList
						});
					}
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;

				var _state = this.state;
				var getOperationsList = _state.getOperationsList;
				var getObjectsList = _state.getObjectsList;
				var currentObject = _state.currentObject;
				var currentOperation = _state.currentOperation;
				var openOperations = _state.openOperations;
				var defaultOperations = _state.defaultOperations;
				var changeObject = _state.changeObject;


				return _react2.default.createElement(
					'div',
					{ className: 'container ng-scope' },
					_react2.default.createElement(
						'div',
						{ className: 'column_2' },
						_react2.default.createElement(
							'div',
							{ className: 'column_2_1' },
							_react2.default.createElement(
								'div',
								{ className: 'step_title' },
								'1. Выберите объект'
							),
							_react2.default.createElement(
								'div',
								{ className: 'step_description' },
								'операцию по которому вы планируете совершить'
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'column_2_2' },
							_react2.default.createElement(
								'div',
								{ className: 'step_title' },
								'2. Выберите операцию'
							),
							_react2.default.createElement(
								'div',
								{ className: 'step_description' },
								'которую вы планируете совершить'
							)
						),
						_react2.default.createElement('div', { className: 'clear' })
					),
					_react2.default.createElement(
						'div',
						{ className: 'column_3' },
						_react2.default.createElement(
							'div',
							{ className: 'column_3_1' },
							_react2.default.createElement(
								'div',
								{ id: 'choose_object', className: 'box shadow' },
								_react2.default.createElement(
									'div',
									{ id: 'interior_border-choose_object', className: 'box' },
									_react2.default.createElement(
										'ul',
										{ className: 'nav nav-list' },
										getObjectsList.map(function (item) {
											return _react2.default.createElement(
												'li',
												{ key: item.id, className: currentObject == item.id ? "ng-scope active" : "ng-scope" },
												_react2.default.createElement(
													'a',
													{ id: item.id, className: 'ng-binding',
														onClick: function onClick(event) {
															_this3.setState({
																currentObject: parseInt(event.target.id),
																changeObject: true,
																openOperations: false
															});
														}
													},
													item.name
												)
											);
										})
									)
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'column_3_2' },
							_react2.default.createElement(
								'div',
								{ id: 'choose_operation' },
								_react2.default.createElement(
									'div',
									{ className: 'sbHolder ng-isolate-scope' },
									_react2.default.createElement('a', { className: openOperations ? "sbToggle sbToggleOpen" : "sbToggle" }),
									_react2.default.createElement(
										'a',
										{ className: 'sbSelector ng-binding',
											onClick: function onClick() {
												_this3.setState({ openOperations: true });
											}
										},
										changeObject ? defaultOperations : getOperationsList.map(function (item) {
											if (item.id == currentOperation) return item.name;
										})
									),
									openOperations ? _react2.default.createElement(
										'ul',
										{ className: 'sbOptions ng-hide' },
										_react2.default.createElement(
											'li',
											{ className: 'ng-scope' },
											_react2.default.createElement(
												'a',
												{ href: '#', className: 'sbSub ng-binding' },
												'Выбрать операцию'
											)
										),
										_react2.default.createElement(
											'li',
											{ className: 'ng-scope' },
											_react2.default.createElement(
												'ul',
												{ className: 'sbSubOptions' },
												_react2.default.createElement(
													'span',
													{ className: 'sbGroup ng-binding' },
													'Регистрация прав:'
												),
												getOperationsList.map(function (item) {
													if (item.objectIds) {
														if (item.category == 1 && item.objectIds.indexOf(currentObject) != -1) {
															return _react2.default.createElement(
																'li',
																{ key: item.id, className: 'ng-scope' },
																_react2.default.createElement(
																	'a',
																	{ id: item.id, className: 'sbSub ng-binding',
																		onClick: function onClick(event) {
																			_this3.setState({
																				changeObject: false,
																				openOperations: false,
																				currentOperation: parseInt(event.target.id)
																			});
																		}
																	},
																	item.name
																)
															);
														}
													}
												})
											)
										),
										_react2.default.createElement(
											'li',
											{ className: 'ng-scope' },
											_react2.default.createElement(
												'ul',
												{ className: 'sbSubOptions' },
												_react2.default.createElement(
													'span',
													{ className: 'sbGroup ng-binding' },
													'Кадастровый учёт:'
												),
												getOperationsList.map(function (item) {
													if (item.objectIds) {
														if (item.category == 0 && item.objectIds.indexOf(currentObject) != -1) {
															return _react2.default.createElement(
																'li',
																{ key: item.id, className: 'ng-scope' },
																_react2.default.createElement(
																	'a',
																	{ id: item.id, className: 'sbSub ng-binding',
																		onClick: function onClick(event) {
																			_this3.setState({
																				changeObject: false,
																				openOperations: false,
																				currentOperation: parseInt(event.target.id)
																			});
																		}
																	},
																	item.name
																)
															);
														}
													}
												})
											)
										)
									) : null
								)
							),
							_react2.default.createElement(
								'div',
								{ id: 'illustration' },
								_react2.default.createElement('img', { src: '/rrwebLifeSituations-portlet/images/step_1.png', alt: 'home' })
							),
							_react2.default.createElement(
								'div',
								{ className: 'instruction' },
								'Для начала выберите объект! имущества и вид операции по нему'
							),
							_react2.default.createElement(
								'button',
								{ className: 'doc_prepare',
									onClick: function onClick() {
										if (currentOperation >= 0) {
											_reactDom2.default.render(_react2.default.createElement(RegistrationRight, {
												currentObject: currentObject,
												currentOperation: currentOperation,
												getObjectsList: getObjectsList,
												getOperationsList: getOperationsList
											}), document.getElementById('container'));
										}
									} },
								'Подготовить документы'
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'column_4' },
						_react2.default.createElement(
							'div',
							{ className: 'column_4_1' },
							_react2.default.createElement(
								'div',
								{ className: 'consultation ng-binding' },
								'Если Вашего случая здесь нет — ',
								_react2.default.createElement('br', null),
								'получите консультацию по номеру:',
								_react2.default.createElement('br', null),
								'8 (800) 100 34 34'
							)
						)
					),
					_react2.default.createElement('div', { className: 'clear' })
				);
			}
		}]);

		return LiveSituations;
	}(_react2.default.Component);

	var

	/*---------------------------------RegistrationRight-----step2-----------------------*/
	/*---------------------------------RegistrationRight-----step2-----------------------*/

	RegistrationRight = function (_React$Component2) {
		_inherits(RegistrationRight, _React$Component2);

		function RegistrationRight(props) {
			_classCallCheck(this, RegistrationRight);

			var _this4 = _possibleConstructorReturn(this, (RegistrationRight.__proto__ || Object.getPrototypeOf(RegistrationRight)).call(this, props));

			_this4.addDocument = function (questionId, answerId) {
				var state = _this4.state,
				    scopeQuestion = state.questionArr,
				    scopeAnswer = state.answerArr,
				    idArrQuestion = scopeQuestion.indexOf(questionId); //номер вопроса в массиве всех вопросов

				if (idArrQuestion != -1) {
					scopeQuestion[idArrQuestion] = questionId;
					scopeAnswer[idArrQuestion] = answerId;
				} else {
					scopeQuestion.push(questionId);
					scopeAnswer.push(answerId);
				}

				lib.getAJAXCall({
					method: 'GET',
					url: lib.urlsLibrary.match + state.currentOperation + '/' + scopeQuestion.join(',') + '/' + scopeAnswer.join(','),
					callback: function callback(object) {
						_this4.setState({
							currentDocumentsList: object,
							questionArr: scopeQuestion,
							answerArr: scopeAnswer
						});
					}
				});
			};

			_this4.topPage = function () {
				$("html, body").animate({ scrollTop: 0 }, "slow");
				return false;
			};

			_this4.state = {
				getStandardsList: [],
				getQuestionsList: [],
				currentDocumentsList: [],
				currentQuestions: [],
				currentDocuments: [],
				currentStandard: {},

				questionArr: [],
				answerArr: [],

				currentObject: _this4.props.currentObject,
				currentOperation: _this4.props.currentOperation,
				getObjectsList: _this4.props.getObjectsList,
				getOperationsList: _this4.props.getOperationsList
			};
			return _this4;
		}

		_createClass(RegistrationRight, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var _this5 = this;

				var currentObject = this.props.currentObject,
				    currentOperation = this.props.currentOperation;

				lib.getAJAXCall({
					method: 'GET',
					url: lib.urlsLibrary.standard,
					callback: function callback(getStandards) {
						var getStandardsList = getStandards.filter(function (item) {
							var returnThis = void 0,
							    curOper = currentOperation;

							if (item.operationIds) {
								item.operationIds.map(function (el) {
									if (el == curOper) {
										returnThis = true;
										if (item.objectIds) {
											returnThis = item.objectIds.indexOf(currentObject) != -1;
										}
									}
								});

								if (returnThis) {
									return {
										id: item.id,
										link: item.link,
										description: item.description,
										maxtime: item.maxtime,
										paymentTitle: item.paymentTitle,
										paymentPrivate: item.paymentPrivate,
										paymentLegal: item.paymentLegal,
										operationIds: item.operationIds,
										objectIds: item.objectIds
									};
								}
							}
						});
						_this5.setState({
							getStandardsList: getStandardsList,
							currentStandard: getStandardsList[0]
						});
					}
				});

				lib.getAJAXCall({
					method: 'GET',
					url: lib.urlsLibrary.question,
					callback: function callback(getQuestions) {
						var getQuestionsList = getQuestions.filter(function (item) {
							var returnThis = void 0,
							    curOper = currentOperation;

							if (item.operationIds) {
								item.operationIds.map(function (el) {
									if (el === curOper) {
										returnThis = true;
										if (item.objectIds) {
											returnThis = item.objectIds.indexOf(currentObject) != -1;
										}
									}
								});

								if (returnThis) {
									return {
										id: item.id,
										name: item.name,
										answers: item.answers,
										objectIds: item.objectIds,
										operationIds: item.operationIds
									};
								}
							}
						});
						_this5.setState({
							getQuestionsList: getQuestionsList
						});
					}
				});

				lib.getAJAXCall({
					method: 'GET',
					url: lib.urlsLibrary.match + currentOperation,
					callback: function callback(object) {
						_this5.setState({
							currentDocumentsList: object
						});
					}
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var _this6 = this;

				var _state2 = this.state;
				var getOperationsList = _state2.getOperationsList;
				var getObjectsList = _state2.getObjectsList;
				var getQuestionsList = _state2.getQuestionsList;
				var currentObject = _state2.currentObject;
				var currentOperation = _state2.currentOperation;
				var currentStandard = _state2.currentStandard;
				var currentDocumentsList = _state2.currentDocumentsList;


				return _react2.default.createElement(
					'div',
					{ className: 'content column_5 ng-scope' },
					_react2.default.createElement(
						'div',
						{ className: 'column_5_1' },
						_react2.default.createElement(
							'div',
							{ id: 'registration' },
							'Регистрация прав'
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'column_5_2' },
						_react2.default.createElement(
							'div',
							{ className: 'consultation ng-binding' },
							'Если Вашего случая здесь нет — ',
							_react2.default.createElement('br', null),
							'получите консультацию по номеру:',
							_react2.default.createElement('br', null),
							'8 (800) 100 34 34'
						)
					),
					_react2.default.createElement('div', { className: 'clear' }),
					_react2.default.createElement(
						'div',
						{ className: 'main_form box shadow' },
						_react2.default.createElement(
							'div',
							{ className: 'column_5_3 ng-scope' },
							currentStandard && _react2.default.createElement(
								'div',
								{ id: 'info_standard', className: 'box shadow' },
								_react2.default.createElement(
									'ul',
									null,
									_react2.default.createElement(
										'li',
										null,
										_react2.default.createElement(
											'b',
											{ className: 'ng-binding' },
											'Стандарт услуги'
										)
									),
									_react2.default.createElement(
										'li',
										{ className: 'standatr-list ng-scope' },
										_react2.default.createElement(
											'div',
											{ className: 'wrap_maxtime' },
											_react2.default.createElement(
												'span',
												{ className: 'maxtime_title' },
												'Максимальный срок',
												_react2.default.createElement('br', null),
												'предоставления услуги'
											),
											_react2.default.createElement(
												'span',
												{ className: 'maxtime' },
												currentStandard.maxtime
											),
											_react2.default.createElement(
												'span',
												{ className: 'maxtime_text' },
												'рабочих ',
												_react2.default.createElement('br', null),
												' дней'
											),
											_react2.default.createElement('div', { className: 'clear' })
										)
									),
									_react2.default.createElement(
										'li',
										{ className: 'cost ng-scope' },
										_react2.default.createElement(
											'span',
											{ className: 'maxtime_title' },
											' '
										),
										_react2.default.createElement(
											'span',
											{ className: 'num' },
											currentStandard.paymentPrivate,
											' –'
										),
										_react2.default.createElement(
											'span',
											{ className: 'text' },
											'физ. лица'
										),
										_react2.default.createElement('br', null),
										_react2.default.createElement(
											'span',
											{ className: 'num' },
											currentStandard.paymentLegal,
											' –'
										),
										_react2.default.createElement(
											'span',
											{ className: 'text' },
											'юр. лица'
										)
									),
									_react2.default.createElement(
										'li',
										{ className: 'appointment' },
										_react2.default.createElement(
											'a',
											{ target: '_blank', className: 'ng-binding', href: currentStandard.link },
											'Записаться на прием'
										)
									)
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'column_6' },
							_react2.default.createElement(
								'div',
								{ className: 'main_description' },
								_react2.default.createElement(
									'p',
									{ className: 'title ng-binding' },
									getObjectsList.map(function (item) {
										if (item.id == currentObject) return item.name;
									})
								),
								_react2.default.createElement(
									'p',
									null,
									_react2.default.createElement(
										'i',
										{ className: 'desc ng-binding' },
										getOperationsList.map(function (item) {
											if (item.id == currentOperation) return item.name;
										})
									)
								)
							),
							_react2.default.createElement('div', { className: 'clear' })
						),
						_react2.default.createElement('div', { className: 'column_7' }),
						_react2.default.createElement(
							'div',
							{ className: 'column_8' },
							_react2.default.createElement(
								'div',
								{ className: 'column_8_1' },
								_react2.default.createElement(
									'p',
									{ className: 'column_title' },
									'1. Заполнение анкеты:'
								),
								_react2.default.createElement(
									'div',
									{ className: 'column_description' },
									_react2.default.createElement(
										'i',
										{ className: 'ng-binding' },
										'Для того, чтобы правильно сформировать пакет необходимых для предоставления услуги документов, Вам необходимо уточнить следующую информацию:'
									)
								),
								getQuestionsList.map(function (item, id) {
									return _react2.default.createElement(
										'div',
										{ key: item.id, className: 'questions_list' },
										_react2.default.createElement(
											'span',
											{ className: 'ng-binding' },
											' ',
											_react2.default.createElement(
												'b',
												null,
												id + 1,
												'. ',
												item.name
											)
										),
										item.answers.map(function (el) {
											return _react2.default.createElement(
												'div',
												{ key: el.id, className: 'question' },
												_react2.default.createElement(
													'label',
													{ className: 'radio' },
													_react2.default.createElement('input', { type: 'radio',
														name: "answers" + item.id,
														className: 'ng-scope',
														value: el.id,
														onChange: function onChange() {
															_this6.addDocument(item.id, Number(el.id));
														} }),
													_react2.default.createElement(
														'span',
														{ className: 'ng-binding' },
														el.name
													)
												)
											);
										})
									);
								})
							),
							_react2.default.createElement(
								'div',
								{ className: 'column_8_2' },
								_react2.default.createElement(
									'p',
									{ className: 'column_title' },
									'2. Перечень документов'
								),
								_react2.default.createElement(
									'div',
									{ className: 'column_description' },
									_react2.default.createElement(
										'p',
										null,
										_react2.default.createElement(
											'i',
											{ className: 'ng-binding' },
											'В этом разделе подобран комплект документов на основании Ваших ответов на вопросы в предыдущих этапах'
										)
									)
								),
								_react2.default.createElement(
									'b',
									{ className: 'common_list_doc' },
									'Общий перечень:'
								),
								_react2.default.createElement(
									'ol',
									{ id: 'doc_title_list' },
									currentDocumentsList.map(function (item, id) {
										return _react2.default.createElement(
											'li',
											{ key: id, className: 'ng-binding ng-scope' },
											item.name
										);
									})
								)
							),
							_react2.default.createElement('div', { className: 'clear' })
						),
						_react2.default.createElement(
							'div',
							{ className: 'column_11' },
							_react2.default.createElement(
								'div',
								{ className: 'scroll_top', onClick: function onClick() {
										_this6.topPage();
									} },
								'К началу страницы'
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'column_9' },
						_react2.default.createElement(
							'button',
							{ className: 'button_back',
								onClick: function onClick() {
									_reactDom2.default.render(_react2.default.createElement(LiveSituations, null), document.getElementById('container'));
								}
							},
							_react2.default.createElement('img', { alt: '', src: '/rrwebLifeSituations-portlet/images/arrow_b.png' }),
							'Назад'
						),
						_react2.default.createElement(
							'button',
							{ className: 'button_next',
								onClick: function onClick() {

									_reactDom2.default.render(_react2.default.createElement(ShowDocument, {
										currentDocumentsList: currentDocumentsList,
										currentObject: currentObject,
										currentOperation: currentOperation,
										currentStandard: currentStandard,
										getObjectsList: getObjectsList,
										getOperationsList: getOperationsList
									}), document.getElementById('container'));
								}
							},
							_react2.default.createElement('img', { alt: '', src: '/rrwebLifeSituations-portlet/images/arrow.png' }),
							'Далее'
						)
					),
					_react2.default.createElement('div', { className: 'clear' })
				);
			}
		}]);

		return RegistrationRight;
	}(_react2.default.Component);

	var ShowDocument = function (_React$Component3) {
		_inherits(ShowDocument, _React$Component3);

		function ShowDocument(props) {
			_classCallCheck(this, ShowDocument);

			var _this7 = _possibleConstructorReturn(this, (ShowDocument.__proto__ || Object.getPrototypeOf(ShowDocument)).call(this, props));

			_this7.printDocument = function () {
				var printing_css = '<style media=print>#wrap_print {display: block; visibility: visible; border: 2px solid #ccc;}</style>';
				var html_to_print = printing_css + $('#wrap_print').html();
				var iframe = $('<iframe id="print_frame">');
				$('body').append(iframe);
				var doc = $('#print_frame')[0].contentDocument || $('#print_frame')[0].contentWindow.document;
				var win = $('#print_frame')[0].contentWindow || $('#print_frame')[0];
				doc.getElementsByTagName('body')[0].innerHTML = html_to_print;
				win.print();
				$('iframe').remove();
			};

			_this7.topPage = function () {
				$("html, body").animate({ scrollTop: 0 }, "slow");
				return false;
			};

			_this7.state = {
				currentObject: _this7.props.currentObject,
				currentOperation: _this7.props.currentOperation,
				getObjectsList: _this7.props.getObjectsList,
				getOperationsList: _this7.props.getOperationsList,
				currentDocumentsList: _this7.props.currentDocumentsList
			};
			return _this7;
		}

		_createClass(ShowDocument, [{
			key: 'render',
			value: function render() {
				var _this8 = this;

				var _state3 = this.state;
				var currentDocumentsList = _state3.currentDocumentsList;
				var getObjectsList = _state3.getObjectsList;
				var getOperationsList = _state3.getOperationsList;
				var currentOperation = _state3.currentOperation;
				var currentObject = _state3.currentObject;
				var currentStandard = _state3.currentStandard;


				return _react2.default.createElement(
					'div',
					{ className: 'content column_5 ng-scope' },
					_react2.default.createElement(
						'div',
						{ className: 'column_5_1' },
						_react2.default.createElement(
							'div',
							{ id: 'registration' },
							'Регистрация прав'
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'column_5_2' },
						_react2.default.createElement(
							'div',
							{ className: 'consultation ng-binding' },
							'Если Вашего случая здесь нет — ',
							_react2.default.createElement('br', null),
							'получите консультацию по номеру:',
							_react2.default.createElement('br', null),
							'8 (800) 100 34 34'
						)
					),
					_react2.default.createElement('div', { className: 'clear' }),
					_react2.default.createElement(
						'div',
						{ className: 'main_form box shadow' },
						_react2.default.createElement(
							'div',
							{ className: 'column_5_3 ng-scope' },
							currentStandard && _react2.default.createElement(
								'div',
								{ id: 'info_standard', className: 'box shadow' },
								_react2.default.createElement(
									'ul',
									null,
									_react2.default.createElement(
										'li',
										null,
										_react2.default.createElement(
											'b',
											{ className: 'ng-binding' },
											'Стандарт услуги'
										)
									),
									_react2.default.createElement(
										'li',
										{ className: 'standatr-list ng-scope' },
										_react2.default.createElement(
											'div',
											{ className: 'wrap_maxtime' },
											_react2.default.createElement(
												'span',
												{ className: 'maxtime_title' },
												'Максимальный срок',
												_react2.default.createElement('br', null),
												'предоставления услуги'
											),
											_react2.default.createElement(
												'span',
												{ className: 'maxtime' },
												currentStandard.maxtime
											),
											_react2.default.createElement(
												'span',
												{ className: 'maxtime_text' },
												'рабочих ',
												_react2.default.createElement('br', null),
												' дней'
											),
											_react2.default.createElement('div', { className: 'clear' })
										)
									),
									_react2.default.createElement(
										'li',
										{ className: 'cost ng-scope' },
										_react2.default.createElement(
											'span',
											{ className: 'maxtime_title' },
											' '
										),
										_react2.default.createElement(
											'span',
											{ className: 'num' },
											currentStandard.paymentPrivate,
											' –'
										),
										_react2.default.createElement(
											'span',
											{ className: 'text' },
											'физ. лица'
										),
										_react2.default.createElement('br', null),
										_react2.default.createElement(
											'span',
											{ className: 'num' },
											currentStandard.paymentLegal,
											' –'
										),
										_react2.default.createElement(
											'span',
											{ className: 'text' },
											'юр. лица'
										)
									),
									_react2.default.createElement(
										'li',
										{ className: 'appointment' },
										_react2.default.createElement(
											'a',
											{ target: '_blank', className: 'ng-binding', href: currentStandard.link },
											'Записаться на прием'
										)
									)
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ id: 'wrap_print' },
							_react2.default.createElement(
								'div',
								{ className: 'column_6' },
								_react2.default.createElement(
									'div',
									{ className: 'main_description' },
									_react2.default.createElement(
										'p',
										{ className: 'title ng-binding' },
										getObjectsList.map(function (item) {
											if (item.id == currentObject) return item.name;
										})
									),
									_react2.default.createElement(
										'p',
										null,
										_react2.default.createElement(
											'i',
											{ className: 'desc ng-binding' },
											getOperationsList.map(function (item) {
												if (item.id == currentOperation) return item.name;
											})
										)
									)
								),
								_react2.default.createElement('div', { className: 'clear' })
							),
							_react2.default.createElement('div', { className: 'column_7 step_2' }),
							_react2.default.createElement(
								'div',
								{ className: 'column_14 full' },
								_react2.default.createElement(
									'div',
									{ className: 'column_8_4' },
									_react2.default.createElement(
										'p',
										{ className: 'column_title' },
										'2. Перечень документов'
									),
									_react2.default.createElement(
										'div',
										{ className: 'column_description' },
										_react2.default.createElement(
											'p',
											null,
											_react2.default.createElement(
												'i',
												{ className: 'ng-binding' },
												'В этом разделе подобран комплект документов на основании Ваших ответов на вопросы в предыдущих этапах'
											)
										)
									),
									_react2.default.createElement(
										'b',
										{ className: 'common_list_doc' },
										'Общий перечень:'
									),
									_react2.default.createElement(
										'ol',
										{ id: 'doc_title_list' },
										currentDocumentsList.map(function (item, id) {
											return _react2.default.createElement(
												'li',
												{ key: id, className: 'ng-binding ng-scope' },
												item.name
											);
										})
									)
								),
								_react2.default.createElement('div', { className: 'clear' })
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'column_11' },
							_react2.default.createElement(
								'div',
								{ className: 'scroll_top', onClick: function onClick() {
										_this8.topPage();
									} },
								'К началу страницы'
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'column_9' },
						_react2.default.createElement(
							'button',
							{ className: 'button_back',
								onClick: function onClick() {
									_reactDom2.default.render(_react2.default.createElement(LiveSituations, null), document.getElementById('container'));
								} },
							_react2.default.createElement('img', { alt: '', src: '/rrwebLifeSituations-portlet/images/arrow_b.png' }),
							'Назад'
						),
						_react2.default.createElement(
							'button',
							{ className: 'button_next button_save',
								onClick: function onClick() {
									_this8.printDocument();
								} },
							_react2.default.createElement('img', { alt: '', src: '/rrwebLifeSituations-portlet/images/print_icon.png' }),
							'Распечатать'
						),
						_react2.default.createElement(
							'a',
							{ href: '/elektronnye-uslugi-servisy', className: 'button_next button_save' },
							_react2.default.createElement('img', { alt: '', src: '/rrwebLifeSituations-portlet/images/rr_icon.png' }),
							'Электронные услуги'
						)
					),
					_react2.default.createElement('div', { className: 'clear' })
				);
			}
		}]);

		return ShowDocument;
	}(_react2.default.Component);

	_reactDom2.default.render(_react2.default.createElement(LiveSituations, null), document.getElementById('container'));
});
require(["rrwebLifeSituations-portlet"], function () {});