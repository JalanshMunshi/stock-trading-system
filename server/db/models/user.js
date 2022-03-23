const { DataTypes, Sequelize } = require("sequelize");
const crypto = require('crypto');
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
            return () => this.getDataValue('password');
        }
    },
    salt: {
        type: DataTypes.STRING,
        get() {
            return () => this.getDataValue('salt');
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

User.prototype.correctPassword = (password) => {
    return User.encryptPassword(password, this.salt()) === this.password();
}

User.generateSalt = () => {
    return crypto.randomBytes(16).toString('base64');
}

User.encryptPassword = function(plainText, salt) {
    return crypto
        .createHash('RSA-SHA256')
        .update(plainText)
        .update(salt)
        .digest('hex');
}

const setSaltAndPassword = user => {
    if (user.changed('password')) {
        user.salt = User.generateSalt();
        user.password = User.encryptPassword(user.password(), user.salt());
    }
}

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate(users => {
    users.forEach(setSaltAndPassword);
});
