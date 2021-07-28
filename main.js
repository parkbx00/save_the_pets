const settingBtn = document.querySelector(".field__setting");
const confirmBtn = document.querySelector(".setting__submit-btn");
const playBtn = document.querySelector(".field__play-btn");
const setting = document.querySelector(".setting");

const timerInput = document.querySelector("#timer");
const petsInput = document.querySelector("#pets");
const ticksInput = document.querySelector("#ticks");

const counterText = document.querySelector(".field__counter");
const timerText = document.querySelector(".field__timer");

let timer = 5;
let pets = 10;
let ticks = 10;

window.addEventListener("load", () => {
  updateSettingValues(timer, pets, ticks);
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
  console.log("play");
  startGame();
});

function toggleSetting() {
  setting.classList.toggle("active");
}

function updateSettingValues(timer, pets, ticks) {
  timerInput.value = timer;
  petsInput.value = pets;
  ticksInput.value = ticks;
}

function updateFieldValues() {
  timer = timerInput.value;
  pets = petsInput.value;
  ticks = ticksInput.value;
  updateSettingValues(timer, pets, ticks);
}

function updateCounter(ticks) {
  counterText.textContent = ticks;
}

function startGame() {
  updateCounter(ticks);
}

function startTimer() {}
