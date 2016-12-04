define(['exports', 'react', 'react-dom', './../../../../../../../common/components/dist/PaginationRegular', 'library'], function (exports, _react, _reactDom, _PaginationRegular, _library) {
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