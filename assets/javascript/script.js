// Questions and High Scores initial content.
let questionsData = [
  {
    question: "What is JavaScript?",
    options: [
      "A programming language",
      "A markup language",
      "A styling language",
      "A database query language",
    ],
    answerIndex: 0,
  },
  {
    question: "Which of the following is not a JavaScript data type?",
    options: ["String", "Boolean", "Number", "Float"],
    answerIndex: 3,
  },
  {
    question: "What is the purpose of the 'typeof' operator in JavaScript?",
    options: [
      "To check if a variable is defined",
      "To determine the type of a value",
      "To convert a value to a specific type",
      "To declare a new variable",
    ],
    answerIndex: 1,
  },
  {
    question: "What is the result of the expression '3' + 2 in JavaScript?",
    options: ["5", "32", "7", "Undefined"],
    answerIndex: 1,
  },
  {
    question: "Which of the following is not a JavaScript framework?",
    options: ["React", "Angular", "Vue", "Java"],
    answerIndex: 3,
  },
  {
    question: "What does the 'NaN' value represent in JavaScript?",
    options: [
      "Not a Null",
      "No Answer",
      "Not a Number",
      "Negative Absolute Number",
    ],
    answerIndex: 2,
  },
  {
    question: "What is the correct way to comment a single line in JavaScript?",
    options: [
      "// This is a comment",
      "/* This is a comment */",
      "<!-- This is a comment -->",
      "# This is a comment",
    ],
    answerIndex: 0,
  },
  {
    question:
      "What is the output of the following code?\n\nconsole.log(typeof([]));",
    options: ["Object", "Array", "Undefined", "String"],
    answerIndex: 0,
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "let", "const", "def"],
    answerIndex: 0,
  },
  {
    question:
      "What is the purpose of the 'querySelector' method in JavaScript?",
    options: [
      "To add a class to an element",
      "To select elements using CSS selectors",
      "To create a new HTML element",
      "To change the style of an element",
    ],
    answerIndex: 1,
  },
  {
    question: "Which operator is used to concatenate strings in JavaScript?",
    options: ["+", "-", "*", "/"],
    answerIndex: 0,
  },
  {
    question:
      "What is the output of the following code?\n\nconsole.log(2 + '2');",
    options: ["4", "22", "NaN", "Undefined"],
    answerIndex: 1,
  },
  {
    question: "What is the purpose of the 'push' method in JavaScript arrays?",
    options: [
      "To remove the last element",
      "To add elements to the beginning",
      "To sort the array",
      "To add elements to the end",
    ],
    answerIndex: 3,
  },
  {
    question: "Which function is used to parse JSON in JavaScript?",
    options: [
      "JSON.stringify()",
      "JSON.parse()",
      "JSON.stringifyify()",
      "JSON.parsify()",
    ],
    answerIndex: 1,
  },
  {
    question: "What does the '=== ' operator do in JavaScript?",
    options: [
      "Compares two values for equality, allowing type coercion",
      "Compares two values for equality, without type coercion",
      "Assigns a value to a variable",
      "Performs a strict comparison of two values",
    ],
    answerIndex: 3,
  },
  {
    question:
      "Which method is used to remove the last element from an array in JavaScript?",
    options: ["pop()", "shift()", "unshift()", "splice()"],
    answerIndex: 0,
  },
  {
    question:
      "What is the purpose of the 'addEventListener' method in JavaScript?",
    options: [
      "To create a new event",
      "To add a listener to an event",
      "To trigger an event",
      "To remove an event listener",
    ],
    answerIndex: 1,
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["//", "/* */", "<!-- -->", "##"],
    answerIndex: 0,
  },
  {
    question:
      "What is the result of the expression 'null == undefined' in JavaScript?",
    options: ["true", "false", "NaN", "Undefined"],
    answerIndex: 0,
  },
  {
    question:
      "What is the purpose of the 'querySelectorAll' method in JavaScript?",
    options: [
      "To add multiple classes to an element",
      "To select multiple elements using CSS selectors",
      "To select the first matching element",
      "To add a listener to multiple events",
    ],
    answerIndex: 1,
  },
];

let highScoresData = [
  {
    name: "Woody Baldelson",
    score: 5,
  },
  {
    name: "Swan Ronson",
    score: 4,
  },
  {
    name: "Parah Salin",
    score: 3,
  },
  {
    name: "Ruff Markalo",
    score: 2,
  },
  {
    name: "Ellen Book",
    score: 1,
  },
];

const fetchData = async () => {
  try {
    if (localStorage.getItem("questions") === null) {
      localStorage.setItem("questions", JSON.stringify(questionsData));
      console.log("Fetched 'questions' and updated localStorage.");
    }

    if (localStorage.getItem("highScores") === null) {
      localStorage.setItem("highScores", JSON.stringify(highScoresData));
      console.log("Fetched 'highScores' and updated localStorage.");
    } else {
      highScoresData = JSON.parse(localStorage.getItem("highScores"));
    }

    isDataFetched = true;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

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
let remainingTime = 0;
let timerInterval;
let selectedAnswer = undefined;
let newHighScore = false;
let highScoreName = "Four";
let highScoreIndex;
let questionIndex = 0;
// Functions

// Starts the quiz
const startQuiz = () => {
  resetValues();
  timer(startingTime);
  fetchData();
  welcomeText.innerHTML = "";
  startButton.setAttribute("style", "display: none;");
  getQuestion(questionIndex);
  quizContainer.setAttribute("style", "display: flex;");
};

// Sets all global variables and styles to their default values
const resetValues = () => {
  correct = 0;
  incorrect = 0;
  score = 0;
  startingTime = 181;
  remainingTime = 0;
  selectedAnswer = undefined;
  newHighScore = false;
  highScoreName = "";
  highScoreIndex = null;
  questionIndex = 0;
  resultText.textContent = "";
  storedScores = null;
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
  clearInterval(timerInterval);
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
};

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

// Starts the timer and displays the formatted time remaining on the page, will end the quiz if the time runs out
const timer = (startingTime) => {
  timerInterval = setInterval(function () {
    startingTime--;
    
    if (startingTime <= 0) {
      clearInterval(timerInterval);
      startingTime = 0;
      remainingTime = startingTime;
      endQuiz();
    }
    
    remainingTime = startingTime;
    let minutes = Math.floor(startingTime / 60);
    let seconds = startingTime - minutes * 60;

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    let formattedTime = `${minutes}:${seconds}`;
    timerValue.textContent = `Time Left: ${formattedTime}`;
    timerValue.setAttribute("style", "display: flex;");
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
    startingTime -= 15;
    clearInterval(timerInterval);
    timer(startingTime);
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
  let remainingTime = startingTime;
  clearInterval(timerInterval);
  calculateScore();
  compareScores();
  quizContainer.setAttribute("style", "display: none;");
  scoreContainer.setAttribute("style", "display: flex");

  if (startingTime <= 1) {
    remainingTime = 0;
  }

  correctText.textContent = `Correct: ${correct}`;
  incorrectText.textContent = `Incorrect: ${incorrect}`;
  remainingTimeText.textContent = `Remaining Time: ${Number(remainingTime)}`;
  finalScoreText.textContent = `Score: ${Number(score)}`;

  if (newHighScore) {
    enterName.setAttribute("style", "display: flex;");
  }
};

// Calculates the score based on the number of correct and incorrect answers and the remaining time
const calculateScore = () => {
  const maxPossibleScore = correct * 5;
  const incorrectPenalty = incorrect * 2;
  const timeBonus = remainingTime;
  score = Math.max(0, maxPossibleScore - incorrectPenalty + timeBonus);
};

// Compares the score to the high scores and determines if it is a new high score
// TODO: This is likely the cause of the problem
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
const submitHighScore = () => {
  let storedScores = JSON.parse(localStorage.getItem("highScores"));
  const newScore = { name: highScoreName, score: score };

  storedScores.splice(highScoreIndex, 0, newScore);

  if (storedScores.length > 5) {
    storedScores.pop();
  }

  localStorage.setItem("highScores", JSON.stringify(storedScores));
  highScoresData = JSON.parse(localStorage.getItem("highScores"));
  nameText.value = "";
  scoreContainer.setAttribute("style", "display: none;");
  enterName.setAttribute("style", "display: none;");
  startButton.setAttribute("style", "display: inline-block;");
  showHighScores();
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

// Global Event Listeners
startButton.addEventListener("click", startQuiz);
playAgainButton.addEventListener("click", resetValues);
resetButton.addEventListener("click", resetValues);
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

formSubmitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  submitHighScore();
});

nameText.addEventListener("input", (event) => {
  highScoreName = event.target.value;
});
