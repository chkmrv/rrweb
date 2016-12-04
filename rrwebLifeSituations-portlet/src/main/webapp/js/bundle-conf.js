import React from 'react';
import ReactDOM from 'react-dom';

import library from 'library';
let lib = library.lib;

import LiveSituationsObjects from './specificComponents/dist/LiveSituationsObjects';
import LiveSituationsOperations from './specificComponents/dist/LiveSituationsOperations';
import LiveSituationsQuestions from './specificComponents/dist/LiveSituationsQuestions';
import LiveSituationsStandards from './specificComponents/dist/LiveSituationsStandards';
import LiveSituationsDocuments from './specificComponents/dist/LiveSituationsDocuments';
import LiveSituationsMatches from './specificComponents/dist/LiveSituationsMatches';

class LiveSituationsConfiguration extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			objectsList: [],
			operationsList: [],
			questionsList: [],
			answersList: [],
			standardsList: [],
			documentsList: [],
			matchesList: [],
		}
	}

	componentDidMount() {
		this.getObjectList();
		this.getOperationList();
		this.getQuestionList();
		this.getAnswersList();
		this.getStandardList();
		this.getDocumentList();
		this.getMatchesList();
	}


	getObjectList = () => {
		lib.getAJAXCall({
			method: 'GET',
			url: lib.urlsLibrary.object,
			callback: (objects) => {

				this.setState({
					objectsList: objects,
				});
			}
		});
	};

	getOperationList = () => {
		lib.getAJAXCall({
			method: 'GET',
			url: lib.urlsLibrary.operation,
			callback: (operations) => {

				this.setState({
					operationsList: operations,
				});
			}
		});
	};

	getQuestionList = () => {
		lib.getAJAXCall({
			method: 'GET',
			url: lib.urlsLibrary.question,
			callback: (questions) => {
				this.setState({
					questionsList: questions
				});
			}
		});
	};

	getAnswersList = () => {
		lib.getAJAXCall({
			method: 'GET',
			url: lib.urlsLibrary.answer,
			callback: (answers) => {

				this.setState({
					answersList: answers,
				});
			}
		});
	};

	getStandardList = () => {
		lib.getAJAXCall({
			method: 'GET',
			url: lib.urlsLibrary.standard,
			callback: (standards) => {
				this.setState({
					standardsList: standards
				});
			}
		});
	};

	getDocumentList = () => {
		lib.getAJAXCall({
			method: 'GET',
			url: lib.urlsLibrary.document,
			callback: (documents) => {
				this.setState({
					documentsList: documents
				});
			}
		});
	};

	getMatchesList = () => {
		lib.getAJAXCall({
			method: 'GET',
			url: lib.urlsLibrary.match,
			callback: (match) => {
				this.setState({
					matchesList: match
				});
			}
		});
	};

	render() {
		let {objectsList, operationsList, questionsList, standardsList, documentsList, matchesList, answersList} = this.state;

		return (
			<div>
				<LiveSituationsObjects
					objectsList={objectsList}
					onChange={this.getObjectList}
				/>

				<br />
				<hr />

				<LiveSituationsOperations
					objectsList={objectsList}
					operationsList={operationsList}
					onChange={this.getOperationList}
				/>

				<br />
				<hr />

				<LiveSituationsQuestions
					objectsList={objectsList}
					operationsList={operationsList}
					questionsList={questionsList}
					onChange={this.getQuestionList}
				/>

				<br />
				<hr />

				<LiveSituationsStandards
					objectsList={objectsList}
					operationsList={operationsList}
					standardsList={standardsList}
					onChange={this.getStandardList}
				/>

				<br />
				<hr />

				<LiveSituationsDocuments
					objectsList={objectsList}
					operationsList={operationsList}
					documentsList={documentsList}
					onChange={this.getDocumentList}
				/>

				<br />
				<hr />

				<LiveSituationsMatches
					operationsList={operationsList}
					questionsList={questionsList}
					answersList={answersList}
					documentsList={documentsList}
					matchesList={matchesList}
					onChange={this.getMatchesList}
				/>
			</div>
		);
	}
}

ReactDOM.render(
	<LiveSituationsConfiguration />,
	document.getElementById('container-conf')
);
