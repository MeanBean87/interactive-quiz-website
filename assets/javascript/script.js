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

// Global Variables
let correct = 0;
let incorrect = 0;
let remainingTime = 120;
let timerInterval;
let questionIndex = 0;
let isAnswerOne = false;
let isAnswerTwo = false;
let isAnswerThree = false;
let isAnswerFour = false;
let selectedAnswer = 0;
let data = JSON.parse(localStorage.getItem("questions"));
let quizRunning = false;

// Functions
const startQuiz = async () => {
  await fetchData();
  resetButton.addEventListener("click", resetQuiz);
  if (quizRunning) {
    return;
  }
  startButton.setAttribute("style", "display: none;");
  clearInterval(timerInterval);
  console.log("Quiz started");
  welcomeText.innerHTML = "";
  quizContainer.setAttribute("style", "display: flex;");
  timer();
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

    checkAnswer(selectedAnswer, remainingTime, questionIndex);
    questionIndex++;
    console.log("DataIndex: " + data.questionsObj.length);
    console.log("Qindex: " + questionIndex);
    console.log(questionIndex);
    if (questionIndex === data.questionsObj.length - 1 || remainingTime === 0) {
      endQuiz();
      quizRunning = false;
      console.log(correct);
      console.log(incorrect);
    }
  }
};

const resetQuiz = () => {
  resetButton.removeEventListener("click", resetQuiz);
  answerOneBtn.removeEventListener("click", answerOne);
  answerTwoBtn.removeEventListener("click", answerTwo);
  answerThreeBtn.removeEventListener("click", answerThree);
  answerFourBtn.removeEventListener("click", answerFour);
  submitBtn.removeEventListener("click", submitAnswer);
  startButton.setAttribute("style", "display: inline-block;");
  welcomeText.innerHTML = "Welcome to the Quiz!";
  quizContainer.setAttribute("style", "display: none;");
  clearInterval(timerInterval);
  console.log("Quiz reset");
  correct = 0;
  incorrect = 0;
  remainingTime = 120;
  questionIndex;
  isAnswerOne = false;
  isAnswerTwo = false;
  isAnswerThree = false;
  isAnswerFour = false;
  selectedAnswer = 0;
  quizRunning = false;
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
  let selectedAnswer = 0;

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
};

const getQuestion = (index) => {
  questionText.textContent = data.questionsObj[index].question;
  answerOneBtnLabel.innerHTML = data.questionsObj[index].options[0];
  answerTwoBtnLabel.innerHTML = data.questionsObj[index].options[1];
  answerThreeBtnLabel.textContent = data.questionsObj[index].options[2];
  answerFourBtnLabel.textContent = data.questionsObj[index].options[3];
};

const checkAnswer = (selectedAnswer, remainingTime, index) => {
  if (selectedAnswer === data.questionsObj[index].answerIndex) {
    console.log("Correct answer");
    correct++;
  } else {
    console.log("Incorrect answer");
    incorrect++;
    remainingTime = remainingTime - 5;
  }
  quizRunning = true;
};

const timer = () => {
  timerInterval = setInterval(function () {
    remainingTime--;
    const formattedTime = timeConverter(remainingTime);
    timerValue.textContent = `Time Left: ${formattedTime}`;
    if (remainingTime === 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
};

const timeConverter = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return `${minutes}:${seconds}`;
};

const endQuiz = () => {
  console.log("Quiz ended");
  clearInterval(timerInterval);
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
submitBtn.addEventListener("click", submitAnswer);

console.log("DataIndex: " + data.questionsObj.length);
console.log("Qindex: " + questionIndex);

//fetchData();
//
//MeanBean87/interactive-quiz-website/assets/javascript/data.json
//https://raw.githubusercontent.com/MeanBean87/interactive-quiz-website/f7dddcd0d2058acdaf99e8661a23fabcd811e2c7/assets/javascript/data.json
