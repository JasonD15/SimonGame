var colorList = ["green", "red", "yellow", "blue"];
var game;
var index;
var soundDir;
var seqTarget = [];
var seqActual = [];
var correctSeq = false;


class Game {
  constructor(myStatus) {
    this.status = myStatus;
    this.level = 1;
  }
  // Getter
  getLevel() {
    return this.level;
  }
  // Method
  levelUp() {
    ++this.level;
    return this.level;
  }

  setStatus(myStatus) {
    //playing
    //gameover
    this.status = myStatus;
    return this.status;
  }
}


$(document).keypress(function() {
  if ($("h1").text() == "Press A Key to Start") {
    game = new Game("playing"); //begin game
    index = Math.floor(Math.random() * 4);
    soundDir = "sounds/" + colorList[index] + ".mp3";
    makeSound(soundDir);
    flashBtn(colorList[index]);

    $("h1").text("Level " + game.getLevel()); //display new level
    seqTarget.push(index); //store button index in target list
  }
});


$(".btn").click(function() {
  index = colorList.indexOf(this.id); //prepare to flash and make noise if sequence is correct
  soundDir = "sounds/" + colorList[index] + ".mp3";
  seqActual.push(index);
  //console.log("seqActual.length is " + seqActual.length + " game.level is " + game.level)
  if (checkAccuracy(seqActual.length,index) == true && seqActual.length == game.level) {
    game.levelUp();
    $("h1").text("Level " + game.getLevel())
    randomBtnSequence();
  }


});

function checkAccuracy(seqActualLength,index) {
  //console.log("seqActual.length is " + seqActualLength + " game.level is " + game.level)
  //console.log("seqActual[seqActualLength-1] is " + seqActual[seqActualLength-1]  + " seqTarget[seqActualLength-1] is " + seqTarget[seqActualLength-1]);
  if (seqActual[seqActualLength-1] == seqTarget[seqActualLength-1]) {
    makeSound(soundDir);
    flashBtn(colorList[index]);
    return true;
  } else {
    console.log("false nigga");
    gameOver();
    makeSound("wrong");
    return false;
  }

}

function randomBtnSequence() {
  setTimeout(function() {
    var nextBtnIndex = Math.floor(Math.random() * 4); //return a random number between 0 and 3;
    var soundDir = "sounds/" + colorList[nextBtnIndex] + ".mp3"
    makeSound(soundDir);
    flashBtn(colorList[nextBtnIndex]);
    seqTarget.push(nextBtnIndex)
    seqActual = [];   //reset
  }, 500);
}

function makeSound(soundDir) {
  var audio = new Audio(soundDir);
  audio.play();
}

function flashBtn(colour) {
  $("#" + colour).toggleClass(colour)
  setTimeout(function() {
    $("#" + colour).toggleClass(colour);
  }, 100);
}

function gameOver() {
  var soundDir = "sounds/wrong.mp3";
  makeSound(soundDir);
  $("body").toggleClass("game-over");
  setTimeout(function() {
    $("body").toggleClass("game-over");
  }, 100);
  $("h1").text("Game Over. Your score is " + game.getLevel() + ". Press Any Key to Restart");
  seqActual = [];
}
