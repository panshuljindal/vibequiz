# 🧠 Quiz App - Vibe Coding

A full-stack quiz application built with **React.js** (frontend) and **Flask** (backend). The app allows users to upload PDFs or DOCX files, extract text, and generate quizzes dynamically using OpenAI's GPT-4o model.

## 🚀 Features
- 📄 **File Upload**: Upload PDFs or DOCX files for quiz generation.
- 🎯 **AI-Powered Quizzes**: Generates multiple-choice quizzes using OpenAI's GPT model.
- 🎨 **Modern UI**: Built with React for an interactive user experience.
- 🔥 **Fast & Secure API**: Flask backend with CORS and secure API calls.
- ☁️ **Azure Deployment**: Deployable on Azure App Service or VM.

---

## 📂 Project Structure
```
quiz-app/
│── backend/                  # Flask Backend
│   ├── app.py                # Main Flask app
│   ├── requirements.txt      # Backend dependencies
│   ├── utils/                # Utility functions (PDF, DOCX processing)
│── frontend/                 # React Frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── App.js            # Main React App
│   │   ├── index.js          # Entry point
│   ├── package.json          # Frontend dependencies
│── README.md                 # Project Documentation
```

---

## ⚙️ Setup & Installation

### 🖥️ Backend (Flask API)

#### 1️⃣ Install Dependencies
```sh
cd backend
pip install -r requirements.txt
```

#### 2️⃣ Set Environment Variables
Create a `.env` file and add:
```
AZURE_OPENAI_ENDPOINT=<your_openai_endpoint>
DEPLOYMENT_ID=gpt-4o
API_VERSION=2024-10-21
API_KEY=<your_openai_api_key>
```

#### 3️⃣ Run the Backend Server
```sh
python app.py
```
Server runs at `http://localhost:5001`

---

### 🌐 Frontend (React App)

#### 1️⃣ Install Dependencies
```sh
cd frontend
npm install
```

#### 2️⃣ Start React App
```sh
npm start
```
Frontend runs at `http://localhost:3000`

---

## 🚀 Deployment

### **Azure App Service (Recommended)**
```sh
az webapp create --resource-group myResourceGroup --plan myAppServicePlan --name myquizapp --runtime "PYTHON:3.9"
```
Or deploy using **Docker**:
```sh
docker build -t myquizapp .
docker run -p 5001:5001 myquizapp
```

### **VM Deployment**
1. Set up an **Ubuntu VM**.
2. Install **Python, Node.js, and Nginx**.
3. Deploy **Flask with Gunicorn**.
4. Use **PM2** to manage React.

---

## 📜 API Endpoints
### **1️⃣ Upload File**
`POST /upload`
- **Body**: File (`.pdf` or `.docx`)
- **Response**: Extracted text & generated quiz

### **2️⃣ Get Quiz**
`POST /generate-quiz`
- **Body**: `{ "text": "<some text>" }`
- **Response**: `{ "questions": [ { "question": ..., "choices": ..., "correct_answer": ... } ] }`

---

## 🤝 Contributing
1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Open a Pull Request

---

## 🛠️ Tech Stack
- **Frontend**: React.js, CSS
- **Backend**: Flask, OpenAI API, PyPDF2, python-docx
- **Deployment**: Azure App Service, Docker, Gunicorn

---

## 📞 Contact
For queries, reach out via [email](mailto:panshuljindal@gmail.com) or open an issue.

---

🚀 **Happy Coding!**

