let workTime = 25 * 60;
let breakTime = 5 * 60;
let timer;
let isBreak = false;
let elapsedTime = 0;

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const workTimeInput = document.getElementById('work-time');
const breakTimeInput = document.getElementById('break-time');
const progressBar = document.getElementById('progress-bar');
const ctx = progressBar.getContext('2d');
const radius = progressBar.width / 2 - 10;

function drawProgressBar(percent) {
    ctx.clearRect(0, 0, progressBar.width, progressBar.height);

    ctx.beginPath();
    ctx.arc(progressBar.width / 2, progressBar.height / 2, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#e6e6e6';
    ctx.lineWidth = 10;
    ctx.stroke();

    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (2 * Math.PI * percent);
    ctx.beginPath();
    ctx.arc(progressBar.width / 2, progressBar.height / 2, radius, startAngle, endAngle);
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 10;
    ctx.stroke();
}

function startTimer(duration) {
    elapsedTime = 0;
    let timeLeft = duration;
    timerDisplay.textContent = formatTime(timeLeft);

    timer = setInterval(() => {
        timeLeft--;
        elapsedTime++;
        timerDisplay.textContent = formatTime(timeLeft);

        const percent = elapsedTime / duration;
        drawProgressBar(percent);

        if (timeLeft <= 0) {
            clearInterval(timer);
            isBreak = !isBreak;
            startTimer(isBreak ? breakTime : workTime);
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    isBreak = false;
    workTime = workTimeInput.value * 60;
    breakTime = breakTimeInput.value * 60;
    timerDisplay.textContent = formatTime(workTime);
    drawProgressBar(0);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

startButton.addEventListener('click', () => {
    resetTimer();
    startTimer(workTime);
});

resetButton.addEventListener('click', resetTimer); // Corrected line

drawProgressBar(0);
