'use strict'

// $('.middle-class').html('')

// $('.middle').html(renderMiddle())








let userScore = 0;
let questionNum = 1;
let questionIndex = 0;


//returns HTML in DOM when user clicks on next question
function createQuestion() {
    $('main').html(` <section id="question-page" role="main"><h2 id="question">${STORE[questionIndex].question}</h2><form><fieldset class="quiz-form">
<label class="answer-template"><input class="answer" type="radio" name="option" checked=""><span>${STORE[questionIndex].answers[0]}</span></label><label class="answer-template"> <input class="answer" type="radio" name="option" checked=""><span>${STORE[questionIndex].answers[1]}</span></label><label class="answer-template"><input class="answer" type="radio" name="option" checked=""><span>${STORE[questionIndex].answers[2]}</span></label><label class="answer-template"><input class="answer" type="radio" name="option" checked=""><span>${STORE[questionIndex].answers[3]}</span></label></fieldset></form></section>
<button class="submit-button js-next-question">Submit</button>`)
}

//larger function designed to handle rendering of Main section when form button is clicked, calls on other functions to return values
function renderMain(isCorrect, renderNext) {
    if (renderNext === true){
        createQuestion();
        questionIndex++;
        increaseQuestionNumber();
        console.log('second')
      }
      else {
            if (isCorrect === true) {
           //render correct html
           addToScore();
            }
             else {
            //render wrong html
            }
      }
}

//returns a page showing that a user clicked the correct answer
function showCorrect() {

}

//returns a page showing that a user clicked the wrong answer, provides feedback.
function showIncorrect() {

}

//handles event for when user starts a quiz
function handleStart() {
    $('.js-next-question').on('click', renderMain(false, true))
    console.log('first')
}

//handles event for when user re-starts a quiz
function handleRestart() {

}

//adds to user score when a correct answer is submitted
function addToScore () {
    userScore++
}

//increases question number, to be used when 'next question is clicked.
function increaseQuestionNumber () {
    questionNum++
}



function makeQuiz() {
    handleStart();

}

$(makeQuiz);