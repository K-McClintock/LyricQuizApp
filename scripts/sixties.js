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
    // menuButton.innerText = 'New Decade!'
    menuButton.classList.remove('hide')
    // tryAgainButton.innerText = "Try again!"
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

// [exitButton, noButton].map((element) => {
//     element.addEventListener('click', () => {
//         console.log('plink')
//         // modal.classList.toggle('hide')
//     })
// })

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
        question: '"No more will my green sea go turn a deeper blue, I could not forsee this thing happening to you."',
        answers: [
            {text: '"White Rabbit" by Jefferson Airplane', correct: false},
            {text: '"Paint It, Black" by The Rolling Stones', correct: true},
            {text: '"Purple Haze" by Jimi Hendrix', correct: false},
            {text: '"White Room" by Cream', correct: false}
        ]
    },
    {
        question: '"You\'re so young and pretty, but one thing I know is true, you\'ll be dead before your time is due."',
        answers: [
            {text: '"You Showed Me" by The Turtles', correct: false},
            {text: '"Break On Through" by The Doors', correct: false},
            {text: '"Magic Carpet Ride" by Steppenwolf', correct: false},
            {text: '"We Gotta Get Out Of This Place" by The Animals', correct: true}
        ]
    },
    {
        question: '"I\'ll be with you, darling, soon. I\'ll be with you when the stars start falling."',
        answers: [
            {text: "\"Sunshine Superman\" by Donovan", correct: false},
            {text: '"Heart Full Of Soul" by The Yardbirds', correct: false},
            {text: '"Sunshine of Your Love" by Cream', correct: true},
            {text: '"Layla" by Derek & The Dominos', correct: false}
        ]
    },
    {
        question: '"Seasons change and so did I, you need not wonder why."',
        answers: [
            {text: '"No Time" by The Guess Who', correct: true},
            {text: '"California Dreamin\'" by The Mamas And The Papas', correct: false},
            {text: '"Spinning Wheel" by Blood, Sweat & Tears', correct: false},
            {text: '"One" by Three Dog Night', correct: false}
        ]
    },
    {
        question: '"Why must we say goodbye? Each time we part my heart wants to die."',
        answers: [
            {text: '"You Were On My Mind" by We Five', correct: false},
            {text: '"Keep Searchin\'" by Del Shannon', correct: false},
            {text: '"Cara Mia" by Jay & The Americans', correct: true},
            {text: '"Time Won\'t Let Me" by The Outsiders', correct: false}
        ]
    },
    {
        question: '"She said\, \'There is no reason\' and the truth is plain to see."',
        answers: [
            {text: '"Easy To Be Hard" by Three Dog Night', correct: false},
            {text: '"Midnight Confessions" by The Grass Roots', correct: false},
            {text: '"Walk Away Renee" by The Left Banke', correct: false},
            {text: '"A Whiter Shade Of Pale" by Procol Harum', correct: true}
        ]
    },
    {
        question: '"I touched your golden hair and tasted your perfume."',
        answers: [
            {text: '"I Had Too Much To Dream (Last Night)" by The Electric Prunes', correct: true},
            {text: '"Incense And Peppermints" by Strawberry Alarm Clock', correct: false},
            {text: '"We Ain\'t Got Nothin\' Yet" by Blues Magoos', correct: false},
            {text: '\"Come On Down To My Boat\" by Every Mother\'s Son"', correct: false}
        ]
    },
    {
        question: '"Sometimes love hurts and sometime love\'s unkind and sometimes you might feel blue."',
        answers: [
            {text: '"I Love You" by People', correct: false},
            {text: '"Things I\'d Like To Say" by New Colony Six', correct: true},
            {text: '"I\'ve Gotta Get A Message To You" by The Bee Gees', correct: false},
            {text: '"We Can Work It Out" by The Beatles', correct: false}
        ]
    },
    {
        question: '"How\'s the weather\, whether or not we\'re together."',
        answers: [
            {text: '"Over You" by Gary Puckett \& The Union Gap', correct: false},
            {text: '"How Can I Be Sure" by The Young Rascals', correct: true},
            {text: '"Never My Love" by The Association', correct: false},
            {text: '"Tired Of Waiting" by The Kinks', correct: false}
        ]
    },
    {
        question: '"Someday I\'m gonna be happy\, but I don\'t know when just now."',
        answers: [
            {text: '"Help!" by The Beatles', correct: false},
            {text: '"Him Or Me" by Paul Revere and The Raiders', correct: false},
            {text: '"Just A Little" by The Beau Brummels', correct: false},
            {text: '"Lies" by The Knickerbockers', correct: true}
        ]
    }
];