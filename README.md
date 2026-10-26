# 🤖 AI Document Assistant

An AI-powered document assistant that helps users interact with documents and get answers using Generative AI.

The project is being developed using React, Node.js, Express.js, FastAPI, and Google's Gemini AI.

## 🚀 Project Overview

AI Document Assistant aims to make it easier to understand and interact with documents through a conversational interface.

Users will be able to ask questions and receive AI-generated responses. The project will be extended with document upload and Retrieval-Augmented Generation (RAG) capabilities.

## ✨ Features

- Interactive chat interface built with React.
- Node.js and Express.js backend API.
- Python FastAPI service for AI integration.
- Google Gemini AI integration using LangChain.
- Planned PDF upload and text extraction.
- Planned document-based question answering using RAG.
- Planned chat history and document management.

## 🛠️ Tech Stack

**Frontend**
- React
- JavaScript
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- REST APIs

**AI Service**
- Python
- FastAPI
- LangChain
- Google Gemini AI

**Planned Technologies**
- ChromaDB
- Vector embeddings
- MongoDB

## 📁 Project Structure

```text
AI Document Assistant/
├── frontend/
├── backend/
├── ai-service/
├── .gitignore
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

Install the following:

- Node.js and npm
- Python 3.11+
- Git
- Google Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/Sandeep405812/AI-Document-Assistant.git
cd AI-Document-Assistant
```

### 2. Start the Backend

Open a terminal:

```bash
cd backend
npm install
```

Configure the required environment variables before starting the server.

Run the backend using the start script configured in `package.json`. For example:

```bash
npm start
```

### 3. Start the AI Service

Open another terminal:

```bash
cd ai-service
```

Activate your Python virtual environment and install the project's Python dependencies.

Create a `.env` file inside `ai-service`:

```env
GOOGLE_API_KEY=your_gemini_api_key
```

Replace the placeholder with your own API key. Never commit your actual API key to GitHub.

Start the FastAPI service:

```bash
python -m uvicorn main:app --reload --port 8000
```

Open the interactive API documentation at:

`http://127.0.0.1:8000/docs`

### 4. Start the Frontend

Open another terminal:

```bash
cd frontend/react
npm install
npm run dev
```

Open the local URL displayed in your terminal.

**Note:** The exact commands may need adjustment according to the scripts and dependencies configured in the project's `package.json` files.

## 🔑 Environment Variables

Keep API keys and other secrets in local `.env` files.

Never upload `.env` files, API keys, or virtual environment folders to GitHub.

## 🗺️ Roadmap

- [x] React chat interface
- [x] Express backend API
- [x] FastAPI AI service
- [x] Basic Gemini AI integration
- [ ] Connect React, Express, and FastAPI end to end
- [ ] Upload PDF documents
- [ ] Extract and split document text
- [ ] Generate embeddings
- [ ] Store vectors in ChromaDB
- [ ] Implement RAG-based document question answering
- [ ] Add chat history and document management
- [ ] Testing and deployment

## 👨‍💻 Author

**Sandeep Singh**

GitHub: [Sandeep405812](https://github.com/Sandeep405812)

---

This project is under active development.
