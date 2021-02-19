var images = document.getElementsByTagName('img');
var loadingBar = document.getElementById('loading_bar');
var loadingWrap = document.getElementById('loading_barWrap');
var loadingArea = document.getElementById('loading');

var imgLen = images.length;
var barLen = 100 / imgLen;
var barWidth = 0;

if (getParam('load') == 'false') {
  var el = document.createElement("script");
  el.src = "./assets/js/anime.min.js";
  document.body.appendChild(el);
  var el = document.createElement("script");
  el.src = "./assets/js/block_reveal.js";
  document.body.appendChild(el);
  var el = document.createElement("script");
  el.src = "./assets/js/load_animation.js";
  document.body.appendChild(el);
  loadingArea.style.display = 'none';
}

for (var i = 0; i < imgLen; i++) {
    images[i].onload = function() {
        barWidth = barWidth + barLen;
        loadingBar.style.width = barWidth + '%';
    }
}

function loadLen() {
    if (!loadingArea.classList.contains('loading_end')) {
        if (loadingBar.clientWidth === loadingWrap.clientWidth) {
            loadingArea.classList.add('loading_end');
        } else {
            setTimeout(loadLen, 1000);
        }
    }
}

// 100%にならなかった時用の処理
window.addEventListener('load', function(){
  if (!loadingArea.classList.contains('loading_end')) {
    loadingBar.style.width = '100%';
    setTimeout(function(){
      loadingArea.classList.add('loading_end');
    }, 1000);
  }
});