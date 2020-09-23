//Access the UI
var timeTextEl = document.querySelector("#timeText");
var timeEl = document.querySelector("#time");
var startBtnEl = document.querySelector("#startBtn");

// initialize state
var setTime = 12;

startBtnEl.addEventListener("click", timer);

function timer(){
    timeTextEl.textContent = "Time: "
    
    var timerInterval = setInterval(function(){
        timeEl.textContent = setTime;
        setTime--;
        if(setTime < 10){
            timeEl.setAttribute("style","color:red")
        }
        if(setTime < 0){
            clearInterval(timerInterval);
        }
    }, 1000);
}