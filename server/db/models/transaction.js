const { DataTypes } = require("sequelize/types");

const db = require('.');
const Stock = require("./stock");
const User = require("./user");

const Transaction = db.define('transaction', {
    transaction_id: {
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
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    transactionType: {
        type: DataTypes.ENUM('buy', 'sell'),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    shares: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

module.exports = Transaction;