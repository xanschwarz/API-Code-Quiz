var scoresList = document.getElementById("scores_list");
var initialsList = document.getElementById("initials_list");
var savedScores = JSON.parse(localStorage.getItem("CodeQuizScores"));
// var topFive;

// For now show all scores from highest to lowest. For identical scores, show alphabetical order.
// Consider in future only showing top 5 places. If there is a tie, show all scores at that place. Would need to add a "place" to the saved score object once retrieved from
// local storage for this purpose.

// for (i = 0; i < savedScores.length; i++) {
//   console.log(savedScores[i]);
// }

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

orderedScores();

function displayScores() {
  // To do: when user saves score w/initials, when this page loads, show congratulations message if in top 5 w/their place, else show message w/their position out of how many.
  for (i = 0; i < savedScores.length; i++) {
    var scoreLi = document.createElement("li");
    var initialsLi = document.createElement("li");
    scoreLi.textContent = savedScores[i].score;
    initialsLi.textContent = savedScores[i].initials;
    scoresList.appendChild(scoreLi);
    initialsList.appendChild(initialsLi);
  }
}

displayScores();
