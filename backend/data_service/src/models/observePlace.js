const { DataTypes } = require('sequelize');
const sequelize = require('../services/db'); // Sequelize instance đã cấu hình

const ObservePlace = sequelize.define('ObservePlace', {
  opid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  opname: {
    type: DataTypes.STRING(255),  // Tương ứng NVARCHAR(255)
    allowNull: false
  },
  placenum: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  coordinate: {
    type: DataTypes.STRING(100),  // Tương ứng NVARCHAR(100)
    allowNull: true
  },
  wid: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'observe_place',
  freezeTableName: true,
  timestamps: false
});

module.exports = ObservePlace;
