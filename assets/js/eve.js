var cou = 0;

$('.sme').click(function() {
	cou++;
	if (cou == 5) {
		openModal("./assets/loader/news/summer_hint1.html");
		cou = 0;
	}
});