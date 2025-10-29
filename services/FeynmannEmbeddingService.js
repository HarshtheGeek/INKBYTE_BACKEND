const { GoogleGenAI } = require("@google/genai");
const similarity = require("compute-cosine-similarity");
const { getRandomGeminiKey } = require("../utils/GeminiKeys");

const FeynmanEmbeddingService = async (feynmanQueryResponse, feynmanUserResponse) => {
  try {
    const ai = new GoogleGenAI({ apiKey: getRandomGeminiKey() });

    const response = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: [feynmanQueryResponse, feynmanUserResponse],
      taskType: "SEMANTIC_SIMILARITY",
    });

    // Extract embeddings safely
    const embeddings =
      response.embeddings?.map(e => e.values) ||
      [response.data?.embedding?.values];

    if (!embeddings || embeddings.length < 2) {
      throw new Error("Failed to retrieve valid embeddings.");
    }

    const cosineSim = similarity(embeddings[0], embeddings[1]);

    return {
      success: true,
      similarityScore: cosineSim,
    };
  } catch (error) {
    console.error("Error in embedding or similarity calculation:", error);
    return {
      success: false,
      message: "Failed to compute similarity. Try again.",
    };
  }
};

module.exports = FeynmanEmbeddingService;
