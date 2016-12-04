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

	var FAQQuestions = function (_React$Component) {
		_inherits(FAQQuestions, _React$Component);

		function FAQQuestions(props) {
			_classCallCheck(this, FAQQuestions);

			var _this = _possibleConstructorReturn(this, (FAQQuestions.__proto__ || Object.getPrototypeOf(FAQQuestions)).call(this, props));

			_this.clearState = function () {
				var onChange = _this.props.onChange;

				_this.setState({
					developedQuestion: {},
					edit: false,
					currentQuestion: 0,
					errors: []
				}, function () {
					onChange();
				});
			};

			_this.selectChangeOption = function (e) {
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
					developedQuestion: {
						"name": '',
						"questionText": '',
						"answerText": '',
						"sort": 0
					},
					edit: true
				});
			};

			_this.editQuestion = function () {
				var currentQuestion = _this.state.currentQuestion;

				var developedQuestion = _this.props.questionsList[currentQuestion];

				lib.getAJAXCall({
					method: 'GET',
					url: lib.urlsLibrary.faq + developedQuestion.id,
					callback: function callback(question) {
						_this.setState({
							developedQuestion: question,
							edit: true
						});
					}
				});
			};

			_this.saveQuestion = function () {
				var developedQuestion = _this.state.developedQuestion;
				var tests = {
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
					}
				};

				lib.checkValidation(tests, function () {
					if (Object.keys(_this.state.errors).length === 0) {
						var method = 'PUT';

						if (!developedQuestion.id && developedQuestion.id !== 0) {
							method = 'POST';
						}

						lib.getAJAXCall({
							method: method,
							url: lib.urlsLibrary.faq,
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
						url: lib.urlsLibrary.faq + developedQuestion.id,
						deleteCallback: _this.clearState
					});
				}
			};

			_this.state = {
				currentQuestion: 0,
				edit: false,
				developedQuestion: {},
				errors: []
			};
			return _this;
		}

		_createClass(FAQQuestions, [{
			key: 'render',
			value: function render() {
				var _this2 = this;

				var questionsList = this.props.questionsList;
				var _state = this.state;
				var currentQuestion = _state.currentQuestion;
				var edit = _state.edit;
				var developedQuestion = _state.developedQuestion;
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
							{ onChange: this.selectChangeOption, className: 'form-control' },
							questionsList.map(function (item, id) {
								return _react2.default.createElement(
									'option',
									{ key: id,
										value: id,
										className: currentQuestion === id ? 'active' : '' },
									item.sort + ' - ' + item.name
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
							'label',
							{ className: 'row' },
							_react2.default.createElement(
								'p',
								{ className: 'col-xs-12' },
								'Вопрос:'
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-xs-12' },
								_react2.default.createElement('textarea', { className: 'form-control',
									value: developedQuestion.questionText,
									rows: '4',
									onChange: function onChange(e) {
										var obj = developedQuestion;
										obj.questionText = e.target.value;

										_this2.setState({ developedQuestion: obj });
									}
								})
							),
							errors['questionText'] ? _react2.default.createElement(
								'div',
								{ className: 'clearfix col-xs-12' },
								_react2.default.createElement(
									'span',
									{ className: 'has-error-text' },
									errors['questionText']
								)
							) : null
						),
						_react2.default.createElement(
							'label',
							{ className: 'row' },
							_react2.default.createElement(
								'p',
								{ className: 'col-xs-12' },
								'Ответ:'
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-xs-12' },
								_react2.default.createElement('textarea', { className: 'form-control',
									value: developedQuestion.answerText,
									rows: '10',
									onChange: function onChange(e) {
										var obj = developedQuestion;
										obj.answerText = e.target.value;

										_this2.setState({ developedQuestion: obj });
									}
								})
							),
							errors['answerText'] ? _react2.default.createElement(
								'div',
								{ className: 'clearfix col-xs-12' },
								_react2.default.createElement(
									'span',
									{ className: 'has-error-text' },
									errors['answerText']
								)
							) : null
						),
						_react2.default.createElement(
							'label',
							{ className: 'row' },
							_react2.default.createElement(
								'p',
								{ className: 'col-xs-12' },
								'Сортировка:'
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-xs-12' },
								_react2.default.createElement('input', { className: 'form-control',
									type: 'number',
									value: developedQuestion.sort,
									onChange: function onChange(e) {
										var obj = developedQuestion;
										obj.sort = Number(e.target.value);

										_this2.setState({ developedQuestion: obj });
									}
								})
							),
							errors['sort'] ? _react2.default.createElement(
								'div',
								{ className: 'clearfix col-xs-12' },
								_react2.default.createElement(
									'span',
									{ className: 'has-error-text' },
									errors['sort']
								)
							) : null
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

		return FAQQuestions;
	}(_react2.default.Component);

	FAQQuestions.propTypes = {
		questionsList: _react2.default.PropTypes.array
	};

	FAQQuestions.defaultProps = {
		questionsList: []
	};

	exports.default = FAQQuestions;
});