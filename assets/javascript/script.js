let questionsData;
let highScoresData;
let isDataFetched = false;

const fetchData = async () => {
  try {
    if (isDataFetched) {
      console.log("Data has already been fetched.");
      return;
    }

    let storedQuestions = localStorage.getItem("questions");
    let storedHighScores = localStorage.getItem("highScores");

    if (storedQuestions && storedHighScores) {
      questionsData = JSON.parse(storedQuestions);
      highScoresData = JSON.parse(storedHighScores);
      console.log("Data fetched from localStorage successfully.");
    } else {
      const dataResponse = await fetch(
        "https://meanbean87.github.io/interactive-quiz-website/assets/javascript/data.json"
      );

      const dataObj = await dataResponse.json();

      if (localStorage.getItem("questions") === null) {
        localStorage.setItem(
          "questions",
          JSON.stringify(dataObj.questionsArray)
        );
        storedQuestions = localStorage.getItem("questions");
        questionsData = JSON.parse(storedQuestions);
        console.log(
          "Fetched 'questions' from repository and updated localStorage."
        );
      }

      if (localStorage.getItem("highScores") === null) {
        localStorage.setItem(
          "highScores",
          JSON.stringify(dataObj.highScoresArray)
        );
        storedHighScores = localStorage.getItem("highScores");
        highScoresData = JSON.parse(storedHighScores);
        console.log(
          "Fetched 'highScores' from repository and updated localStorage."
        );
      }
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }
  isDataFetched = true;
};

fetchData();

// Selection Statements
const startButton = document.querySelector(".header-button-start");
const resetButton = document.querySelector(".header-button-reset");
const scoresButton = document.querySelector(".header-button-score");
const playAgainButton = document.getElementById("play-again");
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
const formSubmitBtn = document.querySelector("#form-submit");
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
let startingTime = 181;
let timerInterval;
let selectedAnswer = undefined;
let newHighScore = false;
let highScoreName = "";
let highScoreIndex = -1;
let remainingTime = 0;
let questionIndex = 0;

// Functions

const resetValues = () => {
  correct = 0;
  incorrect = 0;
  score = 0;
  startingTime = 181;
  timerInterval = null;
  selectedAnswer = undefined;
  newHighScore = false;
  highScoreName = "";
  highScoreIndex = -1;
  remainingTime = 0;
  welcomeText.innerHTML = "";
  questionIndex = 0;
  highScoresContainer.setAttribute("style", "display: none;");
  scoreContainer.setAttribute("style", "display: none;");
  enterName.setAttribute("style", "display: none;");
  quizContainer.setAttribute("style", "display: none;");
  startButton.setAttribute("style", "display: inline-block;");
};

const submitHandler = () => {
  checkAnswer(selectedAnswer, questionIndex);
  questionIndex++;
  if (questionIndex === questionsData.length) {
    endQuiz();
  } else {
    getQuestion(questionIndex);
  }
};

const startQuiz = async () => {
  await new Promise((resolve) => {
    resetValues();
    resolve();
  });

  startButton.setAttribute("style", "display: none;");

  getQuestion(questionIndex);
  quizContainer.setAttribute("style", "display: flex;");
  timer(startingTime);
  submitBtn.addEventListener("click", submitHandler);
};

const resetQuiz = () => {
  clearInterval(timerInterval);
  resetValues();
  fetchData();
  startButton.setAttribute("style", "display: inline-block;");
  welcomeText.setAttribute("style", "display: flex;");
  welcomeText.textContent = 'Hit "Start" to begin!!!';
  console.log("Quiz reset");
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
  questionText.textContent = questionsData[index].question;
  answerOneBtnLabel.innerHTML = questionsData[index].options[0];
  answerTwoBtnLabel.innerHTML = questionsData[index].options[1];
  answerThreeBtnLabel.textContent = questionsData[index].options[2];
  answerFourBtnLabel.textContent = questionsData[index].options[3];
};

const checkAnswer = (selectedAnswer, questionIndex) => {
  if (selectedAnswer === questionsData[questionIndex].answerIndex) {
    correct++;
  } else {
    incorrect++;
  }
};

const timer = (startingTime) => {
  timerInterval = setInterval(function () {
    startingTime--;
    remainingTime = startingTime;
    let minutes = Math.floor(startingTime / 60);
    let seconds = startingTime - minutes * 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    let formattedTime = `${minutes}:${seconds}`;
    timerValue.textContent = `Time Left: ${formattedTime}`;
    if (startingTime <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
};

const endQuiz = async () => {
  console.log("Quiz ended");
  clearInterval(timerInterval);
  calculateScore();
  compareScores();
  quizContainer.setAttribute("style", "display: none;");
  welcomeText.setAttribute("style", "display: none;");
  scoreContainer.setAttribute(
    "style",
    "display: flex; flex-direction: column;"
  );
  correctText.textContent = `Correct: ${correct}`;
  incorrectText.textContent = `Incorrect: ${incorrect}`;
  remainingTimeText.textContent = `Remaining Time: ${Number(remainingTime)}`;
  finalScoreText.textContent = `Score: ${Number(score)}`;

  if (newHighScore) {
    enterName.setAttribute("style", "display: flex;");
  
    const promise = new Promise((resolve) => {
      nameText.addEventListener("input", (event) => {
        highScoreName = event.target.value;
      });
  
      formSubmitBtn.addEventListener("click", () => {
        const newScore = { name: highScoreName, score: score };
  
        highScoresData.splice(highScoreIndex, 0, newScore);
  
        if (highScoresData.length > 5) {
          highScoresData.pop();
        }
  
        localStorage.setItem("highScores", JSON.stringify(highScoresData));
        highScoresData = JSON.parse(localStorage.getItem("highScores"));
        resolve();
      });
    });

    await promise;
    nameText.value = "";
    enterName.setAttribute("style", "display: none;");
    scoreContainer.setAttribute("style", "display: none;");
    startButton.setAttribute("style", "display: inline-block;");
    showHighScores();
  }
};

const calculateScore = () => {
  if (remainingTime < 0) {
    remainingTime = 1;
  }
  score = (correct - (incorrect * 4)) + remainingTime;
  console.log("Score:", score);
  if (score < 0) {
    score = 0;
  }
};

const compareScores = () => {
  for (let i = 0; i < highScoresData.length; i++) {
    if (score > Number(highScoresData[i].score)) {
      newHighScore = true;
      highScoreIndex = i;
      break;
    }
  }
};

const showHighScores = () => {
  welcomeText.setAttribute("style", "display: none;");
  scoreContainer.setAttribute("style", "display: none;");
  scoreContainer.setAttribute("style", "display: none;");
  quizContainer.setAttribute("style", "display: none;");

  highScoresContainer.setAttribute("style", "display: flex;");
  let scores = highScoresData;

  if (scores && scores.length >= 5) {
    rankOne.textContent = `1. ${highScoresData[0].name} - ${highScoresData[0].score}`;
    rankTwo.textContent = `2. ${highScoresData[1].name} - ${highScoresData[1].score}`;
    rankThree.textContent = `3. ${highScoresData[2].name} - ${highScoresData[2].score}`;
    rankFour.textContent = `4. ${highScoresData[3].name} - ${highScoresData[3].score}`;
    rankFive.textContent = `5. ${highScoresData[4].name} - ${highScoresData[4].score}`;
  } else {
    console.log("Invalid highScoresData:", scores);
    highScoresContainer.innerHTML = "Invalid highScoresData.";
  }
};

startButton.addEventListener("click", startQuiz);
playAgainButton.addEventListener("click", resetQuiz);
resetButton.addEventListener("click", resetQuiz);
scoresButton.addEventListener("click", showHighScores);
answerOneBtn.addEventListener("click", answerOne);
answerTwoBtn.addEventListener("click", answerTwo);
answerThreeBtn.addEventListener("click", answerThree);
answerFourBtn.addEventListener("click", answerFour);
nameText.addEventListener("input", (event) => {
  highScoreName = event.target.value;
});
