const settingBtn = document.querySelector(".field__setting");
const confirmBtn = document.querySelector(".setting__submit-btn");
const playBtn = document.querySelector(".field__play-btn");
const replayBtn = document.querySelector(".field__replay-btn");
const setting = document.querySelector(".setting");
const popup = document.querySelector(".field__popup");
const popupText = document.querySelector(".field__popup-text");
const gameBoard = document.querySelector(".field__game-board");

const timerInput = document.querySelector("#timer");
const petsInput = document.querySelector("#pets");
const ticksInput = document.querySelector("#ticks");

const counterText = document.querySelector(".field__counter");
const minuteText = document.querySelector(".field__minute");
const secondText = document.querySelector(".field__second");

const IMG_SIZE = 103;
let minute = 5;
let second = 59;
let pets = 12;
let ticks = 10;
let timerID;

window.addEventListener("load", () => {
  updateSettingValues();
  initGame();
});

settingBtn.addEventListener("click", () => {
  toggleSetting();
  timerID && clearInterval(timerID);
});

confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  initGame();
  toggleSetting();
  playBtn.firstElementChild.matches(".fa-stop") && togglePlayAndStop();
});

playBtn.addEventListener("click", () => {
  if (playBtn.firstElementChild.matches(".fa-stop")) {
    stopGame();
  }

  if (playBtn.firstElementChild.matches(".fa-play")) {
    startGame();
    togglePlayAndStop();
  }
});

replayBtn.addEventListener("click", () => {
  replayGame();
});

gameBoard.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) return;

  if (e.target.matches(".field__dog") || e.target.matches(".field__cat")) {
    const message = e.target.matches(".field__dog")
      ? "You hurt the dog! Click the replay button to try again."
      : "You hurt the cat! Click the replay button to try again.";
    stopGame(message);
    return;
  }

  e.target.remove();
  --ticks;
  setCounter();
  if (ticks === 0)
    stopGame("Congrats! You've burned all the ticks and saved the pets!!");
});

function toggleSetting() {
  setting.classList.toggle("active");
  popup.matches(".active") && popup.classList.remove("active");
}

function togglePlayAndStop() {
  playBtn.firstElementChild.classList.toggle("fa-play");
  playBtn.firstElementChild.classList.toggle("fa-stop");
}

function updateSettingValues() {
  timerInput.value = minute;
  petsInput.value = pets;
  ticksInput.value = ticks;
}

function setFieldValues() {
  minute = timerInput.value;
  second = 59;
  pets = petsInput.value;
  ticks = ticksInput.value;
  updateSettingValues();
}

function setCounter() {
  counterText.textContent = ticks;
}

function initGame() {
  setFieldValues();
  setCounter();
  setTimer();
  clearGameBoard();
}

function startGame() {
  startTimer();
  generateGameBoard();
}

function stopGame(message) {
  clearInterval(timerID);
  showPopupWithMessage(message);
}

function replayGame() {
  togglePlayAndStop();
  initGame();
  popup.classList.remove("active");
}

function generateGameBoard() {
  const gameBoardRect = gameBoard.getBoundingClientRect();
  const x1 = 0;
  const y1 = 0;
  const x2 = gameBoardRect.width - IMG_SIZE;
  const y2 = gameBoardRect.height - IMG_SIZE;

  const dogNumb = pets / 2;
  const catNumb = pets - dogNumb;

  for (let i = 0; i < dogNumb; i++) {
    const dogImg = document.createElement("img");
    dogImg.setAttribute("src", `./images/00${getCoordiante(1, 3)}-dog.png`);
    dogImg.setAttribute("class", "field__dog");
    dogImg.style.left = `${getCoordiante(x1, x2)}px`;
    dogImg.style.top = `${getCoordiante(y1, y2)}px`;
    gameBoard.append(dogImg);
  }

  for (let i = 0; i < catNumb; i++) {
    const catImg = document.createElement("img");
    catImg.setAttribute("src", `./images/00${getCoordiante(1, 3)}-cat.png`);
    catImg.setAttribute("class", "field__cat");
    catImg.style.left = `${getCoordiante(x1, x2)}px`;
    catImg.style.top = `${getCoordiante(y1, y2)}px`;
    gameBoard.append(catImg);
  }

  for (let i = 0; i < ticks; i++) {
    const tickImg = document.createElement("img");
    tickImg.setAttribute("src", `./images/026-tick.png`);
    tickImg.setAttribute("class", "field__tick");
    tickImg.style.left = `${getCoordiante(x1, x2)}px`;
    tickImg.style.top = `${getCoordiante(y1, y2)}px`;
    gameBoard.append(tickImg);
  }
}

function clearGameBoard() {
  gameBoard.innerHTML = "";
}

function getCoordiante(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function setTimer() {
  minuteText.textContent = minute < 10 ? `0${minute}` : minute;
  secondText.textContent = `00`;
}

function startTimer() {
  if (!minute && !second) return;
  minuteText.textContent = minute <= 10 ? `0${--minute}` : --minute;
  secondText.textContent = second;

  timerID = setInterval(() => {
    if (minute === 0 && second === 0) {
      clearInterval(timerID);
      showPopupWithMessage(
        "You ran out of time. Click the replay button to play again."
      );
      return;
    }

    if (second !== 0) {
      secondText.textContent = second <= 10 ? `0${--second}` : --second;
    } else {
      minuteText.textContent = minute <= 10 ? `0${--minute}` : --minute;
      second = 59;
      secondText.textContent = second;
    }
  }, 1000);
}

function showPopupWithMessage(message) {
  popup.classList.add("active");
  popupText.textContent = message
    ? message
    : "Click the replay button to play again.";
}

// 1. Change Play icon to Stop icon => complete
// 2. Add stop game function => complete
// 2a. Add replay button function => complete
// 3. Populate pets and ticks to the field => Complete
// 4. addEventlistner - pets === game end && ticks === counter goes down => Complete
// 5. When pets are clicked, game ends with popup message => Complete
// 5. When counter hits 0, game ends with popup message => Complete
// 6. Add audio to the game
// 7. Window resize? a. Reload b. Popup
