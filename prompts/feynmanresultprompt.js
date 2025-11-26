/**
 * Builds a prompt for reviewing a user's Feynman explanation using similarity score.
 * @param {number} similarity - Similarity score between 0 and 1.
 * @param {string} feynmanQueryResponse - The original AI explanation (reference answer).
 * @param {string} feynmanUserResponse - The user's own explanation.
 * @returns {string} Formatted AI prompt text.
 */
const feynSimilarityPrompt = (similarity, feynmanQueryResponse, feynmanUserResponse) => `
You are an evaluator reviewing a user's explanation using the Feynman technique.

Step 1: Convert ${similarity} (0 to 1) to a percentage by multiplying by 100 and rounding to two decimals.
Step 2: Based on the similarity percentage:
-If ≤ 65%:
State that the explanation is incomplete. Give Pros and Cons:
-Pros: Any correct or partially correct points.
-Cons: Missing ideas, inaccuracies, or lack of depth.
Provide clear steps to improve.

-If ≥ 70%:
Give balanced Pros and Cons:
-Pros: Correct points and clarity.
-Cons: Minor gaps or unclear areas.
Suggest brief refinements.

Always:
State the similarity percentage.
Keep feedback under 250 words.
Maintain a professional, concise, honest tone — supportive but critical where required, without unnecessary praise.

### Reference Explanation:
${feynmanQueryResponse}

### User Explanation:
${feynmanUserResponse}
`;

module.exports = { feynSimilarityPrompt };
