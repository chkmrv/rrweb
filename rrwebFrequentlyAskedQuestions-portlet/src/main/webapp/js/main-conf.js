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
/*!
 * react-filtered-multiselect 0.4.2 - https://github.com/insin/react-filtered-multiselect
 * MIT Licensed
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define('specificComponents/../../../../../../common/components/react-filtered-multiselect.min',["react"],t):"object"==typeof exports?exports.FilteredMultiSelect=t(require("react")):e.FilteredMultiSelect=t(e.React)}(this,function(e){return function(e){function t(i){if(s[i])return s[i].exports;var l=s[i]={exports:{},id:i,loaded:!1};return e[i].call(l.exports,l,l.exports,t),l.loaded=!0,l.exports}var s={};return t.m=e,t.c=s,t.p="",t(0)}([function(e,t,s){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function l(e,t){for(var s={},i=0,l=e.length;l>i;i++)t?s[e[i][t]]=!0:s[e[i]]=!0;return s}function o(e,t,s){for(var i=[],o=0,r=l(s),n=0,a=e.length,p=s.length;a>n&&p>o;n++)r[e[n][t]]&&(i.push(e[n]),o++);return i}Object.defineProperty(t,"__esModule",{value:!0});var r=s(1),n=i(r),a={button:"FilteredMultiSelect__button",buttonActive:"FilteredMultiSelect__button--active",filter:"FilteredMultiSelect__filter",select:"FilteredMultiSelect__select"};t.default=n.default.createClass({displayName:"FilteredMultiSelect",propTypes:{onChange:r.PropTypes.func.isRequired,options:r.PropTypes.array.isRequired,buttonText:r.PropTypes.string,className:r.PropTypes.string,classNames:r.PropTypes.object,defaultFilter:r.PropTypes.string,disabled:r.PropTypes.bool,placeholder:r.PropTypes.string,selectedOptions:r.PropTypes.array,size:r.PropTypes.number,textProp:r.PropTypes.string,valueProp:r.PropTypes.string},getDefaultProps:function(){return{buttonText:"Select",className:"FilteredMultiSelect",classNames:{},defaultFilter:"",disabled:!1,placeholder:"type to filter",size:6,selectedOptions:[],textProp:"text",valueProp:"value"}},getInitialState:function(){var e=this.props,t=e.defaultFilter,s=e.selectedOptions;return{filter:t,filteredOptions:this._filterOptions(t,s),selectedValues:[]}},componentWillReceiveProps:function(e){(e.options!==this.props.options||e.selectedOptions!==this.props.selectedOptions||e.options.length!==this.props.options.length||e.selectedOptions.length!==this.props.selectedOptions.length)&&this.setState({filteredOptions:this._filterOptions(this.state.filter,e.selectedOptions,e.options)},this._updateSelectedValues)},_getClassName:function(e){for(var t=[this.props.classNames[e]||a[e]],s=arguments.length,i=Array(s>1?s-1:0),l=1;s>l;l++)i[l-1]=arguments[l];for(var o=0,r=i.length;r>o;o++)i[o]&&t.push(this.props.classNames[i[o]]||a[i[o]]);return t.join(" ")},_filterOptions:function(e,t,s){"undefined"==typeof e&&(e=this.state.filter),"undefined"==typeof t&&(t=this.props.selectedOptions),"undefined"==typeof s&&(s=this.props.options),e=e.toUpperCase();for(var i=this.props,o=i.textProp,r=i.valueProp,n=l(t,r),a=[],p=0,u=s.length;u>p;p++)n[s[p][r]]||e&&-1===s[p][o].toUpperCase().indexOf(e)||a.push(s[p]);return a},_onFilterChange:function(e){var t=e.target.value;this.setState({filter:t,filteredOptions:this._filterOptions(t)},this._updateSelectedValues)},_onFilterKeyPress:function(e){var t=this;"Enter"===e.key&&(e.preventDefault(),1===this.state.filteredOptions.length&&!function(){var e=t.state.filteredOptions[0],s=t.props.selectedOptions.concat([e]);t.setState({filter:"",selectedValues:[]},function(){t.props.onChange(s)})}())},_updateSelectedValues:function(e){for(var t=e?e.target:this.refs.select,s=[],i=0,l=t.options.length;l>i;i++)t.options[i].selected&&s.push(t.options[i].value);(e||String(this.state.selectedValues)!==String(s))&&this.setState({selectedValues:s})},_addSelectedToSelection:function(e){var t=this,s=this.props.selectedOptions.concat(o(this.state.filteredOptions,this.props.valueProp,this.state.selectedValues));this.setState({selectedValues:[]},function(){t.props.onChange(s)})},render:function(){var e=this.state,t=e.filter,s=e.filteredOptions,i=e.selectedValues,l=this.props,o=l.className,r=l.disabled,a=l.placeholder,p=l.size,u=l.textProp,c=l.valueProp,d=i.length>0;return n.default.createElement("div",{className:o},n.default.createElement("input",{type:"text",className:this._getClassName("filter"),placeholder:a,value:t,onChange:this._onFilterChange,onKeyPress:this._onFilterKeyPress,disabled:r}),n.default.createElement("select",{multiple:!0,ref:"select",className:this._getClassName("select"),size:p,value:i,onChange:this._updateSelectedValues,onDoubleClick:this._addSelectedToSelection,disabled:r},s.map(function(e){return n.default.createElement("option",{key:e[c],value:e[c]},e[u])})),n.default.createElement("button",{type:"button",className:this._getClassName("button",d&&"buttonActive"),disabled:!d,onClick:this._addSelectedToSelection},this.props.buttonText))}}),e.exports=t.default},function(t,s){t.exports=e}])});
define('specificComponents/dist/FAQThemes',['exports', 'react', './../../../../../../../common/components/react-filtered-multiselect.min', 'library'], function (exports, _react, _reactFilteredMultiselect, _library) {
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
define('specificComponents/dist/FAQQuestions',['exports', 'react', 'library'], function (exports, _react, _library) {
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
define('rrwebFrequentlyAskedQuestions-portlet-conf',['react', 'react-dom', 'library', './specificComponents/dist/FAQThemes', './specificComponents/dist/FAQQuestions'], function (_react, _reactDom, _library, _FAQThemes, _FAQQuestions) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _library2 = _interopRequireDefault(_library);

	var _FAQThemes2 = _interopRequireDefault(_FAQThemes);

	var _FAQQuestions2 = _interopRequireDefault(_FAQQuestions);

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

	var FrequentlyAskedQuestionsConfiguration = function (_React$Component) {
		_inherits(FrequentlyAskedQuestionsConfiguration, _React$Component);

		function FrequentlyAskedQuestionsConfiguration(props) {
			_classCallCheck(this, FrequentlyAskedQuestionsConfiguration);

			var _this = _possibleConstructorReturn(this, (FrequentlyAskedQuestionsConfiguration.__proto__ || Object.getPrototypeOf(FrequentlyAskedQuestionsConfiguration)).call(this, props));

			_this.getQuestionList = function () {
				lib.getAJAXCall({
					method: 'GET',
					url: lib.urlsLibrary.faq,
					callback: function callback(questionsList) {

						_this.setState({
							questionsList: questionsList
						});
					}
				});
			};

			_this.getThemeList = function () {
				lib.getAJAXCall({
					method: 'GET',
					url: lib.urlsLibrary.theme,
					callback: function callback(themesList) {

						_this.setState({
							themesList: themesList
						});
					}
				});
			};

			_this.state = {
				questionsList: [],
				themesList: []
			};
			return _this;
		}

		_createClass(FrequentlyAskedQuestionsConfiguration, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.getQuestionList();
				this.getThemeList();
			}
		}, {
			key: 'render',
			value: function render() {
				var _state = this.state;
				var questionsList = _state.questionsList;
				var themesList = _state.themesList;


				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(_FAQQuestions2.default, {
						questionsList: questionsList,
						onChange: this.getQuestionList
					}),
					_react2.default.createElement('br', null),
					_react2.default.createElement('hr', null),
					_react2.default.createElement(_FAQThemes2.default, {
						questionsList: questionsList,
						themesList: themesList,
						onChange: this.getThemeList
					})
				);
			}
		}]);

		return FrequentlyAskedQuestionsConfiguration;
	}(_react2.default.Component);

	_reactDom2.default.render(_react2.default.createElement(FrequentlyAskedQuestionsConfiguration, null), document.getElementById('container-conf'));
});
require(["rrwebFrequentlyAskedQuestions-portlet-conf"], function () {});
//# sourceMappingURL=main-conf.js.map
