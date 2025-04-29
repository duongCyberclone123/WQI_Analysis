const forecastService = require('../services/forecastService');

// Controller: Dự báo chất lượng nước
exports.predictWaterQuality = async (req, res) => {
    try {
        const result = await forecastService.predictWaterQuality();
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error('Forecast error:', error.message);
        res.status(500).json({ success: false, message: 'Lỗi dự báo chất lượng nước.' });
    }
};
