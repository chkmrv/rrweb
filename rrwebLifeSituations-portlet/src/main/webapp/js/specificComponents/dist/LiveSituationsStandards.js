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

	var LiveSituationsStandards = function (_React$Component) {
		_inherits(LiveSituationsStandards, _React$Component);

		function LiveSituationsStandards(props) {
			_classCallCheck(this, LiveSituationsStandards);

			var _this = _possibleConstructorReturn(this, (LiveSituationsStandards.__proto__ || Object.getPrototypeOf(LiveSituationsStandards)).call(this, props));

			_this.clearState = function () {
				var onChange = _this.props.onChange;

				_this.setState({
					developedStandard: {},
					edit: false,
					currentStandard: 0,
					errors: []
				}, function () {
					onChange();
				});
			};

			_this.selectChangeStandard = function (e) {
				var currentId = e.target.value;
				var currentStandard = void 0;

				_this.props.standardsList.map(function (item, index) {
					if (index == currentId) {
						currentStandard = index;
					}
				});

				_this.setState({ currentStandard: currentStandard });
			};

			_this.createStandard = function () {
				_this.setState({
					currentStandard: {},
					developedStandard: {
						"description": "",
						"maxtime": "",
						"paymentTitle": "",
						"paymentPrivate": "",
						"paymentLegal": "",
						"link": "",
						"objectIds": [],
						"operationIds": []
					},
					edit: true
				});
			};

			_this.editStandard = function () {
				var _this$state = _this.state;
				var currentStandard = _this$state.currentStandard;
				var archiveOfSelectObjects = _this$state.archiveOfSelectObjects;
				var archiveOfSelectOperations = _this$state.archiveOfSelectOperations;

				var currentId = _this.props.standardsList[currentStandard].id;

				lib.getAJAXCall({
					method: 'GET',
					url: lib.urlsLibrary.standard + currentId,
					callback: function callback(standard) {
						standard.objectIds = archiveOfSelectObjects[currentId];
						standard.operationIds = archiveOfSelectOperations[currentId];

						_this.setState({
							developedStandard: standard,
							edit: true
						});
					}
				});
			};

			_this.saveStandard = function () {
				var developedStandard = _this.state.developedStandard;


				var tests = {
					description: {
						approve: developedStandard.description.length <= 0,
						descr: "Введите название стандарта"
					},
					maxtime: {
						approve: developedStandard.maxtime.length <= 0,
						descr: "Введите максимальный срок предоставления услуги"
					},
					paymentPrivate: {
						approve: developedStandard.paymentPrivate.length <= 0,
						descr: "Введите cтоимость для физических лиц"
					},
					paymentLegal: {
						approve: developedStandard.paymentLegal.length <= 0,
						descr: "Введите cтоимость для юридических лиц"
					},
					link: {
						approve: developedStandard.link.length <= 0,
						descr: "Введите ссылку"
					},
					objectIds: {
						approve: developedStandard.objectIds.length <= 0,
						descr: "Необходимо привязать к объектам"
					},
					operationIds: {
						approve: developedStandard.operationIds.length <= 0,
						descr: "Необходимо привязать к операциям"
					}
				};

				lib.checkValidation(tests, function () {
					if (Object.keys(_this.state.errors).length === 0) {
						var method = 'PUT';

						if (!developedStandard.id && developedStandard.id !== 0) {
							method = 'POST';
						}

						developedStandard.objectIds = developedStandard.objectIds.map(function (obj) {
							return obj.id;
						});

						developedStandard.operationIds = developedStandard.operationIds.map(function (obj) {
							return obj.id;
						});

						lib.getAJAXCall({
							method: method,
							url: lib.urlsLibrary.standard,
							data: developedStandard,
							callback: _this.clearState
						});
					}
				}, _this);
			};

			_this.deleteStandard = function () {
				var developedStandard = _this.state.developedStandard;

				if (lib.deleteConfirmation()) {
					lib.getAJAXCall({
						method: 'DELETE',
						url: lib.urlsLibrary.standard + developedStandard.id,
						deleteCallback: _this.clearState
					});
				}
			};

			_this.handleDeselectObject = function (index) {
				var developedStandard = _this.state.developedStandard;

				var selectedObjects = developedStandard.objectIds.slice();

				selectedObjects.splice(index, 1);
				developedStandard.objectIds = selectedObjects;

				_this.setState({ developedStandard: developedStandard });
			};

			_this.handleSelectionChangeObject = function (selectedObjects) {
				var developedStandard = _this.state.developedStandard;


				developedStandard.objectIds = selectedObjects;

				_this.setState({ developedStandard: developedStandard });
			};

			_this.handleDeselectOperation = function (index) {
				var developedStandard = _this.state.developedStandard;

				var selectedObjects = developedStandard.operationIds.slice();

				selectedObjects.splice(index, 1);
				developedStandard.operationIds = selectedObjects;

				_this.setState({ developedStandard: developedStandard });
			};

			_this.handleSelectionChangeOperation = function (selectedObjects) {
				var developedStandard = _this.state.developedStandard;


				developedStandard.operationIds = selectedObjects;

				_this.setState({ developedStandard: developedStandard });
			};

			_this.state = {
				edit: false,
				developedStandard: {},
				currentStandard: 0,
				archiveOfSelectObjects: {},
				archiveOfSelectOperations: {},
				errors: []
			};
			return _this;
		}

		_createClass(LiveSituationsStandards, [{
			key: 'componentDidUpdate',
			value: function componentDidUpdate(state) {
				if (state.standardsList != this.props.standardsList) {
					this.setState({
						archiveOfSelectObjects: lib.createArchiveElements(this.props.standardsList, this.props.objectsList, "objectIds"),
						archiveOfSelectOperations: lib.createArchiveElements(this.props.standardsList, this.props.operationsList, "operationIds")
					});
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var _props = this.props;
				var standardsList = _props.standardsList;
				var objectsList = _props.objectsList;
				var operationsList = _props.operationsList;
				var _state = this.state;
				var currentStandard = _state.currentStandard;
				var edit = _state.edit;
				var developedStandard = _state.developedStandard;
				var errors = _state.errors;


				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'h2',
						null,
						'Стандарты'
					),
					!edit ? _react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'select',
							{ onChange: this.selectChangeStandard, className: 'form-control' },
							standardsList.map(function (item, id) {
								return _react2.default.createElement(
									'option',
									{ key: id,
										value: id,
										className: currentStandard === item ? 'active' : '' },
									item.description
								);
							})
						),
						_react2.default.createElement(
							'div',
							{ className: 'bs-example' },
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-primary', onClick: this.editStandard },
								'Редактировать'
							),
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-primary', onClick: this.createStandard },
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
									value: developedStandard.description,
									onChange: function onChange(e) {
										var obj = developedStandard;
										obj.description = e.target.value;

										_this2.setState({ developedStandard: obj });
									}
								})
							),
							errors['description'] ? _react2.default.createElement(
								'div',
								{ className: 'clearfix col-xs-12' },
								_react2.default.createElement(
									'span',
									{ className: 'has-error-text' },
									errors['description']
								)
							) : null
						),
						_react2.default.createElement(
							'label',
							{ className: 'row' },
							_react2.default.createElement(
								'p',
								{ className: 'col-xs-12' },
								'Максимальный срок предоставления услуги:'
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-xs-2' },
								_react2.default.createElement('input', { className: 'form-control',
									type: 'number',
									value: developedStandard.maxtime,
									onChange: function onChange(e) {
										var obj = developedStandard;
										obj.maxtime = Number(e.target.value);

										_this2.setState({ developedStandard: obj });
									}
								})
							),
							errors['maxtime'] ? _react2.default.createElement(
								'div',
								{ className: 'clearfix col-xs-12' },
								_react2.default.createElement(
									'span',
									{ className: 'has-error-text' },
									errors['maxtime']
								)
							) : null
						),
						_react2.default.createElement(
							'label',
							{ className: 'row' },
							_react2.default.createElement(
								'p',
								{ className: 'col-xs-12' },
								'Стоимость для физических лиц:'
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-xs-12' },
								_react2.default.createElement('input', { className: 'form-control',
									value: developedStandard.paymentPrivate,
									onChange: function onChange(e) {
										var obj = developedStandard;
										obj.paymentPrivate = e.target.value;

										_this2.setState({ developedStandard: obj });
									}
								})
							),
							errors['paymentPrivate'] ? _react2.default.createElement(
								'div',
								{ className: 'clearfix col-xs-12' },
								_react2.default.createElement(
									'span',
									{ className: 'has-error-text' },
									errors['paymentPrivate']
								)
							) : null
						),
						_react2.default.createElement(
							'label',
							{ className: 'row' },
							_react2.default.createElement(
								'p',
								{ className: 'col-xs-12' },
								'Стоимость для юридических лиц:'
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-xs-12' },
								_react2.default.createElement('input', { className: 'form-control',
									value: developedStandard.paymentLegal,
									onChange: function onChange(e) {
										var obj = developedStandard;
										obj.paymentLegal = e.target.value;

										_this2.setState({ developedStandard: obj });
									}
								})
							),
							errors['paymentLegal'] ? _react2.default.createElement(
								'div',
								{ className: 'clearfix col-xs-12' },
								_react2.default.createElement(
									'span',
									{ className: 'has-error-text' },
									errors['paymentLegal']
								)
							) : null
						),
						_react2.default.createElement(
							'label',
							{ className: 'row' },
							_react2.default.createElement(
								'p',
								{ className: 'col-xs-12' },
								'Ссылка:'
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-xs-12' },
								_react2.default.createElement('input', { className: 'form-control',
									value: developedStandard.link,
									onChange: function onChange(e) {
										var obj = developedStandard;
										obj.link = e.target.value;

										_this2.setState({ developedStandard: obj });
									}
								})
							),
							errors['link'] ? _react2.default.createElement(
								'div',
								{ className: 'clearfix col-xs-12' },
								_react2.default.createElement(
									'span',
									{ className: 'has-error-text' },
									errors['link']
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
									selectedOptions: developedStandard.objectIds,
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
								developedStandard.objectIds.length === 0 && _react2.default.createElement(
									'p',
									null,
									'(ничего не выбрано)'
								),
								developedStandard.objectIds.length > 0 && _react2.default.createElement(
									'ol',
									null,
									developedStandard.objectIds.map(function (object, i) {
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
									selectedOptions: developedStandard.operationIds,
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
								developedStandard.operationIds.length === 0 && _react2.default.createElement(
									'p',
									null,
									'(ничего не выбрано)'
								),
								developedStandard.operationIds.length > 0 && _react2.default.createElement(
									'ol',
									null,
									developedStandard.operationIds.map(function (object, i) {
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
							'div',
							{ className: 'bs-example' },
							(developedStandard.id || developedStandard.id === 0) && _react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-danger', onClick: this.deleteStandard },
								'Удалить'
							),
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn ', onClick: this.clearState },
								'Отменить'
							),
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-success', onClick: this.saveStandard },
								'Сохранить'
							)
						)
					)
				);
			}
		}]);

		return LiveSituationsStandards;
	}(_react2.default.Component);

	LiveSituationsStandards.propTypes = {
		objectsList: _react2.default.PropTypes.array,
		operationsList: _react2.default.PropTypes.array,
		standardsList: _react2.default.PropTypes.array
	};

	LiveSituationsStandards.defaultProps = {
		objectsList: [],
		operationsList: [],
		standardsList: []
	};

	exports.default = LiveSituationsStandards;
});