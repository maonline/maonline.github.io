function countDown() {
	var nowTime = new Date();
	var endTime = new Date('2019/02/27 20:00:00');
	var diff  = endTime - nowTime;
	var times = 24 * 60 * 60 * 1000;
	var day   = ('0' + Math.floor(diff / times)).slice(-2);
	var hour  = ('0' + Math.floor(diff % times / (60 * 60 * 1000))).slice(-2);
	var min   = ('0' + Math.floor(diff % times / (60 * 1000)) % 60).slice(-2);
	var sec   = ('0' + Math.floor(diff % times / 1000) % 60 % 60).slice(-2);
	// var ms    = ('0' + Math.floor(diff % times / 10) % 100).slice(-2);
	if(diff > 0){
		document.getElementById("countdown").innerText = day + 'd ' + hour + 'h ' + min + 'm ' + sec +'s';
		// document.getElementById("countdown").innerText = day + 'd ' + hour + 'h ' + min + 'm ' + sec +'s ' + ms;
		setTimeout('countDown()', 10);
	} else {
		document.getElementById("countdown").innerText = '00d 00h 00m 00s';
	}
}