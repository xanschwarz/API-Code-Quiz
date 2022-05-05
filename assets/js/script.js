// var startBtn = document.querySelector('#start');
// var introCard = document.querySelector('#intro');
// var question1 = document.querySelector('#q1');
// var question2 = document.querySelector('#q2');
// var question3 = document.querySelector('#q3');
// var question4 = document.querySelector('#q4');
// var question5 = document.querySelector('#q5');
// var firstAnswer = document.querySelector('#firstAnswer');
// var secondAnswer = document.querySelector('#secondAnswer');
// var thirdAnswer = document.querySelector('#thirdAnswer');
// var forthAnswer = document.querySelector('#forthAnswer');

// function secondQuestion() {
//     question1.setAttribute("style", "display: none")
//     question2.setAttribute("style", "display: block")
// }

// function firstQuestion() {
//     introCard.setAttribute("style", "display: none")
//     question1.setAttribute("style", "display: block")

//     firstAnswer.addEventListener("click", secondQuestion)
//     secondAnswer.addEventListener("click", secondQuestion)
//     thirdAnswer.addEventListener("click", secondQuestion)
//     forthAnswer.addEventListener("click", secondQuestion)
// }

//  startBtn.addEventListener("click", firstQuestion);

var startBtn = document.querySelector('#start');
var introCard = document.querySelector('#intro');
var questionCard = document.querySelector('.questions');
var questionText = document.querySelector('#questionText');
var firstAnswer = document.querySelector('#firstAnswer');
var secondAnswer = document.querySelector('#secondAnswer');
var thirdAnswer = document.querySelector('#thirdAnswer');
var forthAnswer = document.querySelector('#forthAnswer');

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

    // first get question card appearing. Then you can set up a function answer onclick display next question and loop through the questions array.
    questionText.innerHTML = questions[0].question;
    firstAnswer.innerHTML = questions[0].answers[0];
    secondAnswer.innerHTML = questions[0].answers[1];
    thirdAnswer.innerHTML = questions[0].answers[2];
    forthAnswer.innerHTML = questions[0].answers[3];

}

 startBtn.addEventListener("click", startQuiz);