import React from "react";

function QuestionCard({ question, selectedAnswer, handleAnswerChange }) {
    return (
        <div className="question-card">
            <h2>{question.question}</h2>
            {question.choices.map((choice, i) => (
                <label key={i} className="option-container">
                    <input
                        type="radio"
                        name="answer"
                        value={choice}
                        checked={selectedAnswer === choice}
                        onChange={() => handleAnswerChange(choice)}
                    />
                    <span className="option-text">{choice}</span>
                </label>
            ))}
        </div>
    );
}

export default QuestionCard;
