import React from 'react';
import ReactDOM from 'react-dom';

import library from 'library';
let lib = library.lib;

import FAQThemes from './specificComponents/dist/FAQThemes';
import FAQQuestions from './specificComponents/dist/FAQQuestions';

class FrequentlyAskedQuestionsConfiguration extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			questionsList: [],
			themesList: [],
		}
	}

	componentDidMount() {
		this.getQuestionList();
		this.getThemeList();
	}


	getQuestionList = () => {
		lib.getAJAXCall({
			method: 'GET',
			url: lib.urlsLibrary.faq,
			callback: (questionsList) => {

				this.setState({
					questionsList,
				});
			}
		});
	};

	getThemeList = () => {
		lib.getAJAXCall({
			method: 'GET',
			url: lib.urlsLibrary.theme,
			callback: (themesList) => {

				this.setState({
					themesList,
				});
			}
		});
	};

	render() {
		let {questionsList, themesList} = this.state;

		return (
			<div>
				<FAQQuestions
					questionsList={questionsList}
					onChange={this.getQuestionList}
				/>

				<br />
				<hr />

				<FAQThemes
					questionsList={questionsList}
					themesList={themesList}
					onChange={this.getThemeList}
				/>
			</div>
		);
	}
}

ReactDOM.render(
	<FrequentlyAskedQuestionsConfiguration />,
	document.getElementById('container-conf')
);
