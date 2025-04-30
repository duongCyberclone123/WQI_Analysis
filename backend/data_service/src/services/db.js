const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'do_an_HTTT',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
    define: {
      freezeTableName: true,
      timestamps: true
    }
  }
);

// Kiểm tra kết nối
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Sequelize đã kết nối CSDL thành công.');
  } catch (error) {
    console.error('Lỗi khi kết nối Sequelize:', error.message);
  }
})();

module.exports = sequelize;
