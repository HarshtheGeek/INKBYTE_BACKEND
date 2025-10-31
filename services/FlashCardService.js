const {flashCardPrompt} = require('../prompts/flashprompt');
const axios = require("axios");
const { getRandomGeminiKey } = require("../utils/GeminiKeys");


function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function FlashCardService(topic, attempt = 1, maxRetries = 5) {
  const apiKey = getRandomGeminiKey();
  const prompt = flashCardPrompt(topic);

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 50000
      }
    );

    
    const candidate = response.data?.candidates?.[0];
    const text = candidate?.content?.parts?.[0]?.text;

    if (!text) throw new Error("No response text from Gemini API");

    
    try {
      return JSON.parse(text);
    } catch (parseError) {
      const cleanedText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      try {
        return JSON.parse(cleanedText);
      } catch (innerError) {
        console.error("Gemini raw output (invalid JSON):", text);
        throw new Error("Invalid JSON format returned by Gemini");
      }
    }

  } catch (error) {
    const message = error.response?.data?.error?.message || error.message;

    // Retry logic for model overload
    if (message.includes("overloaded") && attempt < maxRetries) {
      const waitTime = Math.pow(2, attempt) * 1000; // exponential backoff
      console.log(`Model overloaded. Retrying in ${waitTime / 1000}s...`);
      await delay(waitTime);
      return FlashCardService(topic, attempt + 1, maxRetries);
    }

    throw new Error(message || "Gemini API request failed");
  }
}

module.exports = { FlashCardService };
