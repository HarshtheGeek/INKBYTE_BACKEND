// Utility to extract plain text from transcript API response
const extractTranscriptText = (data, videoId) => {
  if (!data) return "";

  // If API returned object with video ID as key
  if (videoId && data[videoId] && Array.isArray(data[videoId])) {
    return data[videoId].map(item => item.text).join(" ");
  }

  // If API returned array directly
  if (Array.isArray(data)) {
    return data.map(item => (item.text ? item.text : item)).join(" ");
  }

  // If API returned object with 'transcript' property
  if (data.transcript && Array.isArray(data.transcript)) {
    return data.transcript.map(item => item.text).join(" ");
  }

  return ""; // fallback
};

module.exports = extractTranscriptText;
