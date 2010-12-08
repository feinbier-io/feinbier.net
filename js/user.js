$(function() {

	$('a.button').buttonHover({
		delay: 150
	});
	
	$('#footer a').fancybox({
		'overlayShow'	:	false,
		'onComplete'	: function() {
			piwikTracker.trackGoal(1);
		} 
	});
});

(function($){
	$.fn.buttonHover = function(options) {
		/** Fade Settings **/
		var settings = {
			fadeTo: 0.5,
			delay: 300
		};
	
		return this.each(function() {
			settings = $.extend(settings, options);
		
			$(this).fadeTo(0, settings.fadeTo).hover(
				function() { $(this).fadeTo(settings.delay, 1); },
				function() { $(this).fadeTo(settings.delay, settings.fadeTo); }
			);
			
			return this;
		});
	};
})(jQuery);