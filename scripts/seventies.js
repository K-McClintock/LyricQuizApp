
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement =document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const decSelectButton = document.getElementById('dec-select')
const scoreboard = document.getElementById('scoreboard')
const finalScore = document.getElementById('final-score')
const grade = document.getElementById('grade')
const tallyButton = document.getElementById('tally-btn')
const showBoard = document.getElementById('show-board')
const tryAgain = document.getElementById('try-btn')

let shuffledQuestions, currentQuestionIndex

/* start of counter test*/ 
let countRightAnswers = 0

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    document.getElementById('answer-buttons').classList.remove('no-click')
    currentQuestionIndex++
    setNextQuestion()
})
decSelectButton.addEventListener('click', () => {
    window.location.replace("decades.html");
})
tryAgain.addEventListener('click', () => {
    window.location.reload();
});

function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    /*counter stuff again */
    countRightAnswers = 0
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
    } else {
        tallyButton.innerText = 'Tally it up!'
        tallyButton.classList.remove('hide') 
        tallyButton.addEventListener("click", talliedUp);
    }

    /*more counter stuff */
    if (selectedButton.dataset = correct){
        countRightAnswers++;
    }
    /*counter stuff again again */
    scoreboard.innerText = countRightAnswers + " / 10"
    
    //prevent multiclicking
    document.getElementById('answer-buttons').classList.add('no-click');

}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

//remove questions, display score and grade, and display the 'pick another decade' button//
function talliedUp(){
    questionContainerElement.classList.add("hide");
    answerButtonsElement.classList.add("hide");
    tallyButton.classList.add("hide")
    showBoard.classList.remove("hide")
    finalScore.innerText = countRightAnswers + " / 10";
    if(countRightAnswers == "10"){
        grade.innerText = "Legend!"
    } else if (countRightAnswers >= "7"){
        grade.innerText = "Rock Star!"
    } else {
        grade.innerText = "Roadie"
    }
    decSelectButton.innerText = 'Another decade?'
        decSelectButton.classList.remove('hide');
    tryAgain.innerText = 'Try Again!'
    tryAgain.classList.remove('hide')      

};

const questions = [
    {
        question: "\"She rules her life like a fine skylark and when the sky is starless.\"",
        answers: [
            {text: "\"Angie Baby\" by Helen Reddy", correct: false},
            {text: "\"Rhiannon\" by Fleetwood Mac", correct: true},
            {text: "\"Jackie Blue\" by Ozark Mountain Daredevils", correct: false},
            // {text: "\"Brandy \(You\'re A Fine Girl\)\" by Looking Glass", correct: false}
        ]
    },
    {
        question: "\"When I think of all my sorrow, when I had you there but then I let you go.\"",
        answers: [
            {text: "\"Day After Day\" by Badfinger", correct: false},
            {text: "\"Reflections Of My Life\" by Marmalade", correct: false},
            // {text: "\"I\'m Not In Love\" by 10cc", correct: false},
            {text: "\"Without You\" by Harry Nilsson", correct: true}
        ]
    },
    {
        question: "\"Morning, don't get here tonight, searching for her silver light.\"",
        answers: [
            // {text: "\"Magnet And Steel\" by Walter Egan", correct: false},
            {text: "\"The Air That I Breathe\" by The Hollies", correct: false},
            {text: "\"Can\'t Get It Out Of My Head\" by Electric Light Orchestra", correct: true},
            {text: "\"Best Of My Love\" by The Eagles", correct: false}
        ]
    },
    {
        question: "\"I had a hole in the place where my heart should have been.\"",
        answers: [
            {text: "\"Go All The Way\" by Raspberries", correct: true},
            {text: "\"Green-Eyed Lady\" by Sugarloaf", correct: false},
            {text: "\"Fox On The Run\" by Sweet", correct: false},
            // {text: "\"Lady\" by Styx", correct: false}
        ]
    },
    {
        question: "\"Use a little love and we will make it work out better.\"",
        answers: [
            {text: "\"My Sweet Lord\" by George Harrison", correct: false},
            // {text: "\"Instant Karma!\" by John Lennon", correct: false},
            {text: "\"It Don\'t Come Easy\" by Ringo Starr", correct: true},
            {text: "\"My Love\" by Paul McCartney and Wings", correct: false}
        ]
    },
    {
        question: "\"You make me feel so brand new, and I want to spend my life with you.\"",
        answers: [
            {text: "\"Could It Be I\'m Falling In Love\" by The Spinners", correct: false},
            {text: "\"Didn\'t I \(Blow Your Mind This Time\)\" by The Delfonics", correct: false},
            // {text: "\"Strawberry Letter 23\" by The Brothers Johnson", correct: false},
            {text: "\"Let\'s Stay Together\" by Al Green", correct: true}
        ]
    },
    {
        question: "\"Beware of the pat on the back, it might just hold you back.\"",
        answers: [
            {text: "\"Smiling Faces Sometimes\" by The Undisputed Truth", correct: true},
            {text: "\"Backstabbers\" by The O\'Jays", correct: false},
            {text: "\"Games People Play\" by The Spinners", correct: false},
            // {text: "\"Everybody Plays The Fool\" by The Main Ingredient", correct: false}
        ]
    },
    {
        question: "\"In my thoughts I have seen rings of smoke through the trees and the voices of those who stand looking.\"",
        answers: [
            {text: "\"Smoke On The Water\" by Deep Purple", correct: false},
            {text: "\"Stairway To Heaven\" by Led Zeppelin", correct: true},
            // {text: "\"Behind Blue Eyes\" by The Who", correct: false},
            {text: "\"Don\'t Fear The Reaper\" by Blue Oyster Cult", correct: false}
        ]
    },
    {
        question: "\"Sing a lonely song of a deep blue dream, seven horses seem to be on the mark.\"",
        answers: [
            {text: "\"Ride Captain Ride\" by Blues Image", correct: false},
            {text: "\"Love Her Madly\" by The Doors", correct: true},
            // {text: "\"25 or 6 to 4\" by Chicago", correct: false},
            {text: "\"Long Train Running\" by The Doobie Brothers", correct: false}
        ]
    },
    {
        question: "\"When I think back on all the crap I learned in high school, it\'s a wonder I can think at all.\"",
        answers: [
            {text: "\"Reeling In The Years\" by Steely Dan", correct: false},
            {text: "\"Stuck In The Middle With You\" by Stealers Wheel", correct: false},
            // {text: "\"Roundabout\" by Yes", correct: false},
            {text: "\"Kodachrome\" by Paul Simon", correct: true}
        ]
    }
];