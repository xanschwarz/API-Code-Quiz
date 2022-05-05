var startBtn = document.querySelector('#start');
var introCard = document.querySelector('#intro');
var questionCard = document.querySelector('.questions');
var questionText = document.querySelector('#questionText');
var firstAnswer = document.querySelector('#firstAnswer');
var secondAnswer = document.querySelector('#secondAnswer');
var thirdAnswer = document.querySelector('#thirdAnswer');
var forthAnswer = document.querySelector('#forthAnswer');

// Consider using JavaScript to append answers to the question card. This may be less cumbersome and allows for easier changes to the quiz.

var questions = [{
    question: "Commonly used data types DO NOT include:",
    answers: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
    correctAnswer: "3. Alerts"
},
{
    question: "The condition in an if/else statement is enclosed within ____.",
    answers: ["1. Quotes", "2. Curly Brackets", "3. Parentheses", "4. Square Brackets"],
    correctAnswer: "3. Parentheses"
},
{
    question: "Arrays in JavaScript can be used to store ____.",
    answers: ["1. Numbers and strings", "2. Other arrays", "3. Booleans", "4. All of the above"],
    correctAnswer: "4. All of the above"
},
{
    question: "String values must be enclosed within ____ when being assigned to variables.",
    answers: ["1. Commas", "2. Curly Brackets", "3. Quotes", "4. Parentheses"],
    correctAnswer: "3. Quotes"
},
{
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["1. JavaScript", "2. Terminal/Bash", "3. For loops", "4. Console.log"],
    correctAnswer: "4. Console.log"
}];

function startQuiz() {
    introCard.setAttribute("style", "display: none")
    questionCard.setAttribute("style", "display: block")
    var questionIndex = 0;
    var answersArray = [];

    function displayQuestion() {
        questionText.innerHTML = questions[questionIndex].question;
        firstAnswer.innerHTML = questions[questionIndex].answers[0];
        secondAnswer.innerHTML = questions[questionIndex].answers[1];
        thirdAnswer.innerHTML = questions[questionIndex].answers[2];
        forthAnswer.innerHTML = questions[questionIndex].answers[3];
    }

    displayQuestion();

    function checkAnswer(event) {
        // If the answer is correct, push true to the answer array, otherwise false. Console log the answer array. Then, move on to the next question.
        if (event.target.innerHTML === questions[questionIndex].correctAnswer) {
            answersArray.push(true);
        } else {
            answersArray.push(false);
        }

        console.log(answersArray);
        questionIndex++;

        if (questionIndex < questions.length) {
            displayQuestion();
        } else {
            // What to do when quiz is finished.
            console.log('Finished!')
        }        
    }    

    firstAnswer.addEventListener("click", checkAnswer);
    secondAnswer.addEventListener("click", checkAnswer);
    thirdAnswer.addEventListener("click", checkAnswer);
    forthAnswer.addEventListener("click", checkAnswer);

}

 startBtn.addEventListener("click", startQuiz);