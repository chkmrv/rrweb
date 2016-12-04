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

	var LiveSituationsAnswers = function (_React$Component) {
		_inherits(LiveSituationsAnswers, _React$Component);

		function LiveSituationsAnswers(props) {
			_classCallCheck(this, LiveSituationsAnswers);

			var _this = _possibleConstructorReturn(this, (LiveSituationsAnswers.__proto__ || Object.getPrototypeOf(LiveSituationsAnswers)).call(this, props));

			_this.clearState = function () {
				var onChange = _this.props.onChange;

				_this.setState({
					developedAnswer: {},
					edit: false,
					currentAnswer: 0,
					errors: []
				}, function () {
					onChange();
				});
			};

			_this.selectChangeOption = function (e) {
				var currentId = e.target.value;
				var currentAnswer = void 0;

				_this.props.answersList.map(function (item, index) {
					if (index == currentId) {
						currentAnswer = index;
					}
				});

				_this.setState({ currentAnswer: currentAnswer });
			};

			_this.createAnswer = function () {
				_this.setState({
					developedAnswer: { "name": '', 'questionId': _this.props.currentQuestion.id },
					edit: true
				});
			};

			_this.editAnswer = function () {
				var currentAnswer = _this.state.currentAnswer;


				lib.getAJAXCall({
					method: 'GET',
					url: lib.urlsLibrary.answer + _this.props.currentQuestion.id + "/" + _this.props.answersList[currentAnswer].id,
					callback: function callback(answer) {
						_this.setState({
							developedAnswer: answer,
							edit: true
						});
					}
				});
			};

			_this.saveAnswer = function () {
				var developedAnswer = _this.state.developedAnswer;
				var tests = {
					name: {
						approve: developedAnswer.name.length <= 0,
						descr: "Введите ответ"
					}
				};

				lib.checkValidation(tests, function () {
					if (Object.keys(_this.state.errors).length === 0) {
						var method = 'PUT';

						if (!developedAnswer.id && developedAnswer.id !== 0) {
							method = 'POST';
						}

						lib.getAJAXCall({
							method: method,
							url: lib.urlsLibrary.answer,
							data: developedAnswer,
							callback: _this.clearState
						});
					}
				}, _this);
			};

			_this.deleteAnswer = function () {
				var currentAnswer = _this.state.currentAnswer;


				if (lib.deleteConfirmation()) {
					lib.getAJAXCall({
						method: 'DELETE',
						url: lib.urlsLibrary.answer + _this.props.answersList[currentAnswer].id,
						deleteCallback: _this.clearState
					});
				}
			};

			_this.state = {
				currentAnswer: 0,
				edit: false,
				developedAnswer: {},
				tmpAnswer: "",
				errors: []
			};
			return _this;
		}

		_createClass(LiveSituationsAnswers, [{
			key: 'render',
			value: function render() {
				var _this2 = this;

				var answersList = this.props.answersList;
				var _state = this.state;
				var currentAnswer = _state.currentAnswer;
				var edit = _state.edit;
				var developedAnswer = _state.developedAnswer;
				var errors = _state.errors;


				return _react2.default.createElement(
					'div',
					null,
					!edit ? _react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'select',
							{ onChange: this.selectChangeOption, className: 'form-control' },
							answersList.map(function (item, id) {
								return _react2.default.createElement(
									'option',
									{ key: id,
										value: id,
										className: currentAnswer === item ? 'active' : '' },
									item.name
								);
							})
						),
						_react2.default.createElement(
							'div',
							{ className: 'bs-example' },
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-primary', onClick: this.editAnswer },
								'Редактировать'
							),
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-primary', onClick: this.createAnswer },
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
									value: developedAnswer.name,
									onChange: function onChange(e) {
										var obj = developedAnswer;
										obj.name = e.target.value;

										_this2.setState({ developedAnswer: obj });
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
							{ className: 'bs-example' },
							(developedAnswer.id || developedAnswer.id === 0) && _react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-danger', onClick: this.deleteAnswer },
								'Удалить'
							),
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn ', onClick: this.clearState },
								'Отменить'
							),
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-success', onClick: this.saveAnswer },
								'Сохранить'
							)
						),
						_react2.default.createElement('hr', null)
					)
				);
			}
		}]);

		return LiveSituationsAnswers;
	}(_react2.default.Component);

	LiveSituationsAnswers.propTypes = {
		answersList: _react2.default.PropTypes.array
	};

	LiveSituationsAnswers.defaultProps = {
		answersList: []
	};

	exports.default = LiveSituationsAnswers;
});