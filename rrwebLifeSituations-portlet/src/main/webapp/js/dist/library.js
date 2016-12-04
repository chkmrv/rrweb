define('library',["module"], function (module) {
	"use strict";

	alert('7');

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
		/*object: '/rest-service/api/object/',
		 operation: '/rest-service/api/operation/',
		 answer: '/rest-service/api/answer/',
		 question: '/rest-service/api/question/',
		 standard: '/rest-service/api/standard/',
		 document: '/rest-service/api/document/',
		 match: '/rest-service/api/match/',*/

		/*object: 'http://192.168.5.28:9094/rest-service/api/object/',
		 operation: 'http://192.168.5.28:9094/rest-service/api/operation/',
		 answer: 'http://192.168.5.28:9094/rest-service/api/answer/',
		 question: 'http://192.168.5.28:9094/rest-service/api/question/',
		 standard: 'http://192.168.5.28:9094/rest-service/api/standard/',
		 document: 'http://192.168.5.28:9094/rest-service/api/document/',
		 match: 'http://192.168.5.28:9094/rest-service/api/match/',*/

		object: 'http://localhost:9094/rest-service/api/object/',
		operation: 'http://localhost:9094/rest-service/api/operation/',
		answer: 'http://localhost:9094/rest-service/api/answer/',
		question: 'http://localhost:9094/rest-service/api/question/',
		standard: 'http://localhost:9094/rest-service/api/standard/',
		document: 'http://localhost:9094/rest-service/api/document/',
		match: 'http://localhost:9094/rest-service/api/match/'
	};

	module.exports = {
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
//# sourceMappingURL=library.js.map
