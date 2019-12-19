// var PublicKey = "MIIBHjANBgkqhkiG9w0BAQEFAAOCAQsAMIIBBgKB/gCcWKne+Oa4gIKOh4E//nVX+lP93cOJ4URpqeRiZzoWHMpJgc19Kr3ZSRw+C2aradpEyjb/zAeSxlHOQ++ohmSlVLxfutrTFd5l9lRVDSaFmGmOTUEhnsY1aVIZFsuoYe3oWalEHCaXItqEcps1xqO4cGRliI8kiHml1/ezmIj974ivsUPzPytCGO2bcDQsCvr6lf6Wvp+YfESTZaLD5CYjOB7jhiehmgiqLHaBadZ01OSbS1BEtbGPNCVBTDQ1V+7s0zceswceN3pljqBuYKhlekD8rhXLxZY7mbyqX0Sj1uz76vIzk2f+U7kTlbTtWYJIjewmslaTBv6IJr+3AgMBAAE="
var PublicKey = "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAxLw6nS4QQJ5TWY6h/Go45qQiUB3QfxTADan5e0ZKF+BSg+V1Lml0DJEIv6o0ax3NZtZkomwjh4PfcIGEjAzAw9Y66201YQZ/YPaADosRuIAF2ExYoKbLT1w/g6H6bkl8xwJ1UmUAYscotHwmsfF5Y1pa6ZWcEwV/4SWyWja54AqZYMgaEEIRHt9dVbJSjJ2ZHxjhqKi3zITRtTSpvmnsvsff7zAyKYiXvUmdMnH02SCChBu/xkrkvVy1YGEaJPLzE1zt62R7D8++0xxU58W2w0xje8gZ5DVDsMFLAXlZOFHPDgOM/XgwGTYErPROZ9YVP4czOP0FC1ke+WJHFMq3xVNGmAGE2eQma5hzGa6/UwnY2UU6RFeDIid9UH0e+B7lJg+PyzYcHbsCXnUiFPJ/LSn9P+dh56KCxD2rQtN9euLJ7127wEcPNcjIXenGdkcYRbjntjG4VU3DNTXCb28szga4Hq1OX0G2xXjwtaYiahpuGDbe5uzha7qwxvoohReaRjsYSsG5VgizNmOW19Vz+Isq6ARaxhh4dVZSHBj34gJ1aFY6XWr+zR276vvxkrkRlqkKbJUQjFr7F8Z1yTEu04T0TfNIsbPlQHSbIJet4Hq5nTKhwH65SZSp22ac9QIBuOqImiThQA/+ponSOluOFLvhkKP0d+b6DgE+5eUSGXUCAwEAAQ=="

window.onload = function(){
	/* Volume Slider */
	var elem = document.getElementById('volume_slider_input');
	var target = document.getElementById('volume_slider_value');
	var rangeValue = function (elem, target) {
		return function(evt){
			if (elem.value == "0") {
				target.innerHTML = "Mute";
			} else {
				target.innerHTML = elem.value;
			}

			var volumeCt = elem.value / 100;
			for (var i = 0; i < audioLs.length; i++) {
				audioLs[i].volume = parseFloat(volumeCt);
			}
		}
	}

	elem.addEventListener('input', rangeValue(elem, target));
}

function getParam(param, url) {
    if (!url) url = window.location.href;
    var name = param.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
	if (!results[2]) return '';
	if ('token' == param) if (!(results[2].length == 64)) return null;
	if ('p' == param) if (!(results[2].length == 3)) return null;
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function utf8_hex_string_to_string (hex_str1) {
	var bytes2 = hex_string_to_bytes(hex_str1);
	var str2 = utf8_bytes_to_string(bytes2);
	return str2;
}

function decryptOrder(CryptedMessage) {
    // あからじめ仕込んでおいた暗号化データのカンマ","を使って文字列をそれぞれに分割
    var array_rawData = CryptedMessage.split(',');

    var salt = CryptoJS.enc.Hex.parse(array_rawData[0]);  // パスワードSalt
    var iv = CryptoJS.enc.Hex.parse(array_rawData[1]);    // 初期化ベクトル（IV）
    var encrypted_data = CryptoJS.enc.Base64.parse(array_rawData[2]); //暗号化データ本体

    //パスワード（鍵空間の定義）
    var secret_passphrase = CryptoJS.enc.Utf8.parse(PublicKey);
    var key128Bits500Iterations =
      CryptoJS.PBKDF2(secret_passphrase, salt, {keySize: 128 / 8, iterations: 500 });

    //復号オプション（暗号化と同様）
    var options = {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7};

    //復号
    var decrypted = CryptoJS.AES.decrypt({ciphertext:encrypted_data}, key128Bits500Iterations, options);
    // 文字コードをUTF-8にする
    connsole.log(decrypted.toString(CryptoJS.enc.Utf8));

}