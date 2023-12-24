import { Arr } from "./t.js";

const toggleBtn = document.querySelector(".circle");
const body = document.body;
const inputVal = document.querySelector(".input");
const texts = document.querySelector(".texts");
const timer = document.querySelector(".timer");
const mistakes = document.querySelector(".mistakes");
const cpm = document.querySelector(".cpm");
const wpm = document.querySelector(".wpm");
const againBtn = document.querySelector(".btn");
const modalContainer = document.querySelector(".modal-container");
const mTitle = document.querySelector(".m-title");
const mTime = document.querySelector(".m-time");
const mMistakes = document.querySelector(".m-mistakes");
const mCpm = document.querySelector(".m-cpm");
const mWpm = document.querySelector(".m-wpm");
const mBtn1 = document.querySelector(".m-btn1");
const mBtn2 = document.querySelector(".m-btn2");
const loader = document.querySelector(".loader-container");

let time,
  getWordsPermin,
  getCharsPermin,
  getMistakes,
  currTime = 0,
  leftTime = 60,
  timeHandler = false,
  Mistakes = 0;
let isFinished = false;
let textTwo;
let modalActive = false;

function ThemeHandleToggle() {
  toggleBtn.classList.toggle("slide");
  body.classList.toggle("active");
}


function randomizeTexts() {
  const randomIndex = Math.floor(Math.random() * Arr.length);
  const randomText = Arr[randomIndex];
  const characters = randomText.split("");
  
  texts.innerHTML = characters
  .map((char) => `<span>${char}</span>`)
  .join("");

  textTwo = Array.from(texts.querySelectorAll("span"));
}

function updateMistakesCount() {
  mistakes.textContent = `Mistakes: ${Mistakes}`;
  getMistakes = Mistakes;
}

function showResultModal(title) {
  modalActive = true; 
  modalContainer.classList.add("active");
  mTitle.textContent = title;
  mTime.textContent = `Time: ${currTime}s`;
  mMistakes.textContent = `Mistakes: ${getMistakes}`;
  mWpm.textContent = `WPM: ${getWordsPermin}`;
  mCpm.textContent = `CPM: ${getCharsPermin}`;
}

function calculateSpeed(inputText, elapsedTime) {
  if (!modalActive) {
    const wordsTyped = inputText.split(/\s+/).filter(Boolean).length;
    

    if (elapsedTime <= 0) {
      wpm.textContent = `WPM: 0`;
      cpm.textContent = `CPM: 0`;
      return;
    }
    
    // Calculate WPM and CPM
    getWordsPermin = Math.floor(wordsTyped / elapsedTime);
    getCharsPermin = Math.floor(inputText.length / elapsedTime);
    

    wpm.textContent = `WPM: ${getWordsPermin}`;
    cpm.textContent = `CPM: ${getCharsPermin}`;
  }
}


function typingLogics() {
  if (!modalActive) {
    const textOne = inputVal.value.split("");
    const textTwo = Array.from(texts.querySelectorAll("span"));
    
    if (!isFinished && !timeHandler) {
      time = setInterval(timeR, 1000);
      timeHandler = true;
    }
    
    let currentMistakes = 0;
    
    textTwo.forEach((span, index) => {
      const character = textOne[index];
      
      if (character == null) {
        span.classList.remove("correct", "incorrect");
      } else if (character === span.innerText) {
        span.classList.add("correct");
        span.classList.remove("incorrect");
      } else {
        currentMistakes++;
        span.classList.add("incorrect");
        span.classList.remove("correct");
      }
    });
    
    for (let index = textOne.length; index < textTwo.length; index++) {
      const span = textTwo[index];
      span.classList.remove("correct", "incorrect");
    }
    
    Mistakes = currentMistakes;
    updateMistakesCount();
    
    const elapsedTime = (60 - leftTime) / 60;
    
    if (isFinished && textOne.length === textTwo.length) {
      isFinished = true;
      clearInterval(time);
      showResultModal("Unlucky");
      calculateSpeed(inputVal.value, elapsedTime);
    } else if (!isFinished && textOne.length === textTwo.length) {
      showResultModal("Congrats!!");
      calculateSpeed(inputVal.value, elapsedTime);
    } else {
      calculateSpeed(inputVal.value, elapsedTime);
    }
  }
}

function timeR() {
  if (leftTime > 0 && !modalActive) {
    leftTime--;
    timer.textContent = `Timer: ${leftTime}s`;
    isFinished = false;
    currTime = leftTime;
  } else if (!isFinished && !modalActive) {
    clearInterval(time);
    isFinished = true;
    currTime = leftTime;
    showResultModal("Time's Up!");
  }
}

function tryAgain() {
  if (!modalActive) {
    inputVal.value = "";
    isFinished = false;
    
    randomizeTexts();
    timer.textContent = `Timer: 60s`;
    cpm.textContent = `CPM: 0`;
    wpm.textContent = `WPM: 0`;
    Mistakes = 0;
    updateMistakesCount();
    clearInterval(time);
    
    time = 0;
    getWordsPermin = 0;
    getCharsPermin = 0;
    currTime = 0;
    leftTime = 60;
    timeHandler = false;
    
    inputVal.focus();
  }
}

function removeModal() {
  modalContainer.classList.remove("active");
  modalActive = false;
  inputVal.value = "";
  isFinished = false;

  randomizeTexts();
  timer.textContent = `Timer: 60s`;
  cpm.textContent = `CPM: 0`;
  wpm.textContent = `WPM: 0`;
  Mistakes = 0;
  updateMistakesCount();
  clearInterval(time);

  time = 0;
  getWordsPermin = 0;
  getCharsPermin = 0;
  currTime = 0;
  leftTime = 60;
  timeHandler = false;
  
  inputVal.focus();
}

mBtn2.addEventListener("click", () => {
  loader.style.display = "block"
  body.classList.add("hideOverflow");
  setTimeout(() => {
    loader.style.display = "none";
    body.classList.remove("overflow");
    window.location.href = "index.html";
  }, 2000)
});

document.addEventListener("keydown", () => inputVal.focus());
document.addEventListener("keyup", () => inputVal.focus());
document.addEventListener("click", () => inputVal.focus());

toggleBtn.addEventListener("click", ThemeHandleToggle);
inputVal.addEventListener("input", typingLogics);
againBtn.addEventListener("click", tryAgain);
mBtn1.addEventListener("click", removeModal);

randomizeTexts();
tryAgain();
