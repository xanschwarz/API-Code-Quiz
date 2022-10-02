// Score lists elements and element for display of just-saved score.
var placesList = document.getElementById("places_list");
var scoresList = document.getElementById("scores_list");
var initialsList = document.getElementById("initials_list");
var resultsMessage = document.getElementById("results_message");

// Retrieving the scores from local storage. Assigning the last entry to a variable for use in the results message, if applicable.
var savedScores = JSON.parse(localStorage.getItem("CodeQuizScores"));
var lastUser = savedScores[savedScores.length - 1];
var topFive;

// orderedScores puts saved scores in order by descending value, then alphabetically by initials. Each entry gets a place, with tied values
// sharing places. It then slices the top 5 places for display.
function orderedScores() {
  var slice;

  // Sorts from highest to lowest score. For scores that are equal, sorts alphabetically by initials.
  savedScores.sort(function (a, b) {
    if (a.score === b.score) {
      return a.initials.localeCompare(b.initials);
    } else {
      return b.score - a.score;
    }
  });

  // Gives each score a place value starting at 1.
  savedScores[0].place = 1;
  for (i = 1; i < savedScores.length; i++) {
    if (savedScores[i].score === savedScores[i - 1].score) {
      // If the scores are equal, they tie for place.
      savedScores[i].place = savedScores[i - 1].place;
    } else {
      // If the scores are not equal, the place increases by 1.
      savedScores[i].place = savedScores[i - 1].place + 1;
    }

    // Marks the last entry to be in top 5.
    if (savedScores[i].place === 6 && savedScores[i - 1].place === 5) {
      slice = i;
    }
  }

  return (topFive = savedScores.slice(0, slice));
}

// resultsMessage is enacted when local storage indicates that the page has been reached following a user saving a new score. It displays a
// message to the user indicating their placement.
function resultsMessage() {
  // Checks local storage to see if user has saved a score. If so, displays a congratulations message and resets local storage message indicator
  // to false.
  var messageCheck = localStorage.getItem("DisplayResultsMessage");
  if (messageCheck === "true") {
    resultsMessage.setAttribute("style", "display: block");
    // Provide message corresponding to user's placement in saved scores.
    if (lastUser.place <= 5) {
      resultsMessage.innerHTML =
        "Congratulations on a saved high score! You're among these top 5 placed legends!";
    } else {
      resultsMessage.innerHTML =
        "Congratulations on a saved high score! Your score placed " +
        lastUser.place +
        " out of " +
        savedScores[savedScores.length - 1].place +
        "!";
    }
    localStorage.setItem("DisplayResultsMessage", "false");
  }
}

// displayScores displays the top 5 score entries with their places and initials in the high scores page.
function displayScores() {
  // Call function to order scores and return top 5 placement scores to be shown.
  orderedScores();
  // Iterates through the topFive array. Creates a list element and assigns text for each score, it's corresponding initials and placement, then
  // appends them to their respective lists.
  for (i = 0; i < topFive.length; i++) {
    var scoreLi = document.createElement("li");
    var initialsLi = document.createElement("li");
    var placeLi = document.createElement("li");
    scoreLi.textContent = topFive[i].score;
    initialsLi.textContent = topFive[i].initials;
    placeLi.textContent = topFive[i].place;
    scoresList.appendChild(scoreLi);
    initialsList.appendChild(initialsLi);
    placesList.appendChild(placeLi);
  }
  resultsMessage();
}

displayScores();
