$(function () {
	$('#openModal').click(function(){
		$('#modalArea').fadeIn();
		document.getElementById("donate-error1").style.display = 'none';
		document.getElementById("donate-error2").style.display = 'none';
		document.getElementById("donate-error3").style.display = 'none';
	});
	$('#closeModal , #modalBg').click(function(){
		$('#modalArea').fadeOut();
	});
});