/**
 * Builds the prompt for summarizing YouTube subtitles into exam-ready notes.
 * @param {string} subtitles - The transcript/subtitles text.
 * @returns {string} Formatted AI prompt text.
 */
const subtitlePrompt = (subtitles) => `
You are an AI study assistant. Generate **exam-ready study notes**
Guidelines:
- Generate a suitable title.
- Use the transcription content.
- Start with a 50-word summary of what you will be explaining.
- Organize notes into clear sections or headings based on topics in the video.
- Highlight important points, definitions, formulas, examples, and concepts.
- Include difference tables frequently asked from the transcription.
- Add key takeaways and common mistakes at the end of each section.
- Keep notes concise, simple, and exam-friendly.
- Provide code snippet examples that are in the transcription.
- Conclude with a short and simple summary of everything covered.
- Start directly without "here are exam-ready notes" headline.

${subtitles}
`;

module.exports = { subtitlePrompt };
