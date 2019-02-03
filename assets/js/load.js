$(function() {
	// console.log("LOAD");
	var h = $(window).height();

	$('#wrap').css('display','none');
	$('#loader-bg, #loader').height(h).css('display', 'block');

	$("#typing").t()

});

$(window).load(function () { //全ての読み込みが完了したら実行
	// stopload();
});

//10秒たったら強制的にロード画面を非表示
$(function(){
	setTimeout('stopload()', 1000);
});

function stopload(){
	$('#wrap').css('display','block');
	$('#loader-bg').delay(900).fadeOut(800);
	$('#loader').delay(600).fadeOut(300);
}