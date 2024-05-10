const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Product extends Model { }

function initProductModel() {
  Product.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    }
  },
    {
      sequelize,
      modelName: 'product',
      tableName: 'products',
    }
  );
}

module.exports = { Product, initProductModel }