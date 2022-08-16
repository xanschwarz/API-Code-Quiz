var startBtn = document.querySelector("#start");
var introCard = document.querySelector("#intro");
var questionCard = document.querySelector("#questions");
var questionText = document.querySelector("#questionText");
var answersDisplay = document.querySelector("#answersDisplay");
var resultDisplay = document.querySelector("#resultDisplay");
var outroCard = document.querySelector("#outro");
var quizResults = document.querySelector("#quizResults");
var bonusTime = document.querySelector("#bonusTime");
var finalScoreDisplay = document.querySelector("#finalScore");
var timeCount = document.querySelector("#timeCount");
var countdownText = document.querySelector("#countdownText");
var userInitials = document.querySelector("#initials");
var saveScoreBtn = document.querySelector("#saveScoreBtn");
var homeBtn = document.querySelector("#home");
var highScoresBtn = document.querySelector("#highScoresBtn");
var timeLeft = 90;
var resultTimer = 1;
var finalScore;
var questionIndex = 0;
var answersArray = [];
var correctAnswers = 0;
timeCount.innerHTML = timeLeft;
countdownText.innerHTML = " seconds left!";

function startQuiz() {
  introCard.setAttribute("style", "display: none");
  questionCard.setAttribute("style", "display: block");

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

  function displayQuestion() {
    questionText.innerHTML = questions[questionIndex].question;

    // Clear the previous answers from the answersDisplay element.
    answersDisplay.innerHTML = "";

    for (i = 0; i < questions[questionIndex].answers.length; i++) {
      // Append break element.
      var breakEl = document.createElement("br");
      answersDisplay.appendChild(breakEl);

      // Create the answer element with it's corresponding text and an event listener.
      var answerBtn = document.createElement("button");
      answerBtn.innerHTML = questions[questionIndex].answers[i];
      answerBtn.addEventListener("click", checkAnswer);
      // Append the element to the DOM.
      answersDisplay.appendChild(answerBtn);
    }
  }

  displayQuestion();

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
        " questions correct.";
    } else if (correctAnswers === 3) {
      quizResults.innerHTML =
        " Not bad, but you can do better! You got " +
        correctAnswers +
        " out of " +
        questions.length +
        " questions correct.";
    } else {
      quizResults.innerHTML =
        "You need to go study and try again! You got " +
        correctAnswers +
        " out of " +
        questions.length +
        " questions correct.";
    }

    if (timeLeft > 20) {
      bonusTime.innerHTML =
        "Finished with time to spare! You got a bonus time score of " +
        bonusTimeScore +
        " seconds.";
    } else if (timeLeft >= 10) {
      bonusTime.innerHTML =
        "Cutting it close! You got a bonus time score of " +
        bonusTimeScore +
        " seconds.";
    } else {
      bonusTime.innerHTML =
        "Unfortunately, you didn't get any bonus time score!";
    }

    finalScore = correctAnswers + bonusTimeScore;

    if (finalScore < 0) {
      finalScore = 0;
    }

    finalScoreDisplay.innerHTML = "Your final score is " + finalScore + ".";
  }
}

function saveScore(event) {
  event.preventDefault();
  var initials = userInitials.value.trim();
  var letterCheck = /^[A-Za-z]+$/;
  if (!initials.match(letterCheck)) {
    alert("Please enter your initials using only letters.");
    userInitials.value = "";
  } else if (!localStorage.getItem("CodeQuizScores")) {
    var scoreToAdd = [
      {
        initials: initials,
        score: finalScore,
      },
    ];
    localStorage.setItem("CodeQuizScores", JSON.stringify(scoreToAdd));
    localStorage.setItem("DisplayResultsMessage", "true");
    window.location.href = "./high_scores.html";
  } else {
    var savedScores = JSON.parse(localStorage.getItem("CodeQuizScores"));
    var scoreToAdd = {
      initials: initials,
      score: finalScore,
    };
    savedScores.push(scoreToAdd);
    localStorage.setItem("CodeQuizScores", JSON.stringify(savedScores));
    localStorage.setItem("DisplayResultsMessage", "true");
    window.location.href = "./high_scores.html";
    // Call function to display just entered score and it's position in the high scores list. This just be a message shown in the element? This need to be a separate js file?
  }
}

startBtn.addEventListener("click", startQuiz);
saveScoreBtn.addEventListener("click", saveScore);
homeBtn.addEventListener("click", function () {
  window.location.reload();
});
highScoresBtn.addEventListener("click", function () {
  window.location.href = "high_scores.html";
});

// Ways to simplify the code? For consideration:
//    Clean up js file for index and high scores. Break things down into smallest, simplest functions for clarity.
//    Having the js append elements as appropriate would cut down on html and the js element variables. It would also make the js easier to follow.
//        This has been done for the questions' answers displays. Can this be implemented elsewhere?

// Any functionality to add? Some notes within code. Consider if they score 0 maybe show a message saying they need points to save their score, as opposed to showing the score
// save form.
// Clean out any unused IDs and classes. Better comments throughout.
// Note in ReadMe that I chose to keep styling very simple for now, with some basic responsive design. I may add more extensive styling, possibly a framework, in the future.
