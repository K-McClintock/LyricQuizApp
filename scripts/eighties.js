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
        question: '"You gave me your word but words for you are lies."',
        answers: [
            {text: '"I Hate Myself For Loving You" by Joan Jett and the Blackhearts', correct: false},
            {text: '"Harden My Heart" by Quarterflash', correct: true},
            {text: '"The Warrior" by Scandal', correct: false},
            {text: '"Love Is A Battlefield" by Pat Benatar', correct: false}
        ]
    },
    {
        question: '"Hush, my darling, don\'t you cry. Quiet, angel, forget their lies."',
        answers: [
            {text: '\"Only The Lonely\" by the Motels', correct: false},
            {text: '"Two Of Hearts" by Stacy Q', correct: false},
            {text: '"Eternal Flame" by The Bangles', correct: false},
            {text: '"Our Lips Are Sealed" by The Go-Go\'s', correct: true}
        ]
    },
    {
        question: '"Words are few I have spoken, I could waste a thousand years."',
        answers: [
            {text: '"True" by Spandeau Ballet', correct: false},
            {text: '"There\'s Something About You" by Level 42', correct: false},
            {text: '"Do You Really Want To Hurt Me?" by Culture Club', correct: true},
            {text: '"Too Shy" by Kajagoogoo', correct: false}
        ]
    },
    {
        question: '"I had a dream, for a moment I believed it was true."',
        answers: [
            {text: '"Electric Blue" by Icehouse', correct: true},
            {text: '"Shattered Dreams" by Johnny Hates Jazz', correct: false},
            {text: '"Don\'t Dream It\'s Over" by Crowded House', correct: false},
            {text: '"Tempted" by Squeeze', correct: false}
        ]
    },
    {
        question: '"I\'ve been this way before, but with you I\'ve found the key to open any door."',
        answers: [
            {text: '"Round and Round" by Ratt', correct: false},
            {text: '"When It\'s Love" by Van Halen', correct: false},
            {text: '"Is This Love" by Whitesnake', correct: true},
            {text: '"Once Bitten, Twice Shy" by Great White', correct: false}
        ]
    },
    {
        question: '"You wanted me so much but I didn\'t get it, how could a fellow be so blind?"',
        answers: [
            {text: '"Fresh" by Kool & The Gang', correct: false},
            {text: '"Let It Whip" by The Dazz Band', correct: false},
            {text: '"Casanova" by LeVert', correct: false},
            {text: '"Rock Steady" by The Whispers', correct: true}
        ]
    },
    {
        question: '"Both of us searching for some perfect world we know we\'ll never find."',
        answers: [
            {text: '"Hold Me Now" by Thompson Twins', correct: true},
            {text: '"Don\'t You Want Me" by The Human League', correct: false},
            {text: '"Obsession" by Animotion', correct: false},
            {text: '"Poison Arrow" by ABC', correct: false}
        ]
    },
    {
        question: '"There is a new place where dreams just can\'t come true."',
        answers: [
            {text: '"Make It Real" by The Jets', correct: false},
            {text: '"Foolish Beat" by Debbie Gibson', correct: true},
            {text: '"Solitaire" by Laura Branigan', correct: false},
            {text: '"Cruel Summer" by Bananarama', correct: false}
        ]
    },
    {
        question: '"It took my heart to shatter in a thousand pieces before I\'d ever drop my pride."',
        answers: [
            {text: '"Don\'t Be Cruel" by Bobby Brown', correct: false},
            {text: '"If It Isn\'t Love" by New Edition', correct: true},
            {text: '"I Want Her" by Keith Sweat', correct: false},
            {text: '"Dial My Heart" by The Boys', correct: false}
        ]
    },
    {
        question: '"I should\'ve been gone after all your words of steel."',
        answers: [
            {text: '"I Want To Know What Love Is" by Foreigner', correct: false},
            {text: '"Seperate Ways (Worlds Apart)" by Journey', correct: false},
            {text: '"Heat Of The Moment" by Asia', correct: false},
            {text: '"Oh Sherrie" by Steve Perry', correct: true}
        ]
    }
];