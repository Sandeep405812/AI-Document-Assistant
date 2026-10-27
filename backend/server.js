const express = require("express");
const cors = require("cors");
const dns = require("dns");
const multer = require("multer");
require("dotenv").config();

// Ensure Node.js prefers IPv4 to avoid IPv6 connection delay/timeouts
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder("ipv4first");
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware: incoming requests ko process karna
app.use(cors());
app.use(express.json());

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }
});

// Chat API
app.post("/api/chat", async (req, res) => {
  const message = req.body?.message;

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message.trim() }),
      signal: AbortSignal.timeout(30000), // 30s timeout guard
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("AI service error:", response.status, errorData);
      return res.status(response.status).json({
        error: "AI service failed to process request",
        details: errorData,
      });
    }

    const data = await response.json();

    res.json({
      reply: data.reply,
    });
  } catch (error) {
    console.error("Chat API error:", error.message);
    if (error.name === "TimeoutError") {
      return res.status(504).json({ error: "AI service response timed out" });
    }
    res.status(500).json({
      error: "Could not connect to AI service. Ensure ai-service is running on port 8000.",
    });
  }
});

// upload pdf api
app.post('/api/upload', upload.single('myFile'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: 'Please select a file'
            });
        }

        const formData = new FormData();
        const blob = new Blob([req.file.buffer]);

        formData.append('file', blob, req.file.originalname);

        const response = await fetch('http://127.0.0.1:8000/api/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        res.status(response.status).json(data);

    } catch (error) {
        console.error('Upload error:', error.message);

        res.status(500).json({
            error: 'File upload failed'
        });
    }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
