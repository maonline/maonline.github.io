function header(rootDir, active){
    $.ajax({
        url: rootDir + "assets/include/header.html",
        cache: false,
        async: false,
        dataType: 'html',
        success: function(html){
            html = html.replace(/\{\$root\}/g, rootDir);
            document.write(html);

            if (active == undefined) return;

            $('.pc_menu_list').each(function(index, element){
                if (element.classList.contains(active)) element.classList.add('active');
            })
        }
    });
}

function footer(rootDir){
    $.ajax({
        url: rootDir + "assets/include/footer.html",
        cache: false,
        async: false,
        dataType: 'html',
        success: function(html){
            html = html.replace(/\{\$root\}/g, rootDir);
            document.write(html);
        }
    });
    
}

$(function(){
    $('a[href^="#"]').click(function(){
        var speed = 500;
        var href= $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $("html, body").animate({scrollTop: position}, speed, "swing");
        return;
    });
});

function getParam(name) {
    var url = window.location.href;
    if (url.length > 100) return null;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}