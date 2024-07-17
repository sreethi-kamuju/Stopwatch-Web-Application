let startTime;
let elapsedTime = 0;
let timerInterval;

function startPause() {
    if (timerInterval) {
        // Pause the stopwatch
        clearInterval(timerInterval);
        timerInterval = null;
        document.getElementById("startPauseButton").innerText = "Resume";
    } else {
        // Start the stopwatch
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        document.getElementById("startPauseButton").innerText = "Pause";
    }
}

function reset() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    document.getElementById("display").innerText = "00:00:00.000";
    document.getElementById("startPauseButton").innerText = "Start";
    clearLaps();
}

function recordLap() {
    let currentTime = elapsedTime;
    let previousTime = 0;
    if (document.getElementById("laps").childNodes.length > 0) {
        previousTime = parseFloat(document.getElementById("laps").lastChild.innerHTML.replace(/[^\d.-]/g, ''));
    }
    let lapTime = parseFloat((currentTime - previousTime) / 1000);
    let li = document.createElement("li");
    li.appendChild(document.createTextNode((lapTime).toFixed(2) + " seconds"));
    document.getElementById("laps").appendChild(li);
}

function clearLaps() {
    let laps = document.getElementById("laps");
    while (laps.firstChild) {
        laps.removeChild(laps.firstChild);
    }
}

function updateTime() {
    let currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    updateDisplay(elapsedTime);
}

function updateDisplay(time) {
    let milliseconds = ("000" + (time % 1000)).slice(-3);
    time = Math.floor(time / 1000);
    let seconds = ("0" + (time % 60)).slice(-2);
    time = Math.floor(time / 60);
    let minutes = ("0" + (time % 60)).slice(-2);
    time = Math.floor(time / 60);
    let hours = ("0" + time).slice(-2);

    document.getElementById("display").innerText = hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}
