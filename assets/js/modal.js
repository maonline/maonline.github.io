$(function(){
	var mdwBtn = $('.switchModal'),
	overlayOpacity = 0.7,
	fadeTime = 500;

	mdwBtn.on('click',function(e){
		e.preventDefault();

		$('._drawer_bg').fadeOut();
		$('._drawer_button').removeClass('active');
		$('nav').removeClass('open');
		// window.addEventListener( 'touchmove' , movefun , { passive: false } );

		var setMdw = $(this),
		setHref = setMdw.attr('href'),
		wdHeight = $(window).height();
		$('body').append('<div id="mdOverlay"></div><div id="mdWindow"><div class="mdClose">✖</div><iframe id="contWrap"></iframe></div>');

		$('#contWrap').attr('src',setHref);
		$('body').css('overflow', 'hidden');
		$('#mdOverlay,#mdWindow').css({display:'block',opacity:'0'});
		$('#mdOverlay').css({height:wdHeight}).stop().animate({opacity:overlayOpacity},fadeTime);
		$('#mdWindow').stop().animate({opacity:'1'},fadeTime);

		$(window).on('resize',function(){
			var adjHeight = $(window).height();
			$('#mdOverlay').css({height:adjHeight});
		});

		$('#mdOverlay,.mdClose').on('click',function(){
			$('body').css('overflow', 'auto');
			// window.removeEventListener( 'touchmove' , movefun, { passive: false } );
			$('#mdWindow,#mdOverlay').stop().animate({opacity:'0'},fadeTime,function(){
				$('#mdOverlay,#mdWindow').remove();
			});
		});
	});
});