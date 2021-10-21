var score;
var duration = 10;
var startTime;
var ended = true;

var timerTxt = document.getElementById("timer");
var scoreTxt = document.getElementById("score");
var clicksTxt = document.getElementById("clicks")
var startBtn = document.getElementById("start");
var clickArea = document.getElementById("clickarea");

var show = function(elem) {
    elem.style.display = "inline";
};

var hide = function(elem) {
    elem.style.display = 'none';
};

function startGame() {
    hide(startBtn);
    score = -1;
    ended = false;
    startTime = new Date().getTime();
    // create a timer with the setInterval function
    var timerId = setInterval(function() {
        var total = (new Date().getTime() - startTime) / 1000;

        // while total is lower than duration, we update the timer and the clicks per second.
        if (total < duration) {
            timerTxt.textContent = total.toFixed(3);
            clicksTxt.textContent = (score / total).toFixed(2);
        } else {
            // otherwise, the game is ended, so we clear the timer and call our end game function
            ended = true;
            clearInterval(timerId);
            endGame();
        }
    }, 1);
}

function endGame() {
    // write the final stats (score and clicks per second)
    var clicksBySec = (score / duration).toFixed(2);
    timerTxt.textContent = duration.toFixed(3);
    clicksTxt.textContent = clicksBySec;
    // we show the start button if the player would like to retry
    show(startBtn);

    // we display an alert to the player in 10 ms for letting the DOM be updated
    setTimeout(function() {
        alert('You made ' + score + ' clicks in ' + duration + ' seconds. It is ' + clicksBySec + ' clicks by seconds. Try again!');
    }, 10);
}

// set a click event listener on the start button
startBtn.addEventListener("click", function() {
    startGame();
});

// add a click event listener on the click area div to update the score when the user will click on it
clickArea.addEventListener("click", function() {
    if (!ended) {
        score ++;
        scoreTxt.textContent = score; // update the score
    }
});