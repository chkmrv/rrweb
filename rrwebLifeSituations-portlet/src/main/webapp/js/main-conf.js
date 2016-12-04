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
define('specificComponents/dist/LiveSituationsObjects',['exports', 'react', 'library'], function (exports, _react, _library) {
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
/*!
 * react-filtered-multiselect 0.4.2 - https://github.com/insin/react-filtered-multiselect
 * MIT Licensed
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define('specificComponents/../../../../../../common/components/react-filtered-multiselect.min',["react"],t):"object"==typeof exports?exports.FilteredMultiSelect=t(require("react")):e.FilteredMultiSelect=t(e.React)}(this,function(e){return function(e){function t(i){if(s[i])return s[i].exports;var l=s[i]={exports:{},id:i,loaded:!1};return e[i].call(l.exports,l,l.exports,t),l.loaded=!0,l.exports}var s={};return t.m=e,t.c=s,t.p="",t(0)}([function(e,t,s){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function l(e,t){for(var s={},i=0,l=e.length;l>i;i++)t?s[e[i][t]]=!0:s[e[i]]=!0;return s}function o(e,t,s){for(var i=[],o=0,r=l(s),n=0,a=e.length,p=s.length;a>n&&p>o;n++)r[e[n][t]]&&(i.push(e[n]),o++);return i}Object.defineProperty(t,"__esModule",{value:!0});var r=s(1),n=i(r),a={button:"FilteredMultiSelect__button",buttonActive:"FilteredMultiSelect__button--active",filter:"FilteredMultiSelect__filter",select:"FilteredMultiSelect__select"};t.default=n.default.createClass({displayName:"FilteredMultiSelect",propTypes:{onChange:r.PropTypes.func.isRequired,options:r.PropTypes.array.isRequired,buttonText:r.PropTypes.string,className:r.PropTypes.string,classNames:r.PropTypes.object,defaultFilter:r.PropTypes.string,disabled:r.PropTypes.bool,placeholder:r.PropTypes.string,selectedOptions:r.PropTypes.array,size:r.PropTypes.number,textProp:r.PropTypes.string,valueProp:r.PropTypes.string},getDefaultProps:function(){return{buttonText:"Select",className:"FilteredMultiSelect",classNames:{},defaultFilter:"",disabled:!1,placeholder:"type to filter",size:6,selectedOptions:[],textProp:"text",valueProp:"value"}},getInitialState:function(){var e=this.props,t=e.defaultFilter,s=e.selectedOptions;return{filter:t,filteredOptions:this._filterOptions(t,s),selectedValues:[]}},componentWillReceiveProps:function(e){(e.options!==this.props.options||e.selectedOptions!==this.props.selectedOptions||e.options.length!==this.props.options.length||e.selectedOptions.length!==this.props.selectedOptions.length)&&this.setState({filteredOptions:this._filterOptions(this.state.filter,e.selectedOptions,e.options)},this._updateSelectedValues)},_getClassName:function(e){for(var t=[this.props.classNames[e]||a[e]],s=arguments.length,i=Array(s>1?s-1:0),l=1;s>l;l++)i[l-1]=arguments[l];for(var o=0,r=i.length;r>o;o++)i[o]&&t.push(this.props.classNames[i[o]]||a[i[o]]);return t.join(" ")},_filterOptions:function(e,t,s){"undefined"==typeof e&&(e=this.state.filter),"undefined"==typeof t&&(t=this.props.selectedOptions),"undefined"==typeof s&&(s=this.props.options),e=e.toUpperCase();for(var i=this.props,o=i.textProp,r=i.valueProp,n=l(t,r),a=[],p=0,u=s.length;u>p;p++)n[s[p][r]]||e&&-1===s[p][o].toUpperCase().indexOf(e)||a.push(s[p]);return a},_onFilterChange:function(e){var t=e.target.value;this.setState({filter:t,filteredOptions:this._filterOptions(t)},this._updateSelectedValues)},_onFilterKeyPress:function(e){var t=this;"Enter"===e.key&&(e.preventDefault(),1===this.state.filteredOptions.length&&!function(){var e=t.state.filteredOptions[0],s=t.props.selectedOptions.concat([e]);t.setState({filter:"",selectedValues:[]},function(){t.props.onChange(s)})}())},_updateSelectedValues:function(e){for(var t=e?e.target:this.refs.select,s=[],i=0,l=t.options.length;l>i;i++)t.options[i].selected&&s.push(t.options[i].value);(e||String(this.state.selectedValues)!==String(s))&&this.setState({selectedValues:s})},_addSelectedToSelection:function(e){var t=this,s=this.props.selectedOptions.concat(o(this.state.filteredOptions,this.props.valueProp,this.state.selectedValues));this.setState({selectedValues:[]},function(){t.props.onChange(s)})},render:function(){var e=this.state,t=e.filter,s=e.filteredOptions,i=e.selectedValues,l=this.props,o=l.className,r=l.disabled,a=l.placeholder,p=l.size,u=l.textProp,c=l.valueProp,d=i.length>0;return n.default.createElement("div",{className:o},n.default.createElement("input",{type:"text",className:this._getClassName("filter"),placeholder:a,value:t,onChange:this._onFilterChange,onKeyPress:this._onFilterKeyPress,disabled:r}),n.default.createElement("select",{multiple:!0,ref:"select",className:this._getClassName("select"),size:p,value:i,onChange:this._updateSelectedValues,onDoubleClick:this._addSelectedToSelection,disabled:r},s.map(function(e){return n.default.createElement("option",{key:e[c],value:e[c]},e[u])})),n.default.createElement("button",{type:"button",className:this._getClassName("button",d&&"buttonActive"),disabled:!d,onClick:this._addSelectedToSelection},this.props.buttonText))}}),e.exports=t.default},function(t,s){t.exports=e}])});
define('specificComponents/dist/LiveSituationsOperations',['exports', 'react', './../../../../../../../common/components/react-filtered-multiselect.min', 'library'], function (exports, _react, _reactFilteredMultiselect, _library) {
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
define('specificComponents/dist/LiveSituationsAnswers',['exports', 'react', 'library'], function (exports, _react, _library) {
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
define('specificComponents/dist/LiveSituationsQuestions',['exports', 'react', './../../../../../../../common/components/react-filtered-multiselect.min', './LiveSituationsAnswers', 'library'], function (exports, _react, _reactFilteredMultiselect, _LiveSituationsAnswers, _library) {
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
define('specificComponents/dist/LiveSituationsStandards',['exports', 'react', './../../../../../../../common/components/react-filtered-multiselect.min', 'library'], function (exports, _react, _reactFilteredMultiselect, _library) {
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
define('specificComponents/dist/LiveSituationsDocuments',['exports', 'react', './../../../../../../../common/components/react-filtered-multiselect.min', 'library'], function (exports, _react, _reactFilteredMultiselect, _library) {
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
define('specificComponents/dist/LiveSituationsMatches',['exports', 'react', 'library'], function (exports, _react, _library) {
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
define('rrwebLifeSituations-portlet-conf',['react', 'react-dom', 'library', './specificComponents/dist/LiveSituationsObjects', './specificComponents/dist/LiveSituationsOperations', './specificComponents/dist/LiveSituationsQuestions', './specificComponents/dist/LiveSituationsStandards', './specificComponents/dist/LiveSituationsDocuments', './specificComponents/dist/LiveSituationsMatches'], function (_react, _reactDom, _library, _LiveSituationsObjects, _LiveSituationsOperations, _LiveSituationsQuestions, _LiveSituationsStandards, _LiveSituationsDocuments, _LiveSituationsMatches) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _library2 = _interopRequireDefault(_library);

	var _LiveSituationsObjects2 = _interopRequireDefault(_LiveSituationsObjects);

	var _LiveSituationsOperations2 = _interopRequireDefault(_LiveSituationsOperations);

	var _LiveSituationsQuestions2 = _interopRequireDefault(_LiveSituationsQuestions);

	var _LiveSituationsStandards2 = _interopRequireDefault(_LiveSituationsStandards);

	var _LiveSituationsDocuments2 = _interopRequireDefault(_LiveSituationsDocuments);

	var _LiveSituationsMatches2 = _interopRequireDefault(_LiveSituationsMatches);

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

	var LiveSituationsConfiguration = function (_React$Component) {
		_inherits(LiveSituationsConfiguration, _React$Component);

		function LiveSituationsConfiguration(props) {
			_classCallCheck(this, LiveSituationsConfiguration);

			var _this = _possibleConstructorReturn(this, (LiveSituationsConfiguration.__proto__ || Object.getPrototypeOf(LiveSituationsConfiguration)).call(this, props));

			_this.getObjectList = function () {
				lib.getAJAXCall({
					method: 'GET',
					url: lib.urlsLibrary.object,
					callback: function callback(objects) {

						_this.setState({
							objectsList: objects
						});
					}
				});
			};

			_this.getOperationList = function () {
				lib.getAJAXCall({
					method: 'GET',
					url: lib.urlsLibrary.operation,
					callback: function callback(operations) {

						_this.setState({
							operationsList: operations
						});
					}
				});
			};

			_this.getQuestionList = function () {
				lib.getAJAXCall({
					method: 'GET',
					url: lib.urlsLibrary.question,
					callback: function callback(questions) {
						_this.setState({
							questionsList: questions
						});
					}
				});
			};

			_this.getAnswersList = function () {
				lib.getAJAXCall({
					method: 'GET',
					url: lib.urlsLibrary.answer,
					callback: function callback(answers) {

						_this.setState({
							answersList: answers
						});
					}
				});
			};

			_this.getStandardList = function () {
				lib.getAJAXCall({
					method: 'GET',
					url: lib.urlsLibrary.standard,
					callback: function callback(standards) {
						_this.setState({
							standardsList: standards
						});
					}
				});
			};

			_this.getDocumentList = function () {
				lib.getAJAXCall({
					method: 'GET',
					url: lib.urlsLibrary.document,
					callback: function callback(documents) {
						_this.setState({
							documentsList: documents
						});
					}
				});
			};

			_this.getMatchesList = function () {
				lib.getAJAXCall({
					method: 'GET',
					url: lib.urlsLibrary.match,
					callback: function callback(match) {
						_this.setState({
							matchesList: match
						});
					}
				});
			};

			_this.state = {
				objectsList: [],
				operationsList: [],
				questionsList: [],
				answersList: [],
				standardsList: [],
				documentsList: [],
				matchesList: []
			};
			return _this;
		}

		_createClass(LiveSituationsConfiguration, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.getObjectList();
				this.getOperationList();
				this.getQuestionList();
				this.getAnswersList();
				this.getStandardList();
				this.getDocumentList();
				this.getMatchesList();
			}
		}, {
			key: 'render',
			value: function render() {
				var _state = this.state;
				var objectsList = _state.objectsList;
				var operationsList = _state.operationsList;
				var questionsList = _state.questionsList;
				var standardsList = _state.standardsList;
				var documentsList = _state.documentsList;
				var matchesList = _state.matchesList;
				var answersList = _state.answersList;


				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(_LiveSituationsObjects2.default, {
						objectsList: objectsList,
						onChange: this.getObjectList
					}),
					_react2.default.createElement('br', null),
					_react2.default.createElement('hr', null),
					_react2.default.createElement(_LiveSituationsOperations2.default, {
						objectsList: objectsList,
						operationsList: operationsList,
						onChange: this.getOperationList
					}),
					_react2.default.createElement('br', null),
					_react2.default.createElement('hr', null),
					_react2.default.createElement(_LiveSituationsQuestions2.default, {
						objectsList: objectsList,
						operationsList: operationsList,
						questionsList: questionsList,
						onChange: this.getQuestionList
					}),
					_react2.default.createElement('br', null),
					_react2.default.createElement('hr', null),
					_react2.default.createElement(_LiveSituationsStandards2.default, {
						objectsList: objectsList,
						operationsList: operationsList,
						standardsList: standardsList,
						onChange: this.getStandardList
					}),
					_react2.default.createElement('br', null),
					_react2.default.createElement('hr', null),
					_react2.default.createElement(_LiveSituationsDocuments2.default, {
						objectsList: objectsList,
						operationsList: operationsList,
						documentsList: documentsList,
						onChange: this.getDocumentList
					}),
					_react2.default.createElement('br', null),
					_react2.default.createElement('hr', null),
					_react2.default.createElement(_LiveSituationsMatches2.default, {
						operationsList: operationsList,
						questionsList: questionsList,
						answersList: answersList,
						documentsList: documentsList,
						matchesList: matchesList,
						onChange: this.getMatchesList
					})
				);
			}
		}]);

		return LiveSituationsConfiguration;
	}(_react2.default.Component);

	_reactDom2.default.render(_react2.default.createElement(LiveSituationsConfiguration, null), document.getElementById('container-conf'));
});
require(["rrwebLifeSituations-portlet-conf"], function () {});
//# sourceMappingURL=main-conf.js.map
