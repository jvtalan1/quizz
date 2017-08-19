$(document).ready(Execute);

var rotate = 0;
var answers = [0,0,0,0,0,0,0,0,0,0];
var qIndex = 0;
var retakes = 1;
var items = document.getElementsByClassName('quiz-item');
showQuestion(qIndex);

function Execute() {
	$('#nextButton').css('display', 'none');
	$('#quiz-progress').css('display', 'none');
	$('div.final-confirm').css('display', 'none');
	$('div.results').css('display', 'none');
	$('#btn-thumbsup').hover(function(){
			$(this).find('img').attr('src', '../CSS/thumbs-uphover.png');
		}, function(){
			$(this).find('img').attr('src', '../CSS/thumbs-up.png');
	});
	$('#btn-think').hover(function(){
		$(this).find('img').attr('src', '../CSS/thinkhover.png');
		}, function(){
		$(this).find('img').attr('src', '../CSS/think.png');
	});
	$('div.content-left').animate({'marginLeft':'18%','marginRight':'18%'},1000);
	$('#btn-think').click(function() {
		if(rotate==0) {
			$('div.content-left').fadeTo('slow', 0.7, function(){
				$(this).css('background-image','url(../CSS/gradientlight2.jpg)');
			}).delay(1000).fadeTo('slow', 1);
		}
		else if(rotate==1) {
			$('div.content-left').fadeTo('slow', 0.7, function(){
				$(this).css('background-image','url(../CSS/gradientlight1.jpg)');
			}).delay(1000).fadeTo('slow', 1);
		}
		else if(rotate==2) {
			$('div.content-left').fadeTo('slow', 0.7, function(){
				$(this).css('background-image','url(../CSS/gradientlight3.jpg)');
			}).delay(1000).fadeTo('slow', 1);
		}
		else if(rotate==3) {
			$('div.content-left').fadeTo('slow', 0.7, function(){
				$(this).css('background-image','url(../CSS/gradientlight4.jpg)');
			}).delay(1000).fadeTo('slow', 1);
		}
		else if(rotate==4) {
			$('div.content-left').fadeTo('slow', 0.7, function(){
				$(this).css('background-image','url(../CSS/gradientlight5.svg)');
			}).delay(1000).fadeTo('slow', 1);
		}
		else if(rotate==5) {
			$('div.content-left').fadeTo('slow', 0.7, function(){
				$(this).css('background-image','url(../CSS/gradientlight6.svg)');
			}).delay(1000).fadeTo('slow', 1);
			rotate=0;
		}
		rotate++;
	});
}

function proceed(n) {
	showQuestion(qIndex += n);
	$('#nextButton').css('display', 'block');
	$('#quiz-progress').css('display', 'block');
	$('div.confirm-ready').css('display', 'none');
}

function skip(n) {
	if ($('button.choices').attr('disabled')=='disabled') {
		nextItem(n);
	}
	else {
		$('#confirm-skip').modal('show');
	}
}

function nextItem(n) {
	if ($('button.choices').attr('disabled')=='disalbed') {
		alert("no choice was made");
	}
	$('#correct').css('display', 'none');
	$('#wrong').css('display', 'none');
	showQuestion(qIndex += n);
	
}

function showQuestion(n) {
	var i=0;

	for (i=0; i<items.length; i++) {
		items[i].style.display="none";
	}

	if (qIndex==items.length+1) {
		$('#nextButton').css('display', 'none');
		$('#quiz-progress').css('display', 'none');
		$('button.choices').removeAttr('disabled');
		$('div.final-confirm').fadeIn('slow');
	}
	else if (qIndex==items.length) {
		$('#nextButton').html('Finish');
	}
	
	$('button.choices').removeAttr('disabled');
	$(items[qIndex-1]).fadeIn('slow');
	progress(qIndex);
}

function inputAns(ele) {
	var x = answers[qIndex-1];
	answers[qIndex-1] = x + parseInt(ele.value);
	
	if (ele.value==1) {
		$('#correct').fadeIn('fast');
		$(ele).css({'background-color': '#ABDAE2','color':'#000000'});
		$('button.choices').attr('disabled', 'disabled');
		$('div.btn-group').css('display', 'none');
	}
	else {
		$('#wrong').fadeIn('fast');
		$(ele).css({'background-color': '#C6574E','color':'#FFFFFF'});
		$('button.choices').attr('disabled', 'disabled');
		$('div.btn-group').css('display', 'none');
	}
}

function progress(n) {
	$('#span').html(n+"/"+items.length);
	n *= 10;
	$('.progress-bar').attr('aria-valuenow', n).css('width', n+'%');

}

function retake() {
	$('button.choices').css({'background-color': '','color':''});
	$('div.final-confirm').css('display', 'none');
	$('#nextButton').css('display', 'none');
	$('#quiz-progress').css('display', 'none');
	$('div.results').css('display', 'none');
	$('#retake').css('display', 'none');
	$('div.confirm-ready').fadeIn('slow');
	$('#nextButton').html('Next Question');
	var i=0;

	var results = document.getElementsByClassName('shown');
	for (i=0; i<results.length; i++) {
		results[i].style.display="none";
	}

	var resultsTries = document.getElementsByClassName('shown-id');
	for (i=0; i<resultsTries.length; i++) {
		resultsTries[i].style.display="none";
	}

	qIndex=0;
	showQuestion(qIndex);
	retakes++;
}

function showResults() {
	var i = 0;
	var a = 0;
	var b = 0;
	var x = 0;

	$('div.final-confirm').css('display', 'none');
	$('div.results').fadeIn('slow');

	if(retakes==1){
		$('#results').append('<h3 class="shown-id">You currently have&nbsp;'+retakes+'&nbsp;try for this quiz.</h3>');
	}
	if(retakes!=1){
		$('#results').append('<h3 class="shown-id">You currently have&nbsp;'+retakes+'&nbsp;tries for this quiz.</h3>');
	}

	for (i=0; i<answers.length; i++) {
		a = (answers[i]/retakes)*100;
		x = retakes - answers[i];
		b = x/retakes*100;
		var q = i+1;
		var result = '<h5 class="shown">Question '+q+':</h5><div class="progress shown"><div class="progress-bar progress-bar-success active shown" role="progressbar" aria-valuenow="'+a+'" aria-valuemin="0" aria-valuemax="100" style="width:'+a+'%"><b>'+a+'% correct</b></div><div class="progress-bar progress-bar-danger active shown" role="progressbar" aria-valuenow="'+b+'" aria-valuemin="0" aria-valuemax="100" style="width:'+b+'%"><b>'+b+'% incorrect</b></div></div>';
		$('#results').append(result);
	}
	$('.progress:last').after('<button id="retake" type="button" class="choices" onclick="retake()">Retake The Quiz</button>');
}
