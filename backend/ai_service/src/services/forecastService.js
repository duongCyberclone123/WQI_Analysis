const db = require('../utils/db');
const mlModel = require('../utils/mlModel');

// Service: Dự báo chất lượng nước
exports.predictWaterQuality = async () => {
    // Lấy dữ liệu lịch sử mới nhất
    const [rows] = await db.query(`
        SELECT *
        FROM measurements
        ORDER BY timestamp DESC
        LIMIT 100
    `);

    if (rows.length === 0) {
        throw new Error('Không có dữ liệu để dự báo.');
    }

    // Gọi mô hình AI dự báo
    const { prediction, confidence } = await mlModel.predict(rows);

    return { prediction, confidence };
};
