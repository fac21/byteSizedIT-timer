// ***** VARIABLES FROM HTML ELEMENTS


const text = document.getElementById("text");
const slider = document.getElementById("studyRange");
const countdown = document.getElementById("countdown");
const startBtn = document.getElementById("start");
const cancelBtn = document.getElementById("cancel");



// ***** JS SPECIFIC VARIABLES


// Array of clock images
const clockArr = ["noun_Alarm Clock_2.svg", "noun_Alarm Clock_3.svg", 
"noun_Alarm Clock_4.svg", "noun_Alarm Clock_5.svg", "noun_Alarm Clock_6.svg", "noun_Alarm Clock_7.svg",  
"noun_Alarm Clock_8.svg", "noun_Alarm Clock_9.svg", "noun_Alarm Clock_1.svg"];
let clockKey = 0;

let newCountdown = true;
let paused = true;
let breakTime = false;

let timer;

let studyTime = (slider.value)*60;
let totalSecs = (slider.value)*60;

const horn = new Audio('bicycle-horn.wav');
const whistle = new Audio('referee-whistle.wav');



// ***** FUNCTIONS *****


// Function to pdate the current slider value (if countdown not in process)
function sliderInput() {
  slider.value = this.value;
  if(newCountdown) {
    totalSecs = slider.value*60;
    displayTime();
  }
}

// Function fired when start button is pressed, to ammend settings
function toggleTimer() {
  // Settings for new timer clock
  if(newCountdown) {
    newCountdown = false;
    clockKey = 0;
    countdown.style.color = "#4CAF50";
    studyTime = (slider.value)*60;
    totalSecs = (slider.value)*60;
    whistle.play();
  }
  // Shared settings for new timer clock or unpaused clock
  if(paused || newCountdown) {
    paused = false;
    startBtn.innerHTML = "pause";
    text.innerHTML = "Get your head down and do some work!";
    timer = setInterval(calculateTime, 1000);
  }
  //settings for paused clock
  else {
    clearInterval(timer);
    paused = true;
    startBtn.innerHTML = "resume";
    //paused during main 'work' timer
    if(!breakTime){
      text.innerHTML = "Click resume and crack on...";
    }
    //paused during main 'break' timer
    else {
      text.innerHTML = "Err, stop cheating and enjoy your break...";
    }
  }
}

//Function to calculate time left
function calculateTime() {

  if(totalSecs>0) {
    totalSecs--;
    clockKey = (clockKey+1)%(clockArr.length-1);
  }
  else if(!breakTime) {
    horn.play();
    breakTime = true;
    countdown.style.color = "#0288d1";
    text.innerHTML = "Have a cuppa and take a stretch!";
    totalSecs = studyTime/5;
  }
  else {
    whistle.play();
    breakTime = false;
    countdown.style.color = "#4CAF50";
    text.innerHTML = "Get your head down and do some work!";
    totalSecs = studyTime
  }
  displayTime();
}

//Function to display time left
function displayTime() {
  let mins = (Math.floor(totalSecs/60));
  let secs = (Math.floor(totalSecs%60));
  countdown.innerHTML = `<span><img class="clock" src="${clockArr[clockKey]}"></span>  ${String(mins).padStart(2,0)} mins ${String(secs).padStart(2,0)} secs`;
}

//Function to cancel timer - fired when cancel button is pressed
function cancelTimer() {
  clearInterval(timer);
  paused = true;
  newCountdown = true;
  startBtn.innerHTML = "start";
  countdown.style.color = "black";
  text.innerHTML = "Move slider to set your timer, click start & begin studying...";
  totalSecs = (slider.value)*60;
  clockKey = clockArr.length-1;
  displayTime();
}



// ***** EVENT LISTENERS ***** 

slider.addEventListener('input', sliderInput)
startBtn.addEventListener('click', toggleTimer);
cancelBtn.addEventListener('click', cancelTimer);