const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { generatePdfReportService, generateExcelReportService } = require('../services/reportService');

// Chỉ người dùng đã đăng nhập mới có thể xuất báo cáo
router.post('/generate-pdf', auth(['user', 'admin']), async (req, res) => {
  const { startDate, endDate, opid } = req.body;

  if (!startDate || !endDate || !opid) {
    return res.status(400).json({ error: 'Thiếu thông tin yêu cầu: startDate, endDate, opid' });
  }

  try {
    const filePath = await generatePdfReportService(startDate, endDate, opid);

    // Thiết lập header để tải file về
    res.download(filePath, 'bao_cao_chat_luong_nuoc.pdf', (err) => {
      if (err) {
        console.error('Lỗi khi gửi file:', err);
        res.status(500).json({ error: 'Không thể gửi file PDF' });
      }
    });
  } catch (error) {
    console.error('Lỗi khi tạo báo cáo:', error);
    res.status(500).json({ error: 'Không thể tạo báo cáo PDF', details: error.message });
  }
});

router.post('/generate-excel', auth(['user', 'admin']), async (req, res) => {
  const { startDate, endDate, opid } = req.body;

  // Kiểm tra tham số đầu vào
  if (!startDate || !endDate || !opid) {
    return res.status(400).json({
      error: 'Thiếu tham số',
      details: 'Cần cung cấp startDate, endDate và opid',
    });
  }

  try {
    // Gọi hàm tạo báo cáo Excel
    const filePath = await generateExcelReportService(startDate, endDate, opid);

    // Trả về file Excel với tên file có thể thay đổi
    res.download(filePath, 'water_quality_report.xlsx', (err) => {
      if (err) {
        return res.status(500).json({
          error: 'Không thể tải file báo cáo',
          details: err.message,
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Không thể tạo báo cáo Excel', details: error.message });
  }
});


module.exports = router;
