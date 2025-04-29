const express = require('express');
const router = express.Router();
const monitorController = require('../controllers/monitorController');

// Lấy dữ liệu quan trắc real-time
router.get('/realtime', monitorController.getRealTimeData);

module.exports = router;
