

const questions = [
    {
      question: "Which law of thermodynamics states that energy cannot be created or destroyed, only transformed or transferred?",
      options: {
        a: "First Law",
        b: "Zeroth Law",
        c: "Second Law",
        d: "Third Law",
      },
    },
    {
        question: "What is the term used to describe the disorder or randomness in a system?",
        options: {
          a: "Heat",
          b: "Work",
          c: "Entropy",
          d: "Enthalpy",
        },
    },
    {
        question: "What does the Zeroth Law of Thermodynamics state?",
        options: {
            a: "Heat always flows from hot to cold",
            b: "Energy cannot be created or destroyed",
            c: "If two systems are each in thermal equilibrium with a third, they are in thermal equilibrium with each other",
            d: "Entropy of a perfect crystal at absolute zero is zero",
        }
    },
    {
        question: "What is the SI unit of temperature?",
        options: {
            a: "Fahrenheit",
            b: "Celsius",
            c: "Kelvin",
            d: "Rankine",
        }
    },
    {
        question: "What principle states that the energy of an isolated system is constant?",
        options: {
            a: "Zeroth Law",
            b: "First Law",
            c: "Second Law",
            d: "Third Law",
        }
    }
]



// answers to the questions with explanation
const answers = [
    {
        answer: "a",
        explanation: "First Law of Thermodynamics states that energy cannot be created or destroyed, only transformed or transferred."
    },
    {
        answer: "c",
        explanation: "Entropy is the term used to describe the disorder or randomness in a system."
    },
    {
        answer: "c",
        explanation: "The Zeroth Law of Thermodynamics states that if two systems are each in thermal equilibrium with a third, they are in thermal equilibrium with each other."
    },
    {
        answer: "c",
        explanation: "The SI unit of temperature is Kelvin."
    },
    {
        answer: "b",
        explanation: "The First Law of Thermodynamics states that the energy of an isolated system is constant."
    }
]

function getQuestions() {
    return questions;
}

function checkAnswer(question) {
    const index = questions.indexOf(question);
    return answers[index];
}

function gradeQuestions(questions, selectedAnswers) {
    let score = 0;
    questions.forEach((question, index) => {
        const correctAnswer = checkAnswer(question);
        if (selectedAnswers[index] === correctAnswer.answer) {
            score++;
        }
    });
    return score; // Returns the count of correct answers
}


export { getQuestions, checkAnswer, gradeQuestions };