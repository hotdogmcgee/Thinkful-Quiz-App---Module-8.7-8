'use strict'

let userScore = 0;
let questionNum = 1;
let questionIndex = 0;



function handleSubmit() {
    $('main').on('submit', 'form', function(event) {
        event.preventDefault();
        let answer = $('input:checked');
        let answerVal = answer.val();
        let correctAnswer = `${STORE[questionIndex].correctAnswer}`
        if (answerVal === correctAnswer) {
            renderMain(true, false);
            } else {
                console.log('hello')
                console.log(answerVal)
            renderMain(false, false);
            }
        console.log('submit handled');
    })
}

//handles operation when user clicks 'next question'
function handleNextQuestion() {
    $('main').on('click', '.js-next-question', function(event) {
        renderMain(false, true);
        console.log('next question loaded')
        }
    )
}


//returns HTML in DOM when user clicks on next question/start quiz
function createQuestion() {
    $('main').html(` <section id="question-page" role="main">
        <h2 id="question">${STORE[questionIndex].question}</h2>
        <form>
            <fieldset class="quiz-form">
                <label class="answer-template">
                    <input class="answer" type="radio" name="option" value="${STORE[questionIndex].answers[0]}"><span>${STORE[questionIndex].answers[0]}</span>
                </label>
                <label class="answer-template"> 
                    <input class="answer" type="radio" name="option" value="${STORE[questionIndex].answers[1]}"><span>${STORE[questionIndex].answers[1]}</span>
                    </label>
                <label class="answer-template">
                    <input class="answer" type="radio" name="option" value="${STORE[questionIndex].answers[2]}"><span>${STORE[questionIndex].answers[2]}</span>
                </label>
                <label class="answer-template">
                    <input class="answer" type="radio" name="option" value="${STORE[questionIndex].answers[3]}"><span>${STORE[questionIndex].answers[3]}</span>
                </label>
                <button class="submit-button">Submit</button>
            </fieldset>
        </form>
        </section>`)
}

//larger function designed to handle rendering of Main section when form button is clicked, calls on other functions to return values
function renderMain(isCorrect, renderNext) {
    if (questionIndex < 10) {

    if (renderNext === true){
        createQuestion();
      }
      else {
            if (isCorrect === true) {
                addToScore();
                showCorrect();
                updateQuestionNumber ()
                increaseQuestionIndex();
                increaseQuestionNumber();
            }
             else {
                showIncorrect();
                updateQuestionNumber ()
                increaseQuestionIndex();
                increaseQuestionNumber();
            }
        }
    } else if (questionIndex >= 10) {
        $('main').on('click', '.js-next-question', function(event) {
            renderFinalPage()
            console.log('last page')
        })
    }
} 

//renders last page, displaying user score and giving option to try again
function renderFinalPage() {
    $('main').html(`
     <button onclick="window.location.href ='index.html';">
        Start the Quiz Again!
     </button
    `)
}

//returns a page showing that a user clicked the correct answer
function showCorrect() {
    console.log('correct answer submitted');
    updateScore ();
    $('main').html(`
    <section class="feedback-page" role="main">
        <h2>Correct!</h2>
        <img src="https://github.com/hotdogmcgee/Thinkful-Quiz-App---Module-8.7-8/blob/master/images/Segovia%20-%20You%20Got%20it%20Right!.jpg?raw=true" alt="Segovia Smiling">
        <button class="js-next-question">Next</button>
    </section>
    `)
}

//returns a page showing that a user clicked the wrong answer, provides feedback.
function showIncorrect() {
    console.log('wrong answer submitted');
    $('main').html(`
    <section class="feedback-page" role="main">
        <h2>You got it wrong!</h2>
        <img src="https://github.com/hotdogmcgee/Thinkful-Quiz-App---Module-8.7-8/blob/master/images/Broken%20guitar.jpg?raw=true" alt="Sad broken guitar">
        <button class="js-next-question">Next</button>
    </section>
    `)
}


//handles event for when user starts a quiz
function handleStart() {
    $('.js-first-question').on('click', function(event){
        renderMain(false, true);
    })
}

//changes score number in footer of page
function updateScore () {
    $('footer').find('.footer-score').text(userScore);
    console.log('score updated');
}

//changes question number in footer of page
function updateQuestionNumber () {
    $('footer').find('.footer-question-number').text(questionNum);
    console.log('questionNum updated');
}

//handles event for when user re-starts a quiz
// function handleRestart() {
//     if (questionIndex === 10) {
//         $('main').on('click', '.js-next-question', function(event) {
//             renderFinalPage()
//             console.log('last page')
//         })
//     }
// }

//adds to user score when a correct answer is submitted
function addToScore () {
    userScore++;
    console.log('added to userScore');
}

//increases question number, to be used when 'next question' is clicked.
function increaseQuestionNumber () {
    questionNum++;
    console.log('added to quetionNum');
}

//increases the variable questionIndex, which is used for the STORE array in data.js
function increaseQuestionIndex() {
    questionIndex++;
    console.log('added to questionIndex');
}


function makeQuiz() {
    handleStart();
    handleSubmit();
    handleNextQuestion();
}

$(makeQuiz);

