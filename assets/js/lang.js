
let Language, langdata;

$(window).on("load", function(){
	if($.cookie('lang') == undefined) {
		Language = $("language").attr("initial");
	} else {
		Language = $.cookie('lang', {path: '/' });
	}

	Language = $("language").attr("initial");
	langdata = $("language").attr("lang").split(",");
	langmain(200);
});

function langmain(time){
	this.main = function(){
		url = location.href;
		if(url.match("#ja") || url.match("#en")) {
            // console.log("yes!");
            for(i in langdata){
            	if(langdata[i].indexOf(url.split("#")[1]) >= 0){
            		Language = url.split("#")[1];
            		$.cookie('lang', Language, {path: '/' });
            		$(".lang").each(function(i) {
            			lang = $(this).attr("language");
            			if(lang == Language) {
            				$(this).show();
            			} else {
            				$(this).hide();
            			}
            		});
            	}
            }
        } else {
            // console.log("no!");
            $(".lang").each(function(i) {
            	$.cookie('lang', Language, {path: '/' });
            	lang = $(this).attr("language");
            	if(lang == Language) {
            		$(this).show();
            	} else {
            		$(this).hide();
            	}
            });
        }
    }

    $('._drawer_bg').fadeOut();
    $('._drawer_button').removeClass('active');
    $('nav').removeClass('open');
    $('body').css('overflow', 'auto');
    window.removeEventListener( 'touchmove' , movefun, { passive: false } );
    
    setTimeout(this.main, time);
}
$(".language").on("click", function(){
	langmain(200);
});