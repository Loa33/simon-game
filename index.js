"use strict";
let randomArray = [];
let userArray = [];
let colorsArray = ["green", "red", "yellow", "blue"];
let level = 0;
let flag = false;
let score = [0];

function generatePattern() {
	userArray = [];
	level++;
	$("#level-press").text("Level " + level);
	let random = Math.floor(Math.random() * 3 + 1);
	let randomColor = colorsArray[random];
	randomArray.push(randomColor);
	animateAndSound(randomColor);
}

if (window.matchMedia("(max-width: 600px)").matches) {
	$(document).on({
		touchstart: function () {
			if (!flag) {
				flag = true;
				generatePattern();
			}
		},
	});
}

$(".box").click(function () {
	let userColor = $(this).attr("id");
	userArray.push(userColor);
	animateAndSound(userColor);
	compare(userArray.length - 1);
});

function restart() {
	level = 0;
	randomArray = [];
	flag = false;
}

$(document).keypress(function (e) {
	if (!flag) {
		generatePattern();
		flag = true;
	}
});

function compare(currentLevel) {
	if (userArray[currentLevel] === randomArray[currentLevel]) {
		if (userArray.length === randomArray.length) {
			setTimeout(() => {
				generatePattern();
			}, 1000);
		}
	} else {
		let audio;
		audio = new Audio(`sounds/wrong.mp3`);
		audio.muted = false;
		audio.play();
		$("body").addClass("game-over");
		$("#level-press").text("Game Over. Press any key to play again. ");
		setTimeout(() => {
			$("body").removeClass("game-over");
		}, 200);
		maxScore();
		restart();
	}
}

function maxScore() {
	score.forEach((s) => {
		if (level > s) {
			score.push(level);
			$("#score").text(`${level}`);
		} else {
			score.push(level);
			$("#score").text(`${s}`);
		}
	});
}
function animateAndSound(id) {
	let audio;
	audio = new Audio(`sounds/${id}.mp3`);
	$(`#${id}`).animate({ opacity: 0.2 });
	audio.muted = false;
	audio.play();
	setTimeout(function () {
		$(`#${id}`).animate({ opacity: 1 });
	}, 50);
}
