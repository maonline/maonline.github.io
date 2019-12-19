var audioLs = [];

function PlayMusic(url) {
	var audio = new Audio(url);
	audio.setAttribute("preload", "auto");
	audio.setAttribute("controls", "none");
	audio.setAttribute("display", "none");
	audio.volume = (document.getElementById('volume_slider_input').value / 100);

	audioLs.push(audio);
	audio.play();
}

function StopAllMusic() {
	var baseVol = 0.5;
	var fadeSpeed = 1500;

    var end_func = setInterval(function() {
    	var ado;
		for (var i = 0; i < audioLs.length; i++) {
			ado = audioLs[i];
			if (ado.volume - (baseVol / 100) <= 0) {
				ado.pause();
				ado = null;
				audioLs.splice(i, 1);
				clearInterval(end_func);
				return;
			}
			ado.volume = ado.volume - (baseVol / 100);
    	}
    }, fadeSpeed * baseVol / 100);
}


