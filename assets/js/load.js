var isFin = false;
var noOpenNews = false;
var type = "NONE";

$(function() {
	console.log('v1.26.0');
	/* EVENT */
	checkCookie();

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

/** EVENT CONTENT **/

function checkCookie() {
	if (navigator.cookieEnabled) {

		if ($.cookie('Q1') === 'true') ReverseStory();
		if ($.cookie('Q2') === 'true') RedSnow();
		if ($.cookie('Q3') === 'true') LoadingNoise();
		if ($.cookie('Q4') === 'true') GarbledTexts();
		if ($.cookie('Q5') === 'true') GlitchBackGround();
		if ($.cookie('Q6') === 'true') UnknownPromoter();
		if ($.cookie('Q7') === 'true') GlitchLogo();
	}
}

function GlitchLogo() {
	$("#glitch_logo").css('display', 'block');
	$("#title_logo_n").css('display', 'none');
}

function GlitchBackGround() {
	$("#bg").css('background-image', 'url(./assets/image/bg/bg_17_1.jpg)');
	$("#bg_filter").css('background-image', 'url(./assets/image/bg/bg_noise_1.gif)');
}

function RedSnow() {
	BeRed();
}

function ReverseStory() {
	$("#story_tag").css('transform', 'scale(1, -1)');
	$("#desc_pic").attr('src', './assets/image/desc_1.png');
}

function UnknownPromoter() {
	$("#unknown_promoter").css('display', 'inline-block');
}

function LoadingNoise() {
	$("#loader-bg").css('background-image', 'url(./assets/image/bg/bg_noise.gif)');
}

function GarbledTexts() {
	$("#title_img").attr('src', './assets/image/logo_w_1.png');
	$("#footer_logo_mark").attr('src', './assets/image/logo_w_1.png');
	setInterval("GarbledTextChange()", 10);
}

function GarbledTextChange() {
	var l = 6;
	var c = "abcdefghijklmnopqrstuvwxyz0123456789";

	var cl = c.length;
	var r = "";
	for(var i=0; i<l; i++){
	  r += c[Math.floor(Math.random()*cl)];
	}

	$("#access_text").text('===' + r + '===');
}