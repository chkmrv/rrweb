define(['exports', 'react', './../../../../../../../common/components/react-filtered-multiselect.min', 'library'], function (exports, _react, _reactFilteredMultiselect, _library) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _reactFilteredMultiselect2 = _interopRequireDefault(_reactFilteredMultiselect);

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

	var FAQThemes = function (_React$Component) {
		_inherits(FAQThemes, _React$Component);

		function FAQThemes(props) {
			_classCallCheck(this, FAQThemes);

			var _this = _possibleConstructorReturn(this, (FAQThemes.__proto__ || Object.getPrototypeOf(FAQThemes)).call(this, props));

			_this.clearState = function () {
				var onChange = _this.props.onChange;

				_this.setState({
					developedTheme: {},
					edit: false,
					currentTheme: 0,
					errors: []
				}, function () {
					onChange();
				});
			};

			_this.selectChangeTheme = function (e) {
				var currentId = e.target.value;
				var currentTheme = void 0;

				_this.props.themesList.map(function (item, index) {
					if (index == currentId) {
						currentTheme = index;
					}
				});

				_this.setState({ currentTheme: currentTheme });
			};

			_this.createTheme = function () {
				_this.setState({
					developedTheme: { "name": "", "sort": 0, "faqIds": [] },
					edit: true
				});
			};

			_this.editTheme = function () {
				var _this$state = _this.state;
				var currentTheme = _this$state.currentTheme;
				var archiveOfSelectQuestions = _this$state.archiveOfSelectQuestions;

				var currentId = _this.props.themesList[currentTheme].id;

				lib.getAJAXCall({
					method: 'GET',
					url: lib.urlsLibrary.theme + currentId,
					callback: function callback(theme) {
						theme.faqIds = archiveOfSelectQuestions[currentId];

						_this.setState({
							developedTheme: theme,
							edit: true
						});
					}
				});
			};

			_this.saveTheme = function () {
				var developedTheme = _this.state.developedTheme;


				var tests = {
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
					}
				};

				lib.checkValidation(tests, function () {
					if (Object.keys(_this.state.errors).length === 0) {
						var method = 'PUT';

						if (!developedTheme.id && developedTheme.id !== 0) {
							method = 'POST';
						}

						developedTheme.faqIds = developedTheme.faqIds.map(function (obj) {
							return obj.id;
						});

						lib.getAJAXCall({
							method: method,
							url: lib.urlsLibrary.theme,
							data: developedTheme,
							callback: _this.clearState
						});
					}
				}, _this);
			};

			_this.deleteTheme = function () {
				var developedTheme = _this.state.developedTheme;


				if (lib.deleteConfirmation()) {
					lib.getAJAXCall({
						method: 'DELETE',
						url: lib.urlsLibrary.theme + developedTheme.id,
						deleteCallback: _this.clearState
					});
				}
			};

			_this.handleDeselect = function (index) {
				var developedTheme = _this.state.developedTheme;

				var selectedObjects = developedTheme.faqIds.slice();

				selectedObjects.splice(index, 1);
				developedTheme.faqIds = selectedObjects;

				_this.setState({ developedTheme: developedTheme });
			};

			_this.handleSelectionChange = function (selectedObjects) {
				var developedTheme = _this.state.developedTheme;


				developedTheme.faqIds = selectedObjects;

				_this.setState({ developedTheme: developedTheme });
			};

			_this.state = {
				edit: false,
				currentTheme: 0,
				developedTheme: {},
				archiveOfSelectQuestions: {},
				errors: []
			};
			return _this;
		}

		_createClass(FAQThemes, [{
			key: 'componentDidUpdate',
			value: function componentDidUpdate(state) {
				if (state.themesList != this.props.themesList) {
					this.setState({
						archiveOfSelectQuestions: lib.createArchiveElements(this.props.themesList, this.props.questionsList, "faqIds")
					});
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var _props = this.props;
				var themesList = _props.themesList;
				var questionsList = _props.questionsList;
				var _state = this.state;
				var currentTheme = _state.currentTheme;
				var edit = _state.edit;
				var developedTheme = _state.developedTheme;
				var errors = _state.errors;


				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'h2',
						null,
						'Темы'
					),
					!edit ? _react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'select',
							{ onChange: this.selectChangeTheme, className: 'form-control' },
							themesList.map(function (item, id) {
								return _react2.default.createElement(
									'option',
									{ key: id,
										value: id,
										className: currentTheme === item.id ? 'active' : '' },
									item.sort + ' - ' + item.name
								);
							})
						),
						_react2.default.createElement(
							'div',
							{ className: 'bs-example' },
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-primary', onClick: this.editTheme },
								'Редактировать'
							),
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-primary', onClick: this.createTheme },
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
									value: developedTheme.name,
									onChange: function onChange(e) {
										var obj = developedTheme;
										obj.name = e.target.value;

										_this2.setState({ developedTheme: obj });
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
								'Относится к вопросам:'
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-xs-5' },
								_react2.default.createElement(_reactFilteredMultiselect2.default, {
									onChange: this.handleSelectionChange,
									options: questionsList,
									selectedOptions: developedTheme.faqIds,
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
								developedTheme.faqIds.length === 0 && _react2.default.createElement(
									'p',
									null,
									'(ничего не выбрано)'
								),
								developedTheme.faqIds.length > 0 && _react2.default.createElement(
									'ol',
									null,
									developedTheme.faqIds.map(function (object, i) {
										return _react2.default.createElement(
											'li',
											{ key: i },
											object.name + ' ',
											_react2.default.createElement(
												'span',
												{ style: { cursor: "pointer" }, onClick: _this2.handleDeselect.bind(null, i) },
												'×'
											)
										);
									})
								)
							),
							errors['faqIds'] ? _react2.default.createElement(
								'div',
								{ className: 'clearfix col-xs-12' },
								_react2.default.createElement(
									'span',
									{ className: 'has-error-text' },
									errors['faqIds']
								)
							) : null
						),
						_react2.default.createElement(
							'label',
							{ className: 'row' },
							_react2.default.createElement(
								'p',
								{ className: 'col-xs-12' },
								'Сортировка тем:'
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-xs-2' },
								_react2.default.createElement('input', { className: 'form-control',
									type: 'number',
									value: developedTheme.sort,
									onChange: function onChange(e) {
										var obj = developedTheme;
										obj.sort = Number(e.target.value);

										_this2.setState({ developedTheme: obj });
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
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn', onClick: this.clearState },
								'Отменить'
							),
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-success', onClick: this.saveTheme },
								'Сохранить'
							),
							(developedTheme.id || developedTheme.id === 0) && _react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-danger', onClick: this.deleteTheme },
								'Удалить'
							)
						)
					)
				);
			}
		}]);

		return FAQThemes;
	}(_react2.default.Component);

	FAQThemes.propTypes = {
		questionsList: _react2.default.PropTypes.array,
		themesList: _react2.default.PropTypes.array
	};

	FAQThemes.defaultProps = {
		questionsList: [],
		themesList: []
	};

	exports.default = FAQThemes;
});