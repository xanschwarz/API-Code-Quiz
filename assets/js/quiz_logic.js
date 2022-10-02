// Card elements for control of their display style.
var introCard = document.querySelector("#intro");
var questionCard = document.querySelector("#questions");
var outroCard = document.querySelector("#outro");

// Button elements for event listeners.
var startBtn = document.querySelector("#start");
var saveScoreBtn = document.querySelector("#saveScoreBtn");
var homeBtn = document.querySelector("#home");
var highScoresBtn = document.querySelector("#highScoresBtn");

// Question card elements.
var questionText = document.querySelector("#questionText");
var answersDisplay = document.querySelector("#answersDisplay");
var resultDisplay = document.querySelector("#resultDisplay");

// Outro card elements for displaying various quiz feedback and inputting user initials.
var quizResults = document.querySelector("#quizResults");
var bonusTime = document.querySelector("#bonusTime");
var finalScoreDisplay = document.querySelector("#finalScore");
var userInitials = document.querySelector("#initials");
var zeroScore = document.querySelector("#zeroScore");
var saveScoreForm = document.querySelector("#saveScoreForm");

// Elements for the display of the remaining time.
var timeCount = document.querySelector("#timeCount");
var countdownText = document.querySelector("#countdownText");

// Various global variables for the various quiz functions.
var resultTimer;
var timeLeft = 90;
var answersArray = [];
var questionIndex = 0;
var correctAnswers = 0;
var finalScore;

// Set display text for initial quiz length.
timeCount.innerHTML = timeLeft;
countdownText.innerHTML = " seconds left!";

// startQuiz function will hide the intro card and display the question card. It will also start the timer and call the function to display the
// first question in the question card.
function startQuiz() {
  introCard.setAttribute("style", "display: none");
  questionCard.setAttribute("style", "display: block");

  // This is the timer for the quiz. It also handles the time for the resultDisplay element, and updates the timer display text as appropriate.
  var timer = setInterval(function () {
    // This is for displaying whether the user got the previous question correct or not. Rather than have it's own timer function it is simply
    // implemented within the greater quiz timer function. Once time is up, hide display.
    if (resultTimer > 0) {
      resultTimer--;
    } else {
      resultDisplay.setAttribute("style", "display: none");
    }

    // If seconds remain and not all questions are answered, decrement time and update the timer element.
    if (timeLeft > 1 && answersArray.length < questions.length) {
      timeLeft--;
      timeCount.innerHTML = timeLeft;
    } else if (timeLeft === 1 && answersArray.length < questions.length) {
      // If 1 second remains and not all questions are answered, decrement time and update the timer element with appropriate text.
      timeLeft--;
      timeCount.innerHTML = timeLeft;
      countdownText.innerHTML = " second left!";
    } else if (answersArray.length === questions.length) {
      // If all questions are answered, clear the timer and it's HTML display, replace it's display with "You finished!", and display the outro
      // card.
      timeCount.innerHTML = "";
      countdownText.innerHTML = "You finished!";
      clearInterval(timer);
      displayOutro();
    } else {
      // If quiz time has run out, clear the timer and it's HTML display, replace it's display with "Time is up!", and display the outro card.
      timeCount.innerHTML = "";
      countdownText.innerHTML = "Time is up!";
      clearInterval(timer);
      displayOutro();
    }
  }, 1000);

  displayQuestion();
}

function displayQuestion() {
  // Display the current question in it's HTML element.
  questionText.innerHTML = questions[questionIndex].question;

  // Clear the previous answers from the answersDisplay element.
  answersDisplay.innerHTML = "";

  // Loop through the current question's answers and display them in the answersDisplay element.
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

// checkAnswer function serves to track which answers the user got correct and which incorrect. It shows the next question and whether the user
// got the previous one correct or not, or ends the quiz if the time limit is reached.
function checkAnswer(event) {
  // If the answer is correct, push true to the answer array. Otherwise push false and penalize 10 seconds. Then, increment the question index.
  if (event.target.innerHTML === questions[questionIndex].correctAnswer) {
    answersArray.push(true);
    correctAnswers++;
  } else {
    answersArray.push(false);
    timeLeft = timeLeft - 10;
  }

  questionIndex++;

  // If the end of the quiz questions has not been reached, display the next question.
  if (questionIndex < questions.length) {
    displayQuestion();
    // Briefly display whether the user got the previous question correct or not.
    resultDisplay.setAttribute("style", "display: block");
    resultTimer = 1;
    if (answersArray[questionIndex - 1] === true) {
      resultDisplay.innerHTML = "Correct!";
    } else {
      resultDisplay.innerHTML = "Incorrect!";
    }
  } else {
    // If the end of the quiz questions has been reached, display the outro card.
    displayOutro();
  }
}

// displayOutro will hide the question card and display the outro card. It will also show the users various quiz results with appropriate
// feedback. Lastly it shows the save score form for non-zero scores, or the zero score message for zero scores.
function displayOutro() {
  // Stop displaying the question card, now display the outro card.
  questionCard.setAttribute("style", "display: none");
  outroCard.setAttribute("style", "display: block");
  // Score from bonus time as one point for each 10 seconds remaining.
  var bonusTimeScore = Math.floor(timeLeft / 10);

  // Display user score with corresponding feedback.
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

  // Display bonus score from remaining time.
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
    bonusTime.innerHTML = "Unfortunately, you didn't get any bonus time score!";
  }

  finalScore = correctAnswers + bonusTimeScore;

  if (finalScore > 0) {
    // If the user has a score, display the save score form.
    saveScoreForm.setAttribute("style", "display: block");
  } else if (finalScore === 0) {
    // If the user has no score, display message that scoring allows option to save their score.
    zeroScore.setAttribute("style", "display: block");
  } else {
    // Correct final score in event user received time penalty with less than 10 seconds remaining.
    finalScore = 0;
    // The user has score of zero, display message that scoring allows option to save their score.
    zeroScore.setAttribute("style", "display: block");
  }

  finalScoreDisplay.innerHTML = "Your final score is " + finalScore + ".";
}

// saveScore saves valid user initials to local storage with their quiz score. It also uses local storage to flag for the high scores page to
// show a message for the user that their scores were successfully added. It then redirects to the high scores page.
function saveScore(event) {
  // Prevent page reload.
  event.preventDefault();
  // Check for valid initials. If not valid, request valid input.
  var initials = userInitials.value.trim();
  var letterCheck = /^[A-Za-z]+$/;
  if (!initials.match(letterCheck)) {
    alert("Please enter your initials using only letters.");
    userInitials.value = "";
  } else if (!localStorage.getItem("CodeQuizScores")) {
    // If local storage is clear of scores, create an array to store them. The users score is added as the first object in that array.
    var scoreToAdd = [
      {
        initials: initials,
        score: finalScore,
      },
    ];
    localStorage.setItem("CodeQuizScores", JSON.stringify(scoreToAdd));
    // Using local storage, flag for the high_scores.js to display a results message to the user that their score has been added.
    localStorage.setItem("DisplayResultsMessage", "true");
    // Take user to high_scores page.
    window.location.href = "./high_scores.html";
  } else {
    // If local storage already has an array of scores, add the users score to the array. As before, flag high_scores.js to display results
    // message for user saved score.
    var savedScores = JSON.parse(localStorage.getItem("CodeQuizScores"));
    var scoreToAdd = {
      initials: initials,
      score: finalScore,
    };
    savedScores.push(scoreToAdd);
    localStorage.setItem("CodeQuizScores", JSON.stringify(savedScores));
    localStorage.setItem("DisplayResultsMessage", "true");
    // Take user to high_scores page.
    window.location.href = "./high_scores.html";
  }
}

// Various quiz event listeners.
startBtn.addEventListener("click", startQuiz);
saveScoreBtn.addEventListener("click", saveScore);
homeBtn.addEventListener("click", function () {
  window.location.reload();
});
highScoresBtn.addEventListener("click", function () {
  window.location.href = "high_scores.html";
});
