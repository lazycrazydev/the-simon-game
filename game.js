var buttonArray = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isStarted = false;
var level = 0;

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosedColour = buttonArray[randomNumber];
  gamePattern.push(randomChosedColour);
  $("#" + randomChosedColour).fadeIn(100).fadeOut(100).fadeIn(100);
  animatePress(randomChosedColour);
  playSound(randomChosedColour);
}
$(document).keypress(function() {
  if (!isStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    isStarted = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  console.log("currentLevel", currentLevel);
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("Success");
    console.log("User Clicked Pattern", userClickedPattern);
    console.log("Game Pattern", gamePattern);
    if(userClickedPattern.length == gamePattern.length){
      setTimeout(()=> {nextSequence();}, 1000);

    }
  } else {
    console.log("wrong");
    console.log("userClickedPattern", userClickedPattern);
    console.log("Game Pattern", gamePattern);
    playSound("wrong");
    $("body").addClass("game--over");
    setTimeout(()=>{$("body").removeClass("game-over");}, 200);
    $("#level-title").text("Game Over! Press any key to restart!");
    startOver();

  }
}
function startOver(){
  level = 0;
  gamePattern = [];
  isStarted = false;
}
