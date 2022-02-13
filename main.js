const timer = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
};

const min = document.getElementById('js-minutes');
const sec = document.getElementById('js-seconds');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const modeButtons = document.querySelectorAll('.mode-button');

const pomodoroSound = document.getElementById('pomodoro');
const breakSound = document.getElementById('break');

const progressBar = document.getElementById('js-progress');

let interval;
let mode = 'pomodoro';
let totalTime = timer.pomodoro;

function updateClock(minutes, seconds, progress) {
  min.textContent = String(minutes).padStart(2, '0');
  sec.textContent = String(seconds).padStart(2, '0');
  progressBar.value = String(progress);
}

function resetTimer(totalTime) {
  clearInterval(interval);
  updateClock(totalTime, 0, 0);
  startBtn.classList.remove('hidden');
  stopBtn.classList.add('hidden');
}

function changeMode(event) {
  mode = event.target.dataset.mode;
  totalTime = timer[mode];
  resetTimer(totalTime);

  modeButtons.forEach((button) => button.classList.remove('active'));
  document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
  document.body.style.backgroundColor = `var(--${mode})`;
}

function startTimer() {
  let minutes = totalTime - 1;
  let seconds = 60;

  progressBar.max = String(totalTime * seconds);
  let progressSeconds = 0;

  interval = setInterval(() => {
    if (minutes >= 0) {
      seconds--;

      progressSeconds++;
      updateClock(minutes, seconds, progressSeconds);

      if (seconds === 0) {
        minutes--;
        seconds = 60;
      }
    } else {
      clearInterval(interval);
      switch (mode) {
        case 'pomodoro':
          pomodoroSound.play();
          break;
        default:
          breakSound.play();
          break;
      }
    }
  }, 1000);

  startBtn.classList.add('hidden');
  stopBtn.classList.remove('hidden');
}

modeButtons.forEach((button) => {
  button.addEventListener('click', changeMode);
});
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', () => {
  resetTimer(totalTime);
});
