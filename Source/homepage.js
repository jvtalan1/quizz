$(document).ready(Execute);

function Execute() {

	$('#content-right').hover(function() {
			$(this).find('img').css('box-shadow', '0px 0px 10px 1px #FFFFFF');
		}, function(){
			$(this).find('img').css('box-shadow', '');
	});

	$('#content-left').click(function() {
		if($(this).width() != '1') {
			$(this).animate({'width': '50%'},1000);
			$('#content-mid').animate({'width': '25%'},1000);
			$('#content-right').animate({'width': '25%'},1000);
			//$(this).find('p').css('transform', 'scale(1.4)');
		}
	});

	$('#content-mid').click(function() {
		if($(this).width() != '1') {
			$(this).animate({'width': '50%'},1000);
			$('#content-left').animate({'width': '25%'},1000);
			$('#content-right').animate({'width': '25%'},1000);
		} 
	});

	$('#content-right').click(function() {
		if($(this).width() != '1') {
			$(this).animate({'width': '50%'},1000);
			$('#content-mid').animate({'width': '25%'},1000);
			$('#content-left').animate({'width': '25%'},1000);
		} 
	});

}