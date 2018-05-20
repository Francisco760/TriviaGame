var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var correctSound = new Audio ("sound/correct.mp3");
//var charIntro = ["sound/Bane.m4a", "sound/Brainiac.m4a", "sound/Darkseid.m4a", "sound/Grorilla Grodd.m4a", "sound/Atrocitus.m4a", "sound/Poison Ivy.m4a", "sound/Scarecrow.m4a"];
var wrongSound = new Audio("sound/buzzer.mp3");

$(document).ready(function() {

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();


$("body").on("click", ".start-button", function(event){
	event.preventDefault();  
	generateHTML();

	timerWrapper();

}); 
$("body").on("click", ".answer", function(event){
	
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {


		clearInterval(theClock);
		generateWin();
		correctSound.play();
		
	}
	else {
		clearInterval(theClock);
		generateLoss();
		wrongSound.play();

	}
}); 

$("body").on("click", ".reset-button", function(event){
	resetGame();
}); 

});

function generateLossDueToTimeOut() {
	unansweredTally++;
	introSound.play();
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);   
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);

	setTimeout(wait, 4000);  
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); 
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = [
	"The man who broke the Bat", 
	"Megalomaniacal genius who roams the universe, collecting knowledge to increase his intellectual and scientific prowess", 
	"The lord of Apokolips", 
	"Telepathic brute has long sought to prove his peerless genius by subjugating mankind", 
	"Red Lantern seeking revenge against all members of the Sinestro Corps for their murderous oppression of his home world", 
	"Once an innovative, radical botanical biochemist with a singular goal: make the world safe for plant life to flourish", 
	"The clown prince of chaos", 
	"An anarchist obsessed with using chemistry and psychology to spread and study fear. Plays on the fears of the unknown to inflict terror on victims"
	];
var answerArray = [
	["Bane", "Doomsday", "Sinestro", "Joker"], 
	["Doomsday","Brainiac","Lex Luthor","Darkseid"], 
	["Doomsday", "Chupacabras", "Darkseid", "General Zod"], 
	["Red Hood","Reverse Flash","Gorilla Grodd","Captain Cold"], 
	["Sinestro", "Hulk", "Ultron", "Atrocitus"], 
	["Poison Ivy","Harley Quinn","Talia al Ghul","Cheetah"], 
	["Loki", "Joker", "The Mandarin", "Mephisto"], 
	["Trigon","Starfire","Punisher","Scarecrow"]
];
var imageArray = [
	"<img class='center-block img-right' src='img/bane.png'>",
	 "<img class='center-block img-right' src='img/brainiac.png'>", 
	 "<img class='center-block img-right' src='img/darkseid.png'>", 
	 "<img class='center-block img-right' src='img/grodd.png'>", 
	 "<img class='center-block img-right' src='img/atrocitus.png'>", 
	 "<img class='center-block img-right' src='img/ivy.png'>", 
	 "<img class='center-block img-right' src='img/joker.png'>", 
	 "<img class='center-block img-right' src='img/scarecrow.png'>"
	];
var correctAnswers = [
	"A. Bane", 
	"B. Brainiac", 
	"C. Darkseid", 
	"C. Gorilla Grodd", 
	"D. Atrocitus", 
	"A. Poison Ivy", 
	"B. Joker", 
	"D. Scarecrow"
];
