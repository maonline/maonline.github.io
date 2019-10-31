function mypreload() {
    for(var i = 0; i< arguments.length; i++){
        $("<img>").attr("src", arguments[i]);
    }
}

$(function() {
	setbackGround(0);
	mypreload(
		'./assets/image/event/winter_mystery/q_1.png',
		'./assets/image/event/winter_mystery/q_2.png',
		'./assets/image/event/winter_mystery/q_3.png',
		'./assets/image/event/winter_mystery/q_4.png',
		'./assets/image/event/winter_mystery/q_5.png',
		'./assets/image/event/winter_mystery/q_6.png',
		'./assets/image/event/winter_mystery/q_7.png',
		'./assets/image/event/winter_mystery/q_8.png',
		'./assets/image/event/winter_mystery/q_9.png'
	);
});

function setbackGround(num) {

	$("#nazo_area_form_inp").prop("disabled", false);
	$("#nazo_area_form_sub").prop("disabled", false);

	for ( var i = 0; i < 10; i++ ) {
		if (i == num) {
			$('.nazo_event_cont_list a[data-numb="' + i +'"] li').css('background-image', 'url(./assets/image/bg/bg_event.png)');

			//もし、解いた後だったら送信ボタンを消す
			if ($.cookie('Q' + i) === 'true') {
				$("#nazo_area_form_inp").prop("disabled", true);
				$("#nazo_area_form_sub").prop("disabled", true);
			}
		} else if ($.cookie('Q' + i) == undefined) {
			$('.nazo_event_cont_list a[data-numb="' + i +'"] li').css('background-image', 'url(./assets/image/bg/bg_event_1.png)');

		} else if ($.cookie('Q' + i) === 'true') {
			$('.nazo_event_cont_list a[data-numb="' + i +'"] li').css('background-image', 'url(./assets/image/bg/bg_event_3.png)');
			$('.nazo_event_cont_list a[data-numb="' + i +'"] li').css('color', '#fff');

		} else {
			$('.nazo_event_cont_list a[data-numb="' + i +'"] li').css('background-image', 'url(./assets/image/bg/bg_event_1.png)');
		}
	}

	for ( var i = 1; i < 8; i++ ) {
		if ($.cookie('Q' + i) == undefined) {
			return;							
		} else if (!($.cookie('Q' + i) === 'true')) {
			return;
		}
	}

	$('.nazo_event_cont_list a[data-numb="7"] li').css('border-radius', '0');
	$('.nazo_event_cont_list a[data-numb="7"] li').css('border-bottom', '2px solid #111');

	$('.nazo_event_cont_list a[data-numb="8"] li').css('display', 'block');
	$('.nazo_event_cont_list a[data-numb="9"] li').css('display', 'block');
}

$('.nazo_list_clicker').click(function(){
	var numb = $(this).data('numb');

	$(".nazo_list_clicker").attr('data-sel', "false");

	$(this).attr('data-sel', "true");
	$("#nazo_area_form_inp").attr('data-form_inp', numb);

	setbackGround(numb);

	if (numb == 0) {
		/* IMG, FORM 非表示 */
		$("#nazo_area_img").css('display', 'none');
		$("#nazo_area_form").css('display', 'none');
		$("#nazo_area_last_answer_desc").css('display', 'none');
		/* STORY文 表示 */
		$("#nazo_area_desc").css('display', 'inline-block');
	
	} else if (numb == 9) {
		/* IMG, STORY文 非表示 */
		$("#nazo_area_img").css('display', 'none');
		$("#nazo_area_desc").css('display', 'none');
		/* LAST ANSWER文 表示 */
		$("#nazo_area_last_answer_desc").css('display', 'inline-block');
		$("#nazo_area_form").css('display', 'inline-block');
	
	} else {
		/* LAST ANSWER文, STORY文 表示 */
		$("#nazo_area_last_answer_desc").css('display', 'none');
		$("#nazo_area_desc").css('display', 'none');
		/* フォームに番号付け, 画像差し替え */
		$("#nazo_area_img").attr('src', './assets/image/event/winter_mystery/q_' + numb + '.png');
		/* IMG, FORM 表示 */
		$("#nazo_area_img").css('display', 'inline-block');
		$("#nazo_area_form").css('display', 'inline-block');
	}

});

function onCheckAnswer() {
	var QNumber = $("#nazo_area_form_inp").attr('data-form_inp');
	var PlayerAnswer = $("#nazo_area_form_inp").val();
	var SHA_OBJ = new jsSHA("SHA-256", "TEXT");
	if (QNumber == 0) return;

	for ( var i = 0; i < 10; i++ ) {
		SHA_OBJ.update(PlayerAnswer);
		PlayerAnswer = SHA_OBJ.getHash("HEX");
	}

	var RightAnswer = "";
	if (QNumber == 1) RightAnswer = "a4a8d086e653d5a941fd585cb43434b3fbc5474f5e15e3792b2e1ca756192869";
	if (QNumber == 2) RightAnswer = "b9abc4693a434ca98857a42543c7b2e0b364af972e696010f2e8fb63ad6ad585";
	if (QNumber == 3) RightAnswer = "2fba1f379cd4d2a388db8f6e6f91bf64044bd52af04695011f1f02ad1bc05f9c";
	if (QNumber == 4) RightAnswer = "d95cb7c137a7d87cf47c7363d821c86c966b7b829793ed72752004596a948516";
	if (QNumber == 5) RightAnswer = "9d5f89ea7040b30914b9525414724ffd846bcc4f1243f23835aebc4c65e443aa";
	if (QNumber == 6) RightAnswer = "86d307789c3a33dc0c78d0d27829c587809a02bcb99b4921092a7073a0949b5b";
	if (QNumber == 7) RightAnswer = "9be3324d5c8ed36b310a75aa05b8cb92e78dbe561d349984a6fc171871fc1492";
	if (QNumber == 8) RightAnswer = "b76234b0f7dfb0a4a8859e019bcb8a3e5accd805b873a8238e785eb8afb79ca8";
	if (QNumber == 9) RightAnswer = "72155d5eb6634a43f2fb8b21d4193e60df15c1f11ce313e93b8d515bf94c9b03";

	gtag(
		'event',
		'click',
		{
			'event_category' : 'WinterMystery-Q' + QNumber,
			'event_label': $("#nazo_area_form_inp").val(),
			'non_interaction': true
		}
	);

	if (PlayerAnswer == RightAnswer) {
		$.cookie('Q' + QNumber, 'true', { expires: 60, path: '/' });
		if (QNumber == 9) window.open('winter.html', '_blank');
		location.reload();
	} else {
		alert('回答ハ間違ッテイル');
	}
}





/**************************************************/

/*------------------------
canvas要素の取得と設定
-------------------------*/
//canvas要素の取得
var canvas = document.getElementById('canvas'); //canvasを取得
var ctx = canvas.getContext('2d'); //canvasのコンテキストを取得

//canvasサイズの設定
var wd_width = window.innerWidth; //ウィンドウ幅をキャンバス幅に。
var wd_height = window.innerHeight; //ウィンドウ高をキャンバス高に。

ctx.canvas.width = wd_width;
ctx.canvas.height = wd_height;

var snow_color_1 = 'rgba(225, 225, 225, 0.8)';
var snow_color_2 = 'rgba(225, 225, 225, 0.2)';
var snow_color_3 = 'rgba(225, 225, 225, 0.1)';

/*------------------------------------------------
ループ処理「requestAnimFrame」のベンダープレフィクス
-------------------------------------------------*/
var animFrame = window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function(callback) {
	window.setTimeout(callback, 1000 / 60);
};

/*------------------------
canvasサイズを可変にする
-------------------------*/

function canvas_resize() {
	var rswd_width = window.innerWidth;
	var rswd_height = window.innerHeight;

	canvas.setAttribute('width', rswd_width);
	canvas.setAttribute('height', rswd_height);
}
//リサイズイベントを拾って実行
window.addEventListener('resize', canvas_resize, false);
canvas_resize();


/*------------------------
乱数
min から max までの乱整数を返す関数
Math.round() を用いると、非一様分布になります
-------------------------*/
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


/*------------------------
雪の設定
-------------------------*/
// 雪の粒を保存する配列
const snows = [];

// 雪の粒の初期位置とサイズの設定
function snow() {
	this.position_x = getRandomInt(0, wd_width);
	this.position_y = getRandomInt(0, wd_height);
	this.snow_size = getRandomInt(1, 4);
  this.speed = getRandomInt(1, 3); //落下速度
  this.wind = getRandomInt(0, 0.5);　 //横風の強さ
}

// 雪の粒の描画
snow.prototype.draw = function() {
	var snow_grad = ctx.createRadialGradient(
		this.position_x,
		this.position_y,
		this.snow_size * 0.6,
		this.position_x,
		this.position_y,
		this.snow_size
		);
	/* グラデーション終点のオフセットと色をセット */
	snow_grad.addColorStop(0, snow_color_1);
	snow_grad.addColorStop(0.5, snow_color_2);
	snow_grad.addColorStop(1, snow_color_3);
	ctx.beginPath();
    ctx.fillStyle = snow_grad; // グラデーションをfillStyleプロパティにセット
    ctx.arc(this.position_x, this.position_y, this.snow_size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}
  // 雪の粒の移動
  snow.prototype.move = function() {
  	this.position_x += this.wind　 + Math.sin(this.position_y / 20) * 0.3;
  	this.position_y += this.speed;

  	if (this.position_y > ctx.canvas.height) {
  		this.position_y = 0;
  		this.position_x = getRandomInt(0, wd_width);
  	}
  }

// 雪の粒の密度(雪の量)
function snow_density(snow_count) {
	for (var num = 0; num < snow_count; num++) {
		snows[num] = new snow();
	}
}



/*------------------------
雪を降らす処理
-------------------------*/
//雪の粒を描画する
function snow_draw() {
	ctx.clearRect(0, 0, wd_width, wd_height);
	for (var num = 0; num < snows.length; num++) {
		snows[num].draw();
	}
}

//雪の粒の座標を更新する
function snow_move() {
	for (var num = 0; num < snows.length; num++) {
		snows[num].move();
	}
}

//ループ処理
function snowy() {
	snow_draw();
	snow_move();
	animFrame(snowy);
}

snow_density(40); //雪の量の指定
snowy();

function BeRed() {
	snow_color_1 = 'rgba(225, 0, 0, 0.8)';
	snow_color_2 = 'rgba(225, 0, 0, 0.2)';
	snow_color_3 = 'rgba(225, 0, 0, 0.1)';
}