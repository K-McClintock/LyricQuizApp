
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
        grade.innerText = "Legend!"
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
        question: '"No more will my green sea go turn a deeper blue, I could not forsee this thing happening to you."',
        answers: [
            {text: '"White Rabbit" by Jefferson Airplane', correct: false},
            {text: '"Paint It, Black" by The Rolling Stones', correct: true},
            {text: '"Purple Haze" by Jimi Hendrix', correct: false},
            // {text: '"White Room" by Cream', correct: false}
        ]
    },
    {
        question: '"You\'re so young and pretty, but one thing I know is true, you\'ll be dead before your time is due."',
        answers: [
            // {text: '"You Showed Me" by The Turtles', correct: false},
            {text: '"Break On Through" by The Doors', correct: false},
            {text: '"Magic Carpet Ride" by Steppenwolf', correct: false},
            {text: '"We Gotta Get Out Of This Place" by The Animals', correct: true}
        ]
    },
    {
        question: '"I\'ll be with you, darling, soon. I\'ll be with you when the stars start falling."',
        answers: [
            // {text: "\"Sunshine Superman\" by Donovan", correct: false},
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
            // {text: '"One" by Three Dog Night', correct: false}
        ]
    },
    {
        question: '"Why must we say goodbye? Each time we part my heart wants to die."',
        answers: [
            {text: '"You Were On My Mind" by We Five', correct: false},
            // {text: ""Keep Searchin\'" by Del Shannon", correct: false},
            {text: '"Cara Mia" by Jay & The Americans', correct: true},
            {text: '"Time Won\'t Let Me" by The Outsiders', correct: false}
        ]
    },
    {
        question: '"She said\, \'There is no reason\' and the truth is plain to see."',
        answers: [
            {text: '"Easy To Be Hard" by Three Dog Night', correct: false},
            // {text: '"Midnight Confessions" by The Grass Roots', correct: false},
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
            // {text: '\"Come On Down To My Boat\" by Every Mother\'s Son"', correct: false}
        ]
    },
    {
        question: '"Sometimes love hurts and sometime love\'s unkind and sometimes you might feel blue."',
        answers: [
            // {text: '"I Love You" by People', correct: false},
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
            // {text: '"Tired Of Waiting" by The Kinks', correct: false}
        ]
    },
    {
        question: '"Someday I\'m gonna be happy\, but I don\'t know when just now."',
        answers: [
            // {text: '"Help!" by The Beatles', correct: false},
            {text: '"Him Or Me" by Paul Revere and The Raiders', correct: false},
            {text: '"Just A Little" by The Beau Brummels', correct: false},
            {text: '"Lies" by The Knickerbockers', correct: true}
        ]
    }
];