<%@ page import="com.liferay.portlet.asset.model.AssetCategory" %>
<%@ page import="com.liferay.portlet.asset.model.AssetVocabulary" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>

<portlet:defineObjects />

<div id="foot_wrap" class="css_main">
	<footer class="footer">
		<div class="width_fix">
		<nav id="foot_menu">
			<%@ include file="navigation.jsp" %>
		</nav>
		<nav class="useful_links">
			<table>
				<tr>
					<td width="300"><a href="#">Физическим лицам</a></td>
					<td width="300"><a href="#">Помощь и поддержка</a></td>
					<td width="300"><a href="#">Территориальная сеть</a></td>
				</tr>
				<tr>
					<td width="300"><a href="#">Юридическим лицам</a></td>
					<td width="300"><a href="#">Карта сайта</a></td>
					<td width="300" rowspan="2"><a href="#">Правила и условия <br> использования <br> контента сайта</a></td>
				</tr>	
				<tr>
					<td width="300"><a href="#">Специалистам</a></td>
					<td width="300"><a href="/site/en/">English version</a></td>
					<td width="300"></td>
				</tr>
			</table>	
		</nav>
		<div class="soc_block">
			<div class="wrap_social">
				<a target="_blank" rel="nofollow" class="soc_ico fb" href="https://www.facebook.com/rosreestr.ru"></a>
			</div>
			<div class="wrap_social">
				<a target="_blank" rel="nofollow" class="soc_ico vk" href="https://vk.com/rosreestr_ru"></a>
			</div>
			<div class="wrap_social">
				<a target="_blank" rel="nofollow" class="soc_ico tw" href="https://twitter.com/rosreestr_info"></a>
			</div>
			<div class="wrap_social">
				<a target="_blank" rel="nofollow" class="soc_ico lj" href="http://rosreestr.livejournal.com/"></a>
			</div>
			<div class="wrap_social">
				<a target="_blank" rel="nofollow" class="soc_ico rss" href="https://rosreestr.ru/site/rss/"></a>
			</div>
		</div>
		<div id="copy">
			© 2016 Федеральная служба государственной регистрации, кадастра и картографии
		</div>
        <div id="scroll_top">
            <span>Вверх</span>
        </div>
        </div>
	</footer>
</div>


<script async="" type="text/javascript">
		window.global_region = window.global_region || [];

		window.global_region = window.global_region || [];
		<% AssetVocabulary voc = com.liferay.portlet.asset.service.AssetVocabularyLocalServiceUtil.getVocabulary(25917);
			List<AssetCategory> categories = voc.getCategories();

		for(AssetCategory cat :  categories) {
			String regionId = String.valueOf(cat.getCategoryId());
			String regionName = cat.getName();
			if (!regionId.equals("29596")) {
		%>
		window.global_region.push({"id":"<%=regionId%>","name":"<%=regionName%>"});
		<%
			}
		}
		%>
		  var availableRegionNames = [];
		<%
			for(AssetCategory cat :  categories) {
				String regionName = cat.getName();
		%>
				availableRegionNames.push("<%=regionName%>");
		<%
			}

		%>
	    
		$("#region").on("keydown",(function(e){
			if(e.which == 13){
		        var catItem = this.value;
		        jQuery.grep(window.global_region, function( a ) {
		          if(a.name == catItem){
		            saveChoice(a.id);
		            jQuery("#top_location .current_location").text(a.name).attr('data-regionid',a.id);
		          }
		        });
			}
 		}));
           
		$(".autocomplete-suggestion, .current_location_form .button").on("click",(function(e){
	        var catItem = this.value;
	        jQuery.grep(window.global_region, function( a ) {
	          if(a.name == catItem){
	            saveChoice(a.id);
	            jQuery("#top_location .current_location").text(a.name).attr('data-regionid',a.id);
	          }
	        });
 		}));
  		function saveChoice(param){
            setCookie("liferay_regionId",param);
            location.reload();
      	}

        function getCookie(name) {
          var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
          ));
          return matches ? decodeURIComponent(matches[1]) : undefined;
        }

        function setCookie(name, value, options) {
          options = options || {};

          var expires = options.expires;

          if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
          }
          if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
          }

          value = encodeURIComponent(value);

          var updatedCookie = name + "=" + value;

          for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
              updatedCookie += "=" + propValue;
            }
          }

          document.cookie = updatedCookie;
        }
        
        $('#region').autoComplete({
            minChars: 1,
            source: function(term, suggest){
                term = term.toLowerCase();
               	var choices = window.global_region.map((item) => {
               		return item.name;
               	});
                var suggestions = [];
                for (i=0;i<choices.length;i++)
                    if (~choices[i].toLowerCase().indexOf(term)) 
                    	suggestions.push(choices[i]);
                suggest(suggestions);
            }
        });     
</script>