const startButton = document.querySelector(".start-button");
const checkButton = document.querySelector(".check-button");

const scoreSpan = document.querySelector(".score");
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
//

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

const checkIsFinished = () => {
  if (guessArr.length >= 5 || countTry >= 5) {
    hintText.textContent = `You lost🤦‍♀️. Generated number was "${randomNum}". Generate a new random number to start🏁.`;
    hintEmoji.textContent = "";
    checkButton.disabled = true;
    randomNum = null;
    return;
  }
};

const startGame = () => {
  countTry = 0;
  guessArr = [];
  checkButton.disabled = false;
  hintText.textContent = "Random number created.";
  hintEmoji.textContent = "";
  scoreSpan.textContent = "";
};

const createRandomNum = () => {
  return Math.ceil(Math.random() * 25);
};

const congratulateWinner = () => {
  checkButton.disabled = true;
  hintText.textContent = "You got it!";
  hintEmoji.textContent = emojiObj.win;
  if (guessArr.length === 0) {
    scoreSpan.textContent = "100";
  } else if (guessArr.length === 1) {
    scoreSpan.textContent = "50";
  } else if (guessArr.length === 2) {
    scoreSpan.textContent = "30";
  } else if (guessArr.length === 3) {
    scoreSpan.textContent = "10";
  }
};

const determineCloseness = (countTry) => {
  if (countTry === 1) {
    hintText.textContent =
      "Hint will be given starting from the second guess😉.";
  } else if (countTry === 2) {
    hintText.textContent = "";
    previousGuess = guessArr[0];
    currentGuess = guessArr[1];
    Math.abs(randomNum - currentGuess) > Math.abs(randomNum - previousGuess)
      ? (hintEmoji.textContent = emojiObj.cold)
      : Math.abs(randomNum - currentGuess) < Math.abs(randomNum - previousGuess)
      ? (hintEmoji.textContent = emojiObj.hot)
      : (hintEmoji.textContent = emojiObj.neutral);
  } else if (countTry === 3) {
    previousGuess = guessArr[1];
    currentGuess = guessArr[2];
    Math.abs(randomNum - currentGuess) > Math.abs(randomNum - previousGuess)
      ? (hintEmoji.textContent = emojiObj.cold)
      : Math.abs(randomNum - currentGuess) < Math.abs(randomNum - previousGuess)
      ? (hintEmoji.textContent = emojiObj.hot)
      : (hintEmoji.textContent = emojiObj.neutral);
  } else if (countTry === 4) {
    previousGuess = guessArr[2];
    currentGuess = guessArr[3];
    Math.abs(randomNum - currentGuess) > Math.abs(randomNum - previousGuess)
      ? (hintEmoji.textContent = emojiObj.cold)
      : Math.abs(randomNum - currentGuess) < Math.abs(randomNum - previousGuess)
      ? (hintEmoji.textContent = emojiObj.hot)
      : (hintEmoji.textContent = emojiObj.neutral);
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
  } else {
    countTry++;
    console.log(`${countTry}. try.`);
    guessArr.push(userGuess);
    checkIsFinished();
    console.log("guessArr: ", guessArr);
    determineCloseness(countTry);
  }
});
