<%@ include file="init.jsp"%>

<c:if test='<%=controlNavPosition.equals("inside")%>' >
	<style>
	.flexslider{margin: 0;}
	.flex-control-nav{bottom: 5px;}
	</style>
</c:if>


<div class="flexslider">
	<ul class="slides sliderContent">


    <%
	  for (int i = 0; i < imageUrls.length; i++) {
	      String caption = StringPool.BLANK;
	      
	      if (i < captions.length) {
	          caption = captions[i];
	      }
	      String link = StringPool.POUND;
	
	      if (i < links.length) {
	          link = links[i];
	      }
	%>
		<li class="item">
		  	<a class="image" href="<%=link%>"><img src="<%=imageUrls[i]%>" /></a>
		  	<div class="slide_pahel">
				<c:if test="<%=showCaption%>" >
					<a href="<%=link%>"><div class="slide_title"><p><%=caption%>&nbsp;</p></div></a>
	          	</c:if>
			</div>
		</li>
    <%
      }
    %>
	</ul>
</div>


<input id="carousel_pausePlay" type="hidden" value="<%=pausePlay%>"/>
<input id="carousel_animation" type="hidden" value="<%=animation%>"/>
<input id="carousel_direction" type="hidden" value="<%=direction%>"/>
<input id="carousel_animationLoop" type="hidden" value="<%=animationLoop%>"/>
<input id="carousel_slideshow" type="hidden" value="<%=slideshow%>"/>
<input id="carousel_slideshowSpeed" type="hidden" value="<%=slideshowSpeed%>"/>
<input id="carousel_animationSpeed" type="hidden" value="<%=animationSpeed%>"/>