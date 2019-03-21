movefun = function( event ){
	event.preventDefault();
}

$(function () {
	$('._drawer_button').click(function () {

		if ($('body').css('overflow') == 'hidden') {
			$('body').css('overflow', 'auto');
			// window.removeEventListener( 'touchmove' , movefun, { passive: false } );
		} else {
			$('body').css('overflow', 'hidden');
			// window.addEventListener( 'touchmove' , movefun , { passive: false } );
			$('html,body').animate({ scrollTop: 0 }, '50');
		}

		if (window.getComputedStyle(document.getElementById("header-height-tag"), null).getPropertyValue('height') == "100px") {
			$('.header-drawer').css('height', '130%');
			$(this).addClass('active');
			$('._drawer_bg').fadeIn();
			$('nav').addClass('open');
		} else {
			$(this).removeClass('active');
			$('._drawer_bg').fadeOut();
			$('nav').removeClass('open');
			$('.header-drawer').css('height', '100px');
		}
	})

	$('._drawer_bg').click(function () {
		$('body').css('overflow', 'auto');
		// window.removeEventListener( 'touchmove' , movefun, { passive: false } );
		$(this).fadeOut();
		$('._drawer_button').removeClass('active');
		$('nav').removeClass('open');
		$('.header-drawer').css('height', '100px');
	});
})
