/* Rebuilded on Thu Jun 09 2016 03:00:09 GMT+0300 (MSK)*/(function(){function addEvent(elem,type,handler){if(elem.addEventListener){elem.addEventListener(type,handler,false);}
else{elem.attachEvent("on"+type,handler);}}
var WidgetObject=function(){this.latestState=false;this.ce=function(el){return document.createElement(el);}
this.ge=function(id){return document.getElementById(id);}
this.documentHead=document.head||document.getElementsByTagName("head")[0]
this.hasClass=function(obj,className){var classAttr=obj.getAttribute('class');classAttr=classAttr?String(classAttr):'';var classes=classAttr.split(' ');for(var i=0;i<classes.length;i++){if(classes[i]==className){return true;}}
return false;}
this.addClass=function(obj,className){var classAttr=obj.getAttribute('class');classAttr=!classAttr?'':classAttr;if(!this.hasClass(obj,className)){obj.setAttribute('class',classAttr+(classAttr.length>0?' ':'')+className);}}
this.css=function(obj,param,value){var style=obj.getAttribute('style');if(!style){style='';}
var replace='';if(value!=undefined){replace=param+':'+value+';';}
var pattern=param+'\:([^;]+;?)';var regExp=new RegExp(pattern,'i');if(regExp.test(style)){style=style.replace(regExp,replace);}
else{style+=(style.length>0?';':'')+replace;}
if(style.length>0){obj.setAttribute('style',style);}}
this.addCss=function(){var csspath=new String("https://gosmonitor.ru/widget.css?id=234&no_visit_count=1&no_redir=1&field_mobid=234");if(document.createStyleSheet){document.createStyleSheet(csspath);}
else if(csspath.length>0){var styleEl=this.ce('link');styleEl.setAttribute('rel','stylesheet');styleEl.setAttribute('href',csspath);this.documentHead.appendChild(styleEl);}}
this.init=function(){var WidgetObj=this;var widgetMainWrapper=this.ce('div');widgetMainWrapper.setAttribute('id','gosmonitor_widget_wrapper_main');var widgetBody='<div class="miniwidget-wrapper">  <div class="prefix"></div>    <div class="numbers">    <span class="digit digit-position-1 digit-0"></span><span class="digit digit-position-2 digit-1"></span><span class="digit digit-position-3 digit-1"></span>    </div>  <div class="suffix"></div></div>';widgetMainWrapper.innerHTML=widgetBody;var widgetWrapper=this.ce('div');this.addClass(widgetWrapper,'widget-wrapper');widgetMainWrapper.appendChild(widgetWrapper);var miniWrapper=widgetMainWrapper.getElementsByTagName('div')[0];this.miniWidgetWrapper=miniWrapper;this.css(widgetWrapper,'display','none');var currentObj=this;addEvent(miniWrapper,'click',function(){if(!currentObj.hasClass(widgetWrapper,'widget-rendered')){var closeButton=currentObj.ce('a');closeButton.setAttribute('href','javascript:');closeButton.setAttribute('class','widget-button-close');closeButton.innerHTML='<span>&nbsp;</span>';addEvent(closeButton,'click',function(){WidgetObj.toggleVisible();});widgetWrapper.appendChild(closeButton);widgetWrapper.appendChild(WidgetObj.renderWidget());currentObj.addClass(widgetWrapper,'widget-rendered');}
WidgetObj.toggleVisible();})
this.widgetWrapper=widgetWrapper;this.widgetMainWrapper=widgetMainWrapper;}
this.renderWidget=function(){var _host="https://gosmonitor.ru/widget?id=234&rebuild=1&no_visit_count=1&no_redir=1&field_mobid=234&salt=fe6d51643e30060e127430fe750cc7a2";var frame=this.ce('iframe');frame.setAttribute('width','100%');frame.setAttribute('height','100%');frame.setAttribute('style','border:0;padding:0;margin:0;');frame.setAttribute('src',_host);return frame;}
this.toggleVisible=function(state){if(state===true){this.css(this.widgetWrapper,'display','block');this.css(miniWidgetWrapper,'display','none');}
else if(state===false){this.css(this.widgetWrapper,'display','none');this.css(this.miniWidgetWrapper,'display','block');}
else{this.latestState=!this.latestState;this.toggleVisible(this.latestState);}}
this.executeHeaderScripts=function(){var _paq=_paq||[];_paq.push(["setDocumentTitle",document.domain+"/"+document.title]);_paq.push(["trackPageView"]);_paq.push(["enableLinkTracking"]);(function(){var u=(("https:"==document.location.protocol)?"https":"http")+"://piwik.gosmonitor.ru/";_paq.push(["setTrackerUrl",u+"piwik.php"]);_paq.push(["setSiteId","1"]);var d=document,g=d.createElement("script"),s=d.getElementsByTagName("script")[0];g.type="text/javascript";g.defer=true;g.async=true;g.src=u+"piwik.js";s.parentNode.insertBefore(g,s);})();(function(d,w,c){(w[c]=w[c]||[]).push(function(){try{w.yaCounter26148357=new Ya.Metrika({id:26148357,ut:"noindex"});}catch(e){}});var n=d.getElementsByTagName("script")[0],s=d.createElement("script"),f=function(){n.parentNode.insertBefore(s,n);};s.type="text/javascript";s.async=true;s.src=(d.location.protocol=="https:"?"https:":"http:")+"//mc.yandex.ru/metrika/watch.js";if(w.opera=="[object Opera]"){d.addEventListener("DOMContentLoaded",f,false);}else{f();}})(document,window,"yandex_metrika_callbacks");}
this.render=function(){this.addCss();return this.widgetMainWrapper;}
this.init();return this;}
try{var widget=WidgetObject();widget.executeHeaderScripts();addEvent(window,'load',function(){document.body.appendChild(widget.render());});}
catch(e){}})();