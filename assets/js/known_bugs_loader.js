$(function(){var bugs_list=$("#bugs_list");$.ajax({url:'known_bugs.xml?rand='+Math.random(),type:'get',dataType:'xml',cache:!1,success:function(data){$("#no_bugs").css({'display':'none'});$(data).find("bugs_list").find("bug").each(function(){var status_icon="";switch($(this).find("status").text()){case "found":status_icon="bug";break;case "timed":status_icon="time";break;case "fixed":status_icon="fixed";break;default:status_icon="unknown";break} var bug_obj='<div class="bug_tile '+status_icon+'">'+'<h2 class="bug_tile_title">'+'#'+('000'+$(this).find("id").text()).slice(-3)+' | '+$(this).find("subject").text()+'<span class="update_date">'+$(this).find("date").text()+'</span></h2>'+'<p class="bug_tile_description">'+$(this).find("description").text()+'</p>'+'</div>';bugs_list.append(bug_obj)})},error:function(){}})})
