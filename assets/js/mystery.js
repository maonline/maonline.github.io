function mypreload(){for(var a=0;a<arguments.length;a++){$("<img>").attr("src",arguments[a])}}$(function(){setbackGround(0);mypreload("./assets/image/mystery_question/q_1.png","./assets/image/mystery_question/q_2.png","./assets/image/mystery_question/q_3.png","./assets/image/mystery_question/q_4.png","./assets/image/mystery_question/q_5.png","./assets/image/mystery_question/q_6.png","./assets/image/mystery_question/q_7.png","./assets/image/mystery_question/q_8.png")});function setbackGround(a){$("#nazo_area_form_inp").prop("disabled",false);$("#nazo_area_form_sub").prop("disabled",false);for(var b=0;b<10;b++){if(b==a){$('.nazo_event_cont_list a[data-numb="'+b+'"] li').css("background-image","url(./assets/image/mystery/bg_event_0.png)");if($.cookie("Q"+b)==="true"){$("#nazo_area_form_inp").prop("disabled",true);$("#nazo_area_form_sub").prop("disabled",true)}}else{if($.cookie("Q"+b)==undefined){$('.nazo_event_cont_list a[data-numb="'+b+'"] li').css("background-image","url(./assets/image/mystery/bg_event_1.png)")}else{if($.cookie("Q"+b)==="true"){$('.nazo_event_cont_list a[data-numb="'+b+'"] li').css("background-image","url(./assets/image/mystery/bg_event_3.png)");$('.nazo_event_cont_list a[data-numb="'+b+'"] li').css("color","#fff")}else{$('.nazo_event_cont_list a[data-numb="'+b+'"] li').css("background-image","url(./assets/image/mystery/bg_event_1.png)")}}}}for(var b=1;b<8;b++){if($.cookie("Q"+b)==undefined){return}else{if(!($.cookie("Q"+b)==="true")){return}}}$('.nazo_event_cont_list a[data-numb="7"] li').css("border-radius","0");$('.nazo_event_cont_list a[data-numb="7"] li').css("border-bottom","2px solid #111");$('.nazo_event_cont_list a[data-numb="8"] li').css("display","block");$('.nazo_event_cont_list a[data-numb="9"] li').css("display","block")}$(".nazo_list_clicker").click(function(){var a=$(this).data("numb");$(".nazo_list_clicker").attr("data-sel","false");$(this).attr("data-sel","true");$("#nazo_area_form_inp").attr("data-form_inp",a);setbackGround(a);if(a==0){$("#nazo_area_img").css("display","none");$("#nazo_area_form").css("display","none");$("#nazo_area_last_answer_desc").css("display","none");$("#nazo_area_desc").css("display","inline-block")}else{if(a==9){$("#nazo_area_img").css("display","none");$("#nazo_area_desc").css("display","none");$("#nazo_area_last_answer_desc").css("display","inline-block");$("#nazo_area_form").css("display","inline-block")}else{$("#nazo_area_last_answer_desc").css("display","none");$("#nazo_area_desc").css("display","none");$("#nazo_area_img").attr("src","./assets/image/mystery_question/q_"+a+".png");$("#nazo_area_img").css("display","inline-block");$("#nazo_area_form").css("display","inline-block")}}});function onCheckAnswer(){var a=$("#nazo_area_form_inp").attr("data-form_inp");var c=$("#nazo_area_form_inp").val().toUpperCase();var e=new jsSHA("SHA-256","TEXT");if(a==0){return}for(var b=0;b<10;b++){e.update(c);c=e.getHash("HEX")}var d="";if(a==1){d="a4a8d086e653d5a941fd585cb43434b3fbc5474f5e15e3792b2e1ca756192869"}if(a==2){d="b9abc4693a434ca98857a42543c7b2e0b364af972e696010f2e8fb63ad6ad585"}if(a==3){d="2fba1f379cd4d2a388db8f6e6f91bf64044bd52af04695011f1f02ad1bc05f9c"}if(a==4){d="d95cb7c137a7d87cf47c7363d821c86c966b7b829793ed72752004596a948516"}if(a==5){d="9d5f89ea7040b30914b9525414724ffd846bcc4f1243f23835aebc4c65e443aa"}if(a==6){d="86d307789c3a33dc0c78d0d27829c587809a02bcb99b4921092a7073a0949b5b"}if(a==7){d="9be3324d5c8ed36b310a75aa05b8cb92e78dbe561d349984a6fc171871fc1492"}if(a==8){d="b76234b0f7dfb0a4a8859e019bcb8a3e5accd805b873a8238e785eb8afb79ca8"}if(a==9){d="72155d5eb6634a43f2fb8b21d4193e60df15c1f11ce313e93b8d515bf94c9b03"}if(c==d){$.cookie("Q"+a,"true",{expires:600000,path:"/"});if(a==9){window.open("mystery_answer.html","_blank")}location.reload()}else{alert("回答ハ間違ッテイル")}};
