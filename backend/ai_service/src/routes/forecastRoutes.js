const express = require('express');
const router = express.Router();
const forecastController = require('../controllers/forecastController');

// Route: Dự báo chất lượng nước
router.post('/predict', forecastController.predictWaterQuality);

module.exports = router;
