var mdwBtn = $('.switchModal'),
overlayOpacity = 0.7,
fadeTime = 500;

$(function(){
	mdwBtn.on('click',function(e){
		e.preventDefault();

		openModal($(this).attr('href'));
	});
});

function openModal(href) {
	$('._drawer_bg').fadeOut();
	$('._drawer_button').removeClass('active');
	$('nav').removeClass('open');
	// window.addEventListener( 'touchmove' , movefun , { passive: false } );

	setHref = href,
	wdHeight = $(window).height();
	$('body').append('<div id="mdOverlay"></div><div id="mdWindow"><div class="mdClose">✖</div><iframe id="contWrap"></iframe></div>');

	$('#contWrap').attr('src',setHref);
	$('body').css('overflow', 'hidden');
	$('#mdOverlay,#mdWindow').css({display:'block',opacity:'0'});
	$('#mdOverlay').css({height:wdHeight}).stop().animate({opacity:overlayOpacity},fadeTime);
	$('#mdWindow').stop().animate({opacity:'1'},fadeTime);
	ticker_off();

	$(window).on('resize',function(){
		var adjHeight = $(window).height();
		$('#mdOverlay').css({height:adjHeight});
	});

	$('#mdOverlay,.mdClose').on('click',function(){
		ticker_on();
		$('body').css('overflow', 'auto');
		// window.removeEventListener( 'touchmove' , movefun, { passive: false } );
		$('#mdWindow,#mdOverlay').stop().animate({opacity:'0'},fadeTime,function(){
			$('#mdOverlay,#mdWindow').remove();
		});
	});
}