import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",   // ✅ UPDATED MODEL
      messages: [
        {
          role: "system",
          content:
            "You are MandirAI, a digital historian. Answer ONLY about Indian temples, monuments, and heritage. If asked unrelated questions, politely refuse."
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.error("Groq Error:", error);
    res.status(500).json({ error: "Backend error" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});