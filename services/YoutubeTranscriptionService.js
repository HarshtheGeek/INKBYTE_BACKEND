const axios = require("axios");
const { getRandomTranscriptKey } = require('../utils/TranscriptionKeys');

const BASE_URL = "https://www.youtube-transcript.io/api/transcripts";

const getTranscript = async (videoId) => {
  try {
    const transcriptKey = getRandomTranscriptKey();
    console.log("Using key:", transcriptKey);
    
    const response = await axios.post(
      BASE_URL,
      { ids: [videoId] },
      {
        headers: {
          Authorization: `Basic ${transcriptKey}`,
          "Content-Type": "application/json",
        },
        timeout: 50000,
      }
    );

    console.log("API Status:", response.status);
    
    // Check if we got a valid response with transcript data
    if (Array.isArray(response.data) && response.data.length > 0) {
      const videoData = response.data[0];
      
      // Check if transcript data exists in the tracks array
      if (videoData.tracks && 
          Array.isArray(videoData.tracks) && 
          videoData.tracks.length > 0 &&
          videoData.tracks[0].transcript &&
          Array.isArray(videoData.tracks[0].transcript)) {
        
        // Extract text from transcript segments
        const transcriptText = videoData.tracks[0].transcript
          .map(segment => segment.text)
          .join(' ')
          .trim();
        
        console.log("Extracted transcript length:", transcriptText.length);
        return transcriptText;
      } else {
        throw new Error("No transcript available for this video");
      }
    }
    
    throw new Error("Unexpected API response format");

  } catch (error) {
    console.error("Error fetching transcript:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
    throw error;
  }
};

module.exports = { getTranscript };