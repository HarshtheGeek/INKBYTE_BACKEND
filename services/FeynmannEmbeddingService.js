const { GoogleGenAI } = require("@google/genai");
const similarity = require("compute-cosine-similarity");
const { getRandomGeminiKey } = require("../utils/GeminiKeys");

//These 2 will come from flutter frontend ek jo gemini dega aur dusra jo user type ya bolega

const FeynmanEmbeddingService = async (feynmanQueryResponse, feynmanUserResponse) => {
  try {

    // api kys are already defined and is using round robin
    const ai = new GoogleGenAI({ apiKey: getRandomGeminiKey() });

    //Latest gemini model with the task of semantic similarity
    const response = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: [feynmanQueryResponse, feynmanUserResponse],
      taskType: "SEMANTIC_SIMILARITY",
    });

    // Extracting embeddings safely
    const embeddings =
      response.embeddings?.map(e => e.values) ||
      [response.data?.embedding?.values];

    if (!embeddings || embeddings.length < 2) {
      throw new Error("Failed to retrieve valid embeddings.");
    }

    const cosineSim = similarity(embeddings[0], embeddings[1]);

    //Similarity score milgis do ke beech ki
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
