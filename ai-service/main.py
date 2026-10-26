from fastapi import FastAPI
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Gemini model
llm = ChatGoogleGenerativeAI(
    model="gemini-3.8-flash",
    temperature=0.3
)

# Test route
@app.get("/")
def home():
    return {"message": "AI Service is running"}

# Chat route
@app.get("/chat")
def chat(message: str):
    response = llm.invoke(message)
    return {"reply": response.content}