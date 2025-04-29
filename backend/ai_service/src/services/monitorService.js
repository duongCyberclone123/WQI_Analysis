const axios = require('axios');

exports.fetchRealTimeData = async () => {
    try {
        // Gửi yêu cầu đến data_service để lấy dữ liệu mới nhất
        const response = await axios.get('http://localhost:8002/api/data/realtime'); 
        return response.data; // Giả định data_service có endpoint này
    } catch (error) {
        console.error('Error contacting data_service:', error.message);
        throw new Error('Mất kết nối đến hệ thống quan trắc');
    }
};
