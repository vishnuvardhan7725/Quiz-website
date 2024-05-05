let quizData =[
    {
        question: "What is the fullform of HTML?",
        options: ["Hyper Text Markup Language", "High Text Markup Language", "Hyper Testing Markup Language", "Hyper Text Markdown Language"],
        correct: "Hyper Text Markup Language",
    },
    {
        question: "What is the fullform of CSS?",
        options: ["Correct Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Cascading Style Shorts"],
        correct: "Cascading Style Sheets",
    },
    {
        question: "Who invented computer?",
        options: ["MarkZukerberg", "obama", "Charles Babbege", "Iron man"],
        correct: "Charles Babbege",
    },
    {
        question: "Which one of the following language is related to the webdevelopment?",
        options: ["c", "c++", "python", "JavaScript"],
        correct: "JavaScript",
    },
    {
        question: "Which platform supports practicing webdevelopment projects",
        options: ["Youtube", "Instagram", "Whatsapp", "Visual Studio Code"],
        correct: "Visual Studio Code",
    },
];

const quizContainer = document.querySelector(".quiz-container");
const question = document.querySelector(".quiz-container .question");
const options = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");
const startBtnContainer = document.querySelector(".start-btn-container");
const startBtn = document.querySelector(".start-btn-container .start-btn");


let questionNumber =0;
let score= 0;
const MAX_QUESTIONS = 5;
let timerInterval;

const shuffleArray = array =>  {
    return array.slice().sort(() => Math.random()-0.5);
};
quizData = shuffleArray(quizData);

const resetLocalstorage = () => {
    for(i=0;i<MAX_QUESTIONS;i++){
        localStorage.removeItem(`userAnswer_${i}`);
    }
};

resetLocalstorage();
const checkAnswer = (e) => {
    let userAnswer = e.target.textContent;
    if(userAnswer === quizData[questionNumber].correct){
           score++;
           e.target.classList.add("correct");
    }else{
        e.target.classList.add("incorrect");
    }

    localStorage.setItem(`userAnswer_${questionNumber}`, userAnswer);
    let allOptions = document.querySelectorAll(".quiz-container .option")
    allOptions.forEach(o => {
        o.classList.add("disabled");
    })
};
 
const createQuestion = () =>{
    clearInterval(timerInterval);
    let secondsLeft = 9;
    const timerDisplay= document.querySelector(".quiz-container .timer");
    timerDisplay.classList.remove("danger");
    timerDisplay.textContent = `Timer Left: 10 seconds`;

    timerInterval= setInterval(() => {
        timerDisplay.textContent =`Time Left: ${secondsLeft.toString().padStart(2,0)} seconds`;
        secondsLeft--;
        if(secondsLeft < 3){
            timerDisplay.classList.add("danger");
        }

        if(secondsLeft < 0){
            clearInterval(timerInterval);
            displayNextQuestion();
        }
    }, 1000);
    options.innerHTML ="";
  question.innerHTML = `<span class='question-number'>${questionNumber + 1}/${MAX_QUESTIONS}</span>${quizData[questionNumber].question}`;

  const shuffledOptions = shuffleArray(quizData[questionNumber].options);

  shuffledOptions.forEach((o) => {
    const option = document.createElement("button");
    option.classList.add("option");
    option.innerHTML = o;
    option.addEventListener("click", (e) => {
        checkAnswer(e);
    });
    options.appendChild(option);
  });
};
const retakeQuiz = () => {
    questionNumber = 0;
    score=0;
    quizData=shuffleArray(quizData);
    resetLocalstorage();
    createQuestion();
    quizResult.style.display="none";
    quizContainer.style.display = "block";
}
const displayQuizResult = () => {
  quizResult.style.display = "flex";
  quizContainer.style.display="none";
  quizResult.innerHTML="";

  const resultHeading =document.createElement("h2");
  resultHeading.innerHTML = `You have scored ${score} out of ${MAX_QUESTIONS}.`;
  quizResult.appendChild(resultHeading);

  for (let i = 0; i<MAX_QUESTIONS ; i++){
    const resultItem = document.createElement("div");
    resultItem.classList.add("question-container");
    const userAnswer = localStorage.getItem(`userAnswer_${i}`)
    const correctAnswer=quizData[i].correct;

    let answeredCorrectly = userAnswer === correctAnswer;

    if(!answeredCorrectly){
        resultItem.classList.add("incorrect");
    }

    resultItem.innerHTML = `<div class="question">Question ${i + 1}: ${quizData[i].question}</div>
    <div class="user-answer">Your answer: ${userAnswer || "Not Answered"}</div>
    <div class="correct-answer">Correct answer:${correctAnswer}</div>`;

    quizResult.appendChild(resultItem);
  }

  const retakeBtn = document.createElement("button");
  retakeBtn.classList.add("retake-btn");
  retakeBtn.innerHTML = `Retake Quiz`;
  retakeBtn.addEventListener("click", retakeQuiz);
  quizResult.appendChild(retakeBtn);
};



const displayNextQuestion = () => {
  if(questionNumber >= MAX_QUESTIONS - 1){
    displayQuizResult();
    return;
  }
   questionNumber++;
   createQuestion();
};

nextBtn.addEventListener("click", displayNextQuestion);
startBtn.addEventListener("click", () => {
    startBtnContainer.style.display="none";
    quizContainer.style.display="block";
    createQuestion();
});