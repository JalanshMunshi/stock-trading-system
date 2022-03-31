const { DataTypes } = require("sequelize");

const db = require('../db');

const Stock = db.define('stock', {
    stock_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    symbol: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    volume: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    openingPrice: {
        type: DataTypes.FLOAT,
        default: 0.0,
    },
    high: {
        type: DataTypes.FLOAT,
        default: 0.0
    },
    low: {
        type: DataTypes.FLOAT,
        default: 1000000,
    },
});

module.exports = Stock;