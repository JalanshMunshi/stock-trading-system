const { DataTypes } = require("sequelize");

const db = require('../db');

const MarketSchedule = db.define('marketSchedule', {
    Monday: {
        type: DataTypes.BOOLEAN,
        default: true,
    },
    Tuesday: {
        type: DataTypes.BOOLEAN,
        default: true,
    },
    Wednesday: {
        type: DataTypes.BOOLEAN,
        default: true,
    },
    Thursday: {
        type: DataTypes.BOOLEAN,
        default: true,
    },
    Friday: {
        type: DataTypes.BOOLEAN,
        default: true,
    },
    Saturday: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    Sunday: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
});

// MarketSchedule.removeAttribute('id');
// MarketSchedule.removeAttribute('createdAt');
// MarketSchedule.removeAttribute('updatedAt');

module.exports = MarketSchedule;