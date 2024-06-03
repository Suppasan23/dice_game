"use strict";

const newGameBTN = document.querySelector(".btn--new");

const diceImage1 = document.querySelector(".dice1");
const diceImage2 = document.querySelector(".dice2");
const rollDiceBTN1 = document.querySelector(".btn--roll1");
const rollDiceBTN2 = document.querySelector(".btn--roll2");
const holdBTN1 = document.querySelector(".btn--hold1");
const holdBTN2 = document.querySelector(".btn--hold2");

const player1 = document.querySelector(".player--1");
const player2 = document.querySelector(".player--2");
const name1 = document.getElementById("name--1");
const name2 = document.getElementById("name--2");
const totalScore1 = document.getElementById("total-score--1");
const totalScore2 = document.getElementById("total-score--2");
const currentScore1 = document.getElementById("current-score--1");
const currentScore2 = document.getElementById("current-score--2");

let arrayOfCurrentScore = [];

const arrayOfValue = [
  [
    1,
    player1,
    name1,
    totalScore1,
    currentScore1,
    diceImage1,
    rollDiceBTN1,
    holdBTN1,
  ],
  [
    2,
    player2,
    name2,
    totalScore2,
    currentScore2,
    diceImage2,
    rollDiceBTN2,
    holdBTN2,
  ],
];

newGame();

function newGame() {
  player1.className = "player player--1 player--active";
  player2.className = "player player--2 ";
  name1.textContent = "Player 1";
  name2.textContent = "Player 2";
  totalScore1.textContent = 0;
  totalScore2.textContent = 0;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;
  diceImage1.classList.add("hidden");
  diceImage2.classList.add("hidden");
  arrayOfCurrentScore = [];
}

function whoActive() {
  if (player1.classList.contains("player--active")) {
    return arrayOfValue[0];
  } else if (player2.classList.contains("player--active")) {
    return arrayOfValue[1];
  }
}

function togglePlayer() {
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
}

function winnerYet() {
  if (whoActive()[1].classList.contains("player--winner")) {
    return true;
  } else {
    return false;
  }
}

function resetCurrentScore() {
  arrayOfCurrentScore = [];
  whoActive()[4].textContent = 0;
}

newGameBTN.addEventListener("click", () => newGame());

rollDiceBTN1.addEventListener("click", () => Dicing(arrayOfValue[0][0]));
rollDiceBTN2.addEventListener("click", () => Dicing(arrayOfValue[1][0]));

function Dicing(whomPush) {
  if (winnerYet()) return;
  if (whoActive()[0] !== whomPush) return;

  const randomNumber = Number(Math.trunc(Math.random() * 6) + 1);

  whoActive()[5].src = `dice-${randomNumber}.png`;
  whoActive()[5].classList.remove("hidden");

  if (randomNumber === 1) {
    resetCurrentScore();
    togglePlayer();
  } else {
    arrayOfCurrentScore.push(randomNumber);
    let str = "";
    for (let i = 0; i < arrayOfCurrentScore.length; i++)
      str += ` + ${arrayOfCurrentScore[i]}`;
    whoActive()[4].textContent = str;
  }
}

holdBTN1.addEventListener("click", () => holding(arrayOfValue[0][0]));
holdBTN2.addEventListener("click", () => holding(arrayOfValue[1][0]));

function holding(whomPush) {
  if (winnerYet()) return;
  if (whoActive()[0] !== whomPush) return;

  whoActive()[3].textContent =
    Number(whoActive()[3].textContent) +
    arrayOfCurrentScore.reduce((partialSum, a) => partialSum + a, 0);

  resetCurrentScore();

  if (whoActive()[3].textContent >= 50) {
    whoActive()[1].classList.add("player--winner");
    return;
  }

  togglePlayer();
}
