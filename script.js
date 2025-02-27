document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const restartBtn = document.getElementById("restart-btn");
  const nextBtn = document.getElementById("next-btn");

  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "What is the capital of Japan?",
      choices: ["Tokyo", "Seoul", "Beijing", "Bangkok"],
      answer: "Tokyo",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "William Shakespeare",
        "Mark Twain",
        "Leo Tolstoy",
      ],
      answer: "William Shakespeare",
    },
    {
      question: "What is the largest mammal in the world?",
      choices: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      answer: "Blue Whale",
    },
    {
      question: "What is the chemical symbol for Gold?",
      choices: ["Ag", "Au", "Pb", "Fe"],
      answer: "Au",
    },
    {
      question: "How many continents are there on Earth?",
      choices: ["5", "6", "7", "8"],
      answer: "7",
    },
    {
      question: "Who discovered gravity?",
      choices: [
        "Albert Einstein",
        "Isaac Newton",
        "Galileo Galilei",
        "Nikola Tesla",
      ],
      answer: "Isaac Newton",
    },
    {
      question: "What is the capital of Brazil?",
      choices: ["Buenos Aires", "Rio de Janeiro", "Brasilia", "Lima"],
      answer: "Brasilia",
    },
    {
      question: "Which gas do plants use for photosynthesis?",
      choices: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      answer: "Carbon Dioxide",
    },
    {
      question: "What is the square root of 64?",
      choices: ["6", "7", "8", "9"],
      answer: "8",
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let selected = false;

  startBtn.addEventListener("click", startQuiz);

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    startQuiz();
  });

  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
  }

  function showQuestion() {
    nextBtn.classList.add("hidden");
    selected = false;
    questionText.innerHTML = questions[currentQuestionIndex].question;
    choicesList.innerHTML = "";

    questions[currentQuestionIndex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.classList.add("choice-option");
      li.addEventListener("click", () => selectAnswer(li, choice));
      choicesList.appendChild(li);
    });
  }

  function selectAnswer(selectedLi, choice) {
    if (selected) return;

    selected = true;
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (choice === correctAnswer) {
      score++;
      selectedLi.classList.add("correct");
    } else {
      selectedLi.classList.add("incorrect");
      [...choicesList.children].forEach((li) => {
        if (li.textContent === correctAnswer) {
          li.classList.add("correct");
        }
      });
    }
    nextBtn.classList.remove("hidden");
  }

  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${questions.length}`;
    if (score === questions.length || score === questions.length - 1) {
      let fullScore = document.createElement("h3");
      fullScore.innerHTML = "You are awesome!";
      fullScore.classList.add("full-score");
      scoreDisplay.appendChild(fullScore);
    } else if (score < questions.length / 3) {
      let lowScore = document.createElement("h3");
      lowScore.innerHTML = "You are dumb AF :(";
      lowScore.classList.add("low-score");
      scoreDisplay.appendChild(lowScore);
    } else if (score > questions.length / 3 && score < questions.length / 2) {
      let notbadScore = document.createElement("h3");
      notbadScore.innerHTML = "Not bad";
      notbadScore.classList.add("notbad-score");
      scoreDisplay.appendChild(notbadScore);
    } else if (score >= questions.length / 2) {
      let goodScore = document.createElement("h3");
      goodScore.innerHTML = "Good :)";
      goodScore.classList.add("good-score");
      scoreDisplay.appendChild(goodScore);
    }
  }
});
