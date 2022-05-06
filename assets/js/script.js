var startBtn = document.querySelector("#start");
var introCard = document.querySelector("#intro");
var questionCard = document.querySelector("#questions");
var questionText = document.querySelector("#questionText");
var firstAnswer = document.querySelector("#firstAnswer");
var secondAnswer = document.querySelector("#secondAnswer");
var thirdAnswer = document.querySelector("#thirdAnswer");
var forthAnswer = document.querySelector("#forthAnswer");
var resultDisplay = document.querySelector("#resultDisplay");
var outroCard = document.querySelector("#outro");
var quizResults = document.querySelector("#quizResults");
var bonusTime = document.querySelector("#bonusTime");
var finalScore = document.querySelector("#finalScore");
var timeCount = document.querySelector("#timeCount");
var countdownText = document.querySelector("#countdownText");
var homeBtn = document.querySelector("#home");
var highScoresBtn = document.querySelector("#highScoresBtn");
var quizTime = 20;
var resultTimer = 1;
timeCount.innerHTML = quizTime;
countdownText.innerHTML = " seconds left!";

// Consider using JavaScript to append answers to the question card. This may be less cumbersome and allows for easier changes to the quiz.

var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
    correctAnswer: "3. Alerts",
  },
  {
    question: "The condition in an if/else statement is enclosed within ____.",
    answers: [
      "1. Quotes",
      "2. Curly brackets",
      "3. Parentheses",
      "4. Square brackets",
    ],
    correctAnswer: "3. Parentheses",
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    answers: [
      "1. Numbers and strings",
      "2. Other arrays",
      "3. Booleans",
      "4. All of the above",
    ],
    correctAnswer: "4. All of the above",
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    answers: ["1. Commas", "2. Curly brackets", "3. Quotes", "4. Parentheses"],
    correctAnswer: "3. Quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [
      "1. JavaScript",
      "2. Terminal/Bash",
      "3. For loops",
      "4. Console.log",
    ],
    correctAnswer: "4. Console.log",
  },
];

function startQuiz() {
  introCard.setAttribute("style", "display: none");
  questionCard.setAttribute("style", "display: block");
  var questionIndex = 0;
  var answersArray = [];
  var correctAnswers = 0;
  timeCount.innerHTML = quizTime;
  countdownText.innerHTML = " seconds left!";
  var timeLeft = timeCount.innerHTML;

  function displayQuestion() {
    questionText.innerHTML = questions[questionIndex].question;
    firstAnswer.innerHTML = questions[questionIndex].answers[0];
    secondAnswer.innerHTML = questions[questionIndex].answers[1];
    thirdAnswer.innerHTML = questions[questionIndex].answers[2];
    forthAnswer.innerHTML = questions[questionIndex].answers[3];
  }

  displayQuestion();

  function displayOutro() {
    questionCard.setAttribute("style", "display: none");
    outroCard.setAttribute("style", "display: block");
    var bonusTimeScore = Math.floor(timeLeft / 10);

    if (correctAnswers >= 4) {
      quizResults.innerHTML =
        "Great job! You got " +
        correctAnswers +
        " out of " +
        questions.length +
        " questions correct!";
    } else if (correctAnswers === 3) {
      quizResults.innerHTML =
        " Not bad, but you can do better! You got " +
        correctAnswers +
        " out of " +
        questions.length +
        " questions correct!";
    } else {
      quizResults.innerHTML =
        "You need to go study and try again! You got " +
        correctAnswers +
        " out of " +
        questions.length +
        " questions correct!";
    }

    // Once the timer is implemented, make sure this functioning as intended.
    if (timeLeft > 20) {
      bonusTime.innerHTML =
        "Finished with time to spare! You got a bonus time score of " +
        bonusTimeScore +
        " seconds!";
    } else if (timeLeft >= 10) {
      bonusTime.innerHTML =
        "Cutting it close! You got a bonus time score of " +
        bonusTimeScore +
        " seconds!";
    } else {
      bonusTime.innerHTML =
        "Unfortunately, you didn't get any bonus time score!";
    }

    finalScore.innerHTML =
      "Your final score is " + (correctAnswers + bonusTimeScore);
  }

  var timer = setInterval(function () {
    if (resultTimer > 0) {
      resultTimer--;
    } else {
      resultDisplay.setAttribute("style", "display: none");
    }

    if (timeLeft > 1 && answersArray.length < questions.length) {
      timeLeft--;
      timeCount.innerHTML = timeLeft;
    } else if (timeLeft === 1 && answersArray.length < questions.length) {
      timeLeft--;
      timeCount.innerHTML = timeLeft;
      countdownText.innerHTML = " second left!";
    } else if (answersArray.length === questions.length) {
      timeCount.innerHTML = "";
      countdownText.innerHTML = "You finished!";
      clearInterval(timer);
      displayOutro();
    } else {
      timeCount.innerHTML = "";
      countdownText.innerHTML = "Time is up!";
      clearInterval(timer);
      displayOutro();
    }
  }, 1000);

  function checkAnswer(event) {
    // If the answer is correct, push true to the answer array, otherwise false. Console log the answer array. Then, move on to the next question.
    if (event.target.innerHTML === questions[questionIndex].correctAnswer) {
      answersArray.push(true);
      correctAnswers++;
    } else {
      answersArray.push(false);
      timeLeft = timeLeft - 10;
    }
    console.log(answersArray);

    questionIndex++;

    if (questionIndex < questions.length) {
      displayQuestion();
      resultDisplay.setAttribute("style", "display: block");
      resultTimer = 1;
      if (answersArray[questionIndex - 1] === true) {
        resultDisplay.innerHTML = "Correct!";
      } else {
        resultDisplay.innerHTML = "Incorrect!";
      }
    } else {
      // What to do when quiz is finished.
      console.log("Finished!");
      displayOutro();
    }
  }

  firstAnswer.addEventListener("click", checkAnswer);
  secondAnswer.addEventListener("click", checkAnswer);
  thirdAnswer.addEventListener("click", checkAnswer);
  forthAnswer.addEventListener("click", checkAnswer);
}

startBtn.addEventListener("click", startQuiz);
homeBtn.addEventListener("click", function () {
  window.location.reload();
});
highScoresBtn.addEventListener("click", function () {
  window.location.href = "high_scores.html";
});

// Implement the high scores page
// Implement the ability to save your score w/initials
// High scores are saved in local storage
// Ways to simplify the code?
