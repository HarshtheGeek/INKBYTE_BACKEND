const axios = require("axios");
const {subtitlePrompt} = require("../prompts/youtubePrompt");
const { getRandomGeminiKey } = require("../utils/GeminiKeys");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function summarizeSubtitles(subtitles, attempt = 1, maxRetries = 5) {
  const apiKey = getRandomGeminiKey();
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: subtitlePrompt(subtitles)
              }
            ]
          }
        ]
      },
      { headers: { "Content-Type": "application/json" }, timeout: 50000 }
    );

    const candidate = response.data?.candidates?.[0];
    if (!candidate?.content?.parts?.[0]?.text) {
      throw new Error("No summary returned from Gemini API");
    }

    return candidate.content.parts[0].text;
  } catch (error) {
    const message = error.response?.data?.error?.message || error.message;

    
    if (message.includes("overloaded") && attempt < maxRetries) {
      const waitTime = Math.pow(2, attempt) * 1000; 
      console.log(`Model overloaded. Retrying in ${waitTime / 1000}s...`);
      await delay(waitTime);
      return summarizeSubtitles(subtitles, attempt + 1, maxRetries);
    }

    throw new Error(message || "Gemini API request failed");
  }
}

module.exports = { summarizeSubtitles };
