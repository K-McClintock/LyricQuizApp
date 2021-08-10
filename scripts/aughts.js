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
        question: '"You took for granted all the times I never let you down."',
        answers: [
            {text: '"The Reason" by Hoobastank', correct: false},
            {text: '"Kryptonite" by 3 Doors Down', correct: true},
            {text: '"Higher" by Creed', correct: false},
            {text: '"How You Remind Me" by Nickleback', correct: false}
        ]
    },
    {
        question: '"When your will is broken, when it slips from your hand."',
        answers: [
            {text: '"Just Like A Pill" by Pink', correct: false},
            {text: '"Bleeding Love" by Leona Lewis', correct: false},
            {text: '"Big Girls Don\'t Cry" by Fergie', correct: false},
            {text: '"Say It Right" by Nelly Furtado', correct: true}
        ]
    },
    {
        question: '"We\'ll have it good, we\'ll have the life we knew we would."',
        answers: [
            {text: '"Chasing Cars" by Snow Patrol', correct: false},
            {text: '"Wonderful" by Everclear', correct: false},
            {text: '"Hey There Delilah" by Plain White T\'s', correct: true},
            {text: '"Only One" by Yellowcard', correct: false}
        ]
    },
    {
        question: '"How do we wind up this way, watchin\' our mouths for the words that we say?"',
        answers: [
            {text: '"Absolutely (Story of a Girl)" by Nine Days', correct: true},
            {text: '"Everything You Want" by Vertical Horizon', correct: false},
            {text: '"Wherever You Will Go" by The Calling', correct: false},
            {text: '"Bent" by Matchbox 20', correct: false}
        ]
    },
    {
        question: '"There\'s just too much that time cannot erase."',
        answers: [
            {text: '"Don\'t Know Why" by Norah Jones', correct: false},
            {text: '"First Cut Is the Deepest" by Sheryl Crow', correct: false},
            {text: '"My Immortal" by Evanescence', correct: true},
            {text: '"My Happy Ending" by Avril Lavigne', correct: false}
        ]
    },
    {
        question: '"Don\'t you worry what their bitter hearts are gonna say."',
        answers: [
            {text: '"Hanging By A Moment" by Lifehouse', correct: false},
            {text: '"Blurry" by Puddle of Mudd', correct: false},
            {text: '"Drive" by Incubus', correct: false},
            {text: '"The Middle" by Jimmy Eat World', correct: true}
        ]
    },
    {
        question: '"Love is whatever you make it to be, sunshine instead of this cold lonely sea."',
        answers: [
            {text: '"Game of Love" by Santana feat. Michelle Branch', correct: true},
            {text: '"Smooth" by Santana feat. Rob Thomas', correct: false},
            {text: '"Why Don\'t You & I" by Santana feat. Chad Kroeger', correct: false},
            {text: '"Maria Maria" by Santana feat. The Product G&B', correct: false}
        ]
    },
    {
        question: '"I play it off but I\'m dreaming of you."',
        answers: [
            {text: '"No One" by Alicia Keys', correct: false},
            {text: '"I Try" by Macy Gray', correct: true},
            {text: '"A Thousand Miles" by Vanessa Carlton', correct: false},
            {text: '"My Life Would Suck Without You" by Kelly Clarkson', correct: false}
        ]
    },
    {
        question: '"You\'re part of my entity, here for infinity."',
        answers: [
            {text: '"All For You" by Janet Jackson', correct: false},
            {text: '"Umbrella" by Rihanna', correct: true},
            {text: '"I\'m Like A Bird" by Nelly Furtado', correct: false},
            {text: '"Hung Up" by Madonna', correct: false}
        ]
    },
    {
        question: '"You know that they say that somethings are better left unsaid."',
        answers: [
            {text: '"Bad Day" by Daniel Powter', correct: false},
            {text: '"Bye Bye Bye" by \'N Sync', correct: false},
            {text: '"Use Somebody" by Kings of Leon', correct: false},
            {text: '"Cry Me A River" by Justin Timberlake', correct: true}
        ]
    }
];