const monitorService = require('../services/monitorService');

exports.getRealTimeData = async (req, res, next) => {
    try {
        const data = await monitorService.fetchRealTimeData();
        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        console.error('Error fetching real-time data:', error.message);
        res.status(500).json({
            success: false,
            message: 'Không thể lấy dữ liệu thời gian thực. Vui lòng thử lại sau.',
        });
    }
};
