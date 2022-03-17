const { DataTypes } = require("sequelize/types");

const db = require('.');

const Stock = db.define('stock', {
    symbol: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
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
    }
});

module.exports = Stock;