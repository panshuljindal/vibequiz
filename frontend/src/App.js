import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import Quiz from "./components/Quiz";
import "./styles.css";

function App() {
    const [quizData, setQuizData] = useState(null);

    return (
        <div className="container">
            <h1>AI Powered Quiz Generator</h1>
            {!quizData ? (
                <FileUpload setQuizData={setQuizData} />
            ) : (
                <Quiz quizData={quizData} />
            )}
        </div>
    );
}

export default App;
