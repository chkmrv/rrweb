define('specificComponents/../../../../../../common/components/dist/PaginationRegular',['exports', 'react', 'react-dom'], function (exports, _react, _reactDom) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _reactDom2 = _interopRequireDefault(_reactDom);

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

	var ModalSelecor = function (_React$Component) {
		_inherits(ModalSelecor, _React$Component);

		function ModalSelecor() {
			_classCallCheck(this, ModalSelecor);

			return _possibleConstructorReturn(this, (ModalSelecor.__proto__ || Object.getPrototypeOf(ModalSelecor)).apply(this, arguments));
		}

		_createClass(ModalSelecor, [{
			key: 'render',
			value: function render() {
				var _this2 = this;

				return _react2.default.createElement(
					'div',
					{ id: 'pagingModal', className: 'yui3-widget overlay yui3-widget-positioned yui3-widget-modal yui3-widget-stacked overlay-focused' },
					_react2.default.createElement(
						'div',
						{ className: 'overlay-content yui3-widget-stdmod' },
						_react2.default.createElement(
							'div',
							{ className: 'yui3-widget-bd' },
							_react2.default.createElement(
								'div',
								{ className: 'open' },
								_react2.default.createElement(
									'ul',
									{ className: 'dropdown-menu lfr-menu-list direction-down', role: 'menu', style: { 'display': 'block' } },
									this.props.archive.map(function (item, index) {
										return _react2.default.createElement(
											'li',
											{ key: index },
											_react2.default.createElement(
												'a',
												{ className: 'taglib-icon focus', tabIndex: '0', onClick: function onClick() {
														return _this2.props.onClick(index);
													} },
												_react2.default.createElement(
													'span',
													{ className: 'taglib-text-icon' },
													index + 1
												)
											)
										);
									})
								)
							)
						)
					)
				);
			}
		}]);

		return ModalSelecor;
	}(_react2.default.Component);

	var PageSelector = function (_React$Component2) {
		_inherits(PageSelector, _React$Component2);

		function PageSelector() {
			_classCallCheck(this, PageSelector);

			return _possibleConstructorReturn(this, (PageSelector.__proto__ || Object.getPrototypeOf(PageSelector)).apply(this, arguments));
		}

		_createClass(PageSelector, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: 'lfr-pagination-page-selector' },
					_react2.default.createElement(
						'div',
						{ className: ["btn-group lfr-icon-menu current-page-menu", this.props.open ? 'open' : ''].join(' ') },
						_react2.default.createElement(
							'a',
							{
								className: 'dropdown-toggle direction-down max-display-items-15 btn',
								title: 'Страница ' + this.props.currentPage + ' из ' + this.props.total,
								onClick: this.props.onClick
							},
							_react2.default.createElement(
								'span',
								{ className: 'lfr-icon-menu-text' },
								'Страница ',
								this.props.currentPage,
								' из ',
								this.props.total
							),
							_react2.default.createElement('i', { className: 'caret' })
						)
					)
				);
			}
		}]);

		return PageSelector;
	}(_react2.default.Component);

	var ItemsInformer = function (_React$Component3) {
		_inherits(ItemsInformer, _React$Component3);

		function ItemsInformer() {
			_classCallCheck(this, ItemsInformer);

			return _possibleConstructorReturn(this, (ItemsInformer.__proto__ || Object.getPrototypeOf(ItemsInformer)).apply(this, arguments));
		}

		_createClass(ItemsInformer, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: 'lfr-pagination-delta-selector' },
					' — Элементов на странице: ',
					this.props.count
				);
			}
		}]);

		return ItemsInformer;
	}(_react2.default.Component);

	var ResultInformer = function (_React$Component4) {
		_inherits(ResultInformer, _React$Component4);

		function ResultInformer() {
			_classCallCheck(this, ResultInformer);

			return _possibleConstructorReturn(this, (ResultInformer.__proto__ || Object.getPrototypeOf(ResultInformer)).apply(this, arguments));
		}

		_createClass(ResultInformer, [{
			key: 'render',
			value: function render() {
				var _props = this.props;
				var from = _props.from;
				var to = _props.to;
				var totalItems = _props.totalItems;


				return _react2.default.createElement(
					'small',
					{ className: 'search-results' },
					'Показывается результатов: ',
					from,
					' ',
					to - from !== 0 ? '- ' + to : '',
					' из ',
					totalItems,
					'.'
				);
			}
		}]);

		return ResultInformer;
	}(_react2.default.Component);

	var Button = function (_React$Component5) {
		_inherits(Button, _React$Component5);

		function Button() {
			_classCallCheck(this, Button);

			return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
		}

		_createClass(Button, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'li',
					{ style: { 'cursor': 'pointer' }, className: [this.props.className, this.props.status ? 'disabled' : ''].join(' ') },
					_react2.default.createElement(
						'a',
						{ target: '_self', onClick: this.props.onClick },
						this.props.label
					)
				);
			}
		}]);

		return Button;
	}(_react2.default.Component);

	var ButtonsPanel = function (_React$Component6) {
		_inherits(ButtonsPanel, _React$Component6);

		function ButtonsPanel() {
			_classCallCheck(this, ButtonsPanel);

			return _possibleConstructorReturn(this, (ButtonsPanel.__proto__ || Object.getPrototypeOf(ButtonsPanel)).apply(this, arguments));
		}

		_createClass(ButtonsPanel, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'ul',
					{ className: 'pager lfr-pagination-buttons' },
					this.props.children
				);
			}
		}]);

		return ButtonsPanel;
	}(_react2.default.Component);

	var PaginationRegular = function (_React$Component7) {
		_inherits(PaginationRegular, _React$Component7);

		function PaginationRegular(props) {
			_classCallCheck(this, PaginationRegular);

			var _this8 = _possibleConstructorReturn(this, (PaginationRegular.__proto__ || Object.getPrototypeOf(PaginationRegular)).call(this, props));

			_this8.itemsArchiveParser = function () {

				var currentArchive = _this8.props.itemsArchive;
				var count = _this8.props.count === 0 ? _this8.props.itemsArchive.length : Number(_this8.props.count);
				var newArchive = [];
				var part = currentArchive.length % count || 0;
				var full = currentArchive.length === 0 ? 0 : Math.ceil(currentArchive.length / count);

				//TODO: change for reduce
				for (var i = 0, start = 0, end = count; i < full; i++, start += count, end += count) {
					if (i == full) {
						end = end + part;
					}

					newArchive.push(currentArchive.slice(start, end));
				}

				_this8.setState({
					currentArchive: full === 0 ? [[]] : newArchive,
					currentPage: 0
				}, function () {
					_this8.setCurrentArchive();
					_this8.setStatus();
					_this8.hideSelector();
				});
			};

			_this8.setCurrentArchive = function () {
				var _this8$state = _this8.state;
				var currentPage = _this8$state.currentPage;
				var currentArchive = _this8$state.currentArchive;


				_this8.props.onChange(currentArchive[currentPage]);
			};

			_this8.setPage = function (number) {
				if (number !== _this8.state.currentPage) {
					_this8.setState({
						currentPage: number
					}, function () {
						_this8.setCurrentArchive();
						_this8.setStatus();
						_this8.hideSelector();
					});
				}
			};

			_this8.setStatus = function () {
				var _this8$state2 = _this8.state;
				var status = _this8$state2.status;
				var currentPage = _this8$state2.currentPage;
				var currentArchive = _this8$state2.currentArchive;


				status.first = false;
				status.last = false;

				if (currentPage === 0) {
					status.first = true;
				}

				if (currentPage === currentArchive.length - 1) {
					status.last = true;
				}

				_this8.setState({ status: status });
			};

			_this8.pageNext = function () {
				var _this8$state3 = _this8.state;
				var currentPage = _this8$state3.currentPage;
				var currentArchive = _this8$state3.currentArchive;


				if (currentPage !== currentArchive.length - 1) {
					_this8.setPage(currentPage + 1);
				}
			};

			_this8.pageLast = function () {
				var _this8$state4 = _this8.state;
				var currentPage = _this8$state4.currentPage;
				var currentArchive = _this8$state4.currentArchive;


				if (currentPage !== currentArchive.length - 1) {
					_this8.setPage(currentArchive.length - 1);
				}
			};

			_this8.pagePrevious = function () {
				var currentPage = _this8.state.currentPage;


				if (currentPage !== 0) {
					_this8.setPage(currentPage - 1);
				}
			};

			_this8.pageFirst = function () {
				var currentPage = _this8.state.currentPage;


				if (currentPage !== 0) {
					_this8.setPage(0);
				}
			};

			_this8.showSelector = function () {
				_this8.setState({
					isShowModalSelector: !_this8.state.isShowModalSelector
				});
			};

			_this8.hideSelector = function () {
				_this8.setState({
					isShowModalSelector: false
				});
			};

			_this8.state = {
				currentPage: 0,
				currentArchive: [[]],
				status: {
					first: true,
					last: false
				},
				isShowModalSelector: false
			};
			return _this8;
		}

		_createClass(PaginationRegular, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.itemsArchiveParser();
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate(state) {
				if (state.itemsArchive != this.props.itemsArchive) {
					this.itemsArchiveParser();
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _props2 = this.props;
				var count = _props2.count;
				var itemsArchive = _props2.itemsArchive;
				var _state = this.state;
				var currentPage = _state.currentPage;
				var currentArchive = _state.currentArchive;
				var status = _state.status;
				var isShowModalSelector = _state.isShowModalSelector;

				var fromItem = count * currentPage + 1;

				//TODO: change testing
				var toItem = !!currentArchive[currentPage] ? count * currentPage + currentArchive[currentPage].length : 0;

				var itemsCounter = count == 0 ? itemsArchive.length : Math.min(count, itemsArchive.length);

				return _react2.default.createElement(
					'div',
					{ className: 'taglib-page-iterator' },
					_react2.default.createElement(
						'div',
						{ className: 'clearfix lfr-pagination' },
						_react2.default.createElement(
							'div',
							{ className: 'lfr-pagination-config' },
							_react2.default.createElement(PageSelector, { currentPage: currentPage + 1, total: currentArchive.length, onClick: this.showSelector, open: isShowModalSelector }),
							isShowModalSelector && _react2.default.createElement(ModalSelecor, { archive: currentArchive, onClick: this.setPage }),
							_react2.default.createElement(ItemsInformer, { count: itemsCounter })
						),
						_react2.default.createElement(ResultInformer, {
							totalItems: itemsArchive.length,
							from: fromItem,
							to: toItem
						}),
						_react2.default.createElement(
							ButtonsPanel,
							null,
							_react2.default.createElement(Button, { onClick: this.pageFirst, label: ' ← Первый ', status: status.first, className: 'first' }),
							_react2.default.createElement(Button, { onClick: this.pagePrevious, label: ' Предыдущий ', status: status.first }),
							_react2.default.createElement(Button, { onClick: this.pageNext, label: ' Следующий ', status: status.last }),
							_react2.default.createElement(Button, { onClick: this.pageLast, label: ' Последний → ', status: status.last, className: 'last' })
						)
					)
				);
			}
		}]);

		return PaginationRegular;
	}(_react2.default.Component);

	PaginationRegular.propTypes = {
		itemsArchive: _react2.default.PropTypes.array
	};

	PaginationRegular.defaultProps = {
		itemsArchive: []
	};

	exports.default = PaginationRegular;
});
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
define('specificComponents/dist/FrequentlyAskedQuestions',['exports', 'react', 'react-dom', './../../../../../../../common/components/dist/PaginationRegular', 'library'], function (exports, _react, _reactDom, _PaginationRegular, _library) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _PaginationRegular2 = _interopRequireDefault(_PaginationRegular);

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

	var FrequentlyAskedQuestions = function (_React$Component) {
		_inherits(FrequentlyAskedQuestions, _React$Component);

		function FrequentlyAskedQuestions(props) {
			_classCallCheck(this, FrequentlyAskedQuestions);

			var _this = _possibleConstructorReturn(this, (FrequentlyAskedQuestions.__proto__ || Object.getPrototypeOf(FrequentlyAskedQuestions)).call(this, props));

			_this.getThemeList = function () {
				lib.getAJAXCall({
					method: 'GET',
					url: lib.urlsLibrary.theme,
					callback: function callback(themesList) {
						themesList.sort(function compareNumbers(a, b) {
							return a.sort - b.sort;
						});

						/*if (!!this.props.quantity) {
      	themesList.length = this.props.quantity; 
      }*/

						_this.setState({
							themesList: themesList
						}, _this.getFaqList);
					}
				});
			};

			_this.getFaqList = function () {
				var _this$state = _this.state;
				var filterInput = _this$state.filterInput;
				var themesList = _this$state.themesList;


				lib.getAJAXCall({
					method: 'GET',
					url: lib.urlsLibrary.faq,
					callback: function callback(faqList) {
						var archiveOfSelectTheme = lib.createArchiveElements(themesList, faqList, "faqIds");

						if (!!filterInput.length) {
							for (var theme in archiveOfSelectTheme) {
								archiveOfSelectTheme[theme].map(function (question) {
									var re = new RegExp(filterInput, 'g');

									question.answerText = question.answerText.replace(re, "<strong>" + filterInput + "</strong>");
									question.questionText = question.questionText.replace(re, "<strong>" + filterInput + "</strong>");
								});
							}
						}

						_this.setState({
							faqList: faqList,
							archiveOfSelectTheme: archiveOfSelectTheme
						});
					}
				});
			};

			_this.selectTheme = function (id) {
				_this.setState({
					currentTheme: _this.state.currentTheme == id ? null : id
				});
			};

			_this.searchWord = function (filterInput) {
				var url = lib.urlsLibrary.theme;

				if (filterInput) {
					url += 'word/' + filterInput;
				}

				lib.getAJAXCall({
					method: 'GET',
					url: url,
					callback: function callback(themesList) {
						/*if (!!this.props.quantity) {
      	themesList.length = quantity; 
      }*/

						if (filterInput) {
							themesList.map(function (theme) {
								var re = new RegExp(filterInput, 'g');

								theme.name = theme.name.replace(re, "<strong>" + filterInput + "</strong>");
							});
						}

						_this.setState({
							themesList: themesList.sort(function compareNumbers(a, b) {
								return a.sort - b.sort;
							}),
							currentFilter: filterInput || ''
						}, _this.getFaqList);
					}
				});
			};

			_this.setCurrentArchive = function (currentArchive) {
				_this.setState({
					currentArchive: currentArchive
				});
			};

			_this.state = {
				themesList: [],
				faqList: [],
				currentTheme: null,
				archiveOfSelectTheme: [],
				filterInput: '',
				currentFilter: '',
				currentArchive: []
			};
			return _this;
		}

		_createClass(FrequentlyAskedQuestions, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.getThemeList();
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var parentClass = this.props.parentClass;
				var _state = this.state;
				var themesList = _state.themesList;
				var archiveOfSelectTheme = _state.archiveOfSelectTheme;
				var currentTheme = _state.currentTheme;
				var filterInput = _state.filterInput;
				var currentFilter = _state.currentFilter;
				var currentArchive = _state.currentArchive;


				return _react2.default.createElement(
					'div',
					{ id: 'faq', className: ["container ng-scope", this.props.parentClass ? this.props.parentClass : ''].join(' ') },
					_react2.default.createElement(
						'h1',
						null,
						'Часто задаваемые вопросы'
					),
					_react2.default.createElement(
						'p',
						{ className: 'paragraph' },
						'Позволяет найти ответы на основные вопросы, или задать свой вопрос – ответ будет в течение нескольких дней отправлен на указанную электронную почту.'
					),
					_react2.default.createElement(
						'div',
						{ className: 'page_search all-theme' },
						_react2.default.createElement(
							'form',
							null,
							_react2.default.createElement(
								'div',
								{ className: 'white_input' },
								_react2.default.createElement('input', { type: 'text', placeholder: 'Поиск по ключевым словам',
									value: filterInput,
									onChange: function onChange(e) {
										_this2.setState({
											filterInput: e.target.value
										});
									}
								})
							),
							!!currentFilter.length && _react2.default.createElement(
								'a',
								{ className: 'clear-filter', onClick: function onClick() {
										_this2.setState({
											filterInput: ''
										}, _this2.searchWord);
									} },
								'Очистить поисковую фразу [x]'
							),
							_react2.default.createElement(
								'div',
								{ className: 'button grey_button' },
								_react2.default.createElement('input', { type: 'button', value: 'найти',
									onClick: function onClick() {
										return _this2.searchWord(filterInput);
									} })
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'js-tabNav all-theme' },
						_react2.default.createElement(
							'a',
							{ className: 'dash_link js-tabLink active' },
							'Все часто задаваемые вопросы!'
						)
					),
					_react2.default.createElement(
						'div',
						{ id: 'all', className: 'js-tab button_tabs' },
						_react2.default.createElement(
							'div',
							{ className: 'js-tabNav' },
							_react2.default.createElement(
								'a',
								{ className: 'js-tabLink active' },
								'актуальные вопросы'
							)
						),
						_react2.default.createElement(
							'div',
							{ id: 'questions', className: parentClass == "actual" ? "content" : '' },
							_react2.default.createElement(
								'div',
								{ className: 'H4 black' },
								'Темы:'
							),
							_react2.default.createElement(
								'div',
								{ className: 'H4 black all-theme' },
								'популярные запросы:'
							),
							!!Object.keys(archiveOfSelectTheme).length && _react2.default.createElement(
								'ol',
								{ className: 'open_list js-accordion' },
								currentArchive.map(function (theme, id) {
									return _react2.default.createElement(
										'li',
										{ key: id, className: 'js-accordionBox' },
										_react2.default.createElement(
											'div',
											{
												onClick: function onClick() {
													return _this2.selectTheme(id);
												},
												className: ["open_title js-accordionOpen", currentTheme == id ? "open" : ""].join(" ")
											},
											_react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: theme.name } })
										),
										_react2.default.createElement(
											'ul',
											{ className: 'list_box js-accordionContent' },
											archiveOfSelectTheme[theme.id] && archiveOfSelectTheme[theme.id].sort(function compareNumbers(a, b) {
												return a.sort - b.sort;
											}).map(function (question, id) {

												return _react2.default.createElement(
													'li',
													{ key: id },
													_react2.default.createElement(
														'p',
														null,
														'Вопрос ',
														id + 1,
														': ',
														_react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: question.questionText } })
													),
													'Ответ:',
													_react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: question.answerText } })
												);
											})
										)
									);
								})
							),
							_react2.default.createElement(
								'div',
								{ className: 'faq_link' },
								_react2.default.createElement(
									'p',
									null,
									'Не нашли ответ на интересующий вас вопрос? Воспользуйтесь расширенным поиском'
								),
								_react2.default.createElement(
									'a',
									{ className: 'button blue_button', href: this.props.detailUrl },
									'Расширенный поиск'
								)
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'all-theme' },
						_react2.default.createElement(_PaginationRegular2.default, { itemsArchive: themesList, count: this.props.quantity, onChange: this.setCurrentArchive })
					),
					_react2.default.createElement('div', { className: 'clear' })
				);
			}
		}]);

		return FrequentlyAskedQuestions;
	}(_react2.default.Component);

	exports.default = FrequentlyAskedQuestions;
});
define('rrwebFrequentlyAskedQuestions-portlet',['react', 'react-dom', './specificComponents/dist/FrequentlyAskedQuestions'], function (_react, _reactDom, _FrequentlyAskedQuestions) {
  'use strict';

  var _react2 = _interopRequireDefault(_react);

  var _reactDom2 = _interopRequireDefault(_reactDom);

  var _FrequentlyAskedQuestions2 = _interopRequireDefault(_FrequentlyAskedQuestions);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});
require(["rrwebFrequentlyAskedQuestions-portlet"], function () {});