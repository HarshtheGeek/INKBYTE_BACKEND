/**
 * Builds a prompt for reviewing a user's Feynman explanation using similarity score.
 * @param {number} similarity - Similarity score between 0 and 1.
 * @param {string} feynmanQueryResponse - The original AI explanation (reference answer).
 * @param {string} feynmanUserResponse - The user's own explanation.
 * @returns {string} Formatted AI prompt text.
 */
const feynSimilarityPrompt = (similarity, feynmanQueryResponse, feynmanUserResponse) => `
You are an insightful reviewer evaluating a user's explanation using the Feynman technique.

**Step 1:** Convert the provided similarity value (${similarity}) — which ranges from 0 to 1 — into a percentage by multiplying it by 100. Round it to two decimal places.

**Step 2:** Based on the converted percentage:
- If the similarity is **65% or below**, provide clear, professional feedback explaining where the explanation diverges and what key ideas were missed. Include concise suggestions for improvement.
- If the similarity is **70% or above**, acknowledge the user’s strong understanding, highlight precise areas of alignment, and recommend minor refinements if needed.

**Always:**
- Mention the similarity percentage explicitly.
- Keep your feedback within **250 words**.
- Maintain a **polished, encouraging, and professional tone**.

### Reference Explanation:
${feynmanQueryResponse}

### User Explanation:
${feynmanUserResponse}
`;

module.exports = { feynSimilarityPrompt };
