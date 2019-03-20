var isFin = Boolean(false);

$(function() {
	url = location.href;
	if(url.match("#donate")) {
		console.log("DONATE");
		isFin = true;
		openModal("assets/loader/donate.html");
		return false;
	}

	if(url.match("#contact")) {
		console.log("DONATE");
		isFin = true;
		openModal("assets/loader/contact.html");
		return false;
	}


	if (!(getParam('modal') == null)) {
		console.log(getParam('modal'));
		isFin = true;
		openModal(getParam('modal'));
	}

	// if(url.match("#news")) {
	// 	console.log("NEWS");
	// 	isFin = true;
	// 	$('.layer_board_bg').show();
	// 	$('.layer_board').show();																																					
	// 	return false;
	// }
});

$(window).on('load', function() {
	$('html, body').animate({ scrollTop: 0 }, '1');
});

$(function() {
	// console.log("LOAD");
	var h = $(window).height();

	$('#wrap').css('display','none');
	$('#loader-bg, #loader').height(h).css('display', 'block');

});

$(window).on('load', function() { //全ての読み込みが完了したら実行
	stopload();
});

//10秒たったら強制的にロード画面を非表示
$(function(){
	setTimeout('stopload()', 5000);
});

function stopload(){
	$('#wrap').css('display','block');
	$('#loader-bg').delay(900).fadeOut(800);
	$('#loader').delay(600).fadeOut(300);
	showNews();
}


function showNews() {
	if (isFin == false) {
		isFin = true;
		$('#layer_board_area').layerBoard({
			delayTime: 0,
			fadeTime : 1000,
			alpha : 0.8,
			limitMin : 15,
			limitCookie : 10
		});
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
