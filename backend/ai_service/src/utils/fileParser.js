const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// Utils: Đọc file CSV hoặc Excel
exports.parseFile = async (filePath) => {
    const ext = path.extname(filePath).toLowerCase();

    if (ext === '.csv') {
        return await parseCSV(filePath);
    } else if (ext === '.xlsx' || ext === '.xls') {
        return parseExcel(filePath);
    } else {
        throw new Error('Định dạng file không hỗ trợ.');
    }
};

function parseCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
    });
}

function parseExcel(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(sheet);
}
