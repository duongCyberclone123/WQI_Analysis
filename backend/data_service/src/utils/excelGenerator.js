const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const generateExcelReport = (data) => {
  return new Promise((resolve, reject) => {
    // Thư mục reports
    const reportsDir = path.join(__dirname, '../reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    // Tên file có timestamp để không bị ghi đè
    const fileName = `water_quality_report_${new Date().toISOString().replace(/[:.]/g, '-')}.xlsx`;
    const filePath = path.join(reportsDir, fileName);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Water Quality');

    // Định nghĩa cột
    worksheet.columns = [
      { header: 'STT', key: 'stt', width: 6 },
      { header: 'Ngày', key: 'date', width: 12 },
      { header: 'Địa điểm (opid)', key: 'opid', width: 12 },
      { header: 'Nhiệt độ', key: 'temperature', width: 12 },
      { header: 'pH', key: 'pH', width: 8 },
      { header: 'DO', key: 'DO', width: 8 },
      { header: 'Độ dẫn điện', key: 'conductivity', width: 14 },
      { header: 'Kiềm', key: 'alkalinity', width: 10 },
      { header: 'NO₂', key: 'no2', width: 10 },
      { header: 'NH₄', key: 'nh4', width: 10 },
      { header: 'PO₄', key: 'po4', width: 10 },
      { header: 'H₂S', key: 'h2s', width: 10 },
      { header: 'TSS', key: 'tss', width: 10 },
      { header: 'COD', key: 'cod', width: 10 },
      { header: 'Aeromonas tổng', key: 'aeromonas_total', width: 14 },
      { header: 'Edwardsiella', key: 'edwardsiella_ictaluri', width: 14 },
      { header: 'Aeromonas hydrophila', key: 'aeromonas_hydrophila', width: 18 },
      { header: 'Coliform', key: 'coliform', width: 12 },
      { header: 'WQI', key: 'wqi', width: 8 },
      { header: 'Chất lượng nước', key: 'water_quality', width: 16 },
    ];

    // Thêm dữ liệu vào Excel
    data.forEach((item, index) => {
      worksheet.addRow({
        stt: index + 1,
        date: item.date,
        opid: item.opid,
        temperature: item.temperature,
        pH: item.pH,
        DO: item.DO,
        conductivity: item.conductivity,
        alkalinity: item.alkalinity,
        no2: item.no2,
        nh4: item.nh4,
        po4: item.po4,
        h2s: item.h2s,
        tss: item.tss,
        cod: item.cod,
        aeromonas_total: item.aeromonas_total,
        edwardsiella_ictaluri: item.edwardsiella_ictaluri,
        aeromonas_hydrophila: item.aeromonas_hydrophila,
        coliform: item.coliform,
        wqi: item.wqi,
        water_quality: item.water_quality,
      });
    });

    // Ghi file
    workbook.xlsx.writeFile(filePath)
      .then(() => resolve(filePath))
      .catch((err) => reject(err));
  });
};

module.exports = generateExcelReport;
