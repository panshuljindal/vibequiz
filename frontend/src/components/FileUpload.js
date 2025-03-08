import React, { useState } from "react";
import axios from "axios";

function FileUpload({ setQuizData }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:5001/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });

            if (response.data.questions) {
                setQuizData(response.data);
            } else {
                console.error("Unexpected response format:", response.data);
            }
        } catch (error) {
            console.error("Upload error:", error);
        }

        setLoading(false);
    };

    return (
        <div className="file-upload-container">
            <label htmlFor="file-input" className="custom-file-upload">
                {file ? file.name : "Choose a File"}
            </label>
            <input
                type="file"
                id="file-input"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
            />
            <button className="btn-blue upload-btn" onClick={handleUpload} disabled={loading || !file}>
                {loading ? "Uploading..." : "Upload & Generate Quiz"}
            </button>
        </div>
    );
}

export default FileUpload;
