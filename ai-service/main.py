import time
import socket

from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
from starlette.concurrency import run_in_threadpool
from langchain_google_genai import ChatGoogleGenerativeAI

from rag.document_loader import load_pdf, load_txt
from rag.text_splitter import split_text
from rag.vector_store import add_chunks
from services.chat_service import answer_from_document


# IPv4 connection workaround
_original_getaddrinfo = socket.getaddrinfo


def ipv4_getaddrinfo(host, port, family=0, *args, **kwargs):
    return _original_getaddrinfo(
        host, port, socket.AF_INET, *args, **kwargs
    )


socket.getaddrinfo = ipv4_getaddrinfo


# Load environment variables
load_dotenv()


# Create FastAPI application
app = FastAPI(title="AI Document Assistant API")


# Initialize Gemini
llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash-lite",
    max_retries=0,
    thinking_level="minimal"
)


# Request model
class ChatRequest(BaseModel):
    message: str


# Home route
@app.get("/")
def home():
    return {"message": "AI Service is running"}


# Simple AI chat endpoint
@app.get("/chat")
async def chat(message: str):
    try:
        answer = await run_in_threadpool(
            answer_from_document,
            message,
            llm
        )

        return {"reply": answer}

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"AI request failed: {str(e)}"
        )


# RAG chat API used by Express
@app.post("/api/chat")
async def chat_with_ai(request: ChatRequest):
    try:
        start = time.time()

        answer = await run_in_threadpool(
            answer_from_document,
            request.message,
            llm
        )

        print(
            "RAG response time:",
            round(time.time() - start, 2),
            "seconds"
        )

        return {"reply": answer}

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"AI request failed: {str(e)}"
        )


# Upload PDF or TXT and extract its text
@app.post("/api/upload")
async def upload_document(file: UploadFile = File(...)):
    try:
        if not file.filename:
            raise HTTPException(
                status_code=400,
                detail="File name is missing"
            )

        filename = file.filename.lower()

        if not filename.endswith((".pdf", ".txt")):
            raise HTTPException(
                status_code=400,
                detail="Only PDF and TXT files are allowed"
            )

        content = await file.read()

        if not content:
            raise HTTPException(
                status_code=400,
                detail="File is empty"
            )

        # Extract text
        if filename.endswith(".pdf"):
            text = load_pdf(content)
        else:
            text = load_txt(content)

        if not text.strip():
            raise HTTPException(
                status_code=400,
                detail=(
                    "No readable text found. "
                    "Scanned PDFs may require OCR."
                )
            )

        # Split text into chunks
        chunks = split_text(text)

        if not chunks:
            raise HTTPException(
                status_code=400,
                detail="Could not create text chunks"
            )

        # Save chunks to ChromaDB
        total_chunks = add_chunks(chunks)

        return {
            "message": "Document uploaded and processed successfully",
            "filename": file.filename,
            "characters": len(text),
            "total_chunks": total_chunks,
            "text_preview": text[:500],
            "chunks_preview": chunks[:2]
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Document processing failed: {str(e)}"
        )

    finally:
        await file.close()
