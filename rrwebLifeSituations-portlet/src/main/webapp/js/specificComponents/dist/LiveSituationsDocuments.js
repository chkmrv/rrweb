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

	var LiveSituationsDocuments = function (_React$Component) {
		_inherits(LiveSituationsDocuments, _React$Component);

		function LiveSituationsDocuments(props) {
			_classCallCheck(this, LiveSituationsDocuments);

			var _this = _possibleConstructorReturn(this, (LiveSituationsDocuments.__proto__ || Object.getPrototypeOf(LiveSituationsDocuments)).call(this, props));

			_this.clearState = function () {
				var onChange = _this.props.onChange;

				_this.setState({
					developedDocument: {},
					edit: false,
					currentDocument: 0,
					errors: []
				}, function () {
					onChange();
				});
			};

			_this.selectChangeDocument = function (e) {
				var currentId = e.target.value;
				var currentDocument = void 0;

				_this.props.documentsList.map(function (item, index) {
					if (index == currentId) {
						currentDocument = index;
					}
				});

				_this.setState({ currentDocument: currentDocument });
			};

			_this.createDocument = function () {
				_this.setState({
					currentDocument: {},
					developedDocument: {
						"name": "",
						"description": "",
						"documentGroup": "",
						"defaultView": false,
						"objectIds": [],
						"operationIds": []
					},
					edit: true
				});
			};

			_this.editDocument = function () {
				var _this$state = _this.state;
				var currentDocument = _this$state.currentDocument;
				var archiveOfSelectObjects = _this$state.archiveOfSelectObjects;
				var archiveOfSelectOperations = _this$state.archiveOfSelectOperations;

				var currentId = _this.props.documentsList[currentDocument].id;

				lib.getAJAXCall({
					method: 'GET',
					url: lib.urlsLibrary.document + currentId,
					callback: function callback(document) {
						document.objectIds = archiveOfSelectObjects[currentId];
						document.operationIds = archiveOfSelectOperations[currentId];

						_this.setState({
							developedDocument: document,
							edit: true
						});
					}
				});
			};

			_this.saveDocument = function () {
				var developedDocument = _this.state.developedDocument;

				var tests = {
					name: {
						approve: developedDocument.name.length <= 0,
						descr: "Введите название документа"
					},
					description: {
						approve: developedDocument.description.length <= 0,
						descr: "Введите описание"
					},
					objectIds: {
						approve: developedDocument.objectIds.length <= 0,
						descr: "Необходимо привязать к объектам"
					},
					operationIds: {
						approve: developedDocument.operationIds.length <= 0,
						descr: "Необходимо привязать к операциям"
					}
				};

				lib.checkValidation(tests, function () {
					if (Object.keys(_this.state.errors).length === 0) {
						var method = 'PUT';

						if (!developedDocument.id && developedDocument.id !== 0) {
							method = 'POST';
						}

						developedDocument.objectIds = developedDocument.objectIds.map(function (obj) {
							return obj.id;
						});

						developedDocument.operationIds = developedDocument.operationIds.map(function (obj) {
							return obj.id;
						});

						lib.getAJAXCall({
							method: method,
							url: lib.urlsLibrary.document,
							data: developedDocument,
							callback: _this.clearState
						});
					}
				}, _this);
			};

			_this.deleteDocument = function () {
				var developedDocument = _this.state.developedDocument;

				if (lib.deleteConfirmation()) {
					lib.getAJAXCall({
						method: 'DELETE',
						url: lib.urlsLibrary.document + developedDocument.id,
						deleteCallback: _this.clearState
					});
				};
			};

			_this.handleDeselectObject = function (index) {
				var developedDocument = _this.state.developedDocument;

				var selectedObjects = developedDocument.objectIds.slice();

				selectedObjects.splice(index, 1);
				developedDocument.objectIds = selectedObjects;

				_this.setState({ developedDocument: developedDocument });
			};

			_this.handleSelectionChangeObject = function (selectedObjects) {
				var developedDocument = _this.state.developedDocument;


				developedDocument.objectIds = selectedObjects;

				_this.setState({ developedDocument: developedDocument });
			};

			_this.handleDeselectOperation = function (index) {
				var developedDocument = _this.state.developedDocument;

				var selectedObjects = developedDocument.operationIds.slice();

				selectedObjects.splice(index, 1);
				developedDocument.operationIds = selectedObjects;

				_this.setState({ developedDocument: developedDocument });
			};

			_this.handleSelectionChangeOperation = function (selectedObjects) {
				var developedDocument = _this.state.developedDocument;


				developedDocument.operationIds = selectedObjects;

				_this.setState({ developedDocument: developedDocument });
			};

			_this.state = {
				edit: false,
				developedDocument: {},
				currentDocument: 0,
				archiveOfSelectObjects: {},
				archiveOfSelectOperations: {},
				errors: []
			};
			return _this;
		}

		_createClass(LiveSituationsDocuments, [{
			key: 'componentDidUpdate',
			value: function componentDidUpdate(state) {
				if (state.documentsList != this.props.documentsList) {
					this.setState({
						archiveOfSelectObjects: lib.createArchiveElements(this.props.documentsList, this.props.objectsList, "objectIds"),
						archiveOfSelectOperations: lib.createArchiveElements(this.props.documentsList, this.props.operationsList, "operationIds")
					});
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var _props = this.props;
				var documentsList = _props.documentsList;
				var objectsList = _props.objectsList;
				var operationsList = _props.operationsList;
				var _state = this.state;
				var currentDocument = _state.currentDocument;
				var edit = _state.edit;
				var developedDocument = _state.developedDocument;
				var errors = _state.errors;


				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'h2',
						null,
						'Документы'
					),
					!edit ? _react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'select',
							{ onChange: this.selectChangeDocument, className: 'form-control' },
							documentsList.map(function (item, id) {
								return _react2.default.createElement(
									'option',
									{ key: id,
										value: id,
										className: currentDocument === item ? 'active' : '' },
									item.name
								);
							})
						),
						_react2.default.createElement(
							'div',
							{ className: 'bs-example' },
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-primary', onClick: this.editDocument },
								'Редактировать'
							),
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-primary', onClick: this.createDocument },
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
									value: developedDocument.name,
									onChange: function onChange(e) {
										var obj = developedDocument;
										obj.name = e.target.value;

										_this2.setState({ developedDocument: obj });
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
								'Описание:'
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-xs-12' },
								_react2.default.createElement('input', { className: 'form-control',
									value: developedDocument.description,
									onChange: function onChange(e) {
										var obj = developedDocument;
										obj.description = e.target.value;

										_this2.setState({ developedDocument: obj });
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
								{ className: 'col-xs-4' },
								'Документ виден по умолчанию:'
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-xs-2' },
								_react2.default.createElement('input', { className: 'form-control',
									type: 'checkbox',
									style: { height: 'auto' },
									checked: developedDocument.defaultView,
									onChange: function onChange() {
										var obj = developedDocument;
										obj.defaultView = !obj.defaultView;

										_this2.setState({ developedDocument: obj });
									}
								})
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
									onChange: this.handleSelectionChangeObject,
									options: objectsList,
									selectedOptions: developedDocument.objectIds,
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
								developedDocument.objectIds.length === 0 && _react2.default.createElement(
									'p',
									null,
									'(ничего не выбрано)'
								),
								developedDocument.objectIds.length > 0 && _react2.default.createElement(
									'ol',
									null,
									developedDocument.objectIds.map(function (object, i) {
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
									selectedOptions: developedDocument.operationIds,
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
								developedDocument.operationIds.length === 0 && _react2.default.createElement(
									'p',
									null,
									'(ничего не выбрано)'
								),
								developedDocument.operationIds.length > 0 && _react2.default.createElement(
									'ol',
									null,
									developedDocument.operationIds.map(function (object, i) {
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
							(developedDocument.id || developedDocument.id === 0) && _react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-danger', onClick: this.deleteDocument },
								'Удалить'
							),
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn ', onClick: this.clearState },
								'Отменить'
							),
							_react2.default.createElement(
								'button',
								{ type: 'button', className: 'btn btn-success', onClick: this.saveDocument },
								'Сохранить'
							)
						)
					)
				);
			}
		}]);

		return LiveSituationsDocuments;
	}(_react2.default.Component);

	LiveSituationsDocuments.propTypes = {
		objectsList: _react2.default.PropTypes.array,
		operationsList: _react2.default.PropTypes.array,
		documentsList: _react2.default.PropTypes.array
	};

	LiveSituationsDocuments.defaultProps = {
		objectsList: [],
		operationsList: [],
		documentsList: []
	};

	exports.default = LiveSituationsDocuments;
});