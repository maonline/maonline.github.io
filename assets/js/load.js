var isFin = Boolean(false);

$(function() {
	url = location.href;
	if(url.match("#donate")) {
		console.log("DONATE");
		isFin = true;
		$('#modalArea').show();
		document.getElementById("donate-error1").style.display = 'none';
		document.getElementById("donate-error2").style.display = 'none';
		document.getElementById("donate-error3").style.display = 'none';
		return false;
	}

	// if(url.match("#news")) {
	// 	console.log("NEWS");
	// 	isFin = true;
	// 	$('.layer_board_bg').show();
	// 	$('.layer_board').show();																																					
	// 	return false;
	// }
});

$(function() {
	// console.log("LOAD");
	var h = $(window).height();

	$('#wrap').css('display','none');
	$('#loader-bg, #loader').height(h).css('display', 'block');

	$("#typing").t();

});

$(window).load(function () { //全ての読み込みが完了したら実行
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
			delayTime: 1000,
			fadeTime : 1000,
			alpha : 0.8,
			limitMin : 15,
			limitCookie : 10
		});
	}
}