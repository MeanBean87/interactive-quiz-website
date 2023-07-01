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
let remainingTime = 120;
let timerInterval;
let questionIndex = 0;
let isAnswerOne = false;
let isAnswerTwo = false;
let isAnswerThree = false;
let isAnswerFour = false;
let selectedAnswer = 0;
let questions = JSON.parse(localStorage.getItem("questions"));
// Functions
const startQuiz = () => {
  getQuestion(questionIndex);
  timer(remainingTime);
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

const timer = (remainingTime) => {
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

const fetchData = () => {
  fetch("./assets/javascript/data.json")
    .then((response) => response.json())
    .then((questions) => {
      localStorage.setItem("questions", JSON.stringify(questions));
      console.log("Questions stored in local storage");
    })
    .catch((error) => {
      console.error("Error fetching questions:", error);
    });
};

const giveQuestion = (questionIndex) => {
  questionText.textContent = questions[questionIndex].question;
  answerOneBtn.textContent = questions[questionIndex].answerOne;
  answerTwoBtn.textContent = questions[questionIndex].answerTwo;
  answerThreeBtn.textContent = questions[questionIndex].answerThree;
  answerFourBtn.textContent = questions[questionIndex].answerFour;
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

timer(remainingTime);
fetchData();
console.log(questions);
