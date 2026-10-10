const questions = [
    {
        question: "Which keyword can declare a variable in JavaScript?",
        options: ["var", "let", "const", "All of the above"],
        answer: 3
    },
    {
        question: "Which method prints a message in the browser console?",
        options: ["console.log()", "print()", "echo()", "display()"],
        answer: 0
    },
    {
        question: "Which data type represents true or false?",
        options: ["String", "Boolean", "Number", "Array"],
        answer: 1
    },
    {
        question: "Which symbol is used for strict equality?",
        options: ["=", "==", "===", "!="],
        answer: 2
    },
    {
        question: "Which method adds an element to the end of an array?",
        options: ["pop()", "push()", "shift()", "slice()"],
        answer: 1
    }
];

const welcomeScreen = document.getElementById("welcomeScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const questionNumber = document.getElementById("questionNumber");
const scoreElement = document.getElementById("score");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const progressBar = document.getElementById("progressBar");
const feedback = document.getElementById("feedback");

let currentQuestion = 0;
let userAnswers = [];

function startQuiz() {
    currentQuestion = 0;
    userAnswers = Array(questions.length).fill(null);

    welcomeScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();
}

function calculateScore() {
    return userAnswers.reduce((total, answer, index) => {
        return total + (answer === questions[index].answer ? 1 : 0);
    }, 0);
}

function showQuestion() {
    const current = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreElement.textContent = `Score: ${calculateScore()}`;

    questionElement.textContent =
        `${currentQuestion + 1}. ${current.question}`;

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    optionsElement.innerHTML = "";
    feedback.textContent = "";

    current.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.textContent = option;
        button.className = "option";

        if (userAnswers[currentQuestion] === index) {
            button.classList.add("selected");
        }

        button.addEventListener("click", () => {
            userAnswers[currentQuestion] = index;
            showQuestion();
        });

        optionsElement.appendChild(button);
    });

    previousBtn.disabled = currentQuestion === 0;

    nextBtn.textContent =
        currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next";
}

function showResult() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    const score = calculateScore();

    document.getElementById("finalScore").textContent =
        `Your Score: ${score} / ${questions.length}`;

    const percentage = (score / questions.length) * 100;

    let message;

    if (percentage === 100) {
        message = "Excellent! You answered every question correctly!";
    } else if (percentage >= 60) {
        message = "Good job! Keep practising JavaScript.";
    } else {
        message = "Keep learning! Try again to improve your score.";
    }

    document.getElementById("resultMessage").textContent =
        `${message} (${percentage}%)`;
}

startBtn.addEventListener("click", startQuiz);

previousBtn.addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
});

nextBtn.addEventListener("click", () => {
    if (userAnswers[currentQuestion] === null) {
        feedback.textContent = "Please select an answer first.";
        feedback.style.color = "#dc2626";
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResult();
    }
});

restartBtn.addEventListener("click", startQuiz);