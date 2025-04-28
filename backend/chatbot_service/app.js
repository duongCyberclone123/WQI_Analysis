require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const PORT = process.env.PORT || 3005;
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello from Gemini-powered Node.js server!");
});

// app.post("/predict", async (req, res) => {
//   try {
//     const response = await axios.post("http://localhost:8000/test", req.body);
//     res.json(response.data);
//   } catch (error) {
//     console.error("FastAPI Error:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    const contents = messages.map((m) => ({
      parts: [{ role: m.role, text: m.content }],
    }));
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents,
      config: { temperature: 0.7 },
    });
    res.json({ reply: response.text });
  } catch (err) {
    console.error("Gemini API lỗi:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server chạy tại http://chatbot-service:${PORT}`);
});
