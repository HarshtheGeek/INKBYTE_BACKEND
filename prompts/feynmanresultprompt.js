/**
 * Builds a prompt for reviewing a user's Feynman explanation using similarity score.
 * @param {number} similarity - Similarity score between 0 and 1.
 * @param {string} feynmanQueryResponse - The original AI explanation (reference answer).
 * @param {string} feynmanUserResponse - The user's own explanation.
 * @returns {string} Formatted AI prompt text.
 */
const feynSimilarityPrompt = (
    similarity,
    feynmanQueryResponse,
    feynmanUserResponse
) => {
    const percentage = (Number(similarity) * 100).toFixed(2);

    return `
Evaluate the user's explanation using the Feynman technique.

Similarity: ${percentage}%
Do not recalculate or change this percentage.

Evaluate:
- Correct concepts
- Missing or incorrect concepts
- Clarity and completeness
- Specific improvements

If <65%: explain major gaps with Pros, Cons, and Steps to Improve.
If 65-69.99%: give balanced Pros, Cons, and improvements.
If >=70%: give balanced Pros, Cons and brief refinements.

Do not penalize different wording if the concept is correct. Do not invent mistakes.
Keep the response under 200 words. If the answer is too short then tell the user to provide more info as a feedback


Reference:
${feynmanQueryResponse}

User:
${feynmanUserResponse}
`;
};

module.exports = { feynSimilarityPrompt };
