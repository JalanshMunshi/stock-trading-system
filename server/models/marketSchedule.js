const { DataTypes } = require("sequelize/types");

const db = require('.');

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

module.exports = MarketSchedule;