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
        question: '"I will not let anything take away what\'s in front of me."',
        answers: [
            {text: '"Someone Like You" by Adele', correct: false},
            {text: '"A Thousand Years" by Christina Perri', correct: true},
            {text: '"Back To December" by Taylor Swift', correct: false},
            {text: '"Say Something" by A Great Big World & Christina Aguilera', correct: false}
        ]
    },
    {
        question: '"We were caught up and lost in all our vices, in your pose as the dust settles around us."',
        answers: [
            {text: '"Fireflies" by Owl City', correct: false},
            {text: '"Counting Stars" by OneRepublic', correct: false},
            {text: '"Radioactive" by Imagine Dragons', correct: false},
            {text: '"Pompeii" by Bastille', correct: true}
        ]
    },
    {
        question: '"Everyone\'s competing for a love they won\'t receive."',
        answers: [
            {text: '"Burn" by Ellie Goulding', correct: false},
            {text: '"Brave" by Sara Bareilles', correct: false},
            {text: '"Team" by Lorde', correct: true},
            {text: '"Bulletproof" by La Roux', correct: false}
        ]
    },
    {
        question: '"Phone\'s blowing up, they\'re ringing my doorbell, I feel the love."',
        answers: [
            {text: '"Chandelier" by Sia', correct: true},
            {text: '"Telephone" by Lady Gaga', correct: false},
            {text: '"Blank Space" by Taylor Swift', correct: false},
            {text: '"Raise Your Glass" by Pink', correct: false}
        ]
    },
    {
        question: '"See how I leave with every piece of you, don\'t underestimate the things that I will do."',
        answers: [
            {text: '"Wrecking Ball" by Miley Cyrus', correct: false},
            {text: '"Ex\'s and Oh\'s" by Elle King', correct: false},
            {text: '"Rolling In the Deep" by Adele', correct: true},
            {text: '"Dark Horse" by Katy Perry', correct: false}
        ]
    },
    {
        question: '"I just thought maybe we could find new ways to fall apart."',
        answers: [
            {text: '"Sweet Nothing" by Calvin Harris feat. Florence Welch', correct: false},
            {text: '"Somebody I Used To Know" by Gotye feat. Kimbra', correct: false},
            {text: '"I Need Your Love" by Calvin Harris feat. Ellie Goulding', correct: false},
            {text: '"We Are Young" by Fun feat. Janelle Monae', correct: true}
        ]
    },
    {
        question: '"Sometimes when I miss you I put those records on."',
        answers: [
            {text: '"The One Who Got Away" by Katy Perry', correct: true},
            {text: '"Summertime Sadness" by Lana Del Rey', correct: false},
            {text: '"Without Me" by Halsey', correct: false},
            {text: '"You Belong With Me" by Taylor Swift', correct: false}
        ]
    },
    {
        question: '"These days of dust which we\'ve known will blow away with this new sun."',
        answers: [
            {text: '"Ho Hey" by The Lumineers', correct: false},
            {text: '"I Will Wait" by Mumford & Sons', correct: true},
            {text: '"Wake Me Up" by Avicii', correct: false},
            {text: '"Let Her Go" by Passenger', correct: false}
        ]
    },
    {
        question: '"In a happy home, I was a king I had a golden throne."',
        answers: [
            {text: '"Safe And Sound" by Capital Cities', correct: false},
            {text: '"Don\'t You Worry Child" by Swedish House Mafia feat. John Martin', correct: true},
            {text: '"Demons" by Imagine Dragons', correct: false},
            {text: '"Riptide" by Vance Joy', correct: false}
        ]
    },
    {
        question: '"You\'re my downfall, you\'re my muse, my worst distraction."',
        answers: [
            {text: '"Just The Way You Are" by Bruno Mars', correct: false},
            {text: '"I\'m Not The Only One" by Sam Smith', correct: false},
            {text: '"Thinking Out Loud" by Ed Sheeran', correct: false},
            {text: '"All Of Me" by John Legend', correct: true}
        ]
    }
];