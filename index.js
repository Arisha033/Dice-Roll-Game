//Targeting the elements
const btnRollDice = document.querySelector(".btn--roll");
const btnHoldDice = document.querySelector(".btn--hold");
const btnNewDice = document.querySelector(".btn--new");

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");

const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

let scores, currentScore, activePlayer, playing;

//Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player-winner");
  player1El.classList.remove("player-winner");
  player0El.classList.add("player-active");
  player1El.classList.add("player-active");
};

//Calling the initial function
init();

//Function for switching players
const switchPlayers = function () {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Rolling dice
btnRollDice.addEventListener("click", function () {
  if (playing) {
    //Generating random number
    const number = Math.floor(Math.random() * 6) + 1;

    //Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = "/images/dice-" + number + ".png";

    //Check for  dice rolled 1
    if (number !== 1) {
      //Add dice to current score
      currentScore += number;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      switchPlayers();
    }
  }
});

btnHoldDice.addEventListener("click", function () {
  if (playing) {
    //Add current score to active players's score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
  }

  //Check if player's score >= 100
  if (scores[activePlayer] >= 100) {
    //Finish the game
    playing = false;
    diceEl.classList.add("hidden");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add(`player--winner`);
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove(`player--active`);
  } else {
    //Switch to next player
    switchPlayers();
  }
});

btnNewDice.addEventListener("click", init);
