var images = document.getElementsByTagName('img');
var loadingBar = document.getElementById('loading_bar');
var loadingWrap = document.getElementById('loading_barWrap');
var loadingArea = document.getElementById('loading');

var imgLen = images.length;
var barLen = 100 / imgLen;
var barWidth = 0;

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