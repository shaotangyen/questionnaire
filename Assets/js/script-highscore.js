var scoreList = document.querySelector("#highscore-list");
var clearScore = document.querySelector("#clear-score");
var outputString = "";

function renderList(storedList) {
    for (i = 0; i < storedList.length; i++) {
        outputString = (i + 1) + ". " + storedList[i].initials + " - " + storedList[i].score;

        var li = document.createElement("li");
        li.textContent = outputString;
        scoreList.appendChild(li);
    }
}

function renderNoParticipent() {
    if (scoreList.getElementsByTagName('li').length < 1) {
        var li = document.createElement("li");
        li.textContent = outputString;
        scoreList.appendChild(li);
    }
}

function renderClearList(){
    scoreList.removeChild(li);
}


function init() {
    //gets the array of objects stored in local storage
    var storedList = JSON.parse(localStorage.getItem("highscoreList"));
    if (storedList !== null) {
        //sortList(storedList);
        renderList(storedList);
    } else {
        scoreList.innerHTML = ''; //clear all lists in ul
        outputString = "No one participated yet.";
        renderNoParticipent();
    }
}

clearScore.addEventListener("click", function () {
    localStorage.clear();
    init();
});

init();