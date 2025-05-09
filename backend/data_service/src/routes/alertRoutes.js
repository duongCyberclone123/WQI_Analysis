const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

// API test thêm cảnh báo (hoặc tích hợp trong xử lý sensor data)
router.post('/test', async (req, res) => {
  const { parameter, value } = req.body;
  const { checkThresholdsAndAlert } = require('../services/alertService');
  await checkThresholdsAndAlert({ parameter, value });
  res.json({ message: 'Đã xử lý dữ liệu' });
});

module.exports = router;
