import React from 'react';
import ReactDOM from 'react-dom';
import PaginationRegular from './../../../../../../../common/components/dist/PaginationRegular';

import library from 'library';
let lib = library.lib;

class FrequentlyAskedQuestions extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			themesList: [],
			faqList: [],
			currentTheme: null,
			archiveOfSelectTheme: [],
			filterInput: '',
			currentFilter: '',
			currentArchive: [],
		}
	}

	componentDidMount() {
		this.getThemeList();
	}

	getThemeList = () => {		
		lib.getAJAXCall({
			method: 'GET',
			url: lib.urlsLibrary.theme,
			callback: (themesList) => {
				themesList.sort(function compareNumbers(a, b) {
					return a.sort - b.sort;
				});
				
				/*if (!!this.props.quantity) {
					themesList.length = this.props.quantity; 
				}*/
				
				this.setState({
					themesList,
				}, this.getFaqList);
			}
		});
	};

	getFaqList = () => {
		let {filterInput, themesList} = this.state;
		
		lib.getAJAXCall({
			method: 'GET',
			url: lib.urlsLibrary.faq,
			callback: (faqList) => {
				let archiveOfSelectTheme = lib.createArchiveElements(themesList, faqList, "faqIds");
								
				if (!!filterInput.length) {
					for (let theme in archiveOfSelectTheme) {
						archiveOfSelectTheme[theme].map((question) => {
							let re = new RegExp(filterInput,'g');
							
							question.answerText = question.answerText.replace(re,"<strong>" + filterInput + "</strong>");
							question.questionText = question.questionText.replace(re,"<strong>" + filterInput + "</strong>")
						})
					}
				}
				

				this.setState({
					faqList,
					archiveOfSelectTheme,
				});
			}
		});
	};

	selectTheme = (id) => {
			this.setState({
				currentTheme: this.state.currentTheme == id ? null : id
			})
	};
	
	searchWord = (filterInput) => {
		let url = lib.urlsLibrary.theme;
		
		if (filterInput) {
			url += 'word/' + filterInput;
		}
		
		lib.getAJAXCall({
			method: 'GET',
			url,
			callback: (themesList) => {
				/*if (!!this.props.quantity) {
					themesList.length = quantity; 
				}*/
				
				if (filterInput) {
					themesList.map((theme) => {
						let re = new RegExp(filterInput,'g');
						
						theme.name = theme.name.replace(re,"<strong>" + filterInput + "</strong>");
					})
				}

				this.setState({
					themesList: themesList.sort(function compareNumbers(a, b) {
						return a.sort - b.sort;
					}),
					currentFilter: filterInput || '',
				}, this.getFaqList);
			}
		});
	}

	setCurrentArchive = (currentArchive) => {
		this.setState({
			currentArchive
		})
	}

	render() {
		let {parentClass} = this.props;
		let {themesList, archiveOfSelectTheme, currentTheme, filterInput, currentFilter, currentArchive} =  this.state;
		
		return (

			<div id="faq" className={["container ng-scope", this.props.parentClass ? this.props.parentClass : ''].join(' ')}>
				<h1>Часто задаваемые вопросы</h1>
				
				<p className="paragraph">Позволяет найти ответы на основные вопросы, или задать свой вопрос – ответ будет в течение нескольких дней отправлен на указанную электронную почту.</p>

				<div className="page_search all-theme">
					<form>
						<div className="white_input">
							<input type="text" placeholder="Поиск по ключевым словам"
								value={filterInput}
								onChange={(e) => {
									this.setState({
										filterInput: e.target.value
									})
								}}
							/>
						</div>
							
						{!!currentFilter.length && 
							<a className='clear-filter' onClick={() => {
								this.setState({
									filterInput: '',
								}, this.searchWord)
							}}>Очистить поисковую фразу [x]</a>
						}						
						
						<div className="button grey_button">
							<input type="button" value="найти"
								onClick={() => this.searchWord(filterInput)}/>
						</div>
					</form>
				</div>

				<div className="js-tabNav all-theme">
					<a className="dash_link js-tabLink active">Все часто задаваемые вопросы!</a>
				</div>

				<div id="all" className="js-tab button_tabs">
					<div className="js-tabNav">
						<a className="js-tabLink active">актуальные вопросы</a>
					</div>
					
					<div id="questions" className={parentClass == "actual" ? "content" : ''}>
						<div className="H4 black">Темы:</div>
						
						<div className="H4 black all-theme">популярные запросы:</div>
	
						{!!Object.keys(archiveOfSelectTheme).length &&
							<ol className="open_list js-accordion">
								{currentArchive.map((theme, id) => {
									return (
										<li key={id} className="js-accordionBox">
										<div
											onClick={() => this.selectTheme(id)}
											className={["open_title js-accordionOpen", (currentTheme == id) ? "open": ""].join(" ")}
										>
											<span dangerouslySetInnerHTML={{__html: theme.name}}/>
	
										</div>
	
											<ul className="list_box js-accordionContent">
	
												{archiveOfSelectTheme[theme.id] && 
													archiveOfSelectTheme[theme.id].sort(function compareNumbers(a, b) {
														return a.sort - b.sort;
													})
													.map((question, id) => {
	
														return (
															<li  key={id} >
																<p>Вопрос {id + 1}: <span dangerouslySetInnerHTML={{__html: question.questionText}}/></p>
																
																Ответ:
																<div dangerouslySetInnerHTML={{__html: question.answerText}} />
															</li>
														)
												})}
											</ul>
										</li>
									)
								})}
							</ol>
						}
						
						<div className="faq_link">
			                <p>Не нашли ответ на интересующий вас вопрос? Воспользуйтесь расширенным поиском</p>
			                <a className="button blue_button" href={this.props.detailUrl}>Расширенный поиск</a>
			            </div>
					</div>
				
					
				</div>
				
				<div className='all-theme'>
					<PaginationRegular itemsArchive={themesList} count={this.props.quantity} onChange={this.setCurrentArchive}/>
				</div>

				<div className="clear"></div>
			</div>
		);
	}
}

export default FrequentlyAskedQuestions;