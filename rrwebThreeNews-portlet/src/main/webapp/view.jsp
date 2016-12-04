<%
    /**
     * Copyright (c) 2011-15 Tune IT.
     */
%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>

<portlet:defineObjects />

<%@ include file="./init.jsp" %>


<div id="main_news" class="main-news">
<div class="H1">Новости</div>
    <div class="news-in">
        <a class="arrow_link" href="https://rosreestr.ru/site/press/">Все новости</a>
        <ul class="">
            <li id="<portlet:namespace />news1" class="here news_link link_first">
                <img alt="<%= newsMap.get("topNewsText")%>" src="<%= newsMap.get("topImageURL")%>" class="news_image center" width="260" height="250">
                <a title="<%= newsMap.get("topNewsText")%>" href="<%= newsMap.get("topNewsURL")%>" class="news_content">
                    <span class="news_date"><%= format.format(((Calendar) newsMap.get("topNewsDate")).getTime())%></span>
                    <span class="news_anons"><%= newsMap.get("topNewsText")%></span>
                    <span class="news_more">Подробнее</span>
                </a>
            </li>
            <li id="<portlet:namespace />news2" class="news_link">
                <img alt="<%= newsMap.get("middleNewsText")%>" src="<%= newsMap.get("middleImageURL")%>" class="news_image center" width="260" height="250">
                <a title="<%= newsMap.get("middleNewsText")%>" href="<%= newsMap.get("middleNewsURL")%>" class="news_content">
                    <span class="news_date"><%= format.format(((Calendar) newsMap.get("middleNewsDate")).getTime())%></span>
                    <span class="news_anons"><%= newsMap.get("middleNewsText")%></span>
                    <span class="news_more">Подробнее</span>
                </a>
            </li>
            <li id="<portlet:namespace />news3" class="news_link">
                <img alt="<%= newsMap.get("bottomNewsText")%>" src="<%= newsMap.get("bottomImageURL")%>" class="news_image center" width="260" height="250">
                <a title="<%= newsMap.get("bottomNewsText")%>" href="<%= newsMap.get("bottomNewsURL")%>" class="news_content">
                    <span class="news_date"><%= format.format(((Calendar) newsMap.get("bottomNewsDate")).getTime())%></span>
                    <span class="news_anons"><%= newsMap.get("bottomNewsText")%></span>
                    <span class="news_more">Подробнее</span>
                </a>
            </li>
        </ul>
    </div>
</div>
