const { Op } = require('sequelize');
const Observation = require('../models/observation');
const ObservePlace = require('../models/observePlace');

// Hàm lấy dữ liệu báo cáo từ bảng observation
async function generateReportData(startDate, endDate, opid) {
  // Kiểm tra các tham số đầu vào cơ bản
  if (!startDate || !endDate || !opid) {
    throw new Error('Missing parameters startDate, endDate or opid');
  }

  // Thực hiện truy vấn
  const data = await Observation.findAll({
    where: {
      date: {
        [Op.between]: [startDate, endDate]
      },
      opid: opid
    }
  });

  return data;
}

// Hàm xuất báo cáo PDF
async function generatePdfReportService(startDate, endDate, opid) {
  // Lấy dữ liệu
  const data = await generateReportData(startDate, endDate, opid);

  // Chuyển dữ liệu sang định dạng cho PDFGenerator
  const formatted = data.map(item => ({
    text: 
      `Ngày: ${new Date(item.date).toLocaleDateString('vi-VN')}\n` +
      `- Nhiệt độ: ${item.temperature}\n` +
      `- pH: ${item.pH}\n` +
      `- DO: ${item.DO}\n` +
      `- Độ dẫn điện: ${item.conductivity}\n` +
      `- Kiềm: ${item.alkalinity}\n` +
      `- NO2: ${item.no2}\n` +
      `- NH4: ${item.nh4}\n` +
      `- PO4: ${item.po4}\n` +
      `- H2S: ${item.h2s}\n` +
      `- TSS: ${item.tss}\n` +
      `- COD: ${item.cod}\n` +
      `- Aeromonas (tổng): ${item.aeromonas_total}\n` +
      `- Edwardsiella ictaluri: ${item.edwardsiella_ictaluri ? 'Có' : 'Không'}\n` +
      `- Aeromonas hydrophila: ${item.aeromonas_hydrophila ? 'Có' : 'Không'}\n` +
      `- Coliform: ${item.coliform}\n` +
      `- WQI: ${item.wqi}\n` +
      `- Xếp loại nước: ${item.water_quality}`
  }));
  

  // Gọi hàm tạo PDF (bạn đã viết ở utils/pdfGenerator.js)
  const generatePdfReport = require('../utils/pdfGenerator');
  const filePath = await generatePdfReport(formatted);

  return filePath;
}

// Hàm xuất báo cáo Excel
async function generateExcelReportService(startDate, endDate, opid) {
  // Lấy dữ liệu từ bảng Observation với các tham số startDate, endDate, opid
  const data = await generateReportData(startDate, endDate, opid);

  // Định dạng dữ liệu để xuất ra Excel, mỗi item chứa các thông số cần thiết
  const formatted = data.map(item => ({
    stt: item.id, // Thêm số thứ tự nếu cần
    date: item.date instanceof Date
      ? item.date.toLocaleDateString('vi-VN')
      : new Date(item.date).toLocaleDateString('vi-VN'),
    opid: item.opid,
    temperature: item.temperature || 'N/A',
    pH: item.pH || 'N/A',
    DO: item.DO || 'N/A',
    conductivity: item.conductivity || 'N/A',
    alkalinity: item.alkalinity || 'N/A',
    no2: item.no2 || 'N/A',
    nh4: item.nh4 || 'N/A',
    po4: item.po4 || 'N/A',
    h2s: item.h2s || 'N/A',
    tss: item.tss || 'N/A',
    cod: item.cod || 'N/A',
    aeromonas_total: item.aeromonas_total || 'N/A',
    edwardsiella_ictaluri: item.edwardsiella_ictaluri ? 'Có' : 'Không',
    aeromonas_hydrophila: item.aeromonas_hydrophila ? 'Có' : 'Không',
    coliform: item.coliform || 'N/A',
    wqi: item.wqi || 'N/A',
    water_quality: item.water_quality || 'N/A',
  }));

  // Gọi hàm tạo Excel Report từ utils/excelGenerator
  const generateExcelReport = require('../utils/excelGenerator');
  const filePath = await generateExcelReport(formatted);

  return filePath;

}

module.exports = {
  generateReportData,
  generatePdfReportService,
  generateExcelReportService
};