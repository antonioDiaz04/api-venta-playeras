const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Playera = sequelize.define('Playera', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  talla_seleccionada: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  nombre: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  nuevo: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  },
  oferta: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  },
  forma_cuello: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  precio_anterior: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  precio_actual: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  mostrar_precio_anterior: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  imagenes: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  }
}, {
  tableName: 'tbl_playera',
  timestamps: false,
});

module.exports = Playera;
