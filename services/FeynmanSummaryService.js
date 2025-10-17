const axios = require("axios");
const { getRandomGeminiKey } = require("../utils/GeminiKeys");

// --- Helper: delay ---
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function feynSummarizer(recognizedText, attempt = 1, maxRetries = 5) {
  const apiKey = getRandomGeminiKey();
  console.log(`Using Gemini API Key: ${apiKey} | Attempt ${attempt}`);

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: `You are an AI study buddy.  
Your job is to **explain topics like user is 10 years old (Feynman method).**

### Instructions:
- **Break into sections** with clear, simple headings. 
- **Use kid-friendly words** (no jargon).  
- **Explain concepts, formulas, examples, and definitions** like short stories.  
- **Show differences** using tiny, simple tables.  
- If programming is mentioned, give **ready-to-run code** and explain it in plain words.  
- **Keep notes short, clear, and memory-friendly** (like flashcards).  
- End with a **tiny, baby-sized summary** covering all topics in super simple words.  
- Provide external reference links as well.

  ${recognizedText}`
              }
            ]
          }
        ]
      },
      { headers: { "Content-Type": "application/json" }, timeout: 20000 }
    );

    // --- Safe check for Gemini response ---
    const candidate = response.data?.candidates?.[0];
    if (!candidate?.content?.parts?.[0]?.text) {
      throw new Error("No summary returned from Gemini API");
    }

    return candidate.content.parts[0].text;
  } catch (error) {
    const message = error.response?.data?.error?.message || error.message;

    // Retry if model is overloaded
    if (message.includes("overloaded") && attempt < maxRetries) {
      const waitTime = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s, 16s, ...
      console.log(`Model overloaded. Retrying in ${waitTime / 1000}s...`);
      await delay(waitTime);
      return feynSummarizer(recognizedText, attempt + 1, maxRetries);
    }

    throw new Error(message || "Gemini API request failed");
  }
}

module.exports = { feynSummarizer };
