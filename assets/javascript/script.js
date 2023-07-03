let questionsData;
let highScoresData;
let isDataFetched = false;

const fetchData = async () => {
  try {
    if (isDataFetched) {
      console.log("Data has already been fetched.");
      return;
    }

    const storedQuestions = localStorage.getItem("questions");
    const storedHighScores = localStorage.getItem("highScores");

    if (storedQuestions && storedHighScores) {
      questionsData = JSON.parse(storedQuestions);
      highScoresData = JSON.parse(storedHighScores);
      console.log("Data fetched from localStorage successfully.");
    } else {
      const dataResponse = await fetch(
        "https://meanbean87.github.io/interactive-quiz-website/assets/javascript/data.json"
      );

      const dataObj = await dataResponse.json();

      if (dataObj) {
        questionsData = dataObj.questionsArray;
        localStorage.setItem("questions", JSON.stringify(questionsData));
        highScoresData = dataObj.highScoresArray;
        localStorage.setItem("highScores", JSON.stringify(highScoresData));
        isDataFetched = true;
        console.log("Data fetched from repository successfully.");
      }
    }
  } catch (error) {
    console.log("Error fetching data:", error);
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
let quizRunning = false;
let newHighScore = false;
let highScoreName = "";
let highScoreIndex;
let remainingTime = 0;


// Functions
const startQuiz = async () => {
  welcomeText.innerHTML = "";
  resetButton.addEventListener("click", resetQuiz);
  startButton.setAttribute("style", "display: none;");
  let questionIndex = 0;
  getQuestion(questionIndex);
  quizContainer.setAttribute("style", "display: flex;");
  timer(startingTime);
  let quizRunning = true;

  const submitHandler = () => {
    checkAnswer(selectedAnswer, questionIndex);
    questionIndex++;
    console.log("Question index:", questionIndex);
    console.log("Data length:", questionsData.length);
    if (questionIndex === questionsData.length) {
      endQuiz();
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
  questionText.textContent = questionsData[index].question;
  answerOneBtnLabel.innerHTML = questionsData[index].options[0];
  answerTwoBtnLabel.innerHTML = questionsData[index].options[1];
  answerThreeBtnLabel.textContent = questionsData[index].options[2];
  answerFourBtnLabel.textContent = questionsData[index].options[3];
};

const checkAnswer = (selectedAnswer, questionIndex) => {
  console.log("Question index:", questionIndex);
  console.log("Answer index:", questionsData[questionIndex].answerIndex);
  console.log("Selected answer:", selectedAnswer);
  if (selectedAnswer === questionsData[questionIndex].answerIndex) {
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
        highScoresData[highScoreIndex] = { name: highScoreName, score: score };
        localStorage.setItem("highScores", JSON.stringify(highScoresData));
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
  if (remainingTime < 0) {
    remainingTime = 1;
  }

  console.log("Correct:", correct, typeof correct);
  console.log("Incorrect:", incorrect, typeof incorrect);
  console.log("Remaining time:", remainingTime, typeof remainingTime);
  score =
    Number(Number(correct) - Number(incorrect * 2)) + Number(remainingTime);
  console.log("Score:", score, typeof score);
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

  console.log("High scores displayed");
};

const loadEventListeners = async () => {
  await fetchData();
  if (isDataFetched) {
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
  }
};
