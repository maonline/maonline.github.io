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