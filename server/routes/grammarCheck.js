const express = require("express");
const axios = require("axios");

const route = express.Router();

route.post("/", async (req, res) => {
  const { sentence } = req.body; // Get sentence & count (default: 3)
  console.log("Received sentence:", sentence);

  if (!sentence) {
    return res.status(400).json({ error: "Sentence is required" });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: sentence,
              },
            ],
          },
          {
            role: "assistant",
            parts: [
              {
                text: "You are a helpful assistant that checks and corrects the grammar in the following sentence. Only return the corrected sentence without any comment or context.",
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.9, // Higher temperature for more variation
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Extract response data
    const textResponse =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    res.json(textResponse.trim() || []);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error });
  }
});

module.exports = route;
