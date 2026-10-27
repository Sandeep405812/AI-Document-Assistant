import io
import socket
import time
from dotenv import load_dotenv
from fastapi import FastAPI
from langchain_google_genai import ChatGoogleGenerativeAI
from pydantic import BaseModel
from fastapi import UploadFile,File,HTTPException
from pypdf import PdfReader

# Fast reply fix: Windows IPv6 timeout (170s) avoid karke direct IPv4 connect karega
_orig_gai = socket.getaddrinfo
socket.getaddrinfo = lambda h, p, f=0, *a: _orig_gai(h, p, socket.AF_INET, *a)

load_dotenv()

app = FastAPI()

# Fast Gemini Flash model
llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash-lite",
    max_retries=0,
    thinking_level="minimal"
)

class chatRequest(BaseModel):
    message: str

# Test route
@app.get("/")
def home():
    return {"message": "AI Service is running"}

# Chat route (GET)
@app.get("/chat")
async def chat(message: str):
    response = await llm.ainvoke(message)
    return {"reply": response.text}

# Chat API route (POST)
@app.post("/api/chat")
async def chat_with_ai(request: chatRequest):
    response = await llm.ainvoke(request.message)
    return {"reply": response.text}

#pdf upload 
@app.post("/api/upload")
async def upload_document(file: UploadFile = File(...)):
    try:
        if not file.filename:
            raise HTTPException(status_code=400, detail="File name is missing")

        if not file.filename.lower().endswith((".pdf", ".txt")):
            raise HTTPException(
                status_code=400,
                detail="Only pdf and txt files allowed"
            )

        # Read Upload Files
        content = await file.read()

        if not content:
            raise HTTPException(status_code=400, detail="File is empty")


        # Extract text
        if file.filename.lower().endswith(".pdf"):
            pdf = PdfReader(io.BytesIO(content))
            text = "\n".join(
                page.extract_text() or "" for page in pdf.pages
            )
        else:
            text = content.decode("utf-8-sig")

        if not text.strip():
            raise HTTPException(
                status_code=400,
                detail="No readable text found in the document"
            )

        return {
            "message": "Document uploaded successfully",
            "filename": file.filename,
            "characters": len(text),
            "text_preview": text[:500]
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
