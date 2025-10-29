const express = require('express');
const {feynmanController} = require('../controllers/FeynmanController');
const { feynmanEmbeddingController } = require("../controllers/FeynmanEmbeddingController");

const router = express.Router();

router.post('/feynmann', feynmanController);
router.post("/compare", feynmanEmbeddingController);

module.exports = router;
