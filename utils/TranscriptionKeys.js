// Load environment variables
require('dotenv').config();

// Store your transcription keys from .env
const TranscriptionKeys = [
  process.env.TRANSCRIPTION_KEY_1,
  process.env.TRANSCRIPTION_KEY_2,
  process.env.TRANSCRIPTION_KEY_3,
  process.env.TRANSCRIPTION_KEY_4,
  process.env.TRANSCRIPTION_KEY_5,
  process.env.TRANSCRIPTION_KEY_6,
  process.env.TRANSCRIPTION_KEY_7,
]

function getRandomTranscriptKey() {
  const index = Math.floor(Math.random() * TranscriptionKeys.length);
  return TranscriptionKeys[index];
}

module.exports = {
  getRandomTranscriptKey,
};
