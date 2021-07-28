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

playBtn.addEventListener("click", (e) => {
  //   console.log(e.target.firstElementChild.matches(".fa-play"));
  startGame();
});

function toggleSetting() {
  setting.classList.toggle("active");
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

  const timerID = setInterval(() => {
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
