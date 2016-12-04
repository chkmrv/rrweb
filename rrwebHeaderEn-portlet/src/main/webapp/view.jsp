
<%@ page import="com.liferay.portal.kernel.util.PropsUtil" %>
<%@ page import="com.liferay.portlet.asset.model.AssetCategory" %>
<%@ page import="com.liferay.portlet.asset.model.AssetVocabulary" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>

<portlet:defineObjects />

<script src="/rrwebRootMainTemplate-theme/js/require.js"></script>
<script src="/rrwebRootMainTemplate-theme/js/jquery.auto-complete.js"></script>

<script type="text/javascript" >
  require.config({
    paths: {
        "react": "/rrwebRootMainTemplate-theme/js/donors/react",
        "react-dom": "/rrwebRootMainTemplate-theme/js/donors/react-dom",
        "moment": "/rrwebRootMainTemplate-theme/js/donors/moment.min",
        "jquery": "/rrwebRootMainTemplate-theme/js/donors/jquery.min",
        "jquery-ui": "/rrwebRootMainTemplate-theme/js/donors/jquery-ui.min",
    },
    waitSeconds: 15
  });
</script>

<div id="page_header">
	<div class="container-fluid">
		<div id="top_panel">
			<div id="top_lang" class="js-slideContainer">
				<div class="current_lang js-slideOpen">Eng
					<span class="flag_EN"></span>
				</div>
				<div class="choice_lang js-slideBox">
					<a class="selected" href="https://rosreestr.ru/site/">
						<span class="flag_RU"></span>Russian</a>
					<a href="https://rosreestr.ru/site/en/">
						<span class="flag_EN"></span>English</a>
				</div>
			</div>

			
			<div class="top_link akk">
				<a style="margin-right: 10px;" href="<%=PropsUtil.get("rrweb.lk.url")%>">
				<img src="/rrwebRootMainTemplate-theme/images/icon-user.png" alt="i">
					<div>Sign In</div>
				</a>
			</div>
			<div class="top_link">
				<a style="margin-right: 10px;" id="no_see" href="./?contrast=Y">
				<img src="/rrwebRootMainTemplate-theme/images/eye.png" alt="i" width="106" height="71">
					<div>Version for visually impaired</div>
				</a>
			</div>
		</div>
		<header id="banner" role="banner" class="vm aliluya">
			<div id="heading">

					<a class="logo_css_class" href="/" title="#language_format ("go-to-x", [$site_name])">
						<img alt="logo" src="/rrwebRootMainTemplate-theme/images/logo.png" />
					</a>
					<div class="top_contact_block">
						<div>Enquiry telephone:</div>
						<div class="phone_number"><a style="text-decoration: none" href="skype:88001003434?call">8 (800) 100-34-34</a></div>
						<div class="grey">Call from Russian regions are free</div>
					</div>
					<div class="top_contact_block">
						<div>Helpline:</div>
						<div class="phone_number"><a style="text-decoration: none" href="skype:84959173825?call">(495) 917-38-25</a></div>
					</div>
					<div class="soc_block">
						<form id="top_search" action="/site/search/">
							<div class="white_input">
								<input type="text" name="q" value="" maxlength="50" placeholder="Search">
								<span class="search_ico"></span>
							</div>
						</form>
					</div>

				<div class="clearfix"></div>
			</div>
			<%@ include file="navigation.jsp" %>
		</header>
	</div>
</div>