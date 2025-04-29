const express = require('express');
const router = express.Router();
const historyDataController = require('../controllers/historyDataController');
const multer = require('multer');

// Dùng multer để nhận file upload
const upload = multer({ dest: 'uploads/' });

// Route upload file dữ liệu lịch sử
router.post('/upload', upload.single('file'), historyDataController.uploadHistoryData);

module.exports = router;
