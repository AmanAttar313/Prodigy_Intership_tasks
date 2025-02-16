let minutes = 0, seconds = 0, milliseconds = 0;
let timer;
let isRunning = false;

const startPauseButton = document.getElementById("startPause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");
const lapsList = document.getElementById("laps");

function updateDisplay() {
    minutesDisplay.textContent = minutes.toString().padStart(2, "0");
    secondsDisplay.textContent = seconds.toString().padStart(2, "0");
    millisecondsDisplay.textContent = milliseconds.toString().padStart(2, "0");
}

function startPause() {
    if (!isRunning) {
        timer = setInterval(() => {
            milliseconds++;
            if (milliseconds === 100) {
                milliseconds = 0;
                seconds++;
            }
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            updateDisplay();
        }, 10);
        isRunning = true;
        startPauseButton.textContent = "Pause";
        startPauseButton.style.background = "orange";
    } else {
        clearInterval(timer);
        isRunning = false;
        startPauseButton.textContent = "Start";
        startPauseButton.style.background = "green";
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    startPauseButton.textContent = "Start";
    startPauseButton.style.background = "green";
    lapsList.innerHTML = "";
}

function addLap() {
    if (isRunning) {
        let lapTime = `${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
        let lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}

startPauseButton.addEventListener("click", startPause);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", addLap);
