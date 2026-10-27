# 🤖 AI Document Assistant

AI Document Assistant is a full-stack application that enables users to chat with an AI assistant and upload documents for AI-powered analysis. The project combines a React frontend, an Express backend, and a FastAPI AI service powered by Google Gemini.

## 🚀 Project Overview

This project is designed to make document interaction easier through a conversational interface. Users can:

- ask questions in a chat interface
- upload PDF or text documents
- send documents through the backend to the AI service
- extract readable text from uploaded files
- receive AI-generated responses from Gemini

The application is currently in active development, with core chat and document-processing flows already connected across the stack.

## ✨ Features

### Implemented
- React-based chat UI
- Express API server that proxies requests to the AI service
- FastAPI service with Gemini integration
- PDF and text upload support
- Document text extraction for PDF and TXT files
- API endpoints for chat and document upload

### Planned
- Persistent chat history
- Document management and listing
- Vector storage and embeddings
- RAG-based document Q&A
- User authentication and profiles
- Testing and deployment setup

## 🧩 Tech Stack

### Frontend
- React
- Vite
- JavaScript
- Tailwind CSS

### Backend
- Node.js
- Express.js
- CORS
- Multer

### AI Service
- Python
- FastAPI
- LangChain Google GenAI
- Google Gemini
- pypdf

## 📁 Project Structure

```text
AI-Document-Assistant/
├── .gitignore
├── README.md
├── backend/
│   ├── package.json
│   └── server.js
├── frontend/
│   └── react/
│       ├── package.json
│       ├── index.html
│       └── src/
│           ├── App.jsx
│           ├── components/
│           ├── index.css
│           └── main.jsx
└── ai-service/
    └── main.py
```

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 18+
- npm
- Python 3.11+
- Git
- A Google Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/Sandeep405812/AI-Document-Assistant.git
cd AI-Document-Assistant
```

### 2. Start the Backend

Open a terminal and run:

```bash
cd backend
npm install
npm start
```

The backend starts on port 5000 by default and forwards requests to the AI service.

### 3. Start the AI Service

Open a second terminal:

```bash
cd ai-service
python -m venv .venv
source .venv/bin/activate
```

On Windows PowerShell:

```powershell
cd ai-service
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Install the required Python packages:

```bash
pip install fastapi uvicorn python-dotenv langchain-google-genai pypdf
```

Create a `.env` file in `ai-service/`:

```env
GOOGLE_API_KEY=your_gemini_api_key
```

Then start the API:

```bash
python -m uvicorn main:app --reload --port 8000
```

The API docs are available at:

- http://127.0.0.1:8000/docs

### 4. Start the Frontend

Open a third terminal:

```bash
cd frontend/react
npm install
npm run dev
```

Then open the local URL shown in the terminal.

## 🔌 API Endpoints

### Backend
- `POST /api/chat` — send a chat message to the AI service
- `POST /api/upload` — upload a PDF or TXT file for text extraction

### AI Service
- `GET /` — health check
- `GET /chat?message=...` — simple chat endpoint
- `POST /api/chat` — JSON chat request
- `POST /api/upload` — file upload endpoint with document text extraction

## 🔐 Environment Variables

Keep secrets in local environment files and do not commit them to GitHub.

Required values:

```env
# ai-service/.env
GOOGLE_API_KEY=your_gemini_api_key
```

Optional backend config:

```env
# backend/.env
PORT=5000
```

## 🗺️ Roadmap

- [x] React chat interface
- [x] Express backend API
- [x] FastAPI AI service
- [x] Gemini AI integration
- [x] PDF/TXT upload support
- [x] Document text extraction
- [ ] Persistent chat history
- [ ] Document management and listing
- [ ] Embedding generation and ChromaDB setup
- [ ] RAG-based document Q&A
- [ ] Testing and deployment

## 👨‍💻 Author

**Sandeep Singh**

GitHub: [Sandeep405812](https://github.com/Sandeep405812)

---

This project is under active development.
