import React from "react";

function Result({ score, total }) {
    return (
        <div>
            <h2>Quiz Completed!</h2>
            <p>Your Score: {score} / {total}</p>
        </div>
    );
}

export default Result;
