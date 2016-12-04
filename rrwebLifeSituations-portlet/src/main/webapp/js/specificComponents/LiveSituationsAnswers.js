import React from 'react';

import library from 'library';
let lib = library.lib;

class LiveSituationsAnswers extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentAnswer: 0,
			edit: false,
			developedAnswer: {},
			tmpAnswer: "",
			errors: [],
		}
	};

	clearState = () => {
		let onChange = this.props.onChange;

		this.setState({
			developedAnswer: {},
			edit: false,
			currentAnswer: 0,
			errors: [],
		}, () => {
			onChange()
		});
	};

	selectChangeOption = (e) => {
		let currentId = e.target.value;
		let currentAnswer;

		this.props.answersList.map((item, index) => {
			if (index == currentId) {
				currentAnswer = index;
			}
		});

		this.setState({currentAnswer});
	};

	createAnswer = () => {
		this.setState({
			developedAnswer: {"name": '', 'questionId': this.props.currentQuestion.id},
			edit: true,
		});
	};

	editAnswer = () => {
		let {currentAnswer} = this.state;

		lib.getAJAXCall({
			method: 'GET',
			url: lib.urlsLibrary.answer + this.props.currentQuestion.id + "/" + this.props.answersList[currentAnswer].id,
			callback: (answer) => {
				this.setState({
					developedAnswer: answer,
					edit: true,
				});
			}
		});
	};

	saveAnswer = () => {
		let developedAnswer = this.state.developedAnswer;
		let tests = {
			name: {
				approve: developedAnswer.name.length <= 0,
				descr: "Введите ответ"
			},
		};

		lib.checkValidation(tests, () => {
			if (Object.keys(this.state.errors).length === 0) {
				let method = 'PUT';

				if (!developedAnswer.id && developedAnswer.id !== 0) {
					method = 'POST';
				}

				lib.getAJAXCall({
					method: method,
					url: lib.urlsLibrary.answer,
					data: developedAnswer,
					callback: this.clearState
				});
			}
		}, this);
	};

	deleteAnswer = () => {
		let {currentAnswer} = this.state;

		if (lib.deleteConfirmation()) {
			lib.getAJAXCall({
				method: 'DELETE',
				url: lib.urlsLibrary.answer + this.props.answersList[currentAnswer].id,
				deleteCallback: this.clearState,
			});
		}
	};

	render() {
		let {answersList} = this.props;
		let {currentAnswer, edit, developedAnswer, errors} = this.state;

		return (
			<div>

				{!edit
					? <div>
					<select onChange={this.selectChangeOption} className="form-control">
						{answersList.map((item, id) => {
							return (
								<option key={id}
								        value={id}
								        className={(currentAnswer === item) ? 'active' : '' }>
									{item.name}
								</option>
							)
						})}
					</select>

					<div className="bs-example">
						<button type="button" className="btn btn-primary" onClick={this.editAnswer}>Редактировать</button>
						<button type="button" className="btn btn-primary" onClick={this.createAnswer}>Создать</button>
					</div>

				</div>
					: <div>
					<label className="row">
						<p className="col-xs-12">Название:</p>

						<div className="col-xs-12">
							<input className="form-control"
							       value={developedAnswer.name}
							       onChange={(e) => {
								       let obj = developedAnswer;
								       obj.name = e.target.value;

								       this.setState({developedAnswer: obj})
							       }}
							/>
						</div>

						{(errors['name']) ? (
							<div className="clearfix col-xs-12">
								<span className="has-error-text">{errors['name']}</span>
							</div>
						):(null)}
					</label>

					{/*<label>
					 Сортировка:
					 <input className="form-control"
					 type="number"
					 value={developedAnswer.sortOrder}
					 onChange={(e) => {
					 let obj = developedAnswer;
					 obj.sortOrder = Number(e.target.value);

					 this.setState({developedAnswer: obj})
					 }}
					 />
					 </label>*/}

					<div className="bs-example">
						{(developedAnswer.id || developedAnswer.id === 0) &&
						<button type="button" className="btn btn-danger" onClick={this.deleteAnswer}>Удалить</button>
						}

						<button type="button" className="btn " onClick={this.clearState}>Отменить</button>
						<button type="button" className="btn btn-success" onClick={this.saveAnswer}>Сохранить</button>
					</div>

					<hr />
				</div>
				}
			</div>
		);
	}
}

LiveSituationsAnswers.propTypes = {
	answersList: React.PropTypes.array,
};

LiveSituationsAnswers.defaultProps = {
	answersList: [],
};


export default LiveSituationsAnswers;