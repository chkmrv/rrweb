
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>

<portlet:defineObjects />
<%@ include file="init.jsp"%>
<div id="container"></div>

<script type="text/javascript" src="/rrwebFrequentlyAskedQuestions-portlet/js/library.js"></script>
<script type="text/javascript" src="/rrwebFrequentlyAskedQuestions-portlet/js/main.js"></script>

<script type="text/javascript">
	define('rrwebFrequentlyAskedQuestions',['react', 'react-dom', './specificComponents/dist/FrequentlyAskedQuestions'], function (_react, _reactDom, _FrequentlyAskedQuestions) {
		'use strict';

		var _react2 = _interopRequireDefault(_react);

		var _reactDom2 = _interopRequireDefault(_reactDom);

		var _FrequentlyAskedQuestions2 = _interopRequireDefault(_FrequentlyAskedQuestions);

		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : {
				default: obj
			};
		}
		

		_reactDom2.default.render(_react2.default.createElement(_FrequentlyAskedQuestions2.default, {
				quantity: <%=quantitys.length==0 ? 0 : quantitys[0]%>,
				parentClass: "<%=captions.length==0 ? "0" : captions[0]%>",
				detailUrl: "<%=links.length==0 ? "0" : links[0]%>",
			}), document.getElementById('container'));
	});
	require(["rrwebFrequentlyAskedQuestions"], function () {});
</script>


