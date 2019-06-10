var cou = 0;
var cou2 = 0;

$('.sme').click(function() {
	cou++;
	if (cou == 5) {
		openModal("./assets/loader/news/summer_hint1.html");
		cou = 0;
	}
});

$('.lgs').click(function() {
	if ($.cookie('cou2') == undefined) {
		$.cookie('cou2', 1, { expires: 1 / 24 / 60, path: '/' });
		location.href = 'https://www.minenet.work';
	} else {

		cou2 = $.cookie('cou2');
		if (cou2 == 5) {
			openModal("./assets/loader/news/summer_hint0.html");
			$.cookie('cou2', null, { expires: -1, path: '/' });
			$.cookie('cou2', 5, { expires: 10, path: '/' });

		} else if (cou2 == 6) {
			openModal("./assets/loader/news/summer_qz2.html");
			$.cookie('cou2', null, { expires: -1, path: '/' });
			$.cookie('cou2', 6, { expires: 10, path: '/' });
			
		} else if (cou2 == 7) {
			openModal("./assets/loader/news/summer_qz3.html");
			$.cookie('cou2', null, { expires: -1, path: '/' });
			$.cookie('cou2', 7, { expires: 10, path: '/' });
			
		} else {
			$.cookie('cou2', null, { expires: -1, path: '/' });
			cou2++;
			$.cookie('cou2', cou2, { expires: 1 / 24 / 60, path: '/' });
			location.href = 'https://www.minenet.work';
		}

	}


});