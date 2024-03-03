import React, { useEffect, useState } from 'react';
import { getQuestions, checkAnswer, gradeQuestions } from '../data/questions';
import './carousel.css';

const Carousels = (props) => {
    const items = getQuestions();
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showGrade, setShowGrade] = useState(false);
    const [grade, setGrade] = useState(0);
    const [timer, setTimer] = useState(items.length * 5 * 60); // 5 minutes per question

    useEffect(() => {
        let interval = null;
        if (!showGrade && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timer, showGrade]);

    const handleSelectAnswer = (questionIndex, option) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: option,
        });
    };

    const handleGradeQuiz = () => {
        const score = gradeQuestions(items, selectedAnswers); // Use the modified gradeQuestions
        setGrade(score);
        setShowGrade(true);
    };

    const formatTime = () => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className='quiz-container'>
            <div className="timer">Time Left: {formatTime()}</div>
            {showGrade && <h2 className='grade-percentage'>Your Grade: {((grade / items.length) * 100).toFixed(2)}%</h2>}
            {items.map((item, index) => (
                <div key={index} className='question-container'>
                    <h1>Q{index + 1}. {item.question}</h1>
                    <div className='options'>
                        {Object.entries(item.options).map(([optionKey, optionValue]) => (
                            <button
                                key={optionKey}
                                className={`option ${selectedAnswers[index] === optionKey ? 'selected-option' : ''} ${showGrade && checkAnswer(item).answer === optionKey ? 'correct-option' : ''}`}
                                onClick={() => handleSelectAnswer(index, optionKey)}
                                disabled={showGrade}
                            >
                                {optionKey.toUpperCase()}. {optionValue}
                            </button>
                        ))}
                    </div>
                    {showGrade && <div className='explanation'>Explanation: {checkAnswer(item).explanation}</div>}
                </div>
            ))}
            {!showGrade && (
                <button className='grade-button' onClick={handleGradeQuiz}>
                    Grade Quiz
                </button>
            )}
        </div>
    );
};

export default Carousels;
