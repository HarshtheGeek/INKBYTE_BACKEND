const {feynSummarizer} = require('../services/FeynmanSummaryService');

const feynmanController = async (req,res) => {

    try{
        //we took the recognized text from the req.body
    const {recognizedText} = req.body ; 

    //if no recognized text is there we return some error
    if (!recognizedText) {
  return res.status(400).json({
    message: "recognizedText is required. Please try again.",
    success: false,
  });
}


    //if we get the recognized text we send it to feynsummarizer
    const feynSummary = await feynSummarizer(recognizedText);

    return res.status(200).json({
      message: "Summary fetched successfully",
      success: true,
      feynSummary,
    });

    }catch(error){
        console.error("SummarizeController Error:", error.message);

        return res.status(500).json({
      message: "An error occurred while fetching the feynman summary.",
      error: error.message,
      success: false,
    });
    }
    
}

module.exports = { feynmanController };