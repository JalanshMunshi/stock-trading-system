const User = require('./user');
const Stock = require('./stock');
const Portfolio = require('./portfolio');
const Transaction = require('./transaction');
const MarketHours = require('./marketHours');
const MarketSchedule = require('./marketSchedule');

// It turns out these relationships are useless as I already designed the DB 
// considering all the 1:N and M:N relationships. As BCNF as possible.

// M:N relationship beween stock and portfolio
// Portfolio.belongsToMany(Stock, {
//   through: {model: Transaction, unique: false},
//   constraints: false,
//   foreignKey: 'portfolio_id'
// });
// Stock.belongsToMany(Portfolio, {
//   through: {model: Transaction, unique: false},
//   constraints: false,
//   foreignKey: 'stock_id'
// });

// 1:M relationship from user to portfolio
// User.hasMany(Portfolio, {
//   foreignKey: 'user_id',
// });
// Portfolio.belongsTo(User, {
//   foreignKey: 'user_id',
// });

module.exports = {
  User,
  Stock,
  Portfolio,
  Transaction,
  MarketHours,
  MarketSchedule
};