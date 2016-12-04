<%@ include file="init.jsp" %>

<%
String redirect = ParamUtil.getString(request, "redirect");
%>

<liferay-portlet:actionURL portletConfiguration="true" var="configurationURL" />

<c:if test='<%=controlNavPosition.equals("inside")%>' >
	<style>
		.lfr-input-text-container {
		    width: 400px;
		    height: 30px;
		    line-height: 30px;
		    outline: 0;
		    text-shadow: none;
		}
	</style>
</c:if>

<aui:form action="<%=configurationURL%>" method="post" name="fm">
    <aui:input name="<%=Constants.CMD%>" type="hidden" value="<%=Constants.UPDATE%>" />
    <aui:input name="redirect" type="hidden" value="<%=redirect%>" />

    <liferay-ui:panel-container extended="<%= true %>" id="responsiveCarouselSettingsPanelContainer" persistState="<%= true %>">
	    <liferay-ui:panel collapsible="<%= true %>" extended="<%= true %>" id="responsiveCarouselSettingsPanel" persistState="<%= true %>" title="carousel-images">
			<aui:fieldset cssClass="carousel-images">
		
				<%
		            for (int i = 0; i < imageUrls.length; i++) {
		                String caption = StringPool.BLANK;
		
		                if (i < captions.length) {
		                    caption = captions[i];
		                }
		                String text = StringPool.BLANK;
		
		                if (i < texts.length) {
		                    text = texts[i];
		                }
		                
		                String link = StringPool.BLANK;
		                
		                if (i < links.length) {
		                    link = links[i];
		                }
				%>
		
				<div class="lfr-form-row lfr-form-row-inline">
					<div class="row-fields">
						<aui:input cssClass="lfr-input-text-container" label="url"
							name='<%="imageUrl" + i%>' value="<%=imageUrls[i]%>" />
						<aui:input cssClass="lfr-input-text-container" label="Title"
							name='<%="caption" + i%>' value="<%=caption%>" />
						<aui:input cssClass="lfr-input-text-container" label="Text"
							name='<%="text" + i%>' value="<%=text%>" />
						<aui:input cssClass="lfr-input-text-container" label="link"
		                    name='<%="link" + i%>' value="<%=link%>" placeholder="/servicplayform?6349c5d1-7c70-4d72-b4c3-2b9ac13e077b"/>
					</div>
				</div>
		
		        <%
		        }
		        %>
		
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
