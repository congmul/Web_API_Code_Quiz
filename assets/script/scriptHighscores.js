// High Score HTML
var aKeyName = [];
var highScoreObj = new Object();
var olEl = document.querySelector("ol");

for (let i = 0; i < localStorage.length; i++) {
    aKeyName[i] = localStorage.key(i);
}

for (let i = 0; i < aKeyName.length; i++) {
    highScoreObj[aKeyName[i]] = localStorage.getItem(aKeyName[i]);
}

//Sorting Scores
// var newHightSocreObj = new Object();
// console.log(highScoreObj);
// myObjectLength = Object.keys(highScoreObj).length;

// for (let j = 0; j < myObjectLength; j++) {
//     console.log("Length : " + myObjectLength);
//     for (let i in highScoreObj) {
//         console.log(i);
//         var maxNum = highScoreObj[i];
//         var maxKey = "";
//         if (maxNum < highScoreObj[i]) {
//             maxNum = highScoreObj[i];
//             maxKey = i;
//             // j--;
//         }
//         // console.log(maxKey);
//         // console.log(maxNum);
//         newHightSocreObj[maxKey] = maxNum;
//         delete highScoreObj[maxKey];
//         console.log("highScoreObj : " + highScoreObj);
//         // myObjectLength--;
//     }
// }
// console.log(newHightSocreObj);

var highSocresText = document.querySelector("#highSocresText");
var liIndex = 0;
for (let i in highScoreObj) {
    var liEl = document.createElement("li");
    liEl.setAttribute("class", "li-"+liIndex);
    olEl.appendChild(liEl);

    if(liIndex === 0){
        liEl.innerHTML = "<span class=\"scoreBox0\"> "+ i + "  : " + highScoreObj[i]+ "</span>";
        liIndex++;
    }else{
        liEl.innerHTML = "<span class=\"scoreBox\"> "+ i + "  : " + highScoreObj[i]+ "</span>";
        liIndex--;
    }
}

var goBackBtn = document.createElement("button");
var clearScore = document.createElement("button");

goBackBtn.setAttribute("id","goBackBtn");
goBackBtn.setAttribute("class","hightscore-btn");
clearScore.setAttribute("id","clearScore");
clearScore.setAttribute("class","hightscore-btn");

goBackBtn.textContent = "Go back"
clearScore.textContent = "Clear Scores";

highSocresText.appendChild(goBackBtn);
highSocresText.appendChild(clearScore);

goBackBtn.addEventListener("click", function(){
    window.location.href = "../../index.html";
});

clearScore.addEventListener("click", function(){
    localStorage.clear();
    olEl.innerHTML = "";
});
