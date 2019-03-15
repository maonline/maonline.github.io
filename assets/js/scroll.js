var posi_top,wih_half,current_view;

$(window).load(function(){

	var wih = window.innerHeight;
	var wih_half = wih/2;
	current_view = wih_half;
	set_posi();
});

$(window).resize(function() {

	var wih = window.innerHeight;
	var wih_half = wih/2;
	current_view = wih_half;
	set_posi();
});

$(window).scroll(function(){

	var wih = window.innerHeight;
	var wih_half = wih * 0.6;
	current_view = $(this).scrollTop() + wih_half;
	set_posi();

});

function set_posi(){

	$('.demo_center').each(function() {
		var posi = $(this).offset();
		posi_top = posi.top;

		//初回のみ
		if(current_view > posi_top){
			$(this).addClass('do');
		}
	});

	$('.demo_center_toggle').each(function() {
		var posi = $(this).offset();
		posi_top = posi.top;

		//戻ればなんども
		if(current_view > posi_top){
			$(this).addClass('do');
		}else{
			$(this).removeClass('do');
		}
	});

}