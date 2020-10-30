
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement =document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const decSelectButton = document.getElementById('dec-select')
const scoreboard = document.getElementById('scoreboard')
const finalScore = document.getElementById('final-score')
const grade = document.getElementById('grade')
const tallyButton = document.getElementById('tally-btn')
const showBoard = document.getElementById('show-board')
const tryAgain = document.getElementById('try-btn')

let shuffledQuestions, currentQuestionIndex

/* start of counter test*/ 
let countRightAnswers = 0

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    document.getElementById('answer-buttons').classList.remove('no-click')
    currentQuestionIndex++
    setNextQuestion()
})
decSelectButton.addEventListener('click', () => {
    window.location.replace("decades.html");
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
        tallyButton.addEventListener("click", talliedUp);
    }

    /*more counter stuff */
    if (selectedButton.dataset = correct){
        countRightAnswers++;
    }
    /*counter stuff again again */
    scoreboard.innerText = countRightAnswers + " / 10"
    
    //prevent multiclicking
    document.getElementById('answer-buttons').classList.add('no-click');

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
    questionContainerElement.classList.add("hide");
    answerButtonsElement.classList.add("hide");
    tallyButton.classList.add("hide")
    showBoard.classList.remove("hide")
    finalScore.innerText = countRightAnswers + " / 10";
    if(countRightAnswers == "10"){
        grade.innerText = "Legend!"
    } else if (countRightAnswers >= "7"){
        grade.innerText = "Rock Star!"
    } else {
        grade.innerText = "Roadie"
    }
    decSelectButton.innerText = 'Another decade?'
        decSelectButton.classList.remove('hide');
    tryAgain.innerText = 'Try Again!'
    tryAgain.classList.remove('hide')      

};

const questions = [
    {
        question: "\"I tried so hard to cleanse these regrets, my angel wings were bruised and restrained.\"",
        answers: [
            {text: "\"Heart-shaped Box\" by Nirvana", correct: false},
            {text: "\"Today\" by The Smashing Pumpkins", correct: true},
            {text: "\"Fell On Black Days\" by Soundgarden", correct: false},
            // {text: "\"Alive\" by Pearl Jam", correct: false}
        ]
    },
    {
        question: "\"I go about my business, I\'m doing fine, besides what would I say if I had you on the line.\"",
        answers: [
            {text: "\"If It Makes You Happy\" by Sheryl Crow", correct: false},
            // {text: "\"Adia\" by Sarah McLachlan", correct: false},
            {text: "\"Linger\" by The Cranberries", correct: false},
            {text: "\"You Were Meant For Me\" by Jewel", correct: true}
        ]
    },
    {
        question: "\"Words, playing me deja vu, like a radio tune I swear I\'ve heard before.\"",
        answers: [
            // {text: "\"How\'s It Going To Be\" by Third Eye Blind", correct: false},
            {text: "\"Barely Breathing\" by Duncan Sheik", correct: false},
            {text: "\"Come Undone\" by Duran Duran", correct: true},
            {text: "\"Iris\" by the Goo Goo Dolls", correct: false}
        ]
    },
    {
        question: "\"It\'s funny how we feel so much but we cannot say a word.\"",
        answers: [
            {text: "\"I Will Remember You\" by Sarah McLachlan", correct: true},
            {text: "\"Stay \(I Missed You\)\" by Lisa Loeb", correct: false},
            // {text: "\"Who Will Save Your Souls\" by Jewel", correct: false},
            {text: "\"Stay\" by Shakespears Sister", correct: false}
        ]
    },
    {
        question: "\"The stars above are watching you, they know my heart and speak to yours like only lovers do.\"",
        answers: [
            {text: "\"Angel of Mine\" by Monica", correct: false},
            {text: "\"Baby-Baby-Baby\'\" by TLC", correct: false},
            {text: "\"Don\'t Let Go \(Love\)\" by En Vogue", correct: true},
            // {text: "\"Weak\" by SWV", correct: false}
        ]
    },
    {
        question: "\"I seen the sun up ahead at the county line bridge, sayin\' all there\'s good and nothingness is dead.\"",
        answers: [
            // {text: "\"Mr. Jones\" by Counting Crows", correct: false},
            {text: "\"Hey Jealousy\" by Gin Blossoms", correct: false},
            {text: "\"Inside Out\" by Eve 6", correct: false},
            {text: "\"One Headlight\" by The Wallflowers", correct: true}
        ]
    },
    // {
    //     question: "\"Dying for a chance just to touch a hand or a moment to share.\"",
    //     answers: [
    //         {text: "\"What Is Love?\" by Haddaway", correct: false},
    //         {text: "\"Another Night\" by Real McCoy", correct: false},
    //         {text: "\"Rhythm Is A Dancer\" by Snap!", correct: false},
    //         {text: "\"Mr. Vain\" by Culture Beat", correct: true}
    //     ]
    // },
    {
        question: "\"I never dreamed I\'d love somebody like you, and I never dreamed I\'d lose somebody like you.\"",
        answers: [
            {text: "\"Wicked Game\" by Chris Isaak", correct: true},
            // {text: "\"More Than Words\" by Extreme", correct: false},
            {text: "\"Right Here Waiting\" by Richard Marx", correct: false},
            {text: "\"Have You Ever Really Loved A Woman?\" by Bryan Adams", correct: false}
        ]
    },
    {
        question: "\"She\'s seen her share of devils in this angel town.\"",
        answers: [
            {text: "\"Run Around\" by Blues Traveller", correct: false},
            {text: "\"Lullaby\" by Shawn Mullins", correct: true},
            {text: "\"Life Is A Highway\" by Tom Cochrane", correct: false},
            // {text: "\"Last Dance With Mary Jane\" by Tom Petty", correct: false}
        ]
    },
    {
        question: "\"A million poppies gonna make me sleep, just one rose it knows your name.\"",
        answers: [
            {text: "\"Sick Of Myself\" by Matthew Sweet", correct: false},
            {text: "\"Low\" by Cracker", correct: true},
            {text: "\"All I Want\" by Toad the Wet Sprocket", correct: false},
            // {text: "\"Runaway Train\" by Soul Asylum", correct: false}
        ]
    },
    {
        question: "\"Backbeat, the word was on the street that the fire in your heart is out.\"",
        answers: [
            {text: "\"Bittersweet Symphony\" by The Verve", correct: false},
            {text: "\"Alright\" by Supergrass", correct: false},
            // {text: "\"Girls \& Boys\" by Blur", correct: false},
            {text: "\"Wonderwall\" by Oasis", correct: true}
        ]
    }
];