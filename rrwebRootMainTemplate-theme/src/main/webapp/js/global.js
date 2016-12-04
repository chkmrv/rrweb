'use strict';
function MainMenu(params){
	var $self = this;
	$self.containerId = params.containerId;
	$self.openLink = $('#'+$self.containerId).find('.open_menu_ico');
	$self.openBox = $('#'+$self.containerId).find('.open_menu');
	var winWidth;

	$self.Show = function(){
		$($self.openBox).show().addClass('open');
		$($self.openLink).addClass('open');
	},
	$self.Hide = function(){
		$($self.openBox).hide().removeClass('open');
		$($self.openLink).removeClass('open');
	},
	$self.SetWidth = function(){
		winWidth = $(window).width();
		return winWidth;
	},
	$self.InitEvent = function(){
		$($self.openLink).on('click tochestart MSPointerDown', function(){
			if($($self.openLink).hasClass('open')){
				$self.Hide();
			}else{
				$self.Show();
			}
		});
	},
	$self.ClosetHide = function(){
		$(document).on('click tochestart MSPointerDown', function(event){
			$self.SetWidth();
			if( $(event.target).closest('#'+$self.containerId).length && winWidth < 1025)
			return;
			$self.Hide();
			event.stopPropagation();
		});
	}
	$self.InitEvent();
	$self.ClosetHide();
}
function EventSlider(params) {
	var $self = this;
	$self.containerId = params.containerId;
	$self.folders = $('#' + $self.containerId).find('.folder');
	$self.mainImg = $('#' + $self.containerId).find('.main_img');
	$self.mainVideo = $('#' + $self.containerId).find('.main_video');
	$self.iframe = $('#' + $self.containerId).find('iframe');

	$self.Init = function(){
		var firstFolder = $self.folders.eq(0);
		firstFolder.addClass('active');
		if($(firstFolder).hasClass('photo')){
			$self.ShowImage();
		}
		if($(firstFolder).hasClass('video')){
			$self.ShowVideo();
		}
		if($(firstFolder).hasClass('myVideo')){
			$self.ShowMyVideo();
		}
		$self.ChangeInfo();
	},
	$self.ShowImage = function(){
		$self.iframe.hide().attr({src: ''});
		$self.mainVideo.hide().attr({src: ''});
		var photoSrc = $('.folder.active').attr('data-src');
		$self.mainImg.show().attr({src: photoSrc});
	},
	$self.ShowMyVideo = function(){
		$self.iframe.hide().attr({src: ''});
		$self.mainImg.hide();
		var videoSrc = $('.folder.active').attr('data-video');
		$self.mainVideo.show().attr({src: videoSrc});
	},
	$self.ShowVideo = function(){
		$self.mainImg.hide();
		$self.mainVideo.hide().attr({src: ''});
		var iframeSrc = $('.folder.active').attr('data-iframe');
		$self.iframe.show().attr({src: iframeSrc});
	},
	$self.InitShow = function(){
		$('#'+$self.containerId+' .folder').on('click tochestart MSPointerDown', function(e) {
			$('#' + $self.containerId + ' .folder').removeClass('active');
			var clickObj = $(e.target).closest('.folder');
			$(clickObj).addClass('active');
			if($(clickObj).hasClass('photo')){
				$self.ShowImage();
			}
			if($(clickObj).hasClass('video')){
				$self.ShowVideo();
			}
			if($(clickObj).hasClass('myVideo')){
				$self.ShowMyVideo();
			}
			
			$self.ChangeInfo();
		});
	},
	$self.NextImage = function(){
		var currElem = $('#'+$self.containerId+' .folder.active'),
			nextElem = currElem.next();
		if(nextElem == 'undefined' || nextElem == null || nextElem.length == 0){
			nextElem = $('#' + $self.containerId + ' .folder').eq(0);
		}
		currElem.removeClass('active');
		nextElem.addClass('active');
		if(nextElem.hasClass('photo')){
			$self.ShowImage();
		}
		if(nextElem.hasClass('video')){
			$self.ShowVideo();
		}
		if(nextElem.hasClass('myVideo')){
			$self.ShowMyVideo();
		}
	},
	$self.PrevImage = function(){
		var currElem = $('#'+$self.containerId+' .folder.active'),
			prevElem = currElem.prev();
		if(prevElem == 'undefined' || prevElem == null || prevElem.length == 0){
			prevElem = $('#' + $self.containerId + ' .folder').last();
		}
		currElem.removeClass('active');
		prevElem.addClass('active');
		if(prevElem.hasClass('photo')){
			$self.ShowImage();
		}
		if(prevElem.hasClass('video')){
			$self.ShowVideo();
		}
		if(prevElem.hasClass('myVideo')){
			$self.ShowMyVideo();
		}
	},
	$self.InitChangeImage = function(){
		$('.prev_arr').on('click tochestart MSPointerDown', function() {
			$self.PrevImage();
			$self.ChangeInfo();
		});
		$('.next_arr').on('click tochestart MSPointerDown', function() {
			$self.NextImage();
			$self.ChangeInfo();
		});
	},
	$self.ChangeInfo = function(){
		var currElem = $('#'+$self.containerId+' .folder.active'),
		elemDate = currElem.find('.date').text(),
		elemTime = currElem.find('.time').text(),
		elemName = currElem.find('.name').text();
		$('#' + $self.containerId+ ' .photo_info').find('.date').text(elemDate);
		$('#' + $self.containerId+ ' .photo_info').find('.time').text(elemTime);
		$('#' + $self.containerId+ ' .photo_info').find('.comment').text(elemName);
//		var scrollElem = $('#' + $self.containerId+ ' .js-scroll').jScrollPane();
		scrollElem.data('jsp').scrollToElement($('.folder.active'), true, true);
	}
	$self.Init();
	$self.InitShow();
	$self.InitChangeImage();
}
function Multislider(params) {
	var $self = this;
	$self.containerId = params.containerId;
	$self.sliderResize = params.sliderResize;
	$self.showModal = params.showModal;
	$self.mainImg = $('#' + $self.containerId).find('.main_img');
	$self.mainVideo = $('#' + $self.containerId).find('.main_video');
	$self.iframe = $('#' + $self.containerId).find('iframe');

	$self.InitSlider = function(){
		$('#' + $self.containerId + ' .prew.photo').eq(0).addClass('act_prev');
		$self.ShowImage();
		if($('#' + $self.containerId + ' .prew.photo').length == 0){
			$('#' + $self.containerId + ' .prew.video').eq(0).addClass('act_prev');
			$self.ShowVideo();
		}
		if(($('#' + $self.containerId + ' .prew.photo').length == 0) && ($('#' + $self.containerId + ' .prew.video').length == 0)) {
			$('#' + $self.containerId + ' .prew.myVideo').eq(0).addClass('act_prev');
			$self.ShowMyVideo();
		}
		if($self.showModal) {
			$self.slideModal = $('<div class="slide_modal modal_overlay"></div>');
			$('body').append($self.slideModal);
			$self.slideModal.html('<div class="modal_content"><div class="prev_modal"></div><div class="next_modal"></div><div class="close">&times;</div><figure class="viewport_modal"></figure></div>').hide();
		}
	},
	$self.Resize = function(){
		if($self.sliderResize){
			var winWidth = $(window).width();
			$('#'+$self.containerId).find('.main_img').on('load', function() {
				if(winWidth < 760){
					var viewHeight = $('#' + $self.containerId).find('.main_img').height() + $('#' + $self.containerId).find('.slide_panel').innerHeight(true),
						listHeight = 340;
					$('#' + $self.containerId).find('.js-showlist').hide();
					//$('#' + $self.containerId + ' .show_list').removeClass('open').show();
				}else{
					viewHeight = $('#' + $self.containerId).find('.main_img').height(),
					listHeight = viewHeight - $('#' + $self.containerId).find('.js-tabNav').height() - 30;
					$('#' + $self.containerId).find('.js-showlist').css({display: 'block'});
					$('#' + $self.containerId + ' .show_list').removeClass('open');
				}
				$('#' + $self.containerId + ' .viewport').height(viewHeight);
				$('#' + $self.containerId + ' .js-scroll').height(listHeight);
			});
		}
	},
	$self.ShowPreviews = function(){
		$('#' + $self.containerId + ' .show_list').on('click tochestart MSPointerDown', function() {
			$('#' + $self.containerId).find('.js-showlist').toggle();
			$('#' + $self.containerId + ' .show_list').toggleClass('open');
		});
	},
	$self.ShowImage = function(){
		$self.iframe.hide().attr({src: ''});
		$self.mainVideo.hide().attr({src: ''});
		var photoSrc = $('.act_prev').attr('data-src');
		var photoSrcTitle = $('.act_prev').attr('data-title');
		$self.mainImg.show().attr({src: photoSrc});
		$(".slide_panel .txt").html(photoSrcTitle);
	},
	$self.ShowMyVideo = function(){
		$self.iframe.hide().attr({src: ''});
		$self.mainImg.hide();
		var videoSrc = $('.act_prev').attr('data-video');
		var videoSrcTitle = $('.act_prev').attr('data-title');
		$self.mainVideo.show().attr({src: videoSrc});
		$(".slide_panel .txt").html(videoSrcTitle);
	},
	$self.ShowVideo = function(){
		$self.mainImg.hide();
		$self.mainVideo.hide().attr({src: ''});
		var iframeSrc = $('.act_prev').attr('data-iframe');
		$self.iframe.show().attr({src: iframeSrc});
	},
	$self.InitShow = function(){
		$('#'+$self.containerId+' .prew').on('click tochestart MSPointerDown', function(e) {
			$('#' + $self.containerId + ' .prew').removeClass('act_prev');
			var clickObj = $(e.target).closest('.prew');
			$(clickObj).addClass('act_prev');
			if($(clickObj).hasClass('photo')){
				$self.ShowImage();
			}
			if($(clickObj).hasClass('video')){
				$self.ShowVideo();
			}
			if($(clickObj).hasClass('myVideo')){
				$self.ShowMyVideo();
			}
		});
	},
	$self.NextImage = function(){
		var currElem = $('#'+$self.containerId+' .act_prev'),
			nextElem = currElem.next(),
			photoSrc = nextElem.attr('data-src');
		if(nextElem == 'undefined' || nextElem == null || nextElem.length == 0){
			nextElem = $('#' + $self.containerId + ' .prew.photo').eq(0);
		}
		$self.mainImg.show().attr({src: photoSrc});
		currElem.removeClass('act_prev');
		nextElem.addClass('act_prev');
	},
	$self.PrevImage = function(){
		var currElem = $('#'+$self.containerId+' .act_prev'),
			prevElem = currElem.prev(),
			photoSrc = prevElem.attr('data-src');
		if(prevElem == 'undefined' || prevElem == null || prevElem.length == 0){
			prevElem = $('#' + $self.containerId + ' .prew.photo').last();
		}
		$self.mainImg.show().attr({src: photoSrc});
		currElem.removeClass('act_prev');
		prevElem.addClass('act_prev');
	},
	$self.InitChangeImage = function(){
		$('.prev_arr').on('click tochestart MSPointerDown', function() {
			$self.PrevImage();
		});
		$('.next_arr').on('click tochestart MSPointerDown', function() {
			$self.NextImage();
		});
	},
	$self.ShowModal = function() {
		$('.zoom_ico').on('click tochestart MSPointerDown', function() {
			var photoSrc = $self.mainImg.attr('src');
			$self.slideModal.fadeIn();
			$('.viewport_modal').html('<img src=' + photoSrc + '>');
		});
	},
	$self.HideModal = function() {
		$self.slideModal.find('.close').on('click tochestart MSPointerDown', function() {
			$self.slideModal.fadeOut();
			$('.viewport_modal').html('');
			$self.iframe.hide().attr({src: ''});
			var photoSrc = $('.act_prev').attr('data-src');
			$self.mainImg.show().attr({src: photoSrc});
		});
	},
	$self.NextImageModal = function(){
		var currElem = $('#'+$self.containerId+' .act_prev'),
			nextElem = currElem.next();
		if(nextElem == 'undefined' || nextElem == null || nextElem.length == 0){
			nextElem = $('#' + $self.containerId + ' .prew.photo').eq(0);
		}
		var photoSrc = nextElem.attr('data-src');
		$('.viewport_modal').html('<img src=' + photoSrc + '>');
		currElem.removeClass('act_prev');
		nextElem.addClass('act_prev');
	},
	$self.PrevImageModal = function(){
		var currElem = $('#'+$self.containerId+' .act_prev'),
			prevElem = currElem.prev();
		if(prevElem == 'undefined' || prevElem == null || prevElem.length == 0){
			prevElem = $('#' + $self.containerId + ' .prew.photo').last();
		}
		var photoSrc = prevElem.attr('data-src');
		$('.viewport_modal').html('<img src=' + photoSrc + '>');
		currElem.removeClass('act_prev');
		prevElem.addClass('act_prev');
	}
	$self.InitModal = function() {
		$('.prev_modal').on('click tochestart MSPointerDown', function() {
			$self.PrevImageModal();
		});
		$('.next_modal').on('click tochestart MSPointerDown', function() {
			$self.NextImageModal();
		});
	}
	$self.InitSlider();
	$self.InitShow();
	$self.Resize();
	$self.ShowPreviews();
	$self.InitChangeImage();
	if($self.showModal) {
		$self.ShowModal();
		$self.HideModal();
		$self.InitModal();
	}
}
function PlanDatepicker(params) {
	var $self = this;
	$self.containerId = params.containerId;
	$self.toggle = params.toggle;
	$self.Monthes = $('#' + $self.containerId + ' .month');
	var monthNum = $('#' + $self.containerId + ' .month.current').attr('data-month'),
		toddlerPos,
		toddlerWidth;

	$self.ToddlerMove = function(){
		toddlerPos = ($('#' + $self.containerId + ' .month_block').outerWidth(true) - 30) / 12 * monthNum + 15;
		toddlerWidth = $('#' + $self.containerId + ' .month.current').outerWidth(true);
		$('#' + $self.containerId + ' .toddler').css({
			left: toddlerPos,
			width: toddlerWidth
		});
	},
	$self.InitSelectMonth = function(){
		$self.Monthes.on('click tochestart MSPointerDown', function(e){
			$self.Monthes.removeClass('current');
			var clickObj = $(e.target).closest('.month');
			clickObj.addClass('current');
			monthNum = clickObj.attr('data-month');
			if($self.toggle) {
				$self.ToddlerMove();
			}
		});
	}
	$self.ToddlerMove();
	$self.InitSelectMonth();
}
function DocsPager(params) {
	var $self = this;
	$self.containerId = params.containerId;
	$self.docsElems = $('#' + $self.containerId + ' .docs_box');
	var list,
		slides,
		viewWidth,
		slideCount,
		listWidth,
		sliderHeight,
		offSet;

	$self.SlideBuild = function(){
		$self.docsElems.wrapAll('<div class="viewport"></div>').wrapAll('<ul class="page_list"></ul>');
		list = $('#' + $self.containerId + ' .page_list');
		while($(list).children('.docs_box:not(li)').length)
		$(list).children('.docs_box:not(li):lt(6)').wrapAll('<li></li>');
	},
	$self.ReSize = function(){
		viewWidth = $('#'+$self.containerId).width(),
		slides = $(list).find('li'),
		slideCount = slides.length,
		listWidth = viewWidth*slideCount,
		sliderHeight = slides.eq(0).height(),
		offSet = $('#' + $self.containerId).offset();
		slides.width($self.viewWidth);
		$('#'+$self.containerId+' .viewport').height(sliderHeight);
		list.width(listWidth);
		slides.width(viewWidth);
		for(var i = 0; i<slideCount; i++){
			slides.eq(i).css("left", viewWidth*i);
		}
	},
	$self.SlideLeft = function(){
		for(var i = 0; i<slideCount; i++){
			var startPos = slides.eq(i).offset();
			var newLeft = startPos.left-offSet.left-viewWidth;
			slides.eq(i).animate({left: newLeft}, 500);
		}
	},
	$self.SlideRight = function(){
		for(var i = 0; i<slideCount; i++){
			var startPos = slides.eq(i).offset();
			var newLeft = startPos.left-offSet.left+viewWidth;
			slides.eq(i).animate({left: newLeft}, 500);
		}
	},
	$self.InitButtons = function(){
		$('#' + $self.containerId + ' .prew_link').on('click', function () {
			if (slides.eq(0).css('left') == '0px') {
				return;
			} else {
				$self.SlideRight();
			}
		});
		$('#' + $self.containerId + ' .next_link').on('click', function () {
			if (slides.eq(slideCount - 1).css('left') == '0px') {
				return;
			} else {
				$self.SlideLeft();
			}
		});
	}
	$self.SlideBuild();
	$self.ReSize();
	$self.InitButtons();
}

/*global window, document, console, jQuery, $, Modernizr, self*/
$(function () {
// Blind panel
	$('.js-toggle_fontsize').on('click tochestart MSPointerDown', function () {
		$(this).siblings().removeClass('selected').end().addClass('selected');
		var bodyClass = $(this).attr('data-class');
		$('body').removeClass('fontsize_small fontsize_middle fontsize_big').addClass(bodyClass);
	});
	$('.js-toggle_color').on('click tochestart MSPointerDown', function () {
		$(this).siblings().removeClass('selected').end().addClass('selected');
		var bodyClass = $(this).attr('data-class');
		$('body').removeClass('color_white color_black color_blue').addClass(bodyClass);
	});
	$('.js-toggle_img').on('click tochestart MSPointerDown', function () {
		$(this).siblings().removeClass('selected').end().addClass('selected');
		var bodyClass = $(this).attr('data-class');
		$('body').removeClass('image_off image_on').addClass(bodyClass);
	});
	$('.js-toggle_font').on('click tochestart MSPointerDown', function () {
		$(this).siblings().removeClass('selected').end().addClass('selected');
		var bodyClass = $(this).attr('data-class');
		$('body').removeClass('sans_serif serif').addClass(bodyClass);
	});
	$('.js-interlinear').on('click tochestart MSPointerDown', function () {
		$(this).siblings().removeClass('selected').end().addClass('selected');
		var bodyClass = $(this).attr('data-class');
		$('body').removeClass('standart_interlinear middle_interlinear big_interlinear').addClass(bodyClass);
	});
	$('.settings_ico').on('click tochestart MSPointerDown', function () {
		$('.settings_block').hide();
		$(this).parents('.blind_panel').find('.settings_block').show();
		$('.js-close_sets').on('click tochestart MSPointerDown', function () {
			$('.settings_block').hide();
		});
	});
	$('.js-default_set').on('click tochestart MSPointerDown', function () {
		var bodyClass = 'sans_serif fontsize_small standart_interlinear color_white image_on';
		$('body').removeAttr('class').addClass(bodyClass);
		$('.js-toggle_fontsize, .js-toggle_color, .js-toggle_img').removeClass('selected');
		$('[data-class = sans_serif]').addClass('selected');
		$('[data-class = fontsize_small]').addClass('selected');
		$('[data-class = standart_interlinear]').addClass('selected');
		$('[data-class = color_white]').addClass('selected');
		$('[data-class = image_on]').addClass('selected');
	});
	function BlindStyle() {
		$('body').addClass('sans_serif fontsize_small standart_interlinear color_white image_on js-blind blind');
		$('#page_wrap').removeClass('css_main').addClass('css_blind');
		$('#foot_wrap').removeClass('css_main').addClass('css_blind');
	}
	function MainStyle() {
		$('body').removeClass('sans_serif fontsize_small standart_interlinear color_white image_on js-blind blind');
		$('#page_wrap').removeClass('css_blind').addClass('css_main');
		$('#foot_wrap').removeClass('css_blind').addClass('css_main');
	}
	var blindVersion;
	$('#no_see').on('click tochestart MSPointerDown', function () {
		BlindStyle();
		$masonryContainer.masonry();
		// $.cookie('blindVersion', 1, {expires: 7, path: '/'});
		return false;
	});
	$('.to_main_version').on('click tochestart MSPointerDown', function () {
		MainStyle();
		$masonryContainer.masonry();
		// $.cookie('blindVersion', 0, {expires: 7, path: '/'});
		return false;
	});
	var blind = 2;
	if(blind == 1) {
		BlindStyle();
	}else{
		MainStyle();
	}
// Region list
	$('#region_list').on('change', function() {
		var regionId = $(this).val(),
			$selRegion = $('[data-value = "'+regionId+'"]');
		if($selRegion.hasClass('open')){
			return;
		}else {
			$('.js-accordionOpen').removeClass('open');
			$('.js-accordionContent').slideUp();
			$selRegion.toggleClass('open').next('.js-accordionContent').slideToggle();
		}
	});
// Plan datepicker
	var planDatepicker = new PlanDatepicker({
		containerId: 'plan_datepicker',
		toggle: true
	});
	var planDatepickerSmall = new PlanDatepicker({
		containerId: 'plan_datepicker_small'
	});
	$(window).resize(function() {
		planDatepicker.ToddlerMove();
	});
// Media slider
	var multislider = new Multislider({
		containerId: 'multianons',
		sliderResize: true
	});
	var mediaslider = new Multislider({
		containerId: 'media_slider'
	});
	var pageSlider = new Multislider({
		containerId: 'page_slider',
		showModal: true
	});
	if($('#event_slider').length != 0){
		var eventSlider = new EventSlider({
			containerId: 'event_slider'
		});
	}
	$(window).resize(function() {
		multislider.Resize();
	});
// Main menu
	var $nav_menu = $('.main_menu'),
		$menu_list = $('.main_menu_list', $nav_menu);
    
	//$nav_menu.on('mouseenter focus tochestart MSPointerDown', 'li', function (e) {
	$('.main_menu_item').on('mouseenter focus tochestart MSPointerDown', function (e) {
		e.preventDefault();
		var $submenu = $(this).find('.submenu_level1'),
			menuEnd, submenuEnd;
		if($submenu.length){
			menuEnd     = $menu_list.width();
			submenuEnd  = $submenu.offset().left + $submenu.outerWidth(true);

			if (submenuEnd > menuEnd) {
				$submenu.addClass('right');
			} else {
				$submenu.addClass('left');
			}
		}
	});
	$nav_menu.on('mouseleave blur', 'li', function () {
		$(this).find('.submenu_level1').removeClass('left').removeClass('right');
	});
	var topMenu = new MainMenu({
		containerId: 'menu_container'
	});
// Side menu
	$('.open_side_menu').on('click tochestart MSPointerDown', function () {
		$(this).toggleClass('open');
		$('#side_menu_list').slideToggle();
	});
	$(window).resize(function() {
		if($(window).width() > 1024){
			$(this).removeClass('open').hide();
			$('#side_menu_list').show();
		}
	});
// Slide down
	$('.js-slideOpen').on('click tochestart MSPointerDown', function () {
		var slContainer = $(this).parent('.js-slideContainer');
		$(slContainer).find('.js-slideBox').slideToggle(300);
		$(document).on('click', function(event){
			if( $(event.target).closest(slContainer).length)
			return;
			$('.js-slideBox').slideUp(300);
			event.stopPropagation();
		});
	});
// Open block
	$('.js-open').on('click tochestart MSPointerDown', function () {
		var slContainer = $(this).parent('.js-openContainer'),
			openLink = $(slContainer).find('.js-open'),
			closeLink = $(slContainer).find('.js-close'),
			openBox = $(slContainer).find('.js-openBox');
		$(openBox).toggle();
		$(openLink).toggleClass('open');
		$(closeLink).on('click', function () {
			$(openBox).hide();
		});
		$(document).on('click tochestart MSPointerDown', function(event){
			if( $(event.target).closest(slContainer).length)
			return;
			$(openBox).hide();
			$(openLink).removeClass('open');
			event.stopPropagation();
		});
	});
// Custom select
//	$(".niceSel").chosen({disable_search_threshold: 10,placeholder_text_single: 'Выберите из списка'});
// Accordion
	$('.js-accordion').find('.js-accordionContent').hide();
		//.end().find('.js-accordionBox').eq(0).find('.js-accordionContent').show().end().find('.js-accordionOpen').addClass('open');
	$('.js-accordionOpen').on('click tochestart MSPointerDown', function () {
		if($(this).hasClass('open')){
			$('.js-accordionOpen').removeClass('open');
			$('.js-accordionContent').slideUp();
			if($(this).parent('.masonry_list')){
				setTimeout(function() {
					$masonryContainer.masonry();
				}, 400);
			}
		}else{
			$('.js-accordionOpen').removeClass('open');
			$('.js-accordionContent').slideUp();
			$(this).toggleClass('open').next('.js-accordionContent').slideToggle();
			if($(this).parent('.masonry_list')){
				setTimeout(function() {
					$masonryContainer.masonry();
				}, 400);
			}
		}
	});
	$('article section').children('div').hide();
	$('article section h3').on('click tochestart MSPointerDown', function () {
		if($(this).hasClass('open')){
			$(this).removeClass('open');
			$(this).next().slideUp();
		}else{
			$('article section h3').removeClass('open');
			$('article section').children('div').slideUp();
			$(this).addClass('open').next('div').slideDown();
		}
	});
// Document pager
	var docsPager1 = new DocsPager({
		containerId: 'attend_list'
	});
	/*var docsPager2 = new DocsPager({
		containerId: 'state_list'
	});*/
	$( window ).resize(function() {
		docsPager1.ReSize();
		//docsPager2.ReSize();
	});
// Tabs
	$('.js-tabs').each(function() {
		$('.js-tab').hide();
		$(this).find('.js-tabLink').eq(0).addClass('active');
		$('.js-tabLink.active').each(function() {
			var hrefId = $(this).attr('href');
			$(hrefId).show();
		});
	});
	$('.js-tabs .js-tabLink').on('click', function(){
		var hrefId = $(this).attr('href'),
			tabCont = $(this).closest('.js-tabs'),
			tabNav = $(this).closest('.js-tabNav');
		$(tabNav).children('.js-tabLink').removeClass('active');
		$(this).addClass('active');
		$(tabCont).children('.js-tab').hide();
		$(hrefId).show();
		if($(hrefId).children('.masonry_list')){
			$masonryContainer.masonry();
		}
		return false;
	});
// Infografika
	function IfographResize(){
		if($('body').hasClass('js-blind')){
			$('.icon_tabs .info').show();
			$('.icon_tabs .open_info').hide();
			//alert(1);
		}else {
			var showInfograf = $(window).width();
			$('.icon_tabs .open_tab').removeClass('active');
			$('.icon_tabs .slide_button').removeClass('active');
			if (showInfograf > 760) {
				$('.icon_tabs .info').hide();
				$('.icon_tabs .open_info').show();
			} else {
				$('.icon_tabs .info').show();
				$('.icon_tabs .open_info').hide();
			}
		}
	}
	IfographResize();
	$(window).on('resize', function(){
		IfographResize();
	});
	$('.icon_tabs .open_tab').on('click', function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$('.icon_tabs .info').hide();
		}else {
			$('.icon_tabs .info').hide();
			$('.icon_tabs .open_tab').removeClass('active');
			var hrefId = $(this).attr('href');
			$(this).addClass('active');
			$(hrefId).show();
		}
		return false;
	});
	$('.icon_tabs .slide_button').on('click', function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$('.icon_tabs .open_info').slideUp();
		}else {
			$('.icon_tabs .open_info').slideUp();
			$('.icon_tabs .slide_button').removeClass('active');
			$(this).addClass('active');
			$(this).next('.open_info').slideDown();
		}
		return false;
	});
// Datepiker
	/*$.datepicker.regional['ru'] = {
		closeText: 'Закрыть',
		prevText: '&#x3c;',
		nextText: '&#x3e;',
		currentText: 'Сегодня',
		monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
		monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
		dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
		dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
		dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false
	};
	$.datepicker.setDefaults($.datepicker.regional['ru']);
	$('.datepiker, .datepiker_year_select').datepicker();*/
//	$('.years_list').jScrollPane({
//		showArrows: false,
//		autoReinitialise: true,
//		autoReinitialiseDelay: 100,
//		verticalDragMinHeight: 100
//	});
	$('.selected_year').on('click', function(){
		$('.js-year_select').find('.scroll_box').toggle();
		$('.js-year_select').find('.selected_year').toggleClass('open');
	});
	$('.js-year_select .year').on('click', function(){
		var year = $(this).attr('data-value'),
			selYear = $(this).text(),
			getdate = $('.datepiker_year_select').datepicker('getDate'),
			dateObj = new Date(getdate.setYear(year));
		$('.datepiker_year_select').datepicker(
			'setDate', dateObj
		);
		$('.selected_year').text(selYear);
		$('.js-year_select').find('.scroll_box').hide();
		$('.js-year_select').find('.selected_year').removeClass('open');
	});
	$(document).click( function(event){
		if( $(event.target).closest(".js-year_select").length )
		return;
		//$('.scroll_box').hide();
		$('.selected_year').removeClass('open');
		event.stopPropagation();
	});
// Masonry
	// var $masonryContainer = $('.masonry_list').masonry({
	// 	itemSelector: '.masonry_box',
	// 	stamp: '.masonry_stamp',
	// 	singleMode: true,
	// 	isResizable: true,
	// 	isAnimated: true,
	// 	gutter: 0,
	// 	animationOptions: {
	// 		queue: false,
	// 		duration: 500
	// 	}
	// });
	// $masonryContainer.imagesLoaded( function() {
	// 	$masonryContainer.masonry();
	// });
// Open blocks
	$('.js-openList').find('.js-openContent').hide();
	$('.js-openLink').on('click tochestart MSPointerDown', function () {
		if($(this).hasClass('open')){
			$('.js-openLink').removeClass('open').text('смотреть разделы');
			$('.js-openContent').slideUp('300');
		}else{
			$('.js-openLink').removeClass('open').text('смотреть разделы');
			$('.js-openContent').slideUp('300');
			$(this).addClass('open').text('свернуть').prev('.js-openContent').slideToggle();
		}
		setTimeout(function() {
			$masonryContainer.masonry();
		}, 400);
	});
// Custom scroll
//	$('.js-scroll').jScrollPane({
//		showArrows: true,
//		autoReinitialise: true,
//		autoReinitialiseDelay: 100,
//		verticalDragMinHeight: 100
//	});
// Modal
	$('.js-openModal').on('click tochestart MSPointerDown', function () {
		var modalId = $(this).attr('href');
		$(modalId).appendTo('.modal_content').show();
		$('.js-window').show();
		$('.js-closeModal').on('click tochestart MSPointerDown', function () {
			$('.js-window').hide();
			$(modalId).appendTo('body').hide();
		});
		$('.js-window').click( function(event){
			if( $(event.target).closest(".modal_content").length )
			return;
			$(this).hide();
			$(modalId).appendTo('body').hide();
			event.stopPropagation();
		});
		return false;
	});
// Detail search
	$('.detail_search').on('click tochestart MSPointerDown', function () {
		$(this).parents('.short_form').removeClass('short_form');
	});
// Scroll top
	$('#scroll_top').on('click tochestart MSPointerDown', function () {
		$("html,body").animate({scrollTop:0},500);
	});
// Hide list
	$('.js-hideList').each(function() {
		if ($(this).children('li').length > 4) {
			for (var i = 4; i < $(this).children('li').length; i++) {
				$(this).children('li').eq(i).hide().addClass('hide');
			}
			$(this).next('.open_more').show();
			$('.js-openHideList').on('click tochestart MSPointerDown', function () {
				if($(this).hasClass('open')){
					$('.js-hideList').find('.hide').hide();
					$(this).removeClass('open').html('<i></i>развернуть');
				}else {
					$('.js-hideList').find('.hide').show();
					$(this).addClass('open').html('<i></i>свернуть');
				}
			});
		}
	});
});
