const express = require('express');
const {FlashCardController} = require("../controllers/FlashCardController");
const router = express.Router();

router.post('/flashcards', FlashCardController);

module.exports = router;
