var scoresList = document.getElementById("scores_list");
var initialsList = document.getElementById("initials_list");
var savedScores = JSON.parse(localStorage.getItem("CodeQuizScores"));
// var topFive;

// Consider in future only showing top 5 places. If there is a tie, show all scores at that place. Would need to add a "place" to the saved score object once retrieved from
// local storage for this purpose.
// If the above is implemented, the generated results message can by modified to show the recent users place. A congratulations if they're in the top 5, else a message saying
// they're in position X out of Y.

function orderedScores() {
  // Sorts from highest to lowest score. For scores that are equal, sorts alphabetically by initials.
  savedScores.sort(function (a, b) {
    if (a.score === b.score) {
      return a.initials.localeCompare(b.initials);
    } else {
      return b.score - a.score;
    }
  });

  // return (topFive = savedScores.slice(0, 5));
}

function resultsMessage() {
  // Checks local storage to see if user has saved a score. If so, displays a congratulations message and resets local storage message indicator to false.
  var messageCheck = localStorage.getItem("DisplayResultsMessage");
  if (messageCheck === "true") {
    var resultsMessage = document.getElementById("results_message");
    resultsMessage.setAttribute("style", "display: block");
    resultsMessage.innerHTML =
      "Congratulations on a saved high score! You're among these legends!";
    localStorage.setItem("DisplayResultsMessage", "false");
  }
}

function displayScores() {
  orderedScores();
  // Iterates through the savedScores array. Creates a list element and assigns text for each score and it's corresponding initials, then appends them to their respective lists.
  for (i = 0; i < savedScores.length; i++) {
    var scoreLi = document.createElement("li");
    var initialsLi = document.createElement("li");
    scoreLi.textContent = savedScores[i].score;
    initialsLi.textContent = savedScores[i].initials;
    scoresList.appendChild(scoreLi);
    initialsList.appendChild(initialsLi);
  }
  resultsMessage();
}

displayScores();
