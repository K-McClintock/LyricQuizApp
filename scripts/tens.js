
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
        question: '"I will not let anything take away what\'s in front of me."',
        answers: [
            {text: '"Someone Like You" by Adele', correct: false},
            {text: '"A Thousand Years" by Christina Perri', correct: true},
            // {text: '" " by ', correct: false},
            {text: '"Say Something" by A Great Big World & Christina Aguilera', correct: false}
        ]
    },
    {
        question: '"We were caught up and lost in all our vices, in your pose as the dust settles around us."',
        answers: [
            // {text: '" " by the ', correct: false},
            {text: '"Counting Stars" by OneRepublic', correct: false},
            {text: '"Radioactive" by Imagine Dragons', correct: false},
            {text: '"Pompeii" by Bastille', correct: true}
        ]
    },
    {
        question: '"Everyone\'s competing for a love they won\'t receive."',
        answers: [
            {text: '"Burn" by Ellie Goulding', correct: false},
            // {text: '" " by ', correct: false},
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
            // {text: '" " by ', correct: false}
        ]
    },
    {
        question: '"See how I leave with every piece of you, don\'t underestimate the things that I will do."',
        answers: [
            // {text: '" " by ', correct: false},
            {text: '"Ex\'s and Oh\'s" by Elle King', correct: false},
            {text: '"Rolling In the Deep" by Adele', correct: true},
            {text: '"Dark Horse" by Katy Perry', correct: false}
        ]
    },
    {
        question: '"I just thought maybe we could find new ways to fall apart."',
        answers: [
            // {text: '" " by ', correct: false},
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
            // {text: '" " by ', correct: false}
        ]
    },
    {
        question: '"These days of dust which we\'ve known will blow away with this new sun."',
        answers: [
            {text: '"Ho Hey" by The Lumineers', correct: false},
            {text: '"I Will Wait" by Mumford & Sons', correct: true},
            // {text: '" " by ', correct: false},
            {text: '"Ler Her Go" by Passenger', correct: false}
        ]
    },
    {
        question: '"In a happy home, I was a king I had a golden throne."',
        answers: [
            {text: '"Safe And Sound" by Capital Cities', correct: false},
            {text: '"Don\'t You Worry Child" by Swedish House Mafia feat. John Martin', correct: true},
            // {text: '" " by ', correct: false},
            {text: '"Riptide" by Vance Joy', correct: false}
        ]
    },
    {
        question: '"You\'re my downfall, you\'re my muse, my worst distraction."',
        answers: [
            {text: '"Just The Way You Are" by Bruno Mars', correct: false},
            // {text: '" " by ', correct: false},
            {text: '"Thinking Out Loud" by Ed Sheeran', correct: false},
            {text: '"All Of Me" by John Legend', correct: true}
        ]
    }
];