const settingBtn = document.querySelector(".field__setting");
const confirmBtn = document.querySelector(".setting__submit-btn");
const playBtn = document.querySelector(".field__play-btn");
const replayBtn = document.querySelector(".field__replay-btn");
const setting = document.querySelector(".setting");
const popup = document.querySelector(".field__popup");
const popupText = document.querySelector(".field__popup-text");

const timerInput = document.querySelector("#timer");
const petsInput = document.querySelector("#pets");
const ticksInput = document.querySelector("#ticks");

const counterText = document.querySelector(".field__counter");
const minuteText = document.querySelector(".field__minute");
const secondText = document.querySelector(".field__second");

let minute = 5;
let second = 59;
let pets = 12;
let ticks = 10;
let timerID;
let win = false;
let start = false;

window.addEventListener("load", () => {
  updateSettingValues();
  setTimer();
  setCounter();
});

settingBtn.addEventListener("click", () => {
  toggleSetting();
  timerID && clearInterval(timerID);
});

confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  updateFieldValues();
  toggleSetting();
  setTimer();
  setCounter();
  playBtn.firstElementChild.matches(".fa-stop") && togglePlayAndStop();
});

playBtn.addEventListener("click", () => {
  if (playBtn.firstElementChild.matches(".fa-stop")) {
    stopGame();
  }

  if (playBtn.firstElementChild.matches(".fa-play")) {
    start = true;
    startGame();
    togglePlayAndStop();
  }
});

replayBtn.addEventListener("click", () => {
  replayGame();
});

function toggleSetting() {
  setting.classList.toggle("active");
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

function updateFieldValues() {
  minute = timerInput.value;
  second = 59;
  pets = petsInput.value;
  ticks = ticksInput.value;
  updateSettingValues();
}

function setCounter() {
  counterText.textContent = ticks;
}

function startGame() {
  setCounter();
  setTimer();
  startTimer();
}

function stopGame() {
  clearInterval(timerID);
  showPopupWithMessage();
}

function showPopupWithMessage(message) {
  popup.classList.add("active");
  popupText.textContent = message
    ? message
    : "Click the replay button to play again.";
}

function replayGame() {
  togglePlayAndStop();
  updateFieldValues();
  setTimer();
  popup.classList.remove("active");
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
    if (second !== 0) {
      secondText.textContent = second <= 10 ? `0${--second}` : --second;
    } else {
      minuteText.textContent = minute <= 10 ? `0${--minute}` : --minute;
      second = 59;
      secondText.textContent = second;
    }
    if (minute === 0 && second === 0) {
      clearInterval(timerID);
      start = false;
    }
    if (!start && !win)
      showPopupWithMessage(
        "You ran out of time. Click the replay button to play again."
      );
  }, 1000);
}

// 1. Change Play icon to Stop icon => complete
// 2. Add stop game function => complete
// 2a. Add replay button function => complete
// 3. Populate pets and ticks to the field
// 4. addEventlistner - pets === game end && ticks === counter goes down
// 5. When pets are clicked, game ends with popup message
// 5. When counter hits 0, game ends with popup message
// 6. Add audio to the game
