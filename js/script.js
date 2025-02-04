const startButton = document.querySelector(".start-button");
const checkButton = document.querySelector(".check-button");

const scoreSpan = document.querySelector(".score");
const hintSpan = document.querySelector(".hint-span");

// ekleme
const input = document.querySelector(".number-input");
const min = input.getAttribute("min");
const max = input.getAttribute("max");
const step = Number(input.getAttribute("step") || 1);
let value = Number(input.getAttribute("value") || 0);
let number = document.querySelector(".number");
number.innerHTML = value;
//ekleme son

let previousGuess;
let currentGuess;
let guessArr = [];

let countTry = 0;
let randomNum;

const checkIsFinished = () => {
  console.log("BURASI", countTry);
  if (guessArr.length >= 5 || countTry >= 5) {
    console.log("You lost. Generate a new random number to start");
    checkButton.disabled = true;
    startGame();
    randomNum = null;
    return;
  }
};

const startGame = () => {
  if (countTry >= 5) {
    return;
  }
  guessArr = [];
  checkButton.disabled = false;
};

const createRandomNum = () => {
  return Math.ceil(Math.random() * 20);
};

const congratulateWinner = () => {
  console.log("You got it!");
};

const determineCloseness = (countTry) => {
  if (countTry === 2) {
    previousGuess = guessArr[0];
    currentGuess = guessArr[1];
    Math.abs(randomNum - currentGuess) > Math.abs(randomNum - previousGuess)
      ? console.log("cold")
      : Math.abs(randomNum - currentGuess) < Math.abs(randomNum - previousGuess)
      ? console.log("hot")
      : console.log("same!");
  } else if (countTry === 3) {
    previousGuess = guessArr[1];
    currentGuess = guessArr[2];
    Math.abs(randomNum - currentGuess) > Math.abs(randomNum - previousGuess)
      ? console.log("cold")
      : Math.abs(randomNum - currentGuess) < Math.abs(randomNum - previousGuess)
      ? console.log("hot")
      : console.log("same!");
  } else if (countTry === 4) {
    previousGuess = guessArr[2];
    currentGuess = guessArr[3];
    Math.abs(randomNum - currentGuess) > Math.abs(randomNum - previousGuess)
      ? console.log("cold")
      : Math.abs(randomNum - currentGuess) < Math.abs(randomNum - previousGuess)
      ? console.log("hot")
      : console.log("same!");
  }
};

// ekleme
const increase = () => {
  if (max) {
    if (value < max && value + step <= max) {
      value += step;
    }
  } else {
    value += step;
  }
  number.innerHTML = value;
};

const decrease = () => {
  if (min) {
    if (value > min && value - step >= min) {
      value -= step;
    }
  } else {
    value -= step;
  }
  number.innerHTML = value;
};
//ekleme son

startButton.addEventListener("click", () => {
  startGame();
  randomNum = createRandomNum();
  console.log("randomNum:", randomNum);
});

checkButton.addEventListener("click", () => {
  checkIsFinished();
  const userGuess = value;
  console.log("user guess", userGuess);
  if (userGuess === randomNum) {
    congratulateWinner();
    countTry = 0;
    startGame();
  } else {
    countTry++;
    console.log(`${countTry}. try.`);
    guessArr.push(userGuess);
    checkIsFinished();
    console.log("guessArr: ", guessArr);
    determineCloseness(countTry);
  }
});
