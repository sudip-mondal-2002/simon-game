var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
$(document).keypress(function() {
  if (level === 0) {
    nextSequence();
    $(".start-game").hide();
  }
})
$(".start-game").click(function() {
  console.log("hhh");
  if (level === 0) {
    nextSequence();
    $(".start-game").hide();
  }
})
function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else if (level != 0) {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").html('Game over <br> press any key to restart <br> or ');
    startOver();
    $(".start-game").show();
  }
}

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play()
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed")
  }, 100);
}

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut().fadeIn('medium');
  playSound(randomChosenColor);
  level++;
  $("h1").text("level " + level);
}
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);


})
