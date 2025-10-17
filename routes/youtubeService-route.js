const express = require('express');
const { summarizeController } = require('../controllers/YoutubeController');
const {feynmanController} = require('../controllers/FeynmanController');

const router = express.Router();

router.post('/summarize', summarizeController);
router.post('/feynmann', feynmanController);

module.exports = router;
