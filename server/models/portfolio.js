const { DataTypes } = require("sequelize/types");

const db = require('.');

const Portfolio = db.define('portfolio', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        foreignKey: true
    },
    symbol: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        foreignKey: true
    },
    shares: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
});

module.exports = Portfolio;