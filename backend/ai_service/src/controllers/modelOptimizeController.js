const modelOptimizeService = require('../services/modelOptimizeService');

// Controller: Xử lý khi người dùng yêu cầu tối ưu mô hình
exports.updateModel = async (req, res) => {
    try {
        const result = await modelOptimizeService.retrainAndDeployModel();

        res.status(200).json({
            success: true,
            message: result.message,
            modelAccuracy: result.accuracy
        });
    } catch (error) {
        console.error('Model optimize error:', error.message);
        res.status(500).json({ success: false, message: 'Lỗi cập nhật mô hình.' });
    }
};
