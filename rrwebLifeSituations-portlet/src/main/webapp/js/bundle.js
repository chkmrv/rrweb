import React from 'react';
import ReactDOM from 'react-dom';

import library from 'library';
let lib = library.lib;

class LiveSituations extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			defaultOperations: 'Выбрать операцию',
			openOperations: false, //открыт ли дропдаун операций
			changeObject: true,    //нажал ли кто на другой обьект
			getObjectsList: [],
			getOperationsList: [],
			currentObject: {},
			currentOperation: {}
		}
	}

	componentDidMount() {
		lib.getAJAXCall({
			method: 'GET',
			url: lib.urlsLibrary.object,
			callback: (getObjects) => {
				let getObjectsList = getObjects.map((item)=> {
					return {
						id: item.id,
						img: item.img,
						name: item.name
					}
				});
				this.setState({
					getObjectsList: getObjectsList,
					currentObject: getObjectsList[0].id
				});
			}
		});

		lib.getAJAXCall({
			method: 'GET',
			url: lib.urlsLibrary.operation,
			callback: (getOperations) => {
				let getOperationsList = getOperations.map((item)=> {
					return {
						id: item.id,
						name: item.name,
						category: item.category,
						objectIds: item.objectIds
					}
				});
				this.setState({
					getOperationsList: getOperationsList
				});
			}
		});
	}

	render() {

		let  {
			getOperationsList,
			getObjectsList,
			currentObject,
			currentOperation,
			openOperations,
			defaultOperations,
			changeObject
		} = this.state;

		return (
			<div className="container ng-scope">
				<div className="column_2">
					<div className="column_2_1">
						<div className="step_title">
							1. Выберите объект
						</div>

						<div className="step_description">
							операцию по которому вы планируете совершить
						</div>
					</div>

					<div className="column_2_2">
						<div className="step_title">
							2. Выберите операцию
						</div>

						<div className="step_description">
							которую вы планируете совершить
						</div>
					</div>

					<div className="clear"></div>
				</div>

				<div className="column_3">
					<div className="column_3_1">
						<div id="choose_object" className="box shadow">
							<div id="interior_border-choose_object" className="box">
								<ul className="nav nav-list">
									{getObjectsList.map((item) => {
										return (
											<li key={item.id} className={currentObject == item.id ? "ng-scope active" : "ng-scope"}>
												<a id={item.id} className="ng-binding"
												   onClick={(event) => {
													   this.setState({
														   currentObject: parseInt(event.target.id),
														   changeObject: true,
														   openOperations: false
													   })
												   }}
												>{item.name}</a>
											</li>
										)
									})}
								</ul>
							</div>
						</div>
					</div>

					<div className="column_3_2">
						<div id="choose_operation">
							<div className="sbHolder ng-isolate-scope">
								<a className={openOperations ? "sbToggle sbToggleOpen" : "sbToggle"}></a>

								<a className="sbSelector ng-binding"
								   onClick={() => {
									   this.setState({openOperations: true})
								   }}
								>
									{(changeObject) ? defaultOperations :
										(getOperationsList.map((item) => {
											if (item.id == currentOperation) return item.name
										}))
									}
								</a>

								{(openOperations) ? (
									<ul className="sbOptions ng-hide">
										<li className="ng-scope">
											<a href="#" className="sbSub ng-binding">Выбрать операцию</a>
										</li>

										<li className="ng-scope">
											<ul className="sbSubOptions">
												{<span className="sbGroup ng-binding">Регистрация прав:</span>}
												{getOperationsList.map((item) => {
													if (item.objectIds) {
														if ((item.category == 1) && (item.objectIds.indexOf(currentObject) != -1)) {
															return (
																<li key={item.id} className="ng-scope">
																	<a id={item.id} className="sbSub ng-binding"
																	   onClick={(event) => {
																		   this.setState({
																			   changeObject: false,
																			   openOperations: false,
																			   currentOperation: parseInt(event.target.id)
																		   })
																	   }}
																	>{item.name}</a>
																</li>
															)
														}
													}
												})}
											</ul>
										</li>

										<li className="ng-scope">
											<ul className="sbSubOptions">
												<span className="sbGroup ng-binding">Кадастровый учёт:</span>

												{getOperationsList.map((item) => {
													if (item.objectIds) {
														if ((item.category == 0) && (item.objectIds.indexOf(currentObject) != -1)) {
															return (
																<li key={item.id} className="ng-scope">
																	<a id={item.id} className="sbSub ng-binding"
																	   onClick={(event) => {
																		   this.setState({
																			   changeObject: false,
																			   openOperations: false,
																			   currentOperation: parseInt(event.target.id)
																		   })
																	   }}
																	>{item.name}</a>
																</li>
															)
														}
													}
												})}
											</ul>
										</li>
									</ul>
								) : (null)}
							</div>
						</div>

						<div id="illustration">
							<img src='/rrwebLifeSituations-portlet/images/step_1.png' alt='home'/>
						</div>

						<div className="instruction">Для начала выберите объект! имущества и вид операции по нему</div>

						<button className="doc_prepare"
						        onClick={() => {
							        if (currentOperation >= 0) {
								        ReactDOM.render(
									        <RegistrationRight
										        currentObject={currentObject}
										        currentOperation={currentOperation}
										        getObjectsList={getObjectsList}
										        getOperationsList={getOperationsList}
									        />,
									        document.getElementById('container')
								        );
							        }
						        }}>
							Подготовить документы
						</button>
					</div>
				</div>

				<div className="column_4">
					<div className="column_4_1">
						<div className="consultation ng-binding">Если Вашего случая здесь нет — <br/>
							получите консультацию по номеру:<br/>
							8 (800) 100 34 34
						</div>
					</div>
				</div>

				<div className="clear"></div>
			</div>
		);
	}
}

/*---------------------------------RegistrationRight-----step2-----------------------*/
/*---------------------------------RegistrationRight-----step2-----------------------*/


class RegistrationRight extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			getStandardsList: [],
			getQuestionsList: [],
			currentDocumentsList: [],
			currentQuestions: [],
			currentDocuments: [],
			currentStandard: {},

			questionArr: [],
			answerArr: [],

			currentObject: this.props.currentObject,
			currentOperation: this.props.currentOperation,
			getObjectsList: this.props.getObjectsList,
			getOperationsList: this.props.getOperationsList,
		}
	}

	componentDidMount() {
		let currentObject = this.props.currentObject,
			currentOperation = this.props.currentOperation;

		lib.getAJAXCall({
			method: 'GET',
			url: lib.urlsLibrary.standard,
			callback: (getStandards) => {
				let getStandardsList = getStandards.filter((item)=> {
					let returnThis, curOper = currentOperation;

					if (item.operationIds) {
						item.operationIds.map((el)=> {
							if (el == curOper) {
								returnThis = true;
								if (item.objectIds) {
									returnThis = item.objectIds.indexOf(currentObject) != -1;
								}
							}
						});

						if (returnThis) {
							return {
								id: item.id,
								link: item.link,
								description: item.description,
								maxtime: item.maxtime,
								paymentTitle: item.paymentTitle,
								paymentPrivate: item.paymentPrivate,
								paymentLegal: item.paymentLegal,
								operationIds: item.operationIds,
								objectIds: item.objectIds
							}
						}
					}
				});
				this.setState({
					getStandardsList: getStandardsList,
					currentStandard: getStandardsList[0]
				});
			}
		});

		lib.getAJAXCall({
			method: 'GET',
			url: lib.urlsLibrary.question,
			callback: (getQuestions) => {
				let getQuestionsList = getQuestions.filter((item)=> {
					let returnThis, curOper = currentOperation;

					if (item.operationIds) {
						item.operationIds.map((el)=> {
							if (el === curOper) {
								returnThis = true;
								if (item.objectIds) {
									returnThis = item.objectIds.indexOf(currentObject) != -1;
								}
							}
						});

						if (returnThis) {
							return {
								id: item.id,
								name: item.name,
								answers: item.answers,
								objectIds: item.objectIds,
								operationIds: item.operationIds,
							}
						}
					}
				});
				this.setState({
					getQuestionsList: getQuestionsList
				});
			}
		});

		lib.getAJAXCall({
			method: 'GET',
			url: lib.urlsLibrary.match + currentOperation,
			callback: (object) => {
				this.setState({
					currentDocumentsList: object
				});
			}
		});

	}

	addDocument = (questionId, answerId) => {
		let state = this.state,
			scopeQuestion = state.questionArr,
			scopeAnswer = state.answerArr,
			idArrQuestion = scopeQuestion.indexOf(questionId);  //номер вопроса в массиве всех вопросов

		if (idArrQuestion != -1) {
			scopeQuestion[idArrQuestion] = questionId;
			scopeAnswer[idArrQuestion] = answerId;
		} else {
			scopeQuestion.push(questionId);
			scopeAnswer.push(answerId);
		}

		lib.getAJAXCall({
			method: 'GET',
			url: lib.urlsLibrary.match + state.currentOperation + '/' + scopeQuestion.join(',') + '/' + scopeAnswer.join(','),
			callback: (object) => {
				this.setState({
					currentDocumentsList: object,
					questionArr: scopeQuestion,
					answerArr: scopeAnswer
				});
			}
		});
	};

	topPage = () => {
		$("html, body").animate({scrollTop: 0}, "slow");
		return false;
	};

	render() {

		let {
			getOperationsList,
			getObjectsList,
			getQuestionsList,
			currentObject,
			currentOperation,
			currentStandard,
			currentDocumentsList,
		} = this.state;

		return (
			<div className="content column_5 ng-scope">
				<div className="column_5_1">
					<div id="registration">
						Регистрация прав
					</div>
				</div>

				<div className="column_5_2">
					<div className="consultation ng-binding">Если Вашего случая здесь нет — <br/>
						получите консультацию по номеру:<br/>
						8 (800) 100 34 34
					</div>
				</div>

				<div className="clear"></div>

				<div className="main_form box shadow">
					<div className="column_5_3 ng-scope">
						{(currentStandard) &&
						<div id="info_standard" className="box shadow">
							<ul>
								<li>
									<b className="ng-binding">Стандарт услуги</b>
								</li>

								<li className="standatr-list ng-scope">
									<div className="wrap_maxtime">
										<span className="maxtime_title">Максимальный срок<br/>предоставления услуги</span>
										<span className="maxtime">{currentStandard.maxtime}</span>
										<span className="maxtime_text">рабочих <br/> дней</span>
										<div className="clear"></div>
									</div>
								</li>

								<li className="cost ng-scope">
									<span className="maxtime_title"> </span>
									<span className="num">{currentStandard.paymentPrivate} –</span>
									<span className="text">физ. лица</span><br/>
									<span className="num">{currentStandard.paymentLegal} –</span>
									<span className="text">юр. лица</span>
								</li>

								<li className="appointment">
									<a target="_blank" className="ng-binding" href={currentStandard.link}>Записаться на прием</a>
								</li>
							</ul>
						</div>
						}
					</div>
					<div className="column_6">
						<div className="main_description">
							<p className="title ng-binding">
								{getObjectsList.map((item) => {
									if (item.id == currentObject) return item.name
								})}
							</p>

							<p>
								<i className="desc ng-binding">
									{getOperationsList.map((item) => {
										if (item.id == currentOperation) return item.name
									})}
								</i>
							</p>
						</div>

						<div className="clear"></div>
					</div>

					<div className="column_7"></div>

					<div className="column_8">
						<div className="column_8_1">
							<p className="column_title">1. Заполнение анкеты:</p>

							<div className="column_description"><i className="ng-binding">Для того, чтобы правильно сформировать пакет
								необходимых для предоставления услуги документов, Вам необходимо уточнить следующую информацию:</i>
							</div>

							{/*--------question list--------------------------*/ }

							{getQuestionsList.map((item, id) => {
								return (
									<div key={item.id} className="questions_list">
										<span className="ng-binding"> <b>{id + 1}. {item.name}</b></span>
										{item.answers.map((el) => {
											return (
												<div key={el.id} className="question">
													<label className="radio">
														<input type="radio"
														       name={"answers" + item.id}
														       className="ng-scope"
														       value={el.id}
														       onChange={() => {
															       this.addDocument(item.id, Number(el.id))
														       }}/>
														<span className="ng-binding">{el.name}</span>
													</label>
												</div>
											);
										})}
									</div>
								);
							})}
						</div>

						<div className="column_8_2">
							<p className="column_title">2. Перечень документов</p>

							<div className="column_description"><p><i className="ng-binding">В этом разделе подобран комплект
								документов на основании Ваших ответов на вопросы в предыдущих этапах</i></p></div>

							<b className="common_list_doc">Общий перечень:</b>

							<ol id="doc_title_list">
								{currentDocumentsList.map((item, id) => {
									return (
										<li key={id} className="ng-binding ng-scope">{item.name}</li>
									);
								})}
							</ol>
						</div>
						<div className="clear"></div>
					</div>

					<div className="column_11">
						<div className="scroll_top" onClick={() => {
							this.topPage();
						}}>К началу страницы
						</div>
					</div>
				</div>
				<div className="column_9">
					<button className="button_back"
					        onClick={() => {
						        ReactDOM.render(
							        <LiveSituations/>,
							        document.getElementById('container')
						        );
					        }}
					>
						<img alt="" src="/rrwebLifeSituations-portlet/images/arrow_b.png"/>
						Назад
					</button>

					<button className="button_next"
					        onClick={() => {

						        ReactDOM.render(
							        <ShowDocument
								        currentDocumentsList={currentDocumentsList}
								        currentObject={currentObject}
								        currentOperation={currentOperation}
								        currentStandard={currentStandard}
								        getObjectsList={getObjectsList}
								        getOperationsList={getOperationsList}
							        />,
							        document.getElementById('container')
						        );
					        }}
					>
						<img alt="" src="/rrwebLifeSituations-portlet/images/arrow.png"/>
						Далее
					</button>
				</div>
				<div className="clear"></div>
			</div>
		);
	}
}

/*---------------------------------ShowDocument-----step3-----------------------*/
/*---------------------------------ShowDocument-----step3-----------------------*/


class ShowDocument extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentObject: this.props.currentObject,
			currentOperation: this.props.currentOperation,
			getObjectsList: this.props.getObjectsList,
			getOperationsList: this.props.getOperationsList,
			currentDocumentsList: this.props.currentDocumentsList,
		}
	}

	printDocument = () => {
		let printing_css = '<style media=print>#wrap_print {display: block; visibility: visible; border: 2px solid #ccc;}</style>';
		let html_to_print = printing_css + $('#wrap_print').html();
		let iframe = $('<iframe id="print_frame">');
		$('body').append(iframe);
		let doc = $('#print_frame')[0].contentDocument || $('#print_frame')[0].contentWindow.document;
		let win = $('#print_frame')[0].contentWindow || $('#print_frame')[0];
		doc.getElementsByTagName('body')[0].innerHTML = html_to_print;
		win.print();
		$('iframe').remove();
	};

	topPage = () => {
		$("html, body").animate({scrollTop: 0}, "slow");
		return false;
	};

	render() {

		let {
			currentDocumentsList,
			getObjectsList,
			getOperationsList,
			currentOperation,
			currentObject,
			currentStandard,
		} = this.state;

		return (
			<div className="content column_5 ng-scope">
				<div className="column_5_1">
					<div id="registration">
						Регистрация прав
					</div>
				</div>

				<div className="column_5_2">
					<div className="consultation ng-binding">Если Вашего случая здесь нет — <br/>получите консультацию по
						номеру:<br/>8 (800) 100 34 34
					</div>
				</div>

				<div className="clear"></div>
				<div className="main_form box shadow">
					<div className="column_5_3 ng-scope">
						{(currentStandard) &&
						<div id="info_standard" className="box shadow">
							<ul>
								<li>
									<b className="ng-binding">Стандарт услуги</b>
								</li>

								<li className="standatr-list ng-scope">
									<div className="wrap_maxtime">
										<span className="maxtime_title">Максимальный срок<br/>предоставления услуги</span>
										<span className="maxtime">{currentStandard.maxtime}</span>
										<span className="maxtime_text">рабочих <br/> дней</span>
										<div className="clear"></div>
									</div>
								</li>

								<li className="cost ng-scope">
									<span className="maxtime_title"> </span>
									<span className="num">{currentStandard.paymentPrivate} –</span>
									<span className="text">физ. лица</span><br/>
									<span className="num">{currentStandard.paymentLegal} –</span>
									<span className="text">юр. лица</span>
								</li>

								<li className="appointment">
									<a target="_blank" className="ng-binding" href={currentStandard.link}>Записаться на прием</a>
								</li>
							</ul>
						</div>
						}
					</div>
					<div id="wrap_print">
						<div className="column_6">
							<div className="main_description">
								<p className="title ng-binding">
									{getObjectsList.map((item) => {
										if (item.id == currentObject) return item.name
									})}
								</p>

								<p>
									<i className="desc ng-binding">
										{getOperationsList.map((item) => {
											if (item.id == currentOperation) return item.name
										})}
									</i>
								</p>
							</div>

							<div className="clear"></div>
						</div>

						<div className="column_7 step_2"></div>

						<div className="column_14 full">
							<div className="column_8_4">
								<p className="column_title">2. Перечень документов</p>

								<div className="column_description">
									<p>
										<i className="ng-binding">В этом разделе подобран комплект
											документов на основании Ваших ответов на вопросы в предыдущих этапах</i>
									</p>
								</div>

								<b className="common_list_doc">Общий перечень:</b>

								<ol id="doc_title_list">
									{currentDocumentsList.map((item, id) => {
										return (
											<li key={id} className="ng-binding ng-scope">{item.name}</li>
										);
									})}
								</ol>
							</div>
							<div className="clear"></div>
						</div>
					</div>

					<div className="column_11">
						<div className="scroll_top" onClick={() => {
							this.topPage();
						}}>К началу страницы
						</div>
					</div>
				</div>

				<div className="column_9">
					<button className="button_back"
					        onClick={() => {
						        ReactDOM.render(
							        <LiveSituations/>,
							        document.getElementById('container')
						        );
					        }}>
						<img alt="" src="/rrwebLifeSituations-portlet/images/arrow_b.png"/>
						Назад
					</button>

					<button className="button_next button_save"
					        onClick={() => {
						        this.printDocument();
					        }}>
						<img alt="" src="/rrwebLifeSituations-portlet/images/print_icon.png"/>
						Распечатать
					</button>

					<a href="/elektronnye-uslugi-servisy" className="button_next button_save">
						<img alt="" src="/rrwebLifeSituations-portlet/images/rr_icon.png" />
						Электронные услуги
					</a>
				</div>

				<div className="clear"></div>
			</div>
		);
	}
}

ReactDOM.render(
	<LiveSituations/>,
	document.getElementById('container')
);
