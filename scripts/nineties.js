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
        question: '"I tried so hard to cleanse these regrets, my angel wings were bruised and restrained."',
        answers: [
            {text: '"Heart-shaped Box" by Nirvana', correct: false},
            {text: '"Today" by The Smashing Pumpkins', correct: true},
            {text: '"Fell On Black Days" by Soundgarden', correct: false},
            {text: '"Alive" by Pearl Jam', correct: false}
        ]
    },
    {
        question: '"I go about my business, I\'m doing fine, besides what would I say if I had you on the line."',
        answers: [
            {text: '"If It Makes You Happy" by Sheryl Crow', correct: false},
            {text: '"Adia" by Sarah McLachlan', correct: false},
            {text: '"Linger" by The Cranberries', correct: false},
            {text: '"You Were Meant For Me" by Jewel', correct: true}
        ]
    },
    {
        question: '"Words, playing me deja vu, like a radio tune I swear I\'ve heard before."',
        answers: [
            {text: '"How\'s It Going To Be" by Third Eye Blind', correct: false},
            {text: '"Barely Breathing" by Duncan Sheik', correct: false},
            {text: '"Come Undone" by Duran Duran', correct: true},
            {text: '"Iris" by the Goo Goo Dolls', correct: false}
        ]
    },
    {
        question: '"It\'s funny how we feel so much but we cannot say a word."',
        answers: [
            {text: '"I Will Remember You" by Sarah McLachlan', correct: true},
            {text: '"Stay (I Missed You)" by Lisa Loeb', correct: false},
            {text: '"Who Will Save Your Souls" by Jewel', correct: false},
            {text: '"Stay" by Shakespears Sister', correct: false}
        ]
    },
    {
        question: '"The stars above are watching you, they know my heart and speak to yours like only lovers do."',
        answers: [
            {text: '"Angel of Mine" by Monica', correct: false},
            {text: '"Baby-Baby-Baby" by TLC', correct: false},
            {text: '"Don\'t Let Go (Love)" by En Vogue', correct: true},
            {text: '"Weak" by SWV', correct: false}
        ]
    },
    {
        question: '"I seen the sun up ahead at the county line bridge, sayin\' all there\'s good and nothingness is dead."',
        answers: [
            {text: '"Mr. Jones" by Counting Crows', correct: false},
            {text: '"Hey Jealousy" by Gin Blossoms', correct: false},
            {text: '"Inside Out" by Eve 6', correct: false},
            {text: '"One Headlight" by The Wallflowers', correct: true}
        ]
    },
    {
        question: '"I never dreamed I\'d love somebody like you, and I never dreamed I\'d lose somebody like you."',
        answers: [
            {text: '\"Wicked Game\" by Chris Isaak', correct: true},
            {text: '\"More Than Words\" by Extreme', correct: false},
            {text: '\"Right Here Waiting\" by Richard Marx', correct: false},
            {text: '\"Have You Ever Really Loved A Woman?\" by Bryan Adams', correct: false}
        ]
    },
    {
        question: '"She\'s seen her share of devils in this angel town."',
        answers: [
            {text: '"Run Around" by Blues Traveller', correct: false},
            {text: '"Lullaby" by Shawn Mullins', correct: true},
            {text: '"Life Is A Highway" by Tom Cochrane', correct: false},
            {text: '"Last Dance With Mary Jane" by Tom Petty', correct: false}
        ]
    },
    {
        question: '"A million poppies gonna make me sleep, just one rose it knows your name."',
        answers: [
            {text: '"Sick Of Myself" by Matthew Sweet', correct: false},
            {text: '"Low" by Cracker', correct: true},
            {text: '"All I Want" by Toad the Wet Sprocket', correct: false},
            {text: '"Runaway Train" by Soul Asylum', correct: false}
        ]
    },
    {
        question: '"Backbeat, the word was on the street that the fire in your heart is out."',
        answers: [
            {text: '"Bittersweet Symphony" by The Verve', correct: false},
            {text: '"Alright" by Supergrass', correct: false},
            {text: '"Girls & Boys" by Blur', correct: false},
            {text: '"Wonderwall" by Oasis', correct: true}
        ]
    }
];