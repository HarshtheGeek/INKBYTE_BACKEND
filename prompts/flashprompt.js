/**
 * Builds a clean prompt for flashcard generation using Gemini.
 * @param {string} topic - The topic for which flashcards should be generated.
 * @returns {string} The formatted AI prompt.
 */

const flashCardPrompt = (topic) => `
You are a flashcard generator AI.  
Generate **exactly 10 flashcards** on the topic: "${topic}".  

Each flashcard should be a JSON object with a "question" and "answer".  
Your output **must be ONLY a valid JSON array**, without markdown, code blocks, or extra text.  

Format strictly like this:
[
  {"question": "What is ...?", "answer": "Explanation..."},
  {"question": "Why ...?", "answer": "Because ..."}
]

Important:
- Do NOT include markdown, code blocks, or any extra commentary.
- Keep answers short and clear, like flashcards for quick revision.
`;

module.exports = { flashCardPrompt };
