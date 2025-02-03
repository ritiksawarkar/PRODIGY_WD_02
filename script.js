// JavaScript functionality for the stopwatch
let timerInterval;
let running = false;
let time = 0; // time in seconds
let lapCount = 1;
let isDarkMode = false;

const timeDisplay = document.getElementById("timeDisplay");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const darkModeBtn = document.getElementById("darkModeBtn");
const lapTimes = document.getElementById("lapTimes");
const stopwatchContainer = document.querySelector(".stopwatch-container");

// Start or stop the timer
startStopBtn.addEventListener("click", () => {
  if (running) {
    clearInterval(timerInterval);
    startStopBtn.textContent = "Start";
  } else {
    timerInterval = setInterval(updateTime, 1000);
    startStopBtn.textContent = "Pause";
  }
  running = !running;
});

// Reset the stopwatch
resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  running = false;
  time = 0;
  lapCount = 1;
  timeDisplay.textContent = formatTime(time);
  startStopBtn.textContent = "Start";
  lapTimes.innerHTML = "";
});

// Track a lap time
lapBtn.addEventListener("click", () => {
  if (running) {
    const lapTime = formatTime(time);
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapTimes.appendChild(lapItem);
    lapCount++;

    // Play sound on lap
    const audio = new Audio("https://www.soundjay.com/button/beep-07.wav");
    audio.play();
  }
});

// Dark mode toggle
darkModeBtn.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    // Apply dark mode styles
    stopwatchContainer.style.backgroundColor = "#333";
    document.body.style.background = "#121212";
    timeDisplay.style.color = "#fff";
    // lapTimes.style.color = '#fff';
    darkModeBtn.textContent = "Light Mode";

    // Adjust button styles in dark mode
    startStopBtn.style.backgroundColor = "#555";
    resetBtn.style.backgroundColor = "#FF5733";
    lapBtn.style.backgroundColor = "#00BCD4";
  } else {
    // Revert to light mode styles
    stopwatchContainer.style.backgroundColor = "#fff";
    document.body.style.background =
      "linear-gradient(to right, #6a11cb, #2575fc)";
    timeDisplay.style.color = "#333";
    lapTimes.style.color = "#333";
    // lapTimes.style.backgroundColor = '#f2f2f2'; // Lap times background color in light mode
    darkModeBtn.textContent = "Dark Mode";

    // Revert button styles to original
    startStopBtn.style.backgroundColor = "#4CAF50";
    resetBtn.style.backgroundColor = "#FF5733";
    lapBtn.style.backgroundColor = "#00BCD4";
  }
});

// Update time every second
function updateTime() {
  time++;
  timeDisplay.textContent = formatTime(time);
}

// Format time to MM:SS or HH:MM:SS
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
}

// Pad single digit numbers with a leading zero
function pad(num) {
  return num < 10 ? "0" + num : num;
}
