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
			$(this).toggleClass('active');
			$('._drawer_bg').fadeToggle();
			$('nav').toggleClass('open');
		} else {
			$(this).toggleClass('active');
			$('._drawer_bg').fadeToggle();
			$('nav').toggleClass('open');

			sleep(50, function () {
				$('.header-drawer').css('height', '100px');
			});
		}
	})

	$('._drawer_bg').click(function () {
		$('body').css('overflow', 'auto');
		// window.removeEventListener( 'touchmove' , movefun, { passive: false } );
		$(this).fadeOut();
		$('._drawer_button').removeClass('active');
		$('nav').removeClass('open');

		sleep(50, function () {
			$('.header-drawer').css('height', '100px');
		});
	});
})


function sleep(waitSec, callbackFunc) {
 
    // 経過時間（秒）
    var spanedSec = 0;
 
    // 1秒間隔で無名関数を実行
    var id = setInterval(function () {
 
        spanedSec++;
 
        // 経過時間 >= 待機時間の場合、待機終了。
        if (spanedSec >= waitSec) {
 
            // タイマー停止
            clearInterval(id);
 
            // 完了時、コールバック関数を実行
            if (callbackFunc) callbackFunc();
        }
    }, 1);
 
}