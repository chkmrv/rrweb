$(window).load(function() {
	$('.flexslider').flexslider({
		animation : $('#carousel_animation').val(),
		direction : $('#carousel_direction').val(),
		animationLoop : $('#carousel_animationLoop').val(),
		slideshow : $('#carousel_slideshow').val(),
		slideshowSpeed : $('#carousel_slideshowSpeed').val(),
		animationSpeed : $('#carousel_animationSpeed').val(),
		pausePlay : true,
		pauseText: '',
		playText: '', 
		pauseOnHover : true,
		before : function($slider) {
			$slider.find('.flex-caption').fadeOut('fast');
		},
		after : function($slider) {
			$slider.find('.flex-caption').fadeIn();
		}
	});
});