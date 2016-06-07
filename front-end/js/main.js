// Defenitions
var pageContent = "";
var textContainer = "";
var services = {
	"voiceChatInput":	"",
	"textChatInput":	"",
	"textAnalysis":		"http://localhost:3000/textanal"
};
var completed = 0;

// Initialization
$(document).ready(function (){
	$(".button-collapse").sideNav();
});


// Functions
function restart() {
	$("#content").fadeOut("fast");
	window.location.href = "index.html";
}

function showHome() {
	pageContent = mainPage;
	showPage();
	setTimeout(function() {
		validate();
	}, 250);
	
}

function showLoading() {
	pageContent = loadingPage;
	showPage();
}

function validate() {
	console.log(completed);
	if (completed === 0) {
		$("#mainSubmit").addClass('disabled');
	}
}

function showPage() {
	$("#content").fadeOut("fast", function () {
		$("#content").empty();
		$("#content").append(pageContent);
		$("#content").fadeIn("fast");
	});
}

function showSocial() {
	showLoading();
	setTimeout(function() {
		pageContent = socialPage;
		showPage();
	}, 1200);	
}

function showEssay() {
	showLoading();
	setTimeout(function() {
		pageContent = essayPage;
		showPage();
	}, 1500);
}

function contactServer(dataToSend, serviceName) {
	showLoading();
	$.ajax({
		url:		services[serviceName],
		type:		'POST',
		datatype:	'json',
		//beforeSend: function(){},
		data:		dataToSend,
		crossDomain:true,
		
		success: 	function(response) {
			console.log(response);
			showResults(response);
			
		},
		error:		function() {
			alert("Ops, something went wrong, we'll have to start over");
			restart();
		}
	});
}

function showResults(results) {
	pageContent = resultsPage;
	showPage();
	results = JSON.parse(results);
	setTimeout(function() {
		$("#career1").empty();
		$("#career1").append(results[0].major + ' - ' + Math.round(((16 - results[0].score) * 100) / 16) + '% Match');
		$("#career2").empty();
		$("#career2").append(results[1].major + ' - ' + Math.round(((16 - results[1].score) * 100) / 16) + '% Match');
		$("#career3").empty();
		$("#career3").append(results[2].major + ' - ' + Math.round(((16 - results[2].score) * 100) / 16) + '% Match');
	}, 500)
}

function submit() {
	if (completed === 0) {
		return;
	}
	var textWrapper = {"message": textContainer};
	contactServer(textWrapper, "textAnalysis");
}

function saveEssay() {
	textContainer += $("#essayInput").val() + '\n';
	completed++;
	showHome();
}

// Pages
var mainPage = '<div class="row"><a class="waves-effect waves-light btn-large screen-wide"><i class="material-icons left">settings_voice</i>Voice Chat <smaller>(Coming Soon)</smaller></a></div><div class="row"><a class="waves-effect waves-light btn-large screen-wide"><i class="material-icons left">chat</i>Text Chat <smaller>(Coming Soon)</smaller></a></div><div class="row"><a class="waves-effect waves-light btn-large screen-wide" onclick="showEssay()"><i class="material-icons left">subject</i>Submit an Essay</a></div><div class="row"><a class="waves-effect waves-light btn-large screen-wide" onclick="showSocial()"><i class="material-icons left">language</i>Social Media</a></div><div class="fixed-action-btn" style="bottom: 20px; right: 24px;"><a class="waves-effect waves-light btn red" id="mainSubmit" onclick="submit()"><i class="material-icons left">launch</i> Submit</a></div>';

var socialPage = '<div class="row"><a class="waves-effect waves-light btn-large screen-wide">Facebook <smaller>(Coming Soon)</smaller></a></div><div class="row"><a class="waves-effect waves-light btn-large screen-wide">Twitter <smaller>(Coming Soon)</smaller></a></div><div class="fixed-action-btn" style="bottom: 24px; left: 24px;"><a class="waves-effect waves-light btn red" onclick="showHome()"><i class="material-icons left">replay</i> Back</a></div>';

var loadingPage = '<img src="img/potato.jpg" class="loading-img"><h4 class="loading-text">Loading...</h4>';

var essayPage = '<div class="row"><form class="col s12"><div class="row"><div class="input-field col s12"><textarea id="essayInput" class="materialize-textarea " placeholder="Please write (or copy/paste) an essay about yourself here. A preferred length would be 1000+ words"></textarea></div></div></form></div><div class="fixed-action-btn" style="bottom: 20px; left: 24px;"><a class="waves-effect waves-light btn red" onclick="showHome()"><i class="material-icons left">replay</i> Back</a></div><div class="fixed-action-btn" style="bottom: 20px; right: 24px;"><a class="waves-effect waves-light btn red" onclick="saveEssay()"><i class="material-icons left">verified_user</i>Save</a></div>';

var resultsPage = '<div class="row"><div class="card blue-grey"><div class="card-content white-text"><span class="card-title">Your Top Matches</span><ul><li id="career1">Option 1</li><li id="career2">Option 2</li><li id="career3">Option 3</li></ul></div></div></div>';