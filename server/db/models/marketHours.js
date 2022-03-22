const { DataTypes } = require("sequelize/types");

const db = require('.');

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

module.exports = MarketHours;