const { FlashCardService } = require("../services/FlashCardService");

const FlashCardController = async (req, res) => {
  try {

    //Took the topic from the request body
    const { topic } = req.body;

    //If topic does not exists throw the error
    if (!topic) {
      return res.status(400).json({
        message: "Topic is required.",
        success: false,
      });
    }

    //If noerror exists then provide then call FlashCard service
    const flashcards = await FlashCardService(topic);

    //if the given flash card is not an array throw error
    if (!Array.isArray(flashcards)) {
      throw new Error("Response is not an array");
    }

    //Filter the flashcard is only question and answer
    const validFlashcards = flashcards.filter(
      (card) => card && card.question && card.answer
    );

    //IF flashcard length is zero that means its an error
    if (validFlashcards.length === 0) {
      throw new Error("No valid flashcards generated");
    }

    return res.status(200).json(validFlashcards);
  } catch (error) {
    console.error("FlashCardController Error:", error.message);
    return res.status(500).json({
      message: "An error occurred while generating flashcards.",
      error: error.message,
      success: false,
    });
  }
};

module.exports = { FlashCardController };
