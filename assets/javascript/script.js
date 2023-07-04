// Declares the variables that will be used to store the questions and high scores data
let questionsData;
let highScoresData;
let isDataFetched = false;

// Fetches the questions and high scores data from the repository and stores it in localStorage
// If the data has already been fetched, it will be used from localStorage instead of being fetched again.
const fetchData = async () => {
  try {
    if (isDataFetched) {
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

// Calls the fetchData function
fetchData();

// Selection Statements
const startButton = document.querySelector(".header-button-start");
const resetButton = document.querySelector(".header-button-reset");
const scoresButton = document.querySelector(".header-button-score");
const playAgainButton = document.getElementById("retry");
const questionText = document.querySelector("#question-text");
const timerValue = document.querySelector("#timer-value");
const answerOneBtn = document.getElementById("answer-one");
const answerTwoBtn = document.getElementById("answer-two");
const answerThreeBtn = document.getElementById("answer-three");
const answerFourBtn = document.getElementById("answer-four");
const resultText = document.getElementById("result");
const nextBtn = document.querySelector(".next-button");
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

// Starts the quiz
const startQuiz = () => {
  resetValues();
  fetchData();
  welcomeText.innerHTML = "";
  startButton.setAttribute("style", "display: none;");
  getQuestion(questionIndex);
  quizContainer.setAttribute("style", "display: flex;");
  timer(startingTime);
};

// Resets the quiz
const resetQuiz = () => {
  clearInterval(timerInterval);
  fetchData();
  resetValues();
};

// Sets all global variables and styles to their default values
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
  questionIndex = 0;
  resultText.textContent = "";
  highScoresContainer.setAttribute("style", "display: none;");
  scoreContainer.setAttribute("style", "display: none;");
  enterName.setAttribute("style", "display: none;");
  quizContainer.setAttribute("style", "display: none;");
  startButton.setAttribute("style", "display: inline-block;");
  welcomeText.setAttribute("style", "display: flex;");
  welcomeText.textContent = 'Hit "Start" to begin!!!';
  nextBtn.removeEventListener("click", nextQuestionHandler);
  removeClassFromElements("correct");
  removeClassFromElements("incorrect");
};

// Removes a class from all elements with the specified class name
const removeClassFromElements = (className) => {
  const elements = document.getElementsByClassName(className);
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove(className);
  }
};

// Handles the next button click event during the quiz
const nextQuestionHandler = () => {
  resultText.textContent = "";
  removeClassFromElements("correct");
  removeClassFromElements("incorrect");
  nextBtn.removeEventListener("click", nextQuestionHandler);
  questionIndex++;
  if (questionIndex === questionsData.length) {
    endQuiz();
  } else {
    getQuestion(questionIndex);
  }
};

// Sets the selectedAnswer variable to the index of the selected answer
const answerOne = (event) => {
  event.preventDefault();
  disableButtons();
  selectedAnswer = 0;
  checkAnswer(selectedAnswer, questionIndex);
};

const answerTwo = (event) => {
  event.preventDefault();
  disableButtons();
  selectedAnswer = 1;
  checkAnswer(selectedAnswer, questionIndex);
}

const answerThree = (event) => {
  event.preventDefault();
  disableButtons();
  selectedAnswer = 2;
  checkAnswer(selectedAnswer, questionIndex);
};

const answerFour = (event) => {
  event.preventDefault();
  disableButtons();
  selectedAnswer = 3;
  checkAnswer(selectedAnswer, questionIndex);
};

// Starts the timer and displays the time remaining on the page
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

// Disables the answer buttons and sets their pointer-events style to none
const disableButtons = () => {
  answerOneBtn.disabled = true;
  answerOneBtn.setAttribute("style", "pointer-events: none;");
  answerTwoBtn.disabled = true;
  answerTwoBtn.setAttribute("style", "pointer-events: none;");
  answerThreeBtn.disabled = true;
  answerThreeBtn.setAttribute("style", "pointer-events: none;");
  answerFourBtn.disabled = true;
  answerFourBtn.setAttribute("style", "pointer-events: none;");
};

// Enables the answer buttons and sets their pointer-events style to auto
const enableButtons = () => {
  answerOneBtn.disabled = false;
  answerOneBtn.setAttribute("style", "pointer-events: auto;");
  answerTwoBtn.disabled = false;
  answerTwoBtn.setAttribute("style", "pointer-events: auto;");
  answerThreeBtn.disabled = false;
  answerThreeBtn.setAttribute("style", "pointer-events: auto;");
  answerFourBtn.disabled = false;
  answerFourBtn.setAttribute("style", "pointer-events: auto;");
};

// Gets the question and answer options from the questionsData array and displays them on the page
const getQuestion = (index) => {
  questionText.textContent = questionsData[index].question;
  answerOneBtn.textContent = questionsData[index].options[0];
  answerTwoBtn.textContent = questionsData[index].options[1];
  answerThreeBtn.textContent = questionsData[index].options[2];
  answerFourBtn.textContent = questionsData[index].options[3];
  enableButtons();
};

// Checks the selected answer against the correct answer and increments the correct or incorrect variables accordingly
const checkAnswer = (selectedAnswer, questionIndex) => {
  const correctAnswerIndex = questionsData[questionIndex].answerIndex;
  const answerButtons = [
    answerOneBtn,
    answerTwoBtn,
    answerThreeBtn,
    answerFourBtn,
  ];

  if (selectedAnswer === correctAnswerIndex) {
    correct++;
    answerButtons[selectedAnswer].classList.add("correct");
    resultText.textContent = "Correct!";
    resultText.setAttribute("style", "color: var(--color-success);");
  } else {
    incorrect++;
    answerButtons[selectedAnswer].classList.add("incorrect");
    answerButtons[correctAnswerIndex].classList.add("correct");
    resultText.textContent = "Incorrect!";
    resultText.setAttribute("style", "color: var(--color-error);");
  }

  nextBtn.addEventListener("click", nextQuestionHandler);

  if (questionIndex + 1 === questionsData.length) {
    endQuiz();
  }
};

// Ends the quiz and displays the score on the page
const endQuiz = () => {
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
    addNewHighScore();
  }
};

// Calculates the score based on the number of correct and incorrect answers and the remaining time
const calculateScore = () => {
  if (correct <= incorrect) {
    score = correct * 5;
    if (score < 0) {
      score = 0;
    }
  } else {
    score = correct - incorrect + remainingTime;
  }
};

// Compares the score to the high scores and determines if it is a new high score
const compareScores = () => {
  for (let i = 0; i < highScoresData.length; i++) {
    if (score > Number(highScoresData[i].score)) {
      newHighScore = true;
      highScoreIndex = i;
      break;
    }
  }
};

// Adds a new high score to the high scores array and updates localStorage
const addNewHighScore = () => {
  enterName.setAttribute("style", "display: flex;");
  nameText.addEventListener("input", (event) => {
    highScoreName = event.target.value;
  });

  formSubmitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const newScore = { name: highScoreName, score: score };

    highScoresData.splice(highScoreIndex, 0, newScore);

    if (highScoresData.length > 5) {
      highScoresData.pop();
    }
    localStorage.setItem("highScores", JSON.stringify(highScoresData));
    highScoresData = JSON.parse(localStorage.getItem("highScores"));
    nameText.value = "";
    enterName.setAttribute("style", "display: none;");
    scoreContainer.setAttribute("style", "display: none;");
    startButton.setAttribute("style", "display: inline-block;");
    showHighScores();
  });
  enterName.setAttribute("style", "display: flex;");
};

// Displays the high scores on the page
const showHighScores = () => {
  welcomeText.setAttribute("style", "display: none;");
  scoreContainer.setAttribute("style", "display: none;");
  scoreContainer.setAttribute("style", "display: none;");
  quizContainer.setAttribute("style", "display: none;");
  startButton.setAttribute("style", "display: inline-block;");

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
  clearInterval(timerInterval);
};

// Event Listeners
startButton.addEventListener("click", startQuiz);
playAgainButton.addEventListener("click", resetQuiz);
resetButton.addEventListener("click", resetQuiz);
scoresButton.addEventListener("click", showHighScores);
answerOneBtn.addEventListener("mousedown", answerOne);
answerOneBtn.addEventListener("touchstart", answerOne);
answerTwoBtn.addEventListener("mousedown", answerTwo);
answerTwoBtn.addEventListener("touchstart", answerTwo);
answerThreeBtn.addEventListener("mousedown", answerThree);
answerThreeBtn.addEventListener("touchstart", answerThree);
answerFourBtn.addEventListener("mousedown", answerFour);
answerFourBtn.addEventListener("touchstart", answerFour);
nameText.addEventListener("input", (event) => {
  highScoreName = event.target.value;
});
