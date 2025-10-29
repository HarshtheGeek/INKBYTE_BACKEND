const FeynmanEmbeddingService = require("../services/FeynmannEmbeddingService");

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
    let feedback = "";

    //condition to check, agar 85 se uppar means well n good else can be improved else lets see
    if (similarity >= 0.85) feedback = "Excellent! You explained it very well!";
    else if (similarity >= 0.65) feedback = "Good effort! You are getting there.";
    else feedback = "Needs improvement. Try explaining it again in simpler words.";

    return res.status(200).json({
      message: "Cosine similarity calculated successfully.",
      success: true,
      similarity: similarity.toFixed(4),
      feedback,
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
