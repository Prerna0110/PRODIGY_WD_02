// script.js
let startTime, updatedTime, difference, tInterval;
let running = false;
let lapsContainer = document.getElementById('laps');

document.getElementById('start').addEventListener('click', start);
document.getElementById('pause').addEventListener('click', pause);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', recordLap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateDisplay, 1000);
        running = true;
        document.getElementById('start').disabled = true;
        document.getElementById('pause').disabled = false;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        document.getElementById('start').disabled = false;
        document.getElementById('pause').disabled = true;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    document.getElementById('display').innerHTML = "00:00:00";
    document.getElementById('start').disabled = false;
    document.getElementById('pause').disabled = true;
    lapsContainer.innerHTML = "";
}

function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;
    let hours = Math.floor((updatedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
    document.getElementById('display').innerHTML =
        (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
        (seconds > 9 ? seconds : "0" + seconds);
}

function recordLap() {
    let lapTime = document.getElementById('display').innerHTML;
    let lapDiv = document.createElement('div');
    lapDiv.className = 'lap-time';
    lapDiv.innerHTML = lapTime;
    lapsContainer.appendChild(lapDiv);
}
