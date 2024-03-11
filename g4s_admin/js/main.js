$(document).ready(function() {
	var setFooterHeight, teleport;
	window.waitForFinalEvent = (function() {
		var timers;
		timers = {};
		return function(callback, ms, uniqueId) {
			if (!uniqueId) {
				uniqueId = 'Don\'t call this twice without a uniqueId';
			}
			if (timers[uniqueId]) {
				clearTimeout(timers[uniqueId]);
			}
			timers[uniqueId] = setTimeout(callback, ms);
		};
	})();

	var lastWindowWidth = 0;

	/*teleport */
	(teleport = function() {
		if ($(window).width() === lastWindowWidth){
			return;
		} else {
			lastWindowWidth = $(window).width();
		}
		$('[data-tablet]').each(function(i, elem) {
			var parent;
			if ($(document).width() <= 992) {
				$(elem).appendTo($($(elem).data('tablet')));
			} else {
				parent = $($(elem).data('desktop'));
				$(elem).appendTo(parent);
			}
		});
		$('[data-mobile]').each(function(i, elem) {
			var parent;
			if ($(document).width() <= 768) {
				$(elem).appendTo($($(elem).data('mobile')));
			} else {
				parent = $($(elem).data('desktop'));
				$(elem).appendTo(parent);
			}
		});
	})();

	/*scrollto */
	$('[data-scrollto]').click(function(e) {
		e.preventDefault();
		var target = $(this).attr('data-scrollto');

		$('html,body').animate({
			scrollTop: $(target).offset().top
		}, 500);
	});


	$(window).resize(function() {
		waitForFinalEvent((function() {
			teleport();
		}), 200, '');
	});
});