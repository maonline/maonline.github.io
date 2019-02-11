$(function () {
	$('#openModal').click(function(){
		document.getElementById("donate-error1").style.display = 'none';
		document.getElementById("donate-error2").style.display = 'none';
		document.getElementById("donate-error3").style.display = 'none';
		document.getElementById("thxMessage").style.display = 'none';

		$('#modalArea').fadeIn();
	});
	$('#closeModal , #modalBg').click(function(){
		$('#modalArea').fadeOut();
	});
});

$(function () {
	$('#openContact-form').click(function(){
		document.getElementById("contact-form-error1").style.display = 'none';
		document.getElementById("contact-form-error2").style.display = 'none';
		document.getElementById("contact-form-error3").style.display = 'none';
		document.getElementById("contact-form-error4").style.display = 'none';
		document.getElementById("contact-form-thxMessage").style.display = 'none';

		$('#contact-form').fadeIn();
	});
	$('#closecontact-form , #contact-formBg').click(function(){
		$('#contact-form').fadeOut();
	});
});