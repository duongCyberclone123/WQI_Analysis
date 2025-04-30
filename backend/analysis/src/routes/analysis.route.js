const AnalysisController = require('../controllers/analysis.controller');
const express = require('express');
const router = express.Router();
const ExcelJS = require('exceljs');
const fs = require('fs');
const pool = require('../config/db.js');

router.get('/nb_of_observation_points', AnalysisController.nb_of_observation_points);
router.get('/nb_of_observations', AnalysisController.nb_of_observations);
router.get('/valid_quality', AnalysisController.valid_quality);
router.get('/water_quality', AnalysisController.water_quality);
router.get('/map', AnalysisController.Place_data);
router.get('/observe', AnalysisController.getObservationAt);
router.get('/fetch', AnalysisController.getDataSet)
const PDFDocument = require('pdfkit');
require('pdfkit-table'); // Thêm table method vào PDFDocument prototype
const path = require('path');
const { PassThrough } = require('stream');

router.get('/export/pdf', async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM alldata");

    console.log('Số dòng:', rows.length);
    if (!rows.length) throw new Error('Không có dữ liệu để xuất PDF');

    const doc = new PDFDocument({ margin: 30, size: 'A4' });
    doc.registerFont('Roboto', path.join(__dirname, 'Roboto-Regular.ttf'));
    doc.font('Roboto');

    // Tạo timestamp để đặt tên file lưu
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:T]/g, '').slice(0, 15); // YYYYMMDDHHMMSS
    const filename = `data_export_${timestamp}.pdf`;
    const filePath = path.join(__dirname, 'exports', filename);

    // Tạo thư mục nếu chưa tồn tại
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Tạo PassThrough để ghi ra 2 nơi: response và file
    const pass = new PassThrough();
    const fileStream = fs.createWriteStream(filePath);
    doc.pipe(pass);
    pass.pipe(res);        // Gửi về client
    pass.pipe(fileStream); // Ghi vào file

    // Header xuất PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

    doc.fontSize(18).text('BÁO CÁO DỮ LIỆU QUAN TRẮC', { align: 'center' }).moveDown();

    const rowsPerPage = 10;
    const totalPages = Math.ceil(rows.length / rowsPerPage);

    for (let page = 0; page < totalPages; page++) {
      if (page > 0) doc.addPage();

      const start = page * rowsPerPage;
      const currentRows = rows.slice(start, start + rowsPerPage);

      const headers = Object.keys(currentRows[0] || {});
      const body = currentRows.map(row =>
        headers.map(key => row[key]?.toString() || '')
      );

      doc.table({
        title: `Dữ liệu trang ${page + 1}`,
        headers,
        rows: body
      });
    }

    doc.end();
  } catch (err) {
    console.error('PDF Export Error:', err);
    if (!res.headersSent) {
      res.status(500).send('Export failed');
    }
  }
});

router.get('/export/excel', async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM alldata");
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Data Export');
  
      // Set column headers
      const headers = Object.keys(rows[0] || {});
      worksheet.columns = headers.map(header => ({ header, key: header }));
  
      // Add rows to the worksheet
      rows.forEach(row => {
        worksheet.addRow(row);
      });
  
      // Set response headers for Excel file download
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=data_export.xlsx');
  
      // Write to response
      await workbook.xlsx.write(res);
      res.end();
    } catch (err) {
      console.error('Excel Export Error:', err);
      res.status(500).send('Export failed');
    }
  }
)


module.exports = router;