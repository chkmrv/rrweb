<%@ include file="init.jsp" %>

<%
String redirect = ParamUtil.getString(request, "redirect");
%>

<liferay-portlet:actionURL portletConfiguration="true" var="configurationURL" />

<aui:form action="<%=configurationURL%>" method="post" name="fm">
    <aui:input name="<%=Constants.CMD%>" type="hidden" value="<%=Constants.UPDATE%>" />
    <aui:input name="redirect" type="hidden" value="<%=redirect%>" />

    <liferay-ui:panel-container extended="<%= true %>" id="responsiveCarouselSettingsPanelContainer" persistState="<%= true %>">
	    <liferay-ui:panel collapsible="<%= true %>" extended="<%= true %>" id="responsiveCarouselSettingsPanel" persistState="<%= true %>" title="carousel-images">
			<aui:fieldset cssClass="carousel-images">

				<script type="text/javascript" src="/rrwebLifeSituations-portlet/js/donors/babel-core.min.js"></script>
				<script type="text/javascript" src="/rrwebLifeSituations-portlet/js/donors/jquery.min.js"></script>
				<script type="text/javascript" src="/rrwebLifeSituations-portlet/js/donors/require.js"></script>

				<script type="text/javascript" >
					require.config({
						paths: {
							"react": "/rrwebLifeSituations-portlet/js/donors/react",
							"react-dom": "/rrwebLifeSituations-portlet/js/donors/react-dom",
							"library": "/rrwebLifeSituations-portlet/js/library",
							},
							waitSeconds: 15
						});

				</script>

				<div id="container-conf"></div>

				<script type="text/javascript" src="/rrwebLifeSituations-portlet/js/main-conf.js"></script>
				<link rel="stylesheet" type="text/css" href="/rrwebLifeSituations-portlet/css/main.css">


			</aui:fieldset>
		</liferay-ui:panel>
    </liferay-ui:panel-container>

	<aui:button-row>
        <aui:button type="submit" />
    </aui:button-row>
</aui:form>

<aui:script use="liferay-auto-fields">
    new Liferay.AutoFields(
        {
            contentBox: 'fieldset.carousel-images',
            fieldIndexes: '<portlet:namespace />carouselImagesIndexes'
        }
    ).render();
</aui:script>
