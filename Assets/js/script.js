var questionArray = [
    {
        questionTitle: "Question 1: Aussies love cooking snags on their barbie. What is a snag?",
        choiceOne: "A) Chicken Leg",
        choiceTwo: "B) Sausage",
        choiceThree: "C) Steak",
        choiceFour: "D) Prawn",
        correctAnswer: "B"
    },
    {
        questionTitle: "Question 2: What did Spanish sailors first introduce to the people of Europe?",
        choiceOne: "A) Broad beans",
        choiceTwo: "B) Potatoes",
        choiceThree: "C) Carrots",
        choiceFour: "D) Peas",
        correctAnswer: "B"
    },
    {
        questionTitle: "Question 3: Which drink is associated with 'Oktoberfest'?",
        choiceOne: "A) Wine",
        choiceTwo: "B) Brandy",
        choiceThree: "C) Vodka",
        choiceFour: "D) Beer",
        correctAnswer: "D"
    },
    {
        questionTitle: "Question 4: What internationally popular Italian dish has its origins in Naples?",
        choiceOne: "A) Risotto",
        choiceTwo: "B) Gelato",
        choiceThree: "C) Pizza",
        choiceFour: "D) Lasagne",
        correctAnswer: "C"
    },
    {
        questionTitle: "Question 5: What is Black Pudding?",
        choiceOne: "A) Sausage made from blood",
        choiceTwo: "B) Citrus fruit",
        choiceThree: "C) Nickname for a Rolls Royce",
        choiceFour: "D) Fruit cake",
        correctAnswer: "A"
    }
]
var beginButton = document.querySelector("#begin");
var loadingSectionDisplay = document.querySelector(".loading-screen");
var questionTitle = document.querySelector("#question-title");
var choiceOneText = document.querySelector("#choice-A");
var choiceTwoText = document.querySelector("#choice-B");
var choiceThreeText = document.querySelector("#choice-C");
var choiceFourText = document.querySelector("#choice-D");
var questionSectionDisplay = document.querySelector(".question");
var resultSectionDisplay = document.querySelector(".result");
var resultDisplay = document.querySelector("#result-text");
var messageSectionDisplay = document.querySelector(".message-display");
var messageDisplay = document.querySelector("#message");
var timerDisplay = document.querySelector("#timer");
var loadingTextDisplay = document.querySelector("#loading-text");
var points = 20; //points per question
var finalScore = 0;
var currentQuestion = 0; //keep track of Question number in the QuestionArray
var timeLeft = 40;
var timeDeduction = 4;
var submitButton = document.querySelector("#submit");
var highscoreList = [];

choiceOneText.addEventListener("mouseup", checkResult);
choiceTwoText.addEventListener("mouseup", checkResult);
choiceThreeText.addEventListener("mouseup", checkResult);
choiceFourText.addEventListener("mouseup", checkResult);

submitButton.addEventListener("mouseup", function (event) {
    event.preventDefault();

    var initials = document.querySelector("#initials").value;

    if (initials === "") {
        renderMessage("Initials cannot be blank");
    } else {
        var highscoreObj = {
            initials: initials,
            score: finalScore
        }
        sortObjectArrayBasedOnScore(highscoreList, highscoreObj);
    }
    localStorage.setItem("highscoreList", JSON.stringify(highscoreList));
    window.location.href = "highscores.html";
});

function sortObjectArrayBasedOnScore(highscoreList, highscoreObj) {
    //if there's nothing in the list, push it in
    //if there are more then one item in the list, for loop to check if it's bigger
    //if score is bigger than the current item in the array, insert(splice) it in
    //if score is not bigger and we checked the last item, push it in to the end
    if (highscoreList.length === 0) {
        highscoreList.push(highscoreObj);
    } else if (highscoreList.length > 0) {
        for (i = 0; i < highscoreList.length; i++) {
            if (highscoreObj.score >= highscoreList[i].score) {
                highscoreList.splice(i, 0, highscoreObj);
                break;
            } else if (i === (highscoreList.length - 1)) {
                highscoreList.push(highscoreObj);
                break;
            }
        }
    }
}

function setTime() {
    var timerInterval = setInterval(function () {
        timeLeft--;
        if (timeLeft <= 0) {
            setTimerToZero();
            displayResult();
            clearInterval(timerInterval);
        } else {
            timerDisplay.textContent = "Timer: " + timeLeft;
        }
    }, 800);
}

function setTimerToZero() {
    timeLeft = 0;
    timerDisplay.textContent = "Timer: " + timeLeft;
}

function checkResult(event) {
    //check what's clicked and add score or reduce time
    var picked = event.target.id.slice(-1); //get the last letter of the id string
    if (picked === questionArray[currentQuestion].correctAnswer) {
        //if answer is correct
        finalScore += points;
        renderMessage("Correct! Your score now: " + finalScore);
    } else {
        //if answer is wrong
        timeLeft -= timeDeduction;
        renderMessage("Wrong! Minus " + timeDeduction + " seconds from Timer");
    }
    updateQuestion();
}

function renderMessage(message) {
    messageSectionDisplay.style.display = "block";
    messageDisplay.textContent = message;
    setTimeout(function () {
        messageSectionDisplay.style.display = "none";
    }, 1000);
}

function updateQuestion() {
    currentQuestion++;
    if (currentQuestion < questionArray.length) {
        renderQuestion();
    } else {
        setTimerToZero();
        displayResult();
    }
}

function displayResult() {
    questionSectionDisplay.style.display = "none";
    resultSectionDisplay.style.display = "block";
    resultDisplay.textContent = "Your final score is " + finalScore + ".";
}

function renderQuestion() {
    questionTitle.innerHTML = questionArray[currentQuestion].questionTitle;
    choiceOneText.innerHTML = questionArray[currentQuestion].choiceOne;
    choiceTwoText.innerHTML = questionArray[currentQuestion].choiceTwo;
    choiceThreeText.innerHTML = questionArray[currentQuestion].choiceThree;
    choiceFourText.innerHTML = questionArray[currentQuestion].choiceFour;
}

beginButton.addEventListener("click", function () {
    loadingSectionDisplay.style.display = "none";
    questionSectionDisplay.style.display = "block";
    setTime();
    renderQuestion();
});

function init() {
    var storedList = JSON.parse(localStorage.getItem("highscoreList"));

    if (storedList !== null) {
        highscoreList = storedList;
    }
    timerDisplay.textContent = "Timer: " + timeLeft;
    loadingTextDisplay.textContent = "Are you ready for the quiz?! You have "+timeLeft+" seconds to answer "+questionArray.length+" questions. Each correct answer will grant you "+points+" points. Each wrong answer will deduct "+timeDeduction+" seconds from your time. Think Quick & Good Luck!";
    questionSectionDisplay.style.display = "none";
    resultSectionDisplay.style.display = "none";
    messageSectionDisplay.style.display = "none";
}

init();