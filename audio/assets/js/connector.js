var connection;
var isConnect = false;
var PLAYER_TOKEN = "";
var PORT = "";

$(function() {
	if (getParam('token') == null || getParam('p') == null) {
		// connection.close();
		document.getElementById('connect_button').disabled = "disabled";
		document.getElementById('connect_button').innerText = "CAN'T CONNECT";
		return;
	} else {
		PLAYER_TOKEN = getParam('token');
		PORT = getParam('p');
	}
	connection = new WebSocket('wss://ddos-proxy01.my-server.pro:' + PORT);

	connection.onopen = function () {
		console.log('Connected!');
		document.getElementById('connect_button').disabled = "";
		isConnect = true;
	};

	connection.onerror = function (error) {
		console.log('WebSocket Error ' + error);
	};

	connection.onmessage = function (e) {
		console.log(e.data);

		var json_map = JSON.parse(e.data);
		RunProgress(json_map);
	};

	connection.onclose = function (e) {
		console.log('Closed!');
		document.getElementById('connect_button').style.display = "block";
		document.getElementById('center_panel').style.display = "none";
		isConnect = false;

		StopAllMusic();
	};

});

function StartConnect() {
	document.getElementById('connect_button').disabled = "disabled";

	if (isConnect) {
		connection.send(PLAYER_TOKEN);
	} else {
		alert("ERROR!");
		document.getElementById('connect_button').disabled = "";
	}
}

function RunProgress(json_map) {

	var Order_Type = json_map["TYPE"];

	if (Order_Type == "SET") {
		var PlayerName = json_map["NAME"];
		document.getElementById('user_head').setAttribute('src', 'https://minotar.net/avatar/' + PlayerName);
		document.getElementById('user_name').innerText = PlayerName;
		document.getElementById('info_element_text').innerText = "Connecting with " + PlayerName + "!";

		document.getElementById('connect_button').style.display = "none";
		document.getElementById('center_panel').style.display = "block";

		var min = 1;
		var max = 3;
		var a = Math.floor(Math.random() * (max + 1 - min)) + min;

		PlayMusic("assets/voice/connect_voice_" + a + ".wav");

	} else if (Order_Type == "BAD_REQUEST") {
		//TODO

	} else if (Order_Type == "PLAY") {
		var url = json_map["SOURCE"];
		PlayMusic(url);

	} else if (Order_Type == "STOP") {
		StopAllMusic();

	} else {
		console.log("UNKNOWN: " + key + "#" + json_map[TYPE]);
	}
}