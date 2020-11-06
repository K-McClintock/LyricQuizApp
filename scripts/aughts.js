
const startButton = document.querySelector('#start-btn')
const nextButton = document.querySelector('#next-btn')
const questionContainerElement =document.querySelector('#question-container')
const questionElement = document.querySelector('#question')
const answerButtonsElement = document.querySelector('#answer-buttons')
const decSelectButton = document.querySelector('#dec-select')
const scoreSpan = document.querySelector('.score-span')
const scoreboard = document.querySelector('#scoreboard')
const finalScore = document.querySelector('#final-score')
const grade = document.querySelector('#grade')
const tallyButton = document.querySelector('#tally-btn')
const showBoard = document.querySelector('#show-board')
const tryAgain = document.querySelector('#try-btn')

let shuffledQuestions, currentQuestionIndex

/* start of counter test*/ 
let countRightAnswers = 0

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    answerButtonsElement.classList.remove('no-click')
    currentQuestionIndex++
    setNextQuestion()
})
decSelectButton.addEventListener('click', () => {
    window.location.replace('decades.html');
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
        tallyButton.addEventListener('click', talliedUp);
    }

    /*more counter stuff */
    if (selectedButton.dataset = correct){
        countRightAnswers++;
    }
    /*counter stuff again again */
    scoreboard.innerText = countRightAnswers + ' / 10'
    
    //prevent multiclicking
    answerButtonsElement.classList.add('no-click');

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
    questionContainerElement.classList.add('hide');
    answerButtonsElement.classList.add('hide');
    scoreSpan.classList.toggle('hide')
    tallyButton.classList.add('hide')
    showBoard.classList.remove('hide')
    finalScore.innerText = countRightAnswers + ' / 10';
    if(countRightAnswers == '10'){
        grade.innerText = 'Legend!'
    } else if (countRightAnswers >= '7'){
        grade.innerText = 'Rock Star!'
    } else {
        grade.innerText = 'Roadie'
    }
    decSelectButton.innerText = 'Another decade?'
        decSelectButton.classList.remove('hide');
    tryAgain.innerText = 'Try Again!'
    tryAgain.classList.remove('hide')      

};

const questions = [
    {
        question: '"You took for granted all the times I never let you down."',
        answers: [
            {text: '"The Reason" by Hoobastank', correct: false},
            {text: '"Kryptonite" by 3 Doors Down', correct: true},
            // {text: '" " by ', correct: false},
            {text: '"How You Remind Me" by Nickleback', correct: false}
        ]
    },
    {
        question: '"When your will is broken, when it slips from your hand."',
        answers: [
            // {text: '" " by the ', correct: false},
            {text: '"Bleeding Love" by Leona Lewis', correct: false},
            {text: '"Big Girls Don\'t Cry" by Fergie', correct: false},
            {text: '"Say It Right" by Nelly Furtado', correct: true}
        ]
    },
    {
        question: '"We\'ll have it good, we\'ll have the life we knew we would."',
        answers: [
            {text: '"Chasing Cars" by Snow Patrol', correct: false},
            // {text: '" " by ', correct: false},
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
            // {text: '" " by ', correct: false}
        ]
    },
    {
        question: '"There\'s just too much that time cannot erase."',
        answers: [
            // {text: '" " by ', correct: false},
            {text: '"First Cut Is the Deepest" by Sheryl Crow', correct: false},
            {text: '"My Immortal" by Evanescence', correct: true},
            {text: '"My Happy Ending" by Avril Lavigne', correct: false}
        ]
    },
    {
        question: '"Don\'t you worry what their bitter hearts are gonna say."',
        answers: [
            // {text: '" " by ', correct: false},
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
            // {text: '" " by ', correct: false}
        ]
    },
    {
        question: '"I play it off but I\'m dreaming of you."',
        answers: [
            {text: '"No One" by Alicia Keys', correct: false},
            {text: '"I Try" by Macy Gray', correct: true},
            // {text: '" " by ', correct: false},
            {text: '"My Life Would Suck Without You" by Kelly Clarkson', correct: false}
        ]
    },
    {
        question: '"You\'re part of my entity, here for infinity."',
        answers: [
            {text: '"Crazy in love" by Beyonce feat. Jay-Z', correct: false},
            {text: '"Umbrella" by Rihanna', correct: true},
            // {text: '" " by ', correct: false},
            {text: '"Hung Up" by Madonna', correct: false}
        ]
    },
    {
        question: '"You know that they say that somethings are better left unsaid."',
        answers: [
            {text: '"Bad Day" by Daniel Powter', correct: false},
            // {text: '" " by ', correct: false},
            {text: '"Use Somebody" by Kings of Leon', correct: false},
            {text: '"Cry Me A River" by Justin Timberlake', correct: true}
        ]
    }
];