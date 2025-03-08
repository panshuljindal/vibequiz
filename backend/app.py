from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS  # Import CORS
import os
import requests
import PyPDF2
import docx
import json
import json_repair


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Azure OpenAI API Configuration
AZURE_OPENAI_ENDPOINT = ""
DEPLOYMENT_ID = ""  # Set in environment
API_VERSION = ""
API_KEY = ""   # Set in API Key

def extract_text_from_pdf(pdf_path):
    text = ""
    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            text += page.extract_text() + "\n"
    return text

def extract_text_from_docx(docx_path):
    doc = docx.Document(docx_path)
    text = "\n".join([para.text for para in doc.paragraphs])
    return text

def generate_quiz(text):
    prompt = f"""
    Generate a multiple-choice quiz based on the following content:
    {text[:50000]}
    Provide 15 questions, each with 4 answer choices, and mark the correct answer.
    Format: JSON with 'questions', 'choices', and 'correct_answer'.
    Only return the JSON response without any additional text or markdown.
    Example:
    '''json
    {{
        "questions": [
            {{
                "question": "What is the capital of France?",
                "choices": ["Berlin", "Madrid", "Paris", "Rome"],
                "correct_answer": "Paris"
            }},
            ...
        ]
    }}
    '''
    """
    
    url = f"{AZURE_OPENAI_ENDPOINT}/openai/deployments/{DEPLOYMENT_ID}/chat/completions?api-version={API_VERSION}"
    headers = {
        "Content-Type": "application/json",
        "api-key": API_KEY
    }
    payload = {
        "messages": [
            {"role": "system", "content": "You are a quiz generator."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 1.0,
        "n": 1
    }
    
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code == 200:
        quiz_content = response.json()["choices"][0]["message"]["content"].strip()
        try:
            return json_repair.loads(quiz_content) # Convert string to JSON
        except json.JSONDecodeError:
            return {"error": "Invalid JSON format returned from API", "content": quiz_content}
    else:
        return {"error": f"Error: {response.status_code} - {response.text}"}

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
    
    try:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        if filename.endswith(".pdf"):
            text = extract_text_from_pdf(filepath)
        elif filename.endswith(".docx"):
            text = extract_text_from_docx(filepath)
        else:
            return jsonify({"error": "Unsupported file format"}), 400
        
        quiz = generate_quiz(text)
        return jsonify(quiz)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
