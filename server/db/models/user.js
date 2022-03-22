const { DataTypes } = require("sequelize");

const db = require('../db');

const User = db.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        get() {
            return () => this.getDataValue('password')
        }
    },
    cashBalance: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
    },
    role: {
        type: DataTypes.ENUM('customer', 'admin'),
        default: 'customer',
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
});

module.exports = User;

// module.exports = (sequelize, Sequelize) => {
    

//     return User;
// }
