require('dotenv').config();

// Storing my Gemini keys from .env
const GeminiKeys = [
  process.env.GEMINI_KEY_1,
  process.env.GEMINI_KEY_2,
  process.env.GEMINI_KEY_3,
  process.env.GEMINI_KEY_4,
  process.env.GEMINI_KEY_5,
  process.env.GEMINI_KEY_6,
  process.env.GEMINI_KEY_7,
];

// Optional: shuffle every time for better randomness
function getRandomGeminiKey() {
  const index = Math.floor(Math.random() * GeminiKeys.length);
  return GeminiKeys[index];
}

module.exports = {
  getRandomGeminiKey,
};
