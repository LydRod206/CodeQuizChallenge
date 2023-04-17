// Define quiz questions and answers
var quizQuestions = [
  {
    question: "What are the JavaScript Data Types?",
    answers: [
      { text: "Number", correct: false },
      { text: "String", correct: false },
      { text: "Boolean", correct: false },
      { text: "All of the Above", correct: true },
    ]
  },
  {
    question: "Which company developed JavaScript?",
    answers: [
      { text: "Tesla", correct: false },
      { text: "Microsoft", correct: true },
      { text: "Netscape", correct: false },
      { text: "Google", correct: false },
    ]
  },
  {
    question: "Which is not a JavaScript looping style?",
    answers: [
      { text: "For", correct: false },
      { text: "From", correct: true },
      { text: "While", correct: false },
      { text: "Do-while", correct: false },
    ]
  },
  {
    question: "Where are the meta tags found in HTML?",
    answers: [
      { text: "In the head", correct: true },
      { text: "In the header", correct: false },
      { text: "In the body", correct: false },
      { text: "In the footer", correct: false },
    ]
  }, 
  {
    question: "What is CSS?",
    answers: [
      { text: "Central Style Sheet", correct: false },
      { text: "Cascading Styling Sheet", correct: true },
      { text: "Cascading Style Sheets", correct: false },
      { text: "Central Styling Sheets", correct: false },
    ]
  }, 
];

  // Define variables
  const startButton = document.getElementById("start-button");
  const quizContainer = document.getElementById("quiz-container");
  const questionText = document.getElementById("question-text");
  const answerButtons = document.getElementById("answer-buttons");
  const gameOverContainer = document.getElementById("game-over-container");
  const scoreDisplay = document.getElementById("score");
  const initialsInput = document.getElementById("initials");
  const submitButton = document.getElementById("submit-button");
  
  let currentQuestionIndex;
  let timeLeft;
  let score;
  
 // Start the quiz
 startButton.addEventListener("click", startQuiz);
  
  function startQuiz() {
    currentQuestionIndex = 0;
    timeLeft = 60;
    score = 0;
    startButton.style.display = "none";
    quizContainer.style.display = "block";
    displayQuestion();
    startTimer();
  }
  // Display a question
  function displayQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    answerButtons.innerHTML = "";
    for (let i = 0; i < currentQuestion.answers.length; i++) {
      const answerButton = document.createElement("button");
      answerButton.innerText = currentQuestion.answers[i].text;
      answerButton.classList.add("answer-button");
      if (currentQuestion.answers[i].correct) {
        answerButton.dataset.correct = true;
      }
      answerButton.addEventListener("click", selectAnswer);
      answerButtons.appendChild(answerButton);
    }
  }
  // Select an answer
  function selectAnswer(event) {
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
      score += 10;
    } else {
      timeLeft -= 10;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }
  // Start the timer
  function startTimer() {
    const timerInterval = setInterval(function() {
      timeLeft--;
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        endQuiz();
      }
    }, 1000);
  }
  // End the quiz
  function endQuiz() {
    quizContainer.style.display = "none";
    gameOverContainer.style.display = "block";
    scoreDisplay.innerText = score;
  }
  
  // Save score and initials
  submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    const initials = initialsInput.value;
    localStorage.setItem("quizScore", score);
    localStorage.setItem("quizInitials", initials);
  });


