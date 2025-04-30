const sendEmail = require('../utils/mailer');

const THRESHOLDS = {
  temperature: [20, 35],
  pH: [6.5, 8.5],
  DO: [5, 14],
  conductivity: [0, 1000],
  alkalinity: [20, 200],
  no2: [0, 0.5],
  nh4: [0, 1],
  po4: [0, 0.5],
  h2s: [0, 0.05],
  tss: [0, 50],
  cod: [0, 150],
  aeromonas_total: [0, 100],
  coliform: [0, 1000],
  wqi: [0, 100],
};

const checkThresholdsAndAlert = async (sensorData) => {
  const { parameter, value } = sensorData;

  const [min, max] = THRESHOLDS[parameter] || [];

  if (min === undefined || max === undefined) {
    console.warn(`Không có ngưỡng cho thông số ${parameter}. Bỏ qua.`);
    return;
  }

  if (value < min || value > max) {
    const message = `Cảnh báo: Thông số *${parameter}* vượt ngưỡng!\n` +
                    `Giá trị hiện tại: ${value}\n` +
                    `Ngưỡng cho phép: ${min} - ${max}`;

    try {
      await sendEmail('admin@example.com', 'Cảnh báo chất lượng nước', message);
      console.log(`Đã gửi cảnh báo cho thông số ${parameter}`);
    } catch (error) {
      console.error(`Gửi email thất bại cho ${parameter}:`, error.message);
    }
  }
};

module.exports = { checkThresholdsAndAlert };
