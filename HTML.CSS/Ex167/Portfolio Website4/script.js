//smooth scrolling
jQuery(document).ready(function($){
$('a').click(function(){	
var hashindex = $(this).attr("href").indexOf('#');
var hreflen = $(this).attr("href").length;
var anchortag = $(this).attr("href").substr(hashindex, hreflen);
$('html, body').animate({
scrollTop: $( anchortag ).offset().top -100
}, 700);
return false;
});
});