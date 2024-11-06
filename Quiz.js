const questions = [
    {
        question:"Who is the ceo of google?",
        answers:[
            {text:'Sundar Pichai', correct:true},
            {text:'Satya Nadella', correct:false},
            {text:'Elon Musk', correct:false},
            {text:'Steve Jobs', correct:false}
        ]
    },
    {
        question:'Who is the ceo Microsoft?',
        answers:[
            {text:'Elon Musk',correct:false},
            {text:'Steve Jobs', correct:false},
            {text:'Satya Nadella', correct:true},
            {text:'Sundar Pichai', correct:false}
        ]
    }
];
const questionElement = document.getElementById('question');
const answersButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
   currentQuestionIndex = 0;
   score = 0;
   nextButton.innertHTML = 0;
   showQuestion();
}
function showQuestion(){
    resetState();
       let currentQuestion = questions[currentQuestionIndex];
       let questionNo = currentQuestionIndex + 1;
       questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
       currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answersButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
       })
}
function resetState(){
    nextButton.style.display="none";
    while(answersButtons.firstChild){
        answersButtons.removeChild(answersButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }else{
        selectedBtn.classList.add('incorrect')
    }
    Array.from(answersButtons.children).forEach(button =>{
        if(button.dataset.correct === 'true'){
            button.classList.add('correct')
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}`;
    nextButton.innerHTML="play again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    resetState();
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }

})

startQuiz();