var isFin = false;
var noOpenNews = false;

$(function() {

	//If URL has parameter
	if (!(getParam('modal') == null)) {
			console.log(getParam('modal'));
			noOpenNews = true;
	}
	setTimeout('stopload()', 5000);
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
		$('#wrap').css('display','block');
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
			openModal(getParam('modal'));
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
