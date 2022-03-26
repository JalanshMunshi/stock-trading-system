const { DataTypes } = require("sequelize");

const db = require('../db');

const MarketHours = db.define('marketHours', {
    startTime: {
        type: DataTypes.TIME,
        default: '08:00:00',
    },
    endTime: {
        type: DataTypes.TIME,
        default: '17:00:00',
    }
});

MarketHours.removeAttribute('id');
MarketHours.removeAttribute('createdAt');
MarketHours.removeAttribute('updatedAt');

module.exports = MarketHours;