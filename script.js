let elapsedTime = 0;
let intervalId = null;
let running = false;
let lapCount = 0;
const timer=document.getElementById("timer");
const display = document.getElementById("display");
const playBtn = document.getElementById("play");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");
const timestamps = document.getElementById("timestamps");

function formatTime(secondsTotal) {
    const hours = Math.floor(secondsTotal / 3600);

    const minutes = Math.floor(secondsTotal / 60) % 60;

    const seconds = secondsTotal % 60;

    return (
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0")
    );
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function startTimer() {
    intervalId = setInterval(() => {
        elapsedTime++;
        updateDisplay();
    }, 1000);

    running = true;
    playBtn.src = "pause.svg";
    timer.style.boxShadow = "0 0 20px 10px lightgreen";
}

function pauseTimer() {
    clearInterval(intervalId);

    running = false;
    playBtn.src = "play.svg";
    timer.style.boxShadow = "0 0 20px 10px white";
  
}

function toggleTimer() {
    if (running) {
        pauseTimer();
    } else {
        startTimer();
    }
}

function recordLap() {
    if (!running) return;

    lapCount++;

    const lap = document.createElement("p");

    lap.textContent =
        "Lap " +
        lapCount +
        " : " +
        formatTime(elapsedTime);

    timestamps.appendChild(lap);
}

function resetTimer() {
    
    clearInterval(intervalId);

    elapsedTime = 0;
    lapCount = 0;
    running = false;

    updateDisplay();
    playBtn.src = "play.svg";
    timer.style.boxShadow = "0 0 20px 10px white";


    timestamps.innerHTML = "";
}

playBtn.addEventListener("click", toggleTimer);
lapBtn.addEventListener("click", recordLap);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();