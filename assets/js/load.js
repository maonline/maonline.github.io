var isFin = false;
var noOpenNews = false;
var type = "NONE";

$(function() {

	console.log('v1.14.1');

	if (!(getParam('news') == null)) {
		noOpenNews = true;
		type = "NEWS";
	}

	if (!(getParam('modal') == null)) {
		var string  = getParam('modal');
		var pattern = 'https://www.minenet.work/';

		if (string.indexOf(pattern) == 0 && string.indexOf('script') <= -1 && string.length <= 80) {
			//If URL has parameter
			console.log(string);
			noOpenNews = true;
			type = "MODAL";
		} else {
			console.log('That URL is not allowed.');
		}
	}

	setTimeout('stopload()', 8000);
	
});

$(window).on('load', function() { //全ての読み込みが完了したら実行
	stopload();
});

function stopload(){
	if (isFin == false) {
		isFin = true;
		//Reset Scroll
		$('html, body').animate({ scrollTop: 0 }, '1');
		//Run Ticker
		$('.ticker').slick({
			arrows: false,
			autoplay: true,
			autoplaySpeed: 5000,
			dots: true,
    		appendDots: $("#apDots")
		});
		//Blink Reset
		$('.demo_center').each(function() {
			$(this).removeClass('do');
		});

		//Show
		$('#wrap').css('display', 'block');
		$('#loader-bg').delay(900).fadeOut(800);
		$('#loader').delay(600).fadeOut(300);

		if (noOpenNews == false) {
			$('#layer_board_area').layerBoard({
				delayTime: 0,
				fadeTime : 1000,
				alpha : 0.8,
				limitMin : 15,
				limitCookie : 10
			});
		} else {
			console.log(type);

			if (type == "NEWS") {
				$('#layer_board_area').layerBoard({
					delayTime: 0,
					fadeTime : 1000,
					alpha : 0.8,
					limitMin : 0,
					limitCookie : 10
				});
			} else {
				if (type == "MODAL") {
					openModal(getParam('modal'));
				}
			}
		}
	}
}

function getParam(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}
