import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";

app.post("/generate-info", async (req, res) => {
  const { templeName } = req.body;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Give a detailed historical and architectural description of ${templeName}. Include cultural importance and interesting facts.`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;

    res.json({ description: text });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch info" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));