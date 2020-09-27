// ================= HighScore HTML ========================= //

// Access the UI
var olEl = document.querySelector("ol");

// Initialize state
var aKeyName = [];
var highScoreObj = new Object();

// Getting key from LocalStorage
for (let i = 0; i < localStorage.length; i++) {
    aKeyName[i] = localStorage.key(i);
}

// Getting scores from LocalStorage
for (let i = 0; i < aKeyName.length; i++) {
    highScoreObj[aKeyName[i]] = localStorage.getItem(aKeyName[i]);
}

//Sorting Scores
var sortableScore = [];
for (let key in highScoreObj) {
    sortableScore.push([key, highScoreObj[key]]);
}
sortableScore.sort(([, a], [, b]) => b - a);

// Display scores on the page.
var highSocresText = document.querySelector("#highSocresText");
var liIndex = 0;
for (let i = 0; i < sortableScore.length; i++) {
    var liEl = document.createElement("li");
    liEl.setAttribute("class", "li-" + liIndex);
    olEl.appendChild(liEl);
    if (liIndex === 0) {
        liEl.innerHTML = "<span class=\"scoreBox0\"> " + sortableScore[i][0] + "  : " + sortableScore[i][1] + "</span>";
        liIndex++;
    } else {
        liEl.innerHTML = "<span class=\"scoreBox\"> " + sortableScore[i][0] + "  : " + sortableScore[i][1] + "</span>";
        liIndex--;
    }
}

// Creat button seletor (Go back / Clear Button)
var goBackBtn = document.createElement("button");
var clearScore = document.createElement("button");

goBackBtn.setAttribute("id", "goBackBtn");
goBackBtn.setAttribute("class", "hightscore-btn");
clearScore.setAttribute("id", "clearScore");
clearScore.setAttribute("class", "hightscore-btn");

goBackBtn.textContent = "Go back"
clearScore.textContent = "Clear Scores";

highSocresText.appendChild(goBackBtn);
highSocresText.appendChild(clearScore);

goBackBtn.addEventListener("click", function () {
    window.location.href = "../../index.html";
});

clearScore.addEventListener("click", function () {
    localStorage.clear();
    olEl.innerHTML = "";
});
