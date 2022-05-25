//Create an array to store questions with answers having key value pairs

const questions = [
    {
        question: "Which team won the first Premier League title?",
        answers: [
            { text: "Chelsea", correct: false },
            { text: "Manchester United", correct: true },
            { text: "Newcastle", correct: false },
            { text: "Spurs", correct: false },
        ]

    },


    {
        question: "Who is the Premier League's all time top goal scorer",
        answers: [
            { text: "Drogba", correct: false },
            { text: "Henry", correct: false },
            { text: "Ronaldo", correct: false },
            { text: "Shearer", correct: true },
        ]

    },
    {
        question: "Which team has won the most Premier League titles?",
        answers: [
            { text: "Chelsea", correct: false },
            { text: "Everton", correct: false },
            { text: "Arsenal", correct: false },
            { text: "Manchester United", correct: true },
        ]
    },


    {
        question: "Which team went a full season without losing a Premier League game?",
        answers: [
            { text: "Arsenal", correct: true },
            { text: "Manchester United", correct: false },
            { text: "Manchester City", correct: false },
            { text: "Watford", correct: false },
        ]

    },


    {
        question: "Which keeper has the most Premier League clean sheets?",
        answers: [
            { text: "Mark Schwarzer", correct: false },
            { text: "Petr Cech", correct: true },
            { text: "Ederson", correct: false },
            { text: "Peter Schmeichel", correct: false },
        ]

    },

];

// Set timer to 75 and make the time left the final score
var timeLeft = 75;
var timerID;
var timerEl = document.getElementById("timer");
var startButton = document.getElementById("button");
var nextButton = document.getElementById("next-btn");
var quizContainerEl = document.getElementById("quiz-container");
var questionEl = document.getElementById("question");
var questionContainerEl = document.getElementById("question-container");
var answerButtonsEl = document.getElementById("answer-buttons");
var checkAnswerEl = document.getElementById("check-answer");
var viewHighScore = document.getElementById("highscore-link");
var sendButton = document.getElementById("send-btn");
var clearScoreButton = document.getElementById("clear-btn");
var initials = document.getElementById("player-name");
var restartButton = document.getElementById("restart-btn");
var score = document.getElementById("player-score");
var scores = JSON.parse(localStorage.getItem("scores")) || []
let shuffledQuestions, currentQuestionIndex

// Start Countdown - function
function Countdown() {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;
    if (timeLeft <= 0) {
        saveScore();
    }
}

//Trigger the start quiz button and next button to display
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
});

///////
//Start Quiz
function startGame() {
 timerID = setInterval(Countdown, 1000);
 quizContainerEl.classList.add("hide");
 shuffledQuestions = questions.sort(() => Math.random() - .5)
 currentQuestionIndex = 0
 questionContainerEl.classList.remove("hide");

 // Timer will start as soon as start button is clicked
 Countdown();
 setNextQuestion();
};


// Go to next question
function setNextQuestion() {
 resetState();
 showQuestion(shuffledQuestions[currentQuestionIndex]);
};


// Display questions
function showQuestion(question) {
 questionEl.innerText = question.question
 question.answers.forEach(answer => {
 var button = document.createElement("button")
 button.innerText = answer.text
 button.classList.add("btn")
 if (answer.correct) {
 button.dataset.correct = answer.correct
 }
 button.addEventListener("click", selectAnswer)
 answerButtonsEl.appendChild(button)
 })
};


// Reset state function
function resetState() {
 //clearStatusClass(document.body)
 nextButton.classList.add("hide")
 checkAnswerEl.classList.add("hide")
 while (answerButtonsEl.firstChild) {
 answerButtonsEl.removeChild
 (answerButtonsEl.firstChild)
 }
};


// Select answer function
function selectAnswer(e) {
 var selectedButton = e.target;
 //console.dir(selectedButton);
 var correct = selectedButton.dataset.correct;
 checkAnswerEl.classList.remove("hide")
 // Deduce if the answer right or wrong then display text
 if (correct) {
 checkAnswerEl.innerHTML = "Thats right!";
 } else {
 checkAnswerEl.innerHTML = "Sorry!!! that is not the correct answer.";
 if (timeLeft <= 10) {
 timeLeft = 0;
 } else {
 // If the aswer is wrong, subtract 10s from the time
 timeLeft -= 10;
 }
 }

 Array.from(answerButtonsEl.children).forEach(button => {
 setStatusClass(button, button.dataset.correct)
 })

 if (shuffledQuestions.length > currentQuestionIndex + 1) {
 nextButton.classList.remove("hide")
 checkAnswerEl.classList.remove("hide")
 } else {
 startButton.classList.remove("hide")
 saveScore();
 }
};



// Removes all the classes
function clearStatusClass(element) {
 element.classList.remove("correct");
 element.classList.remove("wrong");
};


// Display the correct answer by setting the buttons colors
function setStatusClass(element, correct) {
 clearStatusClass(element)
 if (correct) {
 element.classList.add("correct");
 } else {
 element.classList.add("wrong");
 }
};





// Save the scores
function saveScore() {
 clearInterval(timerID);
 timerEl.textContent = "Time: " + timeLeft;
 setTimeout(function () {
 //localStorage.setItem("scores", JSON.stringify(scores));
 questionContainerEl.classList.add("hide");
 document.getElementById("score-container").classList.remove("hide");
 document.getElementById("your-score").textContent = "Your final score is " + timeLeft;

 }, 2000)
};


var loadScores = function () {
 // retrieve score from local storage

 if (!savedScores) {
 return false;
 }

 // Convert the scores from string format into array
 savedScores = JSON.parse(savedScores);
 var initials = document.querySelector("#initials-field").value;
 var newScore = {
 score: timeLeft,
 initials: initials
 }
 savedScores.push(newScore);
 console.log(savedScores)

 savedScores.forEach(score => {
 initialsField.innerText = score.initials
 scoreField.innerText = score.score
 })
};


// Display the highscores that have been entered
function showHighScores(initials) {
 document.getElementById("highscores").classList.remove("hide")
 document.getElementById("score-container").classList.add("hide");
 quizContainerEl.classList.add("hide");
 questionContainerEl.classList.add("hide");
 if (typeof initials == "string") {
 var score = {
 initials, timeLeft
 }
 scores.push(score)
 }

 var highScoreEl = document.getElementById("highscore");
 highScoreEl.innerHTML = "";
 //console.log(scores)
 for (i = 0; i < scores.length; i++) {
 var div1 = document.createElement("div");
 div1.setAttribute("class", "name-div");
 div1.innerText = scores[i].initials;
 var div2 = document.createElement("div");
 div2.setAttribute("class", "score-div");
 div2.innerText = scores[i].timeLeft;

 highScoreEl.appendChild(div1);
 highScoreEl.appendChild(div2);
 }

 localStorage.setItem("scores", JSON.stringify(scores));

};


// Click link to view high scores 
viewHighScore.addEventListener("click", showHighScores);


sendButton.addEventListener("click", function (event) {
 event.preventDefault()
 var initials = document.querySelector("#initials-field").value;
 showHighScores(initials);
});

// Clear the localStorage items 
clearScoreButton.addEventListener("click", function () {
 localStorage.clear();
 document.getElementById("highscore").innerHTML = "";
});


// Restart the page to start quiz again
restartButton.addEventListener("click", function () {
 window.location.reload();
});



