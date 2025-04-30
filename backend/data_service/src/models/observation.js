const { DataTypes } = require('sequelize');
const sequelize = require('../services/db');
const ObservePlace = require('./observePlace');

const Observation = sequelize.define('Observation', {
  oid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATEONLY,  // Kiểu ngày (chỉ ngày mà không có thời gian)
    allowNull: false
  },
  temperature: {
    type: DataTypes.DECIMAL(12, 4),
    allowNull: false
  },
  pH: {
    type: DataTypes.DECIMAL(12, 4),
    allowNull: false
  },
  DO: {
    type: DataTypes.DECIMAL(12, 4),
    allowNull: false
  },
  conductivity: {
    type: DataTypes.DECIMAL(12, 4),
    allowNull: false
  },
  alkalinity: {
    type: DataTypes.DECIMAL(12, 4),
    allowNull: false
  },
  no2: {
    type: DataTypes.DECIMAL(12, 4),
    allowNull: false
  },
  nh4: {
    type: DataTypes.DECIMAL(12, 4),
    allowNull: false
  },
  po4: {
    type: DataTypes.DECIMAL(12, 4),
    allowNull: false
  },
  h2s: {
    type: DataTypes.DECIMAL(12, 4),
    allowNull: false
  },
  tss: {
    type: DataTypes.DECIMAL(12, 4),
    allowNull: false
  },
  cod: {
    type: DataTypes.DECIMAL(12, 4),
    allowNull: false
  },
  aeromonas_total: {
    type: DataTypes.DECIMAL(12, 4),
    allowNull: false
  },
  edwardsiella_ictaluri: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  aeromonas_hydrophila: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  coliform: {
    type: DataTypes.DECIMAL(12, 4),
    allowNull: false
  },
  wqi: {
    type: DataTypes.SMALLINT,
    allowNull: false
  },
  water_quality: {
    type: DataTypes.SMALLINT,
    allowNull: false
  },
  opid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'observe_place',
      key: 'opid'
    }
  }
}, {
  tableName: 'observation',
  freezeTableName: true,
  timestamps: false
});
Observation.belongsTo(ObservePlace, { foreignKey: 'opid', as: 'observePlace' });
module.exports = Observation;
