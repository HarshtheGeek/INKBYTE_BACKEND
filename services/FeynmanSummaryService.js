const axios = require("axios");
const { getRandomGeminiKey } = require("../utils/GeminiKeys");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

 const feynSummarizer = async (recognizedUserText, attempt = 1, maxRetries = 5) => {
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
Your job is to **explain topics like user is 12 years old in just 200 words (Feynman method).**
### Instructions:
- **Break into sections** with clear, simple headings. 
- **Use friendly words**. 
- **Explain concepts, formulas, examples, and definitions** like short stories.  
- **Show differences** using tiny, simple tables.    
- **Keep notes short, clear, and memory-friendly** (like flashcards).  
- End with a **tiny, baby-sized summary** covering all topics in super simple words.

  ${recognizedUserText}`
              }
            ]
          }
        ]
      },
      { headers: { "Content-Type": "application/json" }, timeout: 20000 }
    );

    //Safe check for Gemini response taaki baad mei dikkat na ho
    const candidate = response.data?.candidates?.[0];
    if (!candidate?.content?.parts?.[0]?.text) {
      throw new Error("No summary returned from Gemini API");
    }

    return candidate.content.parts[0].text;
  } catch (error) {
    const message = error.response?.data?.error?.message || error.message;

    // Retry if model is overloaded
    if (message.includes("overloaded") && attempt < maxRetries) {
      const waitTime = Math.pow(2, attempt) * 1000;
      console.log(`Model overloaded. Retrying in ${waitTime / 1000}s...`);
      await delay(waitTime);
      return feynSummarizer(recognizedUserText, attempt + 1, maxRetries);
    }

    throw new Error(message || "Gemini API request failed");
  }
}

module.exports = { feynSummarizer };
