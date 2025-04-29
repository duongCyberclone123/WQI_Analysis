const historyDataService = require('../services/historyDataService');

// Controller: Nhận file upload từ người dùng
exports.uploadHistoryData = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ success: false, message: 'Không có file được tải lên.' });
        }

        await historyDataService.processUploadedFile(file.path);

        res.status(200).json({ success: true, message: 'Nhập dữ liệu lịch sử thành công.' });
    } catch (error) {
        console.error('Upload history data error:', error.message);
        res.status(500).json({ success: false, message: 'Lỗi khi xử lý file.' });
    }
};
