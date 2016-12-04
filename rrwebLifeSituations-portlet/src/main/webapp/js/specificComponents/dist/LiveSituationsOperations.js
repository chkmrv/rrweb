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

	var LiveSituationsOperations = function (_React$Component) {
		_inherits(LiveSituationsOperations, _React$Component);

		function LiveSituationsOperations(props) {
			_classCallCheck(this, LiveSituationsOperations);

			var _this = _possibleConstructorReturn(this, (LiveSituationsOperations.__proto__ || Object.getPrototypeOf(LiveSituationsOperations)).call(this, props));

			_this.clearState = function () {
				var onChange = _this.props.onChange;

				_this.setState({
					developedOperation: {},
					edit: false,
					currentOperation: 0,
					errors: []
				}, function () {
					onChange();
				});
			};

			_this.selectChangeOperation = function (e) {
				var currentId = e.target.value;
				var currentOperation = void 0;

				_this.props.operationsList.map(function (item, index) {
					if (index == currentId) {
						currentOperation = index;
					}
				});

				_this.setState({ currentOperation: currentOperation });
			};

			_this.createOperation = function () {
				_this.setState({
					developedOperation: { "name": "", "category": "", "objectIds": [] },
					edit: true
				});
			};

			_this.editOperation = function () {
				var _this$state = _this.state;
				var currentOperation = _this$state.currentOperation;
				var archiveOfSelectObjects = _this$state.archiveOfSelectObjects;

				var currentId = _this.props.operationsList[currentOperation].id;

				lib.getAJAXCall({
					method: 'GET',
					url: lib.urlsLibrary.operation + currentId,
					callback: function callback(operation) {
						operation.objectIds = archiveOfSelectObjects[currentId];

						_this.setState({
							developedOperation: operation,
							edit: true
						});
					}
				});
			};

			_this.saveOperation = function () {
				var developedOperation = _this.state.developedOperation;


				var tests = {
					name: {
						approve: developedOperation.name.length <= 0,
						descr: "Введите название операции"
					},
					category: {
						approve: developedOperation.category.length <= 0,
						descr: "Введите номер категории"
					},
					objectIds: {
						approve: developedOperation.objectIds.length <= 0,
						descr: "Необходимо привязать к объектам"
					}
				};

				lib.checkValidation(tests, function () {
					if (Object.keys(_this.state.errors).length === 0) {
						var method = 'PUT';

						if (!developedOperation.id && developedOperation.id !== 0) {
							method = 'POST';
						}

						developedOperation.objectIds = developedOperation.objectIds.map(function (obj) {
							return obj.id;
						});

						lib.getAJAXCall({
							method: method,
							url: lib.urlsLibrary.operation,
							data: developedOperation,
							callback: _this.clearState
						});
					}
				}, _this);
			};

			_this.deleteOperation = function () {
				var developedOperation = _this.state.developedOperation;


				if (lib.deleteConfirmation()) {
					lib.getAJAXCall({
						method: 'DELETE',
						url: lib.urlsLibrary.operation + developedOperation.id,
						deleteCallback: _this.clearState
					});
				}
			};

			_this.handleDeselect = function (index) {
				var developedOperation = _this.state.developedOperation;

				var selectedObjects = developedOperation.objectIds.slice();

				selectedObjects.splice(index, 1);
				developedOperation.objectIds = selectedObjects;

				_this.setState({ developedOperation: developedOperation });
			};

			_this.handleSelectionChange = function (selectedObjects) {
				var developedOperation = _this.state.developedOperation;


				developedOperation.objectIds = selectedObjects;

				_this.setState({ developedOperation: developedOperation });
			};

			_this.handleCategoryChange = function (event) {
				var developedOperation = _this.state.developedOperation;

				developedOperation.category = Number(event.target.value);

				_this.setState({
					developedOperation: developedOperation
				});
			};

			_this.state = {
				edit: false,
				currentOperation: 0,
				developedOperation: {},
				archiveOfSelectObjects: {},
				errors: []
			};
			return _this;
		}

		_createClass(LiveSituationsOperations, [{
			key: 'componentDidUpdate',
			value: function componentDidUpdate(state) {
				if (state.operationsList != this.props.operationsList) {
					this.setState({
						archiveOfSelectObjects: lib.createArchiveElements(this.props.operationsList, this.props.objectsList, "objectIds")
					});
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var _props = this.props;
				var operationsList = _props.operationsList;
				var objectsList = _props.objectsList;
				var _state = this.state;
				var currentOperation = _state.currentOperation;
				var edit = _state.edit;
				var developedOperation = _state.developedOperation;
				var errors = _state.errors;


				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'h2',
						null,
						'Операции'
					),
					!edit ? _react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'select',
							{ onChange: this.selectChangeOperation, className: 'form-control' },
							operationsList.map(function (item, id) {
								return _react2.default.createElement(
									'option',
									{ key: id,
										value: id,
										className: currentOperation === item.id ? 'active' : '' },
									item.name
								);
							})
						),
						_react2.default.createElement(
							'div',
							{ className: 'bs-example' },
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-primary', onClick: this.editOperation },
								'Редактировать'
							),
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-primary', onClick: this.createOperation },
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
									value: developedOperation.name,
									onChange: function onChange(e) {
										var obj = developedOperation;
										obj.name = e.target.value;

										_this2.setState({ developedOperation: obj });
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
								'Категория:'
							),
							_react2.default.createElement(
								'label',
								{ className: 'col-xs-12' },
								_react2.default.createElement('input', {
									type: 'radio',
									name: 'category',
									value: '0',
									checked: developedOperation.category === 0,
									onChange: this.handleCategoryChange }),
								_react2.default.createElement(
									'span',
									null,
									'Кадастровый учет'
								)
							),
							_react2.default.createElement(
								'label',
								{ className: 'col-xs-12' },
								_react2.default.createElement('input', {
									type: 'radio',
									name: 'category',
									value: '1',
									checked: developedOperation.category === 1,
									onChange: this.handleCategoryChange }),
								_react2.default.createElement(
									'span',
									null,
									'Регистрация права'
								)
							)
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
									onChange: this.handleSelectionChange,
									options: objectsList,
									selectedOptions: developedOperation.objectIds,
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
								developedOperation.objectIds.length === 0 && _react2.default.createElement(
									'p',
									null,
									'(ничего не выбрано)'
								),
								developedOperation.objectIds.length > 0 && _react2.default.createElement(
									'ol',
									null,
									developedOperation.objectIds.map(function (object, i) {
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
							{ className: 'bs-example' },
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn', onClick: this.clearState },
								'Отменить'
							),
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-success', onClick: this.saveOperation },
								'Сохранить'
							),
							(developedOperation.id || developedOperation.id === 0) && _react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-danger', onClick: this.deleteOperation },
								'Удалить'
							)
						)
					)
				);
			}
		}]);

		return LiveSituationsOperations;
	}(_react2.default.Component);

	LiveSituationsOperations.propTypes = {
		objectsList: _react2.default.PropTypes.array,
		operationsList: _react2.default.PropTypes.array
	};

	LiveSituationsOperations.defaultProps = {
		objectsList: [],
		operationsList: []
	};

	exports.default = LiveSituationsOperations;
});