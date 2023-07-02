let data = null;
let highScores = null;
let isDataFetched = false;

const fetchData = async () => {
  try {
    if (isDataFetched) {
      console.log("Data has already been fetched.");
      return;
    }

    const questionsResponse = await fetch(
      "https://meanbean87.github.io/interactive-quiz-website/assets/javascript/data.json"
    );
    const questionsData = await questionsResponse.json();
    console.log("Questions fetch was successful.");
    data = questionsData;

    const highScoresData = localStorage.getItem("highScores");
    highScores = highScoresData ? JSON.parse(highScoresData) : data.highScores;
    console.log("High scores loaded:", highScores);

    if (!highScoresData) {
      localStorage.setItem("highScores", JSON.stringify(data.highScores));
      console.log("Default high scores stored in localStorage.");
    }

    isDataFetched = true;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchData();

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
const scoreContainer = document.querySelector(".score-container");
const welcomeText = document.querySelector(".welcome-text");
const correctText = document.querySelector(".correct-score-value");
const incorrectText = document.querySelector(".incorrect-score-value");
const remainingTimeText = document.querySelector(".remaining-time-value");
const finalScoreText = document.querySelector(".final-score-value");
const enterName = document.querySelector(".enter-name");
const nameText = document.querySelector(".name-text");
const highScoresContainer = document.querySelector(".high-scores-container");
const rankOne = document.querySelector(".rank-one");
const rankTwo = document.querySelector(".rank-two");
const rankThree = document.querySelector(".rank-three");
const rankFour = document.querySelector(".rank-four");
const rankFive = document.querySelector(".rank-five");

// Global Variables
let correct = 0;
let incorrect = 0;
let score = 0;
let startingTime = 10;
let timerInterval;
let selectedAnswer;
// let data;
// let highScores = JSON.parse(localStorage.getItem("highScores"));
let quizRunning = false;
let newHighScore = false;
let highScoreName = "";
let highScoreIndex;

// Functions
const startQuiz = async () => {
  welcomeText.innerHTML = "";
  resetButton.addEventListener("click", resetQuiz);
  startButton.setAttribute("style", "display: none;");
  quizContainer.setAttribute("style", "display: flex;");
  timer(startingTime);
  let questionIndex = 0;
  let quizRunning = true;

  const submitHandler = () => {
    checkAnswer(selectedAnswer, startingTime, questionIndex);
    questionIndex++;
    if (questionIndex === data.questionsObj.length - 1) {
      clearInterval(timerInterval);
      resetQuiz();
      quizRunning = false;
    }
  };

  submitBtn.addEventListener("click", submitHandler);

  while (quizRunning) {
    getQuestion(questionIndex);
    await new Promise((resolve) => {
      submitBtn.addEventListener("click", resolve, { once: true });
    });
  }

  submitBtn.removeEventListener("click", submitHandler);
};

const resetQuiz = () => {
  correct = 0;
  incorrect = 0;
  score = 0;
  startingTime = 10;
  clearInterval(timerInterval);
  location.reload();
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

const endQuiz = async () => {
  console.log("Quiz ended");
  clearInterval(timerInterval);
  calculateScore();
  compareScores();
  quizContainer.setAttribute("style", "display: none;");
  scoreContainer.setAttribute("style", "display: flex;");
  correctText.textContent = `Correct: ${correct}`;
  incorrectText.textContent = `Incorrect: ${incorrect}`;
  remainingTimeText.textContent = startingTime;
  finalScoreText.textContent = score;

  if (newHighScore) {
    await new Promise((resolve) => {
      submitBtn.addEventListener("click", () => {
        enterName.setAttribute("style", "display: flex;");
        const highScoreName = document.querySelector(".name-text").value;
        highScores[highScoreIndex] = { name: highScoreName, score: score };
        localStorage.setItem("highScores", JSON.stringify(highScores));
        resolve();
      });
    });
  } else {
    submitBtn.addEventListener("click", () => {
      location.reload();
    });
  }
};

const calculateScore = () => {
  let remainingTime = 0;

  if (startingTime > 0) {
    remainingTime = startingTime;
  } else {
    remainingTime = 1;
  }

  score = correct - incorrect * 2 + remainingTime;
  if (score < 0) {
    score = 0;
  }
};

const compareScores = () => {
  for (i = 0; i < highScores.length; i++) {
    if (score > highScores[i].score) {
      newHighScore = true;
      highScoreIndex = i;
      break;
    }
  }
};

const showHighScores = () => {
  highScoresContainer.setAttribute("style", "display: flex;");
  let scores = highScores;

  if (scores && scores.length >= 5) {
    rankOne.textContent = `1. ${highScores[0].name} - ${highScores[0].score}`;
    rankTwo.textContent = `2. ${highScores[1].name} - ${highScores[1].score}`;
    rankThree.textContent = `3. ${highScores[2].name} - ${highScores[2].score}`;
    rankFour.textContent = `4. ${highScores[3].name} - ${highScores[3].score}`;
    rankFive.textContent = `5. ${highScores[4].name} - ${highScores[4].score}`;
  } else {
    console.log("Invalid highScores data:", scores);
    highScoresContainer.innerHTML = "Invalid highScores data.";
  }

  console.log("High scores displayed");
};


// Event Listeners
startButton.addEventListener("click", startQuiz);
resetButton.addEventListener("click", resetQuiz);
scoresButton.addEventListener("click", showHighScores);
answerOneBtn.addEventListener("click", answerOne);
answerTwoBtn.addEventListener("click", answerTwo);
answerThreeBtn.addEventListener("click", answerThree);
answerFourBtn.addEventListener("click", answerFour);
nameText.addEventListener("input", (event) => {
highScoreName = event.target.value;
});

