movefun = function( event ){
	event.preventDefault();
}

function BanScroll() {

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
		
		$(this).toggleClass('active');
		$('._drawer_bg').fadeToggle();
		$('nav').toggleClass('open');
	})
	$('._drawer_bg').click(function () {
		$('body').css('overflow', 'auto');
		// window.removeEventListener( 'touchmove' , movefun, { passive: false } );
		$(this).fadeOut();
		$('._drawer_button').removeClass('active');
		$('nav').removeClass('open');
	});
})