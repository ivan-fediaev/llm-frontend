const questions = [
    {
      question: "What is Lorem Ipsum?",
      options: {
        a: "random",
        b: "text",
        c: "latin",
        d: "literature",
      },
    },
    {
        question: "What is Machine Learning?",
        options: {
          a: "random",
          b: "text",
          c: "latin",
          d: "literature",
        },
    },
    {
        question: "What is Try Catch Loop?",
        options: {
          a: "random",
          b: "text",
          c: "latin",
          d: "literature",
        },
    },
    {
        question: "What is Linear Regression?",
        options: {
          a: "random",
          b: "text",
          c: "latin",
          d: "literature",
        },
    }
]

// answers to the questions with explanation
const answers = [
    {
        answer: "b",
        explanation: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
        answer: "c",
        explanation: "Machine learning is the study of computer algorithms that improve automatically through experience."
    },
    {
        answer: "d",
        explanation: "A try...catch statement marks a block of statements to try and specifies a response should an exception be thrown."
    },
    {
        answer: "a",
        explanation: "Linear regression is a linear approach to modeling the relationship between a scalar response and one or more explanatory variables."
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