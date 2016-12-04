
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>

<portlet:defineObjects />

<div class="calendar-news">
	
		<p class="text">Показать результат за период с</p>
		<input type="text" id="datepickerBefore" class="dateInput" placeholder="ДД/ММ/ГГГГ">
		<p class="text">по </p>
		<input type="text" id="datepickerAfter" class="dateInput" placeholder="ДД/ММ/ГГГГ">
		<span class="search-btn"/></span>
		<span class="clean-btn">Сбросить</span>
	
</div>