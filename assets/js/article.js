function article_get() {
    var articleId = getParam("article");
    if (articleId == null) {
        articleListDisplay();
        console.log("ID NULL");
        return;
    } else {
        article_load(articleId);
    }
}

function article_load(articleId) {
    var articleMain = true;
    $.ajax({
        url: "./assets/article/" + articleId + ".html",
        cache: false,
        async: false,
        dataType: 'html',
        success: function(html){
            html = html.replace(/\{\$root\}/g, "./assets/image/article/" + articleId + "/");
            document.write(html);
            articleMain = true;
            console.log("PAGE LOAD");
        },
        error: function(data) {
            articleMain = false;
            console.log("PAGE NOT FOUND");
        }
    });

    if (articleMain) {
        articleMainDisplay();
    } else {
        articleListDisplay();
    }
}

function articleMainDisplay() {
    $(function(){
        $("#article_area").show();
        $("#list_article_area").hide();
        console.log("articleMainDisplay");
    });
}

function articleListDisplay() {
    $(function(){
        $("#article_area").remove();
        $("#list_article_area").show();
        console.log("articleListDisplay");
    });
}

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