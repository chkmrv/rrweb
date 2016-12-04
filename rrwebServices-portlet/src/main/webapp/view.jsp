<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="init.jsp"%>
<!-- 
<c:if test='<%=controlNavPosition.equals("inside")%>' >
	<style>
	.flexslider{margin: 0;}
	.flex-control-nav{bottom: 5px;}
	</style>
</c:if> -->

<div class="wrap-nav content_RM">
	<div class="title_service_portala">
		<p>Сервисы</p>
	</div>
	<ul class="nav">

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
	      String link = StringPool.POUND;
	
	      if (i < links.length) {
	          link = links[i];
	      }
	%>
		<li>
			<a href="<%=link%>">
				<div class="box_long_info_service_portala">
					<img alt="proverka.png" src="<%=imageUrls[i]%>">
					<div class="box_long_info_article_service_portala">
						<div class="box_long_info_title_service_portala"><%=caption%></div>
						<div class="box_long_info_text_service_portala"><%=text%></div>
					</div>
					<div class="clear">&nbsp;</div>
				</div>
			</a>
		</li>
    <%
      }
    %>
	</ul>
</div>