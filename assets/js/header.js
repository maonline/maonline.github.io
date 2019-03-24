var canRun = true;

movefun = function( event ){
	event.preventDefault();
}

$(function () {
	$('._drawer_button').click(function () {
		if (canRun == false) return;
		canRun = false;

		$('html,body').animate({ scrollTop: 0 }, '50');

		if (window.getComputedStyle(document.getElementById("header-height-tag"), null).getPropertyValue('height') == "100px") {
			$('.header-drawer').css('height', '130%');
			$(this).addClass('active');
			$('._drawer_bg').fadeIn();
			$('nav').addClass('open');
		} else {
			$(this).removeClass('active');
			$('._drawer_bg').fadeOut();
			$('nav').removeClass('open');
			sleep(50, function () {
				$('.header-drawer').css('height', '100px');
			});
		}

		canRun = true;
	})

	$('._drawer_bg').click(function () {
		if (canRun == false) return;
		canRun = false
		// window.removeEventListener( 'touchmove' , movefun, { passive: false } );
		$(this).fadeOut();
		$('._drawer_button').removeClass('active');
		$('nav').removeClass('open');
		sleep(50, function () {
			$('.header-drawer').css('height', '100px');
		});
		canRun = true;
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

function closeHeader() {
	
	// window.removeEventListener( 'touchmove' , movefun, { passive: false } );
	$('._drawer_bg').fadeOut();
	$('._drawer_button').removeClass('active');
	$('nav').removeClass('open');
	sleep(50, function () {
		$('.header-drawer').css('height', '100px');
	});
}