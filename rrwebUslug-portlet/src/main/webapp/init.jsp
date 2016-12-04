<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://liferay.com/tld/aui" prefix="aui" %>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %>
<%@ taglib uri="http://liferay.com/tld/portlet" prefix="liferay-portlet" %>
<%@ taglib uri="http://liferay.com/tld/ui" prefix="liferay-ui" %>

<%@ page import="com.liferay.portal.kernel.util.ParamUtil" %>
<%@ page import="com.liferay.portal.kernel.util.GetterUtil" %>
<%@ page import="com.liferay.portal.kernel.util.Validator" %>
<%@ page import="com.liferay.portal.kernel.util.Constants" %>
<%@ page import="com.liferay.portal.kernel.util.StringPool" %>
<%@ page import="com.liferay.portlet.PortletPreferencesFactoryUtil" %>

<%@ page import="javax.portlet.PortletPreferences" %>

<portlet:defineObjects />
<liferay-theme:defineObjects />

<%
PortletPreferences preferences = liferayPortletRequest.getPreferences();

String portletResource = ParamUtil.getString(request, "portletResource");

if (Validator.isNotNull(portletResource)) {
    preferences = PortletPreferencesFactoryUtil.getPortletSetup(request, portletResource);
}

String[] imageUrls = preferences.getValues("imageUrls", new String[0]);
String[] captions = preferences.getValues("captions", new String[0]);
String[] texts = preferences.getValues("texts", new String[0]);
String[] links = preferences.getValues("links", new String[0]);

if (imageUrls.length == 0) {
    imageUrls = new String[1];
    imageUrls[0] = StringPool.BLANK;
}

String animation = preferences.getValue("animation", "fade");
String direction = preferences.getValue("direction", "horizontal");
String controlNavPosition = preferences.getValue("controlNavPosition", "outside");

boolean showCaption = GetterUtil.getBoolean(preferences.getValue("showCaption", Boolean.FALSE.toString()));
boolean pausePlay = GetterUtil.getBoolean(preferences.getValue("pausePlay", Boolean.TRUE.toString()));
boolean animationLoop = GetterUtil.getBoolean(preferences.getValue("animationLoop", Boolean.TRUE.toString()));
boolean slideshow = GetterUtil.getBoolean(preferences.getValue("slideshow", Boolean.TRUE.toString()));

long slideshowSpeed = GetterUtil.getLong(preferences.getValue("slideshowSpeed", "7000"));
long animationSpeed = GetterUtil.getLong(preferences.getValue("animationSpeed", "600"));

%>