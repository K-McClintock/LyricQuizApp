const howTo = document.querySelector('.how-to');
const counter = document.querySelector('.count span')
const quizContainer = document.querySelector('#quiz-container');
const questionContainer = document.querySelector('#question-container');
const questionEl = document.querySelector('#question');
const answerButtonsEl = document.querySelector('#answer-buttons');
const startButton = document.querySelector('#start-btn');
const nextButton = document.querySelector('#next-btn');
const scoreButton = document.querySelector('#score-btn');
const menuButton = document.querySelector('#menu-btn');
const tryAgainButton = document.querySelector('#try-again-btn');
const scoreboards = document.querySelectorAll('.scoreboard');
const finalScore = document.querySelector('#final-score');
const ranking = document.querySelector('#ranking');
const modal = document.querySelector('#modal');
const exitButton = document.querySelectorAll('.exit');
const yesButton = document.querySelector('.yes');
const noButton = document.querySelector('.no');


let shuffledQuestions, currentQuestionIndex

let countRightAnswers = 0

let currentCount = 0


//start game, hide howTo & startButton, show quiz & questionContainers
const startGame = () => {
    howTo.classList.add('hide')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    countRightAnswers = 0
    currentCount = 0
    quizContainer.classList.remove('hide')
    questionContainer.classList.remove('hide')
    setNextQuestion()
}

//show question, create answer buttons
const showQuestion = (question) => {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsEl.appendChild(button)
    })
}

//hide next button, remove previous answer buttons
const resetState = () => {
    nextButton.classList.add('hide')
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

//reset state, show next question, increment question number
const setNextQuestion = () => {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    currentCount ++
    counter.innerText = currentCount
}

//select answer, remove hide button, if out of questions show score button
const selectAnswer = (e) => {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatus(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    } else {
        scoreButton.innerText = "Score me!"
        scoreButton.classList.remove('hide')
        scoreButton.addEventListener('click', scoreMe)
    }
    if (correct) {
        countRightAnswers++
    }
    answerButtonsEl.classList.add('no-click')
}

//set status- right answers to correct, wrong answers to wrong
const setStatus = (element, correct) => {
    clearStatus(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

//clear the status
const clearStatus = (element) => {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

//hide the quiz, show the score results, show end game controls
const scoreMe = () => {
    quizContainer.classList.add('hide')
    questionContainer.classList.add('hide')
    answerButtonsEl.classList.add('hide')
    scoreButton.classList.add('hide')
    scoreboards.forEach(scoreboard => {
        scoreboard.classList.remove('hide')
    })
    finalScore.innerText = countRightAnswers + ' / 10'
    if (countRightAnswers == '10'){
        ranking.innerText = 'Legend!'
    } else if (countRightAnswers >= '7'){
        ranking.innerText = 'Rock Star!'
    } else {
        ranking.innerText = 'Roadie'
    }
    menuButton.classList.remove('hide')
    tryAgainButton.classList.remove('hide')
}

// event listeners
startButton.addEventListener('click', startGame)

nextButton.addEventListener('click', () => {
    answerButtonsEl.classList.remove('no-click')
    currentQuestionIndex++
    setNextQuestion()
})

menuButton.addEventListener('click', () => {
    window.location.replace('menu.html');
})

tryAgainButton.addEventListener('click', () => {
    window.location.reload();
})

exitButton.forEach(exit => {exit.addEventListener('click', () => {
    modal.classList.toggle('hide')
})})

window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.classList.add('hide')
    }
})

noButton.addEventListener('click', () => {
    modal.classList.add('hide')
})

yesButton.addEventListener('click', () => {
    window.location.replace('index.html')
})

// quiz questions and answers
const questions = [
    {
        question: '"She rules her life like a fine skylark and when the sky is starless."',
        answers: [
            {text: '"Angie Baby" by Helen Reddy', correct: false},
            {text: '"Rhiannon" by Fleetwood Mac', correct: true},
            {text: '"Jackie Blue" by Ozark Mountain Daredevils', correct: false},
            {text: '"Brandy (You\'re A Fine Girl)" by Looking Glass', correct: false}
        ]
    },
    {
        question: '"When I think of all my sorrow, when I had you there but then I let you go."',
        answers: [
            {text: '"Day After Day" by Badfinger', correct: false},
            {text: '"Reflections Of My Life" by Marmalade', correct: false},
            {text: '"I\'m Not In Love" by 10cc', correct: false},
            {text: '"Without You" by Harry Nilsson', correct: true}
        ]
    },
    {
        question: '"Morning, don\'t get here tonight, searching for her silver light."',
        answers: [
            {text: '\"Magnet And Steel\" by Walter Egan', correct: false},
            {text: '"The Air That I Breathe" by The Hollies', correct: false},
            {text: '"Can\'t Get It Out Of My Head" by Electric Light Orchestra', correct: true},
            {text: '"Best Of My Love" by The Eagles', correct: false}
        ]
    },
    {
        question: '"I had a hole in the place where my heart should have been."',
        answers: [
            {text: '"Go All The Way" by Raspberries', correct: true},
            {text: '"Green-Eyed Lady" by Sugarloaf', correct: false},
            {text: '"Fox On The Run" by Sweet', correct: false},
            {text: '"Lady" by Styx', correct: false}
        ]
    },
    {
        question: '"Use a little love and we will make it work out better."',
        answers: [
            {text: '"My Sweet Lord" by George Harrison', correct: false},
            {text: '"Instant Karma!" by John Lennon', correct: false},
            {text: '"It Don\'t Come Easy" by Ringo Starr', correct: true},
            {text: '"My Love" by Paul McCartney and Wings', correct: false}
        ]
    },
    {
        question: '"You make me feel so brand new, and I want to spend my life with you."',
        answers: [
            {text: '"Could It Be I\'m Falling In Love" by The Spinners', correct: false},
            {text: '"Didn\'t I (Blow Your Mind This Time)" by The Delfonics', correct: false},
            {text: '"Strawberry Letter 23" by The Brothers Johnson', correct: false},
            {text: '"Let\'s Stay Together" by Al Green', correct: true}
        ]
    },
    {
        question: '"Beware of the pat on the back, it might just hold you back."',
        answers: [
            {text: '"Smiling Faces Sometimes" by The Undisputed Truth', correct: true},
            {text: '"Backstabbers" by The O\'Jays', correct: false},
            {text: '"Games People Play" by The Spinners', correct: false},
            {text: '"Everybody Plays The Fool" by The Main Ingredient', correct: false}
        ]
    },
    {
        question: '"In my thoughts I have seen rings of smoke through the trees and the voices of those who stand looking."',
        answers: [
            {text: '"Smoke On The Water" by Deep Purple', correct: false},
            {text: '"Stairway To Heaven" by Led Zeppelin', correct: true},
            {text: '"Behind Blue Eyes" by The Who', correct: false},
            {text: '"Don\'t Fear The Reaper" by Blue Oyster Cult', correct: false}
        ]
    },
    {
        question: '"Sing a lonely song of a deep blue dream, seven horses seem to be on the mark."',
        answers: [
            {text: '"Ride Captain Ride" by Blues Image', correct: false},
            {text: '"Love Her Madly" by The Doors', correct: true},
            {text: '"25 or 6 to 4" by Chicago', correct: false},
            {text: '"Long Train Running" by The Doobie Brothers', correct: false}
        ]
    },
    {
        question: '"When I think back on all the crap I learned in high school, it\'s a wonder I can think at all."',
        answers: [
            {text: '"Reeling In The Years" by Steely Dan', correct: false},
            {text: '"Stuck In The Middle With You" by Stealers Wheel', correct: false},
            {text: '"Roundabout" by Yes', correct: false},
            {text: '"Kodachrome" by Paul Simon', correct: true}
        ]
    }
];