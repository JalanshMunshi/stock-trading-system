const { DataTypes } = require("sequelize/types");
const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING
        },
        fullName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        cashBalance: {
            type: DataTypes.FLOAT
        }
    });

    return User;
}