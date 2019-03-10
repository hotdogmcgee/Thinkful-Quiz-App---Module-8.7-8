'use strict'

let userScore = 0;
let questionNum = 0;
let questionIndex = 0;

function handleSubmit() {
    $('main').on('submit', 'form', function(event) {
        event.preventDefault();
        let answer = $('input:checked');
        let answerVal = answer.val();
        let correctAnswer = `${STORE[questionIndex - 1].correctAnswer}`
        if (answerVal === correctAnswer) {
            renderMain(true, false);
            } else {
            renderMain(false, false);
            }
    })
}



//larger function designed to handle rendering of Main section when form button is clicked, calls on other functions to return values
function renderMain(isCorrect, renderNext) {
    if (questionIndex <= 10) {

        if (renderNext === true){
            createQuestion();
            increaseQuestionNumber();
            increaseQuestionIndex();
            updateQuestionNumber ()
        }
        else {
                if (isCorrect === true) {
                    addToScore();
                    showCorrect();
                    
                }
                else {
                    showIncorrect();
                }
            }
    } 
    else if (questionIndex > 10) {
            renderFinalPage()
    }
} 

//returns HTML in DOM when user clicks on next question/start quiz
function createQuestion() {
    $('main').html(` <section id="question-page" role="main">
        <h2 id="question">${STORE[questionIndex].question}</h2>
        <form role="form">
            <fieldset class="quiz-form">
                <label class="answer-template">
                    <input class="answer" type="radio" name="option" tabindex="1" required value="${STORE[questionIndex].answers[0]}"><span>${STORE[questionIndex].answers[0]}</span>
                </label>
                <label class="answer-template"> 
                    <input class="answer" type="radio" name="option" tabindex="2" required value="${STORE[questionIndex].answers[1]}"><span>${STORE[questionIndex].answers[1]}</span>
                    </label>
                <label class="answer-template">
                    <input class="answer" type="radio" name="option" tabindex="3" required value="${STORE[questionIndex].answers[2]}"><span>${STORE[questionIndex].answers[2]}</span>
                </label>
                <label class="answer-template">
                    <input class="answer" type="radio" name="option" tabindex="4" required value="${STORE[questionIndex].answers[3]}"><span>${STORE[questionIndex].answers[3]}</span>
                </label>
                <button class="submit-button">Submit</button>
            </fieldset>
        </form>
        </section>`)
}

//handles operation when user clicks 'next question'
function handleNextQuestion() {
    $('main').on('click', '.js-next-question', function(event) {
        renderMain(false, true);
        }
    )
}

//returns a page showing that a user clicked the correct answer. 
function showCorrect() {
    console.log('correct answer submitted');
    updateScore ();
    if (questionIndex < 10) {
    $('main').html(`
    <section class="correct-answer" role="main">
        <h2>Correct!</h2>
        <div>
            <img class="feedback-image-correct" src="https://github.com/hotdogmcgee/Thinkful-Quiz-App---Module-8.7-8/blob/master/images/Segovia%20-%20You%20Got%20it%20Right!.jpg?raw=true" alt="Segovia Smiling">
        </div>
        <button class="js-next-question submit-button">Next Question</button>
    </section>
    `)
    } else {
        //provides See Results button
        increaseQuestionIndex();
        $('main').html(`
    <section class="correct-answer" role="main">
        <h2>Correct!</h2>
        <div>
            <img class="feedback-image-correct" src="https://github.com/hotdogmcgee/Thinkful-Quiz-App---Module-8.7-8/blob/master/images/Segovia%20-%20You%20Got%20it%20Right!.jpg?raw=true" alt="Segovia Smiling">
        </div>
        <button class="js-next-question submit-button">See Results</button>
    </section>
    `)
    }
}

//returns a page showing that a user clicked the wrong answer, provides feedback.
function showIncorrect() {
    console.log('wrong answer submitted');
    if (questionIndex < 10) {
    $('main').html(`
    <section class="incorrect-answer" role="main">
        <h2>You got it wrong!</h2>
        <p>The correct answer is ${STORE[questionIndex - 1].correctAnswer}</p>
        <div>
            <img class="feedback-image-wrong" src="https://github.com/hotdogmcgee/Thinkful-Quiz-App---Module-8.7-8/blob/master/images/Broken%20guitar.jpg?raw=true" alt="Sad broken guitar">
        </div>
        <button class="js-next-question submit-button">Next Question</button>
    </section>
    `)
    } else {
        //provides See Results button
        increaseQuestionIndex();
        $('main').html(`
    <section class="incorrect-answer" role="main">
        <h2>You got it wrong!</h2>
        <p>The correct answer is ${STORE[questionIndex - 1].correctAnswer}</p>
        <div>
            <img class="feedback-image-wrong" src="https://github.com/hotdogmcgee/Thinkful-Quiz-App---Module-8.7-8/blob/master/images/Broken%20guitar.jpg?raw=true" alt="Sad broken guitar">
        </div>
        <button class="js-next-question submit-button">See Results</button>
    </section>
    `)
    }
}

//renders last page, displaying user score and giving option to try again
function renderFinalPage() {
    $('main').html(`
    <section role="main" class="final-page">
        <h2>You scored ${userScore} points out of ten.</h2>
        <button class="restart-quiz-button submit-button">
            Start the Quiz Again!
        </button
    </section>
    `)
}


//handles event for when user starts a quiz
function handleStart() {
    $('.first-question').on('click', function(event){
        renderMain(false, true);
    })
}

//handles event for when user re-starts a quiz
function handleRestart() {
   $('main').on('click', '.restart-quiz-button', function(event) {
        userScore = 0;
        questionNum = 0;
        questionIndex = 0;
        renderMain(false, true);
        updateScore();
   })
}

//adds to user score when a correct answer is submitted
function addToScore () {
    userScore++;
}

//changes score number in footer of page
function updateScore () {
    $('footer').find('.footer-score').text(userScore);
}

//changes question number in footer of page
function updateQuestionNumber () {
    $('footer').find('.footer-question-number').text(questionNum);
}

//increases the variable questionIndex, which is used for the STORE array in data.js
function increaseQuestionIndex() {
    questionIndex++;
}

//increases question number, to be used when 'next question' is clicked.
function increaseQuestionNumber () {
    questionNum++;
}



function makeQuiz() {
    handleStart();
    handleSubmit();
    handleNextQuestion();
    handleRestart();
}

$(makeQuiz);

