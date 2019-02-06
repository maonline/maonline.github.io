
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
    if (document.getElementById("cp_toggle02").checked == true) {
        document.getElementById("cp_toggle02").checked = false;
    }
    setTimeout(this.main, time);
}
$(".language").on("click", function(){
    langmain(200);
});