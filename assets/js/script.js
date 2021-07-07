var startBtn = document.querySelector('#start');
var introCard = document.querySelector('#intro');
var question1 = document.querySelector('#q1');
var question2 = document.querySelector('#q2');
var question3 = document.querySelector('#q3');
var question4 = document.querySelector('#q4');
var question5 = document.querySelector('#q5');
var firstAnswer = document.querySelector('#firstAnswer');
var secondAnswer = document.querySelector('#secondAnswer');
var thirdAnswer = document.querySelector('#thirdAnswer');
var forthAnswer = document.querySelector('#forthAnswer');

function secondQuestion() {
    question1.setAttribute("style", "display: none")
    question2.setAttribute("style", "display: block")
}

function firstQuestion() {
    introCard.setAttribute("style", "display: none")
    question1.setAttribute("style", "display: block")

    firstAnswer.addEventListener("click", secondQuestion)
    secondAnswer.addEventListener("click", secondQuestion)
    thirdAnswer.addEventListener("click", secondQuestion)
    forthAnswer.addEventListener("click", secondQuestion)
}
































 startBtn.addEventListener("click", firstQuestion);