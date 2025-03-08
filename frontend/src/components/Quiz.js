import React, { useState } from "react";
import QuestionCard from "./QuestionCard";
import Result from "./Result";

function Quiz({ quizData }) {
    const [answers, setAnswers] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(null);
    const [error, setError] = useState(""); // Error message state

    const handleAnswerChange = (choice) => {
        setAnswers({ ...answers, [currentQuestion]: choice });
        setError(""); // Clear error when an option is selected
    };

    const nextQuestion = () => {
        if (!answers[currentQuestion]) {
            setError("Please select an answer before proceeding.");
            return;
        }
        setCurrentQuestion((prev) => Math.min(prev + 1, quizData.questions.length - 1));
    };

    const prevQuestion = () => {
        setCurrentQuestion((prev) => Math.max(prev - 1, 0));
        setError(""); // Clear error when going back
    };

    const handleSubmit = () => {
        if (!answers[currentQuestion]) {
            setError("Please select an answer before submitting.");
            return;
        }

        const correctAnswers = quizData.questions.map((q) => q.correct_answer);
        let userScore = 0;
        quizData.questions.forEach((q, i) => {
            if (answers[i] === correctAnswers[i]) userScore++;
        });
        setScore(userScore);
    };

    return (
        <div className="quiz-container">
            {score === null ? (
                <>
                    {/* Question Number Display */}
                    <p className="question-number">
                        Question {currentQuestion + 1} of {quizData.questions.length}
                    </p>

                    <QuestionCard
                        question={quizData.questions[currentQuestion]}
                        selectedAnswer={answers[currentQuestion]}
                        handleAnswerChange={handleAnswerChange}
                    />

                    {/* Error Message */}
                    {error && <p className="error-message">{error}</p>}

                    <div className="navigation-buttons">
                        <button className="btn-nav" onClick={prevQuestion} disabled={currentQuestion === 0}>
                            Previous
                        </button>
                        {currentQuestion === quizData.questions.length - 1 ? (
                            <button className="btn-submit" onClick={handleSubmit}>
                                Submit Quiz
                            </button>
                        ) : (
                            <button className="btn-nav" onClick={nextQuestion}>
                                Next
                            </button>
                        )}
                    </div>
                </>
            ) : (
                <Result score={score} total={quizData.questions.length} />
            )}
        </div>
    );
}

export default Quiz;
