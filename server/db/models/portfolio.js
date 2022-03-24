const { DataTypes } = require("sequelize");

const db = require('../db');

const Portfolio = db.define('portfolio', {
    portfolio_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    symbol: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    shares: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
});

module.exports = Portfolio;