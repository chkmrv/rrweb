
<%@ page import="com.liferay.portal.kernel.util.PropsUtil" %>
<%@ page import="com.liferay.portlet.asset.model.AssetCategory" %>
<%@ page import="com.liferay.portlet.asset.model.AssetVocabulary" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Collections" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>

<portlet:defineObjects />
<script src="/rrwebRootMainTemplate-theme/js/jquery.auto-complete.js"></script>

<div id="page_header">
	<div class="container-fluid">
		<div id="top_panel">
			<div id="top_lang" class="js-slideContainer">
				<div class="current_lang js-slideOpen">Рус
					<span class="flag_RU"></span>
				</div>
				<div class="choice_lang js-slideBox">
					<a class="selected" href="https://rosreestr.ru/site/">
						<span class="flag_RU"></span>Русский</a>
					<a href="https://rosreestr.ru/site/en/">
						<span class="flag_EN"></span>english</a>
				</div>
			</div>

			<div id="top_location" class="top_location js-openContainer" style="position: relative;">
				<%
					String currentRegionName = "Москва";
					String currentRegionId = "25918";

					AssetVocabulary voc = com.liferay.portlet.asset.service.AssetVocabularyLocalServiceUtil.getVocabulary(25917);
					List<AssetCategory> categories = voc == null ? Collections.<AssetCategory>emptyList() : voc.getCategories();

					Cookie[] cookies = request.getCookies();
					if (categories != null && !categories.isEmpty() && cookies != null && cookies.length > 0) {
						for (Cookie cookie : cookies) {
							if ("liferay_regionId".equals(cookie.getName())) {
								for (AssetCategory cat : categories) {
									String regionId = String.valueOf(cat.getCategoryId());
									String regionName = cat.getName();
									if (regionId.equals(cookie.getValue())) {
										currentRegionName = regionName;
										currentRegionId = regionId;
										break;
									}
								}
								break;
							}
						}
					}
				%>
			    <div class="current_location js-open" data-regionid="<%= currentRegionId%>"><%= currentRegionName%></div>
			    <div class="search_location js-openBox">
			        <div class="criss_cross js-close"></div>
			        <form id="current_location_form" onsubmit="$('#region').blur();return false;" class="pure-form">
			        	<div id="current_location_form">
				            <div class="input">
				                <input name="region" type="text" placeholder="Укажите регион" autocomplete="off" data-kladr-type="region" id="region"  autofocus type="text">
				                <div class="button blue_button">
				                    <input type="submit" value="Найти">
				                </div>
								<div class="clearfix"></div>
				            </div>
			            </div>
			        </form>
			    </div>
			</div>
			<div class="top_link akk">
				<a style="margin-right: 10px;" href="<%=PropsUtil.get("rrweb.lk.url")%>">
				<img src="/rrwebRootMainTemplate-theme/images/icon-user.png" alt="Версия для слабовидящих">
					<div>Вход в личный кабинет</div>
				</a>
			</div>
			<div class="top_link">
				<a style="margin-right: 10px;" id="no_see" href="./?contrast=Y">
				<img src="/rrwebRootMainTemplate-theme/images/eye.png" alt="Версия для слабовидящих" width="106" height="71">
					<div>Версия для слабовидящих</div>
				</a>
			</div>
		</div>
		<header id="banner" role="banner" class="vm aliluya">
			<div id="heading">

				<a class="logo_css_class" href="/" title="#language_format ("go-to-x", [$site_name])">
					<img alt="logo" src="/rrwebRootMainTemplate-theme/images/logo.png" />
				</a>
				<div class="top_contact_block">
					<div>Единый справочный телефон:</div>
					<div class="phone_number"><a style="text-decoration: none" href="skype:88001003434?call">8 (800) 100-34-34</a></div>
					<div class="grey">Звонок из регионов России бесплатный</div>
				</div>
				<div class="top_contact_block">
					<div>Телефон доверия:</div>
					<div class="phone_number"><a style="text-decoration: none" href="skype:84959173825?call">(495) 917-38-25</a></div>
				</div>
				<div class="soc_block">
					<form id="top_search" action="/site/search/">
						<div class="white_input">
							<input type="text" name="q" value="" maxlength="50" placeholder="Поиск по сайту">
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
