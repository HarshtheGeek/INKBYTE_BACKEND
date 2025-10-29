const axios = require("axios");
const { getRandomGeminiKey } = require("../utils/GeminiKeys");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function summarizeSubtitles(subtitles, attempt = 1, maxRetries = 5) {
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
                text: `You are an AI study assistant. Generate **exam-ready study notes**
Guidelines:
- Generate a suitable title
- Use the transcription content; 
- Start the 50 words summary of what you will be explaining. 
- Organize notes into clear sections or headings based on topics in the video.
- Highlight important points, definitions, formulas, examples, and concepts.
- Include difference tables which is asked frequently from the given transcripton
- Add key takeaways and common mistakes at the end of each section.
- Keep notes concise, simple, and exam-friendly
- Provide code snippets examples that are in the transcription.
- conclude with short and simple summary of everything covered
- Start directly without "here are exam ready notes" headline

${subtitles}`
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

    // Retry if model is overloaded
    if (message.includes("overloaded") && attempt < maxRetries) {
      const waitTime = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s, 16s, ...
      console.log(`Model overloaded. Retrying in ${waitTime / 1000}s...`);
      await delay(waitTime);
      return summarizeSubtitles(subtitles, attempt + 1, maxRetries);
    }

    throw new Error(message || "Gemini API request failed");
  }
}

module.exports = { summarizeSubtitles };
