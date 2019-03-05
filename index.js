'use strict'

// $('.middle-class').html('')

// $('.middle').html(renderMiddle())








let userScore = 0;
let questionNum = 1;
let questionIndex = 0;



function handleSubmit() {
    $('form').on('submit', function(event) {
        event.preventDefault();
        let answer = $('input:checked');
        let answerVal = answer.val();
        let correctAnswer = `${STORE[questionIndex].correctAnswer}`
        if (answerVal === correctAnswer) {
            renderMain(true, false);
            } else {
            renderMain(false, false);
            }
        console.log('yoyoy');
    })
}

//user selects answer on submit run user feedback
// function userSelectAnswer () {
//     $('form').on('submit', function (event) {
//       event.preventDefault();
//       let selected = $('input:checked');
//       let answer = selected.val();
//       let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
//       if (answer === correctAnswer) {
//         selected.parent().addClass('correct');
//         ifAnswerIsCorrect();
//       } else {
//         selected.parent().addClass('wrong');
//         ifAnswerIsWrong();
//       }
//     });
//   }

//returns HTML in DOM when user clicks on next question/start quiz
function createQuestion() {
    $('main').html(` <section id="question-page" role="main">
        <h2 id="question">${STORE[questionIndex].question}</h2>
        <form>
            <fieldset class="quiz-form">
                <label class="answer-template">
                    <input class="answer" type="radio" name="option" checked=""><span>${STORE[questionIndex].answers[0]}</span>
                </label>
                <label class="answer-template"> 
                    <input class="answer" type="radio" name="option" checked=""><span>${STORE[questionIndex].answers[1]}</span>
                    </label>
                <label class="answer-template">
                    <input class="answer" type="radio" name="option" checked=""><span>${STORE[questionIndex].answers[2]}</span>
                </label>
                <label class="answer-template">
                    <input class="answer" type="radio" name="option" checked=""><span>${STORE[questionIndex].answers[3]}</span>
                </label>
                <button class="submit-button js-next-question">Submit</button>
            </fieldset>
        </form>
        </section>`)
}

//larger function designed to handle rendering of Main section when form button is clicked, calls on other functions to return values
function renderMain(isCorrect, renderNext) {
    if (renderNext === true){
        createQuestion();
        increaseQuestionIndex();
        increaseQuestionNumber();
        console.log('second')
      }
      else {
            if (isCorrect === true) {
                showCorrect();
                addToScore();
                increaseQuestionIndex();
                increaseQuestionNumber();
            }
             else {
                showIncorrect();
                increaseQuestionIndex();
                increaseQuestionNumber();
            }
      }
}

//returns a page showing that a user clicked the correct answer
function showCorrect() {
    console.log('correct answer submitted');
    $('main').html(`
    <section class="feedback-page" role="main">
        <h2>Correct!</h2>
        <img src="https://github.com/hotdogmcgee/Thinkful-Quiz-App---Module-8.7-8/blob/master/images/Segovia%20-%20You%20Got%20it%20Right!.jpg?raw=true" alt="Segovia Smiling">
        <button id="js-next-button">Next Question</button>
    </section>
    `)
}

//returns a page showing that a user clicked the wrong answer, provides feedback.
function showIncorrect() {
    console.log('wrong answer submitted');
}

//handles event for when user starts a quiz
function handleStart() {
    console.log('first');
    $('.js-first-question').on('click', function(event){
        renderMain(false, true);
        console.log('four')
    })
    console.log('third');
}

//handles event for when user re-starts a quiz
function handleRestart() {

}

//checks if user submitted correct answer
// function checkAnswer(var1) {
//     if (var1 === STORE[questionIndex].correctAnswer) {
//         console.log('hello');
//         return true
//     } else {
//         console.log('goodbye')
//         return false
//     }
// }

//adds to user score when a correct answer is submitted
function addToScore () {
    userScore++;
}

//increases question number, to be used when 'next question' is clicked.
function increaseQuestionNumber () {
    questionNum++;
}

//increases the variable questionIndex, which is used for the STORE array in data.js
function increaseQuestionIndex() {
    questionIndex++;
}


function makeQuiz() {
    handleStart();
    handleSubmit();
}

$(makeQuiz);

