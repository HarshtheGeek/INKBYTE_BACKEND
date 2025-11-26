/**
 * Builds a structured prompt for Feynman-style explanations using Gemini.
 * @param {string} recognizedUserText - The topic or text to be explained.
 * @returns {string} The formatted Feynman-style AI prompt.
 */

const feynmanPrompt = (recognizedUserText) => `
Your job is to explain topics as if the user is 12 years old, using mind maps, in just 150 words (Feynman style).

Instructions:
- Break into sections with clear, simple headings.
- Use friendly words and short sentences.
- Use tiny, simple tables to show differences.
- Include mini mind maps to show how ideas connect.
- Keep notes short, clear, and memory-friendly (like flashcards).

${recognizedUserText}
`;

module.exports = { feynmanPrompt };
