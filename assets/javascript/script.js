// Selection Statements
const startButton = document.querySelector(".header-button-start");
const resetButton = document.querySelector(".header-button-reset");
const scoresButton = document.querySelector(".header-button-score");
const questionText = document.querySelector("#question-text");
const timerValue = document.querySelector("#timer-value");
const answerOneBtn = document.querySelector("#answer-one");
const answerTwoBtn = document.querySelector("#answer-two");
const answerThreeBtn = document.querySelector("#answer-three");
const answerFourBtn = document.querySelector("#answer-four");
const submitBtn = document.querySelector(".submit-button");

// Global Variables
let correct = 0;
let incorrect = 0;
let remainingTime = 0;
let questionIndex = 0;
let isAnswerOne = false;
let isAnswerTwo = false;
let isAnswerThree = false;
let isAnswerFour = false;
let selectedAnswer = 0;

// Functions
const startQuiz = () => {
  console.log("Quiz started");
};

const resetQuiz = () => {
  console.log("Quiz reset");
};

const showScores = () => {
  console.log("Scores shown");
};

const answerOne = () => {
  isAnswerOne = true;
  isAnswerTwo = false;
  isAnswerThree = false;
  isAnswerFour = false;
  console.log("Answer one selected");
};

const answerTwo = () => {
  isAnswerOne = false;
  isAnswerTwo = true;
  isAnswerThree = false;
  isAnswerFour = false;
  console.log("Answer two selected");
};

const answerThree = () => {
  isAnswerOne = false;
  isAnswerTwo = false;
  isAnswerThree = true;
  isAnswerFour = false;
  console.log("Answer three selected");
};

const answerFour = () => {
  isAnswerOne = false;
  isAnswerTwo = false;
  isAnswerThree = false;
  isAnswerFour = true;
  console.log("Answer four selected");
};

const submitAnswer = () => {
  if (isAnswerOne) {
    selectedAnswer = 1;
  } else if (isAnswerTwo) {
    selectedAnswer = 2;
  } else if (isAnswerThree) {
    selectedAnswer = 3;
  } else if (isAnswerFour) {
    selectedAnswer = 4;
  } else {
    selectedAnswer = 0;
    if (selectedAnswer === 0) {
      console.log("No answer selected");
    }
  }
  console.log("Answer submitted");
  console.log("Selected answer: " + selectedAnswer);
  return selectedAnswer;
};

const checkAnswer = (selectedAnswer, remainingTime) => {
  if (selectedAnswer === 1) {
    console.log("Correct answer");
    correct++;
  } else {
    console.log("Incorrect answer");
    incorrect++;
    remainingTime = remainingTime - 5;
  }
};

const giveQuestion = (questionIndex) => {
    
};

// Event Listeners
startButton.addEventListener("click", startQuiz);
resetButton.addEventListener("click", resetQuiz);
scoresButton.addEventListener("click", showScores);
answerOneBtn.addEventListener("click", answerOne);
answerTwoBtn.addEventListener("click", answerTwo);
answerThreeBtn.addEventListener("click", answerThree);
answerFourBtn.addEventListener("click", answerFour);
submitBtn.addEventListener("click", submitAnswer);
