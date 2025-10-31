const FeynmanEmbeddingService = require("../services/FeynmannEmbeddingService");
const { feynSimilarity } = require("../services/FeynmanResultService");
const feynmanEmbeddingController = async (req, res) => {
  try {

    //Req body se ye do cheezei leli
    const { feynmanQueryResponse, feynmanUserResponse } = req.body;

    if (!feynmanQueryResponse || !feynmanUserResponse) {
      return res.status(400).json({
        message: "Both 'feynmanQueryResponse' and 'feynmanUserResponse' are required.",
        success: false,
      });
    }

    //Extracted the coseine similarity of the queries and responses
    const result = await FeynmanEmbeddingService(
      feynmanQueryResponse,
      feynmanUserResponse
    );

    if (!result.success) {
      return res.status(500).json({
        message: result.message,
        success: false,
      });
    }

    const similarity = result.similarityScore;

    const similarityResult = await feynSimilarity(similarity,feynmanQueryResponse,feynmanUserResponse);

    return res.status(200).json({
      message: "Cosine similarity calculated successfully.",
      success: true,
      similarity: similarity.toFixed(4),
      similarityResult
    });

  } catch (error) {
    console.error("Error in feynmanEmbeddingController:", error);

    return res.status(500).json({
      message: "An error occurred while comparing explanations.",
      error: error.message,
      success: false,
    });
  }
};

module.exports = { feynmanEmbeddingController };
