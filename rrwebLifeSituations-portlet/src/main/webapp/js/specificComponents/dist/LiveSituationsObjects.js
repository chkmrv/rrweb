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

	var LiveSituationsObjects = function (_React$Component) {
		_inherits(LiveSituationsObjects, _React$Component);

		function LiveSituationsObjects(props) {
			_classCallCheck(this, LiveSituationsObjects);

			var _this = _possibleConstructorReturn(this, (LiveSituationsObjects.__proto__ || Object.getPrototypeOf(LiveSituationsObjects)).call(this, props));

			_this.clearState = function () {
				var onChange = _this.props.onChange;

				_this.setState({
					developedObject: {},
					edit: false,
					currentObject: 0,
					errors: []
				}, function () {
					onChange();
				});
			};

			_this.selectChangeOption = function (e) {
				var currentId = e.target.value;
				var currentObject = void 0;

				_this.props.objectsList.map(function (item, index) {
					if (index == currentId) {
						currentObject = index;
					}
				});

				_this.setState({ currentObject: currentObject });
			};

			_this.createObject = function () {
				_this.setState({
					developedObject: { "name": '' },
					edit: true
				});
			};

			_this.editObject = function () {
				var currentObject = _this.state.currentObject;

				var developedObject = _this.props.objectsList[currentObject];

				lib.getAJAXCall({
					method: 'GET',
					url: lib.urlsLibrary.object + developedObject.id,
					callback: function callback(object) {
						_this.setState({
							developedObject: object,
							edit: true
						});
					}
				});
			};

			_this.saveObject = function () {
				var developedObject = _this.state.developedObject;
				var tests = {
					name: {
						approve: developedObject.name.length <= 0,
						descr: "Введите название объекта"
					}
				};

				lib.checkValidation(tests, function () {
					if (Object.keys(_this.state.errors).length === 0) {
						var method = 'PUT';

						if (!developedObject.id && developedObject.id !== 0) {
							method = 'POST';
						}

						lib.getAJAXCall({
							method: method,
							url: lib.urlsLibrary.object,
							data: developedObject,
							callback: _this.clearState
						});
					}
				}, _this);
			};

			_this.deleteObject = function () {
				var developedObject = _this.state.developedObject;

				if (lib.deleteConfirmation()) {
					lib.getAJAXCall({
						method: 'DELETE',
						url: lib.urlsLibrary.object + developedObject.id,
						deleteCallback: _this.clearState
					});
				}
			};

			_this.state = {
				currentObject: 0,
				edit: false,
				developedObject: {},
				errors: []
			};
			return _this;
		}

		_createClass(LiveSituationsObjects, [{
			key: 'render',
			value: function render() {
				var _this2 = this;

				var objectsList = this.props.objectsList;
				var _state = this.state;
				var currentObject = _state.currentObject;
				var edit = _state.edit;
				var developedObject = _state.developedObject;
				var errors = _state.errors;


				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'h2',
						null,
						'Объекты'
					),
					!edit ? _react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'select',
							{ onChange: this.selectChangeOption, className: 'form-control' },
							objectsList.map(function (item, id) {
								return _react2.default.createElement(
									'option',
									{ key: id,
										value: id,
										className: currentObject === id ? 'active' : '' },
									item.name
								);
							})
						),
						_react2.default.createElement(
							'div',
							{ className: 'bs-example' },
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-primary', onClick: this.editObject },
								'Редактировать'
							),
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-primary', onClick: this.createObject },
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
									value: developedObject.name,
									onChange: function onChange(e) {
										var obj = developedObject;
										obj.name = e.target.value;

										_this2.setState({ developedObject: obj });
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
							(developedObject.id || developedObject.id === 0) && _react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-danger', onClick: this.deleteObject },
								'Удалить'
							),
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn ', onClick: this.clearState },
								'Отменить'
							),
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-success', onClick: this.saveObject },
								'Сохранить'
							)
						)
					)
				);
			}
		}]);

		return LiveSituationsObjects;
	}(_react2.default.Component);

	LiveSituationsObjects.propTypes = {
		objectsList: _react2.default.PropTypes.array
	};

	LiveSituationsObjects.defaultProps = {
		objectsList: []
	};

	exports.default = LiveSituationsObjects;
});