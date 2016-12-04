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
		
				<%
		            for (int i = 0; i < imageUrls.length; i++) {
		                String caption = StringPool.BLANK;
		
		                if (i < captions.length) {
		                    caption = captions[i];
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
						<aui:input cssClass="lfr-input-text-container" label="caption"
							name='<%="caption" + i%>' value="<%=caption%>" />
						<aui:input cssClass="lfr-input-text-container" label="link"
		                    name='<%="link" + i%>' value="<%=link%>" />
					</div>
				</div>
		
		        <%
		        }
		        %>
		
			</aui:fieldset>
		</liferay-ui:panel>
    </liferay-ui:panel-container>
	<aui:fieldset>
        <aui:select label="animation" name="preferences--animation--">
            <aui:option label="fade" selected='<%= animation.equals("fade") %>' />
            <aui:option label="slide" selected='<%= animation.equals("slide") %>' />
        </aui:select>
        
        <aui:select label="direction" name="preferences--direction--">
            <aui:option label="horizontal" selected='<%= direction.equals("horizontal") %>' />
            <aui:option label="vertical" selected='<%= direction.equals("vertical") %>' />
        </aui:select>
        
        <aui:select label="control-nav-position" name="preferences--controlNavPosition--">
            <aui:option label="outside" selected='<%= controlNavPosition.equals("outside") %>' />
            <aui:option label="inside" selected='<%= controlNavPosition.equals("inside") %>' />
        </aui:select>
        
        <aui:input name="preferences--showCaption--" type="checkbox" value="<%= showCaption %>" />
        
        <aui:input helpMessage="preferences-pausePlay-help-message" name="preferences--pausePlay--" type="checkbox" value="<%=pausePlay%>" />
        
        <aui:input helpMessage="preferences-animationLoop-help-message" name="preferences--animationLoop--" type="checkbox" value="<%= animationLoop %>" />
        
        <aui:input helpMessage="preferences-slideshow-help-message" name="preferences--slideshow--" type="checkbox" value="<%= slideshow %>" />
        
        <aui:input helpMessage="preferences-slideshowSpeed-help-message" label="slideshow-speed" name="preferences--slideshowSpeed--" value="<%=slideshowSpeed%>" />

        <aui:input helpMessage="preferences-animationSpeed-help-message" label="animation-speed" name="preferences--animationSpeed--" value="<%=animationSpeed%>" />
    
    </aui:fieldset>
    
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
