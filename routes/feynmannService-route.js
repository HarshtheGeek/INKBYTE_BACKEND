const express = require('express');
const {feynmanController} = require('../controllers/FeynmanController');
const { feynmanEmbeddingController } = require("../controllers/FeynmanEmbeddingController");

const router = express.Router();

//First route is for feynman summary
router.post('/feynmann', feynmanController);
//Second route is for embedding that we are getting
router.post("/feynman-embedding", feynmanEmbeddingController);

module.exports = router;
