const fileParser = require('../utils/fileParser');
const db = require('../utils/db');

// Service: Parse file + Validate + Insert DB
exports.processUploadedFile = async (filePath) => {
    // Parse file CSV hoặc Excel
    const data = await fileParser.parseFile(filePath);

    // Validate dữ liệu
    const validData = data.filter(item => 
        item.timestamp && 
        item.parameter && 
        item.value !== undefined
    );

    if (validData.length === 0) {
        throw new Error('Dữ liệu không hợp lệ hoặc trống.');
    }

    // Insert vào database
    for (const item of validData) {
        await db.query(`
            INSERT INTO measurements (timestamp, parameter, value)
            VALUES (?, ?, ?)
        `, [item.timestamp, item.parameter, item.value]);
    }
};
