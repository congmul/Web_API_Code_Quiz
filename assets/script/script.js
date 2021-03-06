//Access the UI
var timeTextEl = document.querySelector("#timeText");
var timeEl = document.querySelector("#time");
var startBtnDivEl = document.querySelector("#startBtnDiv");
var startBtnEl = document.querySelector("#startBtn");
var startQuestionEl = document.querySelector("#startQuestion");

// initialize state
var setTime = 59;
var questionNum = 0;
var correct = 0;

// initialize Questions Object
var questionsArr = [{
    "question": "1. Inside which HTML element do we put the JavaScript?",
    "example": {
        "1": "<js>",
        "2": "<javascript>",
        "3": "<scripting>",
        "4": "<script>"
    },
    "correctAnswer": "4"
},

{
    "question": "2. Where is the correct place to insert a JavaScript?",
    "example": {
        "1": "Both the <head> section and the <body> section are correct",
        "2": "The <head> section",
        "3": "The <body> section"
    },
    "correctAnswer": "3"
},

{
    "question": "3. What is the correct syntax for referring to an external script called \"xxx.js\"?",
    "example": {
        "1": "<script name = xxx.js>",
        "2": "<script href=xxx.js>",
        "3": "<script src=xxx.js>"
    },
    "correctAnswer": "3"
},

{
    "question": "4. How do you call a function named \"myFunction\"?",
    "example": {
        "1": "call function myFunction()",
        "2": "myFunction() ",
        "3": "call myFunction()"
    },
    "correctAnswer": "2"
},

{
    "question": "5. How to write an IF statement for executing some code if \"i\" is NOT equal to 5?",
    "example": {
        "1": "if(i != 5)",
        "2": "if i <> 5",
        "3": "if 1 =! 5 then",
        "4": " if(i<>5)"
    },
    "correctAnswer": "1"
},
];

// questionsGenerator Function Start
function questionsGenerator(num) {
    var questionFrame = "<h2>" + questionsArr[num]["question"] + "</h2>";
    var olEl = document.createElement("ol");

    startQuestionEl.innerHTML = questionFrame;
    startQuestionEl.appendChild(olEl);
    olEl.setAttribute("class", "quizAnswer");

    for (let i in questionsArr[num]["example"]) {
        var index = parseInt(i);
        var liEl = document.createElement("li");
        var buttonEl = document.createElement("button");
        var answerFrame = questionsArr[num]["example"][index];

        startQuestionEl.childNodes[1].appendChild(buttonEl);
        startQuestionEl.childNodes[1].childNodes[index - 1].setAttribute("date-index", index);
        startQuestionEl.childNodes[1].childNodes[index - 1].appendChild(liEl).textContent = answerFrame;
    }

    var quizAnswerEL = document.querySelector(".quizAnswer");
    var checking = document.createElement("check");
    var nextQuestion = document.createElement("button");
    nextQuestion.setAttribute("id", "nextQuestion");
    startQuestionEl.appendChild(checking);


    quizAnswerEL.addEventListener("click", (e) => {
        var element = e.target;
        var userAnswer = element.parentNode.getAttribute("date-index");

        if (element.matches("li")) {
            if (userAnswer === questionsArr[num]["correctAnswer"]) {
                checking.setAttribute("class", "checkingCorrect");
                checking.textContent = "Correct";
                correct++;
                setTime += 5;

            } else {
                checking.setAttribute("class", "checkingIncorrect");
                checking.textContent = "Incorrect";
                setTime -= 5;
            }
            if (questionNum < 4) {
                startQuestionEl.appendChild(nextQuestion);
                nextQuestion.textContent = "next Question";
            } else {
                startQuestionEl.appendChild(nextQuestion);
                nextQuestion.textContent = "Submit";
            }
        }
    });
    nextQuestion.addEventListener("click", (e) => {
        console.log(e.target);
        questionNum++;
        if (questionNum < 5) {
            questionsGenerator(questionNum);
        } else {
            finalScore(setTime);
            setTime = null;
        }
    });
}

startBtnEl.addEventListener("click", timer);

function timer() {
    timeTextEl.textContent = "Time: "
    timeEl.textContent = 60;
    startBtnDivEl.innerHTML = "";

    // Timer Interval Start
    var timerInterval = setInterval(function () {
        timeEl.textContent = setTime;
        setTime--;
        if (setTime < 10) {
            timeEl.setAttribute("style", "color:red")
        }
        if (setTime === 0) {
            clearInterval(timerInterval);
            alert("Time Out!!");
            return window.location.href = "./assets/html/highscores.html";
        }
        if (setTime === -1) {
            clearInterval(timerInterval);
        }
    }, 1000);

    questionsGenerator(questionNum);
}

//Final Score Display Fucntion.
function finalScore(setTime) {
    var finalScoreNum = setTime * correct;
    var finalText = "<h3>All done</h3>" + "<p>Final Score: <span id=\"finalScore\"></span></p>";
    startQuestionEl.innerHTML = finalText;

    var finalScoreEl = document.querySelector("#finalScore");

    var divEl = document.createElement("div");
    var labelEl = document.createElement("lable");
    var inputEl = document.createElement("input");
    var saveButton = document.createElement("button");

    divEl.setAttribute("class", "row");
    labelEl.setAttribute("id", "label");
    inputEl.setAttribute("class", "saveInitial");
    inputEl.setAttribute("placeHolder", "your initials");
    saveButton.setAttribute("id", "saveBtn");
    
    finalScoreEl.textContent = finalScoreNum;
    labelEl.textContent = "Enter Initials: ";
    saveButton.textContent = "Save";

    startQuestionEl.appendChild(divEl);
    divEl.appendChild(labelEl);
    divEl.appendChild(inputEl);
    divEl.appendChild(saveButton);

    document.querySelector("#saveBtn").addEventListener("click", function () {
        var initialName = inputEl.value;
        localStorage.setItem(initialName, finalScoreNum);
        window.location.href = "./assets/html/highscores.html";
    })
}

