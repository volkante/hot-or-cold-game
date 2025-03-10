//select elements
const startButton = document.querySelector(".start-button");
const checkButton = document.querySelector(".check-button");
const scoreSpan = document.querySelector(".score");
const highestScoreSpan = document.querySelector(".highest-score");
const hintEmoji = document.querySelector(".hint-emoji");
const hintText = document.querySelector(".hint-text");

// pick number button
const input = document.querySelector(".number-input");
const min = input.getAttribute("min");
const max = input.getAttribute("max");
const step = Number(input.getAttribute("step") || 1);
let value = Number(input.getAttribute("value") || 0);
let number = document.querySelector(".number");
number.innerHTML = value;

//declare guess and related variables
let previousGuess;
let currentGuess;
let guessArr = [];
let countTry = 0;
let randomNum;
const emojiObj = {
  hot: "Hot 🔥",
  cold: "Cold 🥶",
  neutral: "Same 😐",
  lost: "🤦‍♀️",
  win: "🎉",
};
let score;
let highestScore = localStorage.getItem("highestScore");
highestScoreSpan.textContent = highestScore;

//define functions
const displayMessage = (element, message) => {
  element.textContent = message;
};

const disableButton = (element) => {
  element.disabled = true;
};

const enableButton = (element) => {
  element.disabled = false;
};

const checkIsFinished = () => {
  if (guessArr.length >= 5 || countTry >= 5) {
    hintText.textContent = `You lost 🤦‍♀️. Generated number was "${randomNum}". Generate a new random number to start 🏁.`;
    displayMessage(hintEmoji, "");
    disableButton(checkButton);
    randomNum = null;
    return;
  }
};

const startGame = () => {
  countTry = 0;
  guessArr = [];
  enableButton(checkButton);
  displayMessage(hintText, "Random number created");
  displayMessage(hintEmoji, "");
  displayMessage(scoreSpan, "");
};

const createRandomNum = () => {
  return Math.ceil(Math.random() * 25);
};

const setLocalStorage = () => {
  if (!localStorage.getItem("highestScore")) {
    localStorage.setItem("highestScore", highestScore);
  } else if (highestScore > localStorage.getItem("highestScore")) {
    localStorage.setItem("highestScore", highestScore);
  }
};

const calculateScore = (length) => {
  switch (length) {
    case 0:
      score = 100;
      break;
    case 1:
      score = 50;
      break;
    case 2:
      score = 30;
      break;
    case 3:
      score = 10;
      break;
    case 4:
      score = 5;
      break;
  }
};

const congratulateWinner = () => {
  disableButton(checkButton);
  displayMessage(hintText, "You got it");
  displayMessage(hintEmoji, emojiObj.win);
  calculateScore(guessArr.length);
  displayMessage(scoreSpan, score);

  if (score > highestScore) {
    highestScore = score;
    displayMessage(highestScoreSpan, highestScore);
  }
  setLocalStorage();
};

const determineCloseness = (countTry) => {
  if (countTry === 1) {
    displayMessage(
      hintText,
      "Hint will be given starting from the second guess😉."
    );
  } else if (countTry === 2) {
    displayMessage(hintText, "");
    previousGuess = guessArr[0];
    currentGuess = guessArr[1];
    Math.abs(randomNum - currentGuess) > Math.abs(randomNum - previousGuess)
      ? displayMessage(hintEmoji, emojiObj.cold)
      : Math.abs(randomNum - currentGuess) < Math.abs(randomNum - previousGuess)
      ? displayMessage(hintEmoji, emojiObj.hot)
      : displayMessage(hintEmoji, emojiObj.neutral);
  } else if (countTry === 3) {
    previousGuess = guessArr[1];
    currentGuess = guessArr[2];
    Math.abs(randomNum - currentGuess) > Math.abs(randomNum - previousGuess)
      ? displayMessage(hintEmoji, emojiObj.cold)
      : Math.abs(randomNum - currentGuess) < Math.abs(randomNum - previousGuess)
      ? displayMessage(hintEmoji, emojiObj.hot)
      : displayMessage(hintEmoji, emojiObj.neutral);
  } else if (countTry === 4) {
    previousGuess = guessArr[2];
    currentGuess = guessArr[3];
    Math.abs(randomNum - currentGuess) > Math.abs(randomNum - previousGuess)
      ? displayMessage(hintEmoji, emojiObj.cold)
      : Math.abs(randomNum - currentGuess) < Math.abs(randomNum - previousGuess)
      ? displayMessage(hintEmoji, emojiObj.hot)
      : displayMessage(hintEmoji, emojiObj.neutral);
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

//add event listeners
startButton.addEventListener("click", () => {
  startGame();
  randomNum = createRandomNum();
});

checkButton.addEventListener("click", () => {
  checkIsFinished();
  const userGuess = value;
  if (userGuess === randomNum) {
    congratulateWinner();
    countTry = 0;
  } else {
    countTry++;
    guessArr.push(userGuess);
    checkIsFinished();
    determineCloseness(countTry);
  }
});

//TODO süre eklenip puan onun üzerinden hesaplanabilir. Ne kadar kısa süre o kadar çok puan.
//TODO kazanınca konfeti atılabilir. Ekranda göstermek için.
//TODO responsive tasarım. Mobile'e uygun yapılmalı. Şu an yazılar kayıyor.
