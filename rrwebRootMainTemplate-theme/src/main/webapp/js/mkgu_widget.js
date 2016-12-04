
// 
// Common section
// 

var mkgu_w = {

	page_url   : 'https://vashkontrol.ru/widget-new',
	css_url    : 'https://vashkontrol.ru/widget/css/widget.css',

	btn_color  : '#98cb00',
	draw_block   : true,

	loadcss: function (link) {
		var el = document.createElement("link");
			el.setAttribute("rel", "stylesheet");
			el.setAttribute("type", "text/css");
			el.setAttribute("href", link);

		document.getElementsByTagName("head")[0].appendChild(el);
	},


	loadjs: function (url, cb) {

        var script = document.createElement("script")
        script.type = "text/javascript";

        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    cb();
                }
            };
        } else { //Others
            script.onload = function () {
                cb();
            };
        }
 
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    },


	init: function () {
		var self = this;

	 	self.page_url += '/' + mkgu_widget_param.au;
		
		self.loadcss(self.css_url);

		if (mkgu_widget_param.color) self.btn_color = mkgu_widget_param.color;
		if (mkgu_widget_param.private_block) self.draw_block = false;

		// Check for jquery

		if(!window.jQuery){
			self.loadjs("http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js", self.static_init);
		}
		else{
			self.static_init();
		}
	},

	static_init : function () {
		var self = window.mkgu_w;
		
		$(document).ready(function () {
			self.render_html();
		});
	},

	//
	// Static
	//

	render_html: function () {
		var self = mkgu_w, widget_area, frame_height = 1050;

		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
			frame_height = 1150;
			$('.widget_modal').css('min-height', frame_height + 'px')
		}
		
		button_area =  '<div class="mkgu-widget-btn" id="mkgu-widget" style="background: ' + self.btn_color + ' ;">' + 
		       '<a href="#"></a>' +
		      '</div>';

		widget_area =	'<div class="mkgu-widget-wht-bg">' +
							'<div class="mkgu-widget-container">' +
								'<div class="mkgu-widget-content">' +
									'<iframe class="mkgu-widget-iframe" width="100%" src="' + self.page_url + '" frameborder="0"></iframe>' +
									'<a href="#" class="mkgu-widget-close"></a>' +
								'</div>' +
							'</div>' +
						'</div>';


		if (self.draw_block) {
			jQuery('body').prepend(button_area);
		}

		jQuery.fn.center = function () { 
            this.css({left: "50%", position:"relative", "margin-left": (-this.outerWidth()/2)});
            return this; 
        }

		$(document).ready(function() {
            $("#mkgu-widget a").click(function() {

            	var wWidth  = $(document).width();
                var wHeight = $(document).height();

				var bodyPosition = $("body").position();

            	if( typeof $('.widget_modal')[0] == 'undefined'){
            		$('body').after(widget_area);
              		
              		$(".mkgu-widget-wht-bg").height(wHeight).css("top", Math.abs(bodyPosition.top));

            		$(".mkgu-widget-close").click(function() {
		                $('.mkgu-widget-wht-bg').fadeOut();
		            })
            	} else {
            		$(".black_bg").fadeIn();
                	$(".widget_modal").center();
                
                	$(".black_bg").width(wWidth).height(wHeight);

            		$(".mkgu-widget-close").click(function() {
		                $('.mkgu-widget-wht-bg').fadeOut();
		            })
            	}
            })

            

        });
	}

}


// 
// Init section
// 

mkgu_w.init();