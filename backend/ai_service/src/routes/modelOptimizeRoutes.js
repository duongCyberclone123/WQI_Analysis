const express = require('express');
const router = express.Router();
const modelOptimizeController = require('../controllers/modelOptimizeController');

// Route để update (retrain) mô hình
router.post('/update-model', modelOptimizeController.updateModel);

module.exports = router;
