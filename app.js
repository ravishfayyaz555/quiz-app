
const questions = [
    {
        question: "Which language is used to structure a web page?",
        options: ["CSS", "HTML", "JavaScript", "Python"],
        answer: 1
    },
    {
        question: "Which language is used to style a web page?",
        options: ["HTML", "Java", "CSS", "SQL"],
        answer: 2
    },
    {
        question: "Which keyword declares a variable in JavaScript?",
        options: ["let", "style", "print", "design"],
        answer: 0
    },
    {
        question: "Which symbol is used for strict equality in JavaScript?",
        options: ["=", "==", "===", "!="],
        answer: 2
    },
    {
        question: "Which method selects an element by its ID?",
        options: [
            "getElementById()",
            "getClass()",
            "queryStyle()",
            "selectHTML()"
        ],
        answer: 0
    }
];

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const welcomeScreen = document.getElementById("quizCard");
const questionScreen = document.getElementById("questionScreen");
const resultScreen = document.getElementById("resultScreen");

const questionText = document.getElementById("questionText");
const questionNumber = document.getElementById("questionNumber");
const optionsContainer = document.getElementById("optionsContainer");
const progressBar = document.getElementById("progressBar");
const feedback = document.getElementById("feedback");
const liveScore = document.getElementById("liveScore");

let currentQuestion = 0;
let score = 0;
let answered = false;

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;

    welcomeScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    questionScreen.classList.remove("hidden");

    showQuestion();
}

function showQuestion() {
    answered = false;

    const current = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    questionText.textContent = current.question;
    liveScore.textContent = score;

    progressBar.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    optionsContainer.innerHTML = "";
    feedback.textContent = "";
    nextBtn.disabled = true;

    nextBtn.innerHTML =
        currentQuestion === questions.length - 1
            ? "See Results →"
            : "Next Question →";

    current.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.className = "option";
        button.innerHTML = `
            <span class="option-letter">
                ${String.fromCharCode(65 + index)}
            </span>
            <span>${option}</span>
        `;

        button.addEventListener("click", () => selectAnswer(index));

        optionsContainer.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const current = questions[currentQuestion];
    const optionButtons = optionsContainer.querySelectorAll(".option");

    optionButtons.forEach((button, index) => {
        button.disabled = true;

        if (index === current.answer) {
            button.classList.add("correct");
        }
    });

    if (selectedIndex === current.answer) {
        score++;
        feedback.textContent = "🎉 Correct answer! Well done.";
    } else {
        optionButtons[selectedIndex].classList.add("wrong");
        feedback.textContent =
            `❌ Incorrect! Correct answer: ${current.options[current.answer]}`;
    }

    liveScore.textContent = score;
    nextBtn.disabled = false;
}

function nextQuestion() {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    questionScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    progressBar.style.width = "100%";

    document.getElementById("finalScore").textContent =
        `${score}/${questions.length}`;

    const percentage = (score / questions.length) * 100;

    let title;
    let message;
    let icon;

    if (percentage === 100) {
        title = "Perfect Score!";
        message = "Amazing! You answered every question correctly.";
        icon = "🏆";
    } else if (percentage >= 60) {
        title = "Great Job!";
        message = "Nice work! Keep learning and improving.";
        icon = "🎉";
    } else {
        title = "Keep Practicing!";
        message = "Every attempt helps you learn something new.";
        icon = "💪";
    }

    document.getElementById("resultTitle").textContent = title;
    document.getElementById("resultMessage").textContent = message;
    document.getElementById("resultIcon").textContent = icon;
}