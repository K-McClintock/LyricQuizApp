
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
        question: '"You gave me your word but words for you are lies."',
        answers: [
            {text: '"I Hate Myself For Loving You" by Joan Jett and the Blackhearts', correct: false},
            {text: '"Harden My Heart" by Quarterflash', correct: true},
            // {text: '"The Warrior" by Scandal', correct: false},
            {text: '"Love Is A Battlefield" by Pat Benatar', correct: false}
        ]
    },
    {
        question: '"Hush, my darling, don\'t you cry. Quiet, angel, forget their lies."',
        answers: [
            // {text: '\"Only The Lonely\" by the Motels', correct: false},
            {text: '"Two Of Hearts" by Stacy Q', correct: false},
            {text: '"Eternal Flame" by The Bangles', correct: false},
            {text: '"Our Lips Are Sealed" by The Go-Go\'s', correct: true}
        ]
    },
    {
        question: '"Words are few I have spoken, I could waste a thousand years."',
        answers: [
            {text: '"True" by Spandeau Ballet', correct: false},
            // {text: '"There's Something About You" by Level 42', correct: false},
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
            // {text: '"Tempted" by Squeeze', correct: false}
        ]
    },
    {
        question: '"I\'ve been this way before, but with you I\'ve found the key to open any door."',
        answers: [
            // {text: '"Round and Round" by Ratt', correct: false},
            {text: '"When It\'s Love" by Van Halen', correct: false},
            {text: '"Is This Love" by Whitesnake', correct: true},
            {text: '"Once Bitten, Twice Shy" by Great White', correct: false}
        ]
    },
    {
        question: '"You wanted me so much but I didn\'t get it, how could a fellow be so blind?"',
        answers: [
            // {text: '"Fresh" by Kool & The Gang', correct: false},
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
            // {text: '"Poison Arrow" by ABC', correct: false}
        ]
    },
    {
        question: '"There is a new place where dreams just can\'t come true."',
        answers: [
            {text: '"Make It Real" by The Jets', correct: false},
            {text: '"Foolish Beat" by Debbie Gibson', correct: true},
            // {text: '"Solitaire" by Laura Branigan', correct: false},
            {text: '"Cruel Summer" by Bananarama', correct: false}
        ]
    },
    {
        question: '"It took my heart to shatter in a thousand pieces before I\'d ever drop my pride."',
        answers: [
            {text: '"Don\'t Be Cruel" by Bobby Brown', correct: false},
            {text: '"If It Isn\'t Love" by New Edition', correct: true},
            // {text: '"I Want Her" by Keith Sweat', correct: false},
            {text: '"Dial My Heart" by The Boys', correct: false}
        ]
    },
    {
        question: '"I should\'ve been gone after all your words of steel."',
        answers: [
            {text: '"I Want To Know What Love Is" by Foreigner', correct: false},
            // {text: '"Seperate Ways (Worlds Apart)" by Journey', correct: false},
            {text: '"Heat Of The Moment" by Asia', correct: false},
            {text: '"Oh Sherrie" by Steve Perry', correct: true}
        ]
    }
];