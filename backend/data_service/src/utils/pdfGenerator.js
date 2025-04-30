const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Đường dẫn đến phông chữ Times New Roman
const fontPath = path.join(__dirname, './fonts/times.ttf'); // Đảm bảo có phông chữ Times New Roman

const generatePdfReport = (data) => {
  return new Promise((resolve, reject) => {
    // Tạo đường dẫn tuyệt đối đến thư mục reports
    const reportsDir = path.join(__dirname, '../reports');

    // Nếu thư mục chưa tồn tại thì tạo
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    // Tạo đường dẫn tuyệt đối đến file PDF
    const filePath = path.join(reportsDir, 'water_quality_report.pdf');

    // Tạo file PDF mới
    const doc = new PDFDocument();

    // Tải phông chữ Times New Roman
    doc.font(fontPath);

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Ghi tiêu đề và thời gian
    doc.fontSize(20).text('BÁO CÁO CHẤT LƯỢNG NƯỚC', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Thời gian tạo: ${new Date().toLocaleString()}`);
    doc.moveDown();

    // Ghi dữ liệu từng dòng
    if (data.length === 0) {
      doc.text('Không có dữ liệu trong khoảng thời gian này.');
    } else {
      data.forEach((item, index) => {
        doc.text(`${index + 1}:`, { continued: false, lineGap: 4 });
      
        // Tách nội dung text nếu có nhiều thông số
        const lines = item.text.split('\n').map(line => line.trim()).filter(Boolean);
        lines.forEach(line => {
          doc.text(line, { width: 500 }); // kiểm soát chiều rộng để tránh xuống dòng không mong muốn
        });
      
        doc.moveDown(); // cách dòng giữa các bản ghi
      });
      
    }
    

    doc.end();

    // Xử lý khi ghi xong file
    stream.on('finish', () => resolve(filePath));
    stream.on('error', (err) => reject(err));
  });
};

module.exports = generatePdfReport;
