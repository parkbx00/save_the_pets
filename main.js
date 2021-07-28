const settingBtn = document.querySelector(".field__setting");
const confirmBtn = document.querySelector(".setting__submit-btn");
const playBtn = document.querySelector(".field__play-btn");
const setting = document.querySelector(".setting");

const timerInput = document.querySelector("#timer");
const petsInput = document.querySelector("#pets");
const ticksInput = document.querySelector("#ticks");

const counterText = document.querySelector(".field__counter");
const minuteText = document.querySelector(".field__minute");
const secondText = document.querySelector(".field__second");

let minute = 5;
let second = 59;
let pets = 10;
let ticks = 10;
let timerID;

window.addEventListener("load", () => {
  updateSettingValues();
});

settingBtn.addEventListener("click", () => {
  toggleSetting();
});

confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  updateFieldValues();
  toggleSetting();
});

playBtn.addEventListener("click", () => {
  if (playBtn.firstElementChild.matches(".fa-play")) startGame();
  togglePlay();
});

function toggleSetting() {
  setting.classList.toggle("active");
}

function togglePlay() {
  if (playBtn.firstElementChild.matches(".fa-stop")) {
    clearInterval(timerID);
    return;
  }

  playBtn.firstElementChild.classList.remove("fa-play");
  playBtn.firstElementChild.classList.add("fa-stop");
}

function updateSettingValues() {
  timerInput.value = minute;
  petsInput.value = pets;
  ticksInput.value = ticks;
}

function updateFieldValues() {
  minute = timerInput.value;
  pets = petsInput.value;
  ticks = ticksInput.value;
  updateSettingValues();
}

function updateCounter() {
  counterText.textContent = ticks;
}

function startGame() {
  updateCounter();
  startTimer();
}

function startTimer() {
  if (!minute && !second) return;
  minute && (minuteText.textContent = --minute);
  second && (secondText.textContent = second);

  timerID = setInterval(() => {
    if (second !== 0) {
      secondText.textContent = --second;
    } else {
      minuteText.textContent = --minute;
      second = 59;
      secondText.textContent = second;
    }
    if (minute === 0 && second === 0) clearInterval(timerID);
  }, 1000);
}

// 1. Change Play icon to Stop icon => complete
// 2. Add stop game function
// 3. Populate pets and ticks to the field
// 4. addEventlistner - pets === game end && ticks === counter goes down
// 5. When pets are clicked, game ends with popup message
// 5. When counter hits 0, game ends with popup message
// 6. Add audio to the game
