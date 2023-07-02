// Selection Statements
const startButton = document.querySelector(".header-button-start");
const resetButton = document.querySelector(".header-button-reset");
const scoresButton = document.querySelector(".header-button-score");
const questionText = document.querySelector("#question-text");
const timerValue = document.querySelector("#timer-value");
const answerOneBtn = document.querySelector("#answer-one");
const answerOneBtnLabel = document.querySelector(".answer-one-label");
const answerTwoBtn = document.querySelector("#answer-two");
const answerTwoBtnLabel = document.querySelector(".answer-two-label");
const answerThreeBtn = document.querySelector("#answer-three");
const answerThreeBtnLabel = document.querySelector(".answer-three-label");
const answerFourBtn = document.querySelector("#answer-four");
const answerFourBtnLabel = document.querySelector(".answer-four-label");
const submitBtn = document.querySelector(".submit-button");
const quizContainer = document.querySelector(".quiz-container");
const welcomeText = document.querySelector(".welcome-text");

const correctText = document.querySelector(".correct-score-value");
const incorrectText = document.querySelector(".incorrect-score-value");
const remainingTimeText = document.querySelector(".remaining-time-value");
const finalScoreText = document.querySelector(".final-score-value");

// Global Variables
let correct = 0;
let incorrect = 0;
let score = 0;
let startingTime = 10;
let timerInterval;
let selectedAnswer;
let data = JSON.parse(localStorage.getItem("questions"));
let quizRunning = false;

// Functions
const startQuiz = async () => {
  welcomeText.innerHTML = "";
  resetButton.addEventListener("click", resetQuiz);
  startButton.setAttribute("style", "display: none;");
  quizContainer.setAttribute("style", "display: flex;");
  await fetchData();
  timer(startingTime);
  let questionIndex = 0;
  quizRunning = true;

  while (quizRunning) {
    getQuestion(questionIndex);
    await new Promise((resolve) => {
      submitBtn.addEventListener(
        "click",
        () => {
          resolve();
        },
        { once: true }
      );
    });

    checkAnswer(selectedAnswer, startingTime, questionIndex);
    questionIndex++;
    if (questionIndex === data.questionsObj.length - 1 ) {
      resetQuiz(); //
      quizRunning = false;
    }
  }
};

const resetQuiz = () => {
  correct = 0;
  incorrect = 0;
  score = 0;
  startingTime = 10;
  clearInterval(timerInterval);
  location.reload();
};

const showScores = () => {
  console.log("Scores shown");
};

const answerOne = () => {
  selectedAnswer = 0;
};

const answerTwo = () => {
  selectedAnswer = 1;
};

const answerThree = () => {
  selectedAnswer = 2;
};

const answerFour = () => {
  selectedAnswer = 3;
};

const getQuestion = (index) => {
  questionText.textContent = data.questionsObj[index].question;
  answerOneBtnLabel.innerHTML = data.questionsObj[index].options[0];
  answerTwoBtnLabel.innerHTML = data.questionsObj[index].options[1];
  answerThreeBtnLabel.textContent = data.questionsObj[index].options[2];
  answerFourBtnLabel.textContent = data.questionsObj[index].options[3];
};

const checkAnswer = (selectedAnswer, index) => {
  console.log("Answer index:" + data.questionsObj[index].answerIndex);
  console.log("Selected answer: " + selectedAnswer);
  if (selectedAnswer === data.questionsObj[index].answerIndex) {
    console.log("Correct answer");
    correct++;
  } else {
    console.log("Incorrect answer");
    incorrect++;
  }
};

const timer = async (startingTime) => {
  timerInterval = setInterval(function () {
    startingTime--;
    let minutes = Math.floor(startingTime / 60);
    let seconds = startingTime - minutes * 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    let formattedTime = `${minutes}:${seconds}`;
    timerValue.textContent = `Time Left: ${formattedTime}`;
    if (startingTime <= 0) {
      clearInterval(timerInterval);
      resetQuiz();
    }
  }, 1000);
};

const endQuiz = () => {
  console.log("Quiz ended");
  clearInterval(timerInterval);
  calculateScore();
  correctText.textContent = correct;
  incorrectText.textContent = incorrect;
  remainingTimeText.textContent = startingTime;
  finalScoreText.textContent = score;
};

const calculateScore = () => {
  let remainingTime = 0;
  
  if (startingTime > 0) {
    remainingTime = startingTime;
  } else {
    remainingTime = 1;
  }

  score = ((correct - (incorrect * 2)) + remainingTime);
  if (score < 0) {
    score = 0;
  }
};

const fetchData = async () => {
  try {
    const response = await fetch(
      "https://meanbean87.github.io/interactive-quiz-website/assets/javascript/data.json"
    );
    const questions = await response.json();
    data = questions;
    console.log("Fetch was successful.");
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
};

// Event Listeners
startButton.addEventListener("click", startQuiz);
resetButton.addEventListener("click", resetQuiz);
scoresButton.addEventListener("click", showScores);
answerOneBtn.addEventListener("click", answerOne);
answerTwoBtn.addEventListener("click", answerTwo);
answerThreeBtn.addEventListener("click", answerThree);
answerFourBtn.addEventListener("click", answerFour);
