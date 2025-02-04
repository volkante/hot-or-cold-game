//Declare startButton assig in to class .start-button. When startButton is clicked, create a randomNum and assign it to a variable called randomNum

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

const resetStart = () => {
  guessArr = [];
};

const createRandomNum = () => {
  return Math.ceil(Math.random() * 20);
};

const congratulateWinner = () => {
  console.log("You got it!");
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
  resetStart();
  randomNum = createRandomNum();
  console.log("randomNum:", randomNum);
});

checkButton.addEventListener("click", (e) => {
  const userGuess = value;

  console.log("user guess", userGuess);
  if (userGuess === randomNum) {
    congratulateWinner();
    countTry = 0;
    input.value = "🎉";
  } else {
    countTry++;
    console.log(`${countTry}. try.`);
    guessArr.push(userGuess);
    console.log("guessArr: ", guessArr);
    //TODO: Bu aşağıyı bir function'a al.
    if (countTry === 2) {
      previousGuess = guessArr[0];
      currentGuess = guessArr[1];
      Math.abs(randomNum - currentGuess) > Math.abs(randomNum - previousGuess)
        ? console.log("soğuk")
        : console.log("sıcak");
    } else if (countTry === 3) {
      previousGuess = guessArr[1];
      currentGuess = guessArr[2];
      Math.abs(randomNum - currentGuess) > Math.abs(randomNum - previousGuess)
        ? console.log("soğuk")
        : console.log("sıcak");
    } else if (countTry === 4) {
      previousGuess = guessArr[2];
      currentGuess = guessArr[3];
      Math.abs(randomNum - currentGuess) > Math.abs(randomNum - previousGuess)
        ? console.log("soğuk")
        : console.log("sıcak");
    }
  }
});
