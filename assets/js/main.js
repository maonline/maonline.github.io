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

function angle_lock(){
    $.ajax({
        url: "./assets/include/angle_lock.html",
        cache: false,
        async: false,
        dataType: 'html',
        success: function(html){
            document.write(html);
        }
    });
    
}
