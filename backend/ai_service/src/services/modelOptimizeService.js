const modelUtils = require('../utils/modelUtils');

// Service: Điều phối việc retrain và deploy mô hình
exports.retrainAndDeployModel = async () => {
    // 1. Thu thập dữ liệu mới
    const trainingData = await modelUtils.fetchTrainingData();

    // 2. Train mô hình mới
    const { newModel, newAccuracy } = await modelUtils.trainNewModel(trainingData);

    // 3. Đánh giá mô hình cũ
    const currentAccuracy = await modelUtils.evaluateCurrentModel();

    // 4. So sánh độ chính xác
    if (newAccuracy >= currentAccuracy) {
        // Deploy mô hình mới
        await modelUtils.deployModel(newModel);
        return { message: 'Mô hình mới đã được triển khai thành công.', accuracy: newAccuracy };
    } else {
        // Giữ mô hình cũ
        return { message: 'Mô hình mới có độ chính xác thấp hơn. Giữ nguyên mô hình cũ.', accuracy: currentAccuracy };
    }
};
