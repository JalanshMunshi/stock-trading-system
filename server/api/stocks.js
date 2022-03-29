const { Stock, User, Portfolio, Transaction } = require('../db/models');

const router = require('express').Router();
module.exports = router;

router.get('/get-stocks', async (req, res, next) => {
    try {
        var stocks = [];
        await Stock.findAll({
            order: [
                ['symbol', 'ASC']
            ],
            attributes: [
                'symbol',
                'companyName',
                'volume',
                'price',
            ]
        }).then(data => {
            // console.log(data)
            var key = 1;
            data.forEach(dp => {
                var stock = {};
                stock.key = key.toString();
                stock.symbol = dp.dataValues.symbol;
                stock.price = dp.dataValues.price;
                stock.volume = dp.dataValues.volume;
                stock.marketCap = dp.dataValues.volume * dp.dataValues.price;
                stocks.push(stock);
                key += 1;
            });
            // console.log(stocks);
        });
        res.status(200).send({
            stocks
        });
    } catch (err) {
        next(err);
    }
})

// Buy stock
// Request must have email, symbol, quantity of shares, transaction type
router.post('/buy', async (req, res, next) => {
    // reduce cash in user
    // add to user portfolio
    // add buy transaction history
    try {
        // User must be registered.
        const email = req.body.email;
        var user;
        await User.findOne({
            where: {
                email: email,
            }
        }).then(data => {
            // console.log(data)
            user = data.dataValues;
        });
        if(user === null) {
            res.status(401).json({
                message: 'You must be a registered user to carry out a transaction.',
                code: 401
            });
        }
        // Check if the stock symbol exists in the DB
        const symbol = req.body.symbol;
        var stock;
        await Stock.findOne({
            where: {
                symbol: symbol,
            }
        }).then(data => {
            stock = data.dataValues;
        });
        if(stock === null) {
            res.status(400).json({
                message: 'Invalid stock symbol.',
                code: 400
            });
        }
        const currentPrice = stock.price;
        const userBalance = user.cashBalance;
        const amount = req.body.amount;
        // Error check for negative or 0 amount.
        if(amount <= 0) {
            res.status(400).json({
                message: 'Please enter a valid amount.',
                code: 400
            });
        }
        const numberOfShares = amount / currentPrice;
        // User must have sufficient balance to carry out this transaction.
        if(userBalance < amount) {
            res.status(400).json({
                message: 'Insufficient funds in your wallet.',
                code: 400
            });
        }
        // Update wallet balance of user.
        const newBalance = userBalance - amount;
        user.cashBalance = newBalance;
        // Add this to user's portfolio. Modify portfolio if symbol already exists. 
        var portfolio = null;
        // console.log(user);
        var existingPortfolio = null;
        await Portfolio.findOne({
            where: {
                username: user.username,
                symbol: symbol,
            }
        }).then(data => {
            if(data !== null) {
                existingPortfolio = data.dataValues;
            }
        });
        // console.log(existingPortfolio);
        if(existingPortfolio !== null) {
            const newShares = existingPortfolio.shares + numberOfShares;
            existingPortfolio.shares = newShares;
        } else {
            portfolio = await Portfolio.create({
                username: user.username,
                symbol: symbol,
                shares: numberOfShares,
            });
        }
        // Record this buy transaction. 
        const transaction = await Transaction.create({
            username: user.username,
            symbol: symbol,
            transactionType: 'buy',
            shares: numberOfShares,
            price: currentPrice,
        });
        // Save all the changes.
        // user.save();
        User.findOne({
            where: {
                email: user.email,
            }
        }).then(record => {
            record.update(user);
        })
        if(portfolio !== null) {
            portfolio.save();
        } else {
            existingPortfolio.save();
        }
        transaction.save();
        res.status(200).json({
            message: `${amount} shares for ${stock.companyName} bought successfully.`,
            code: 200
        });
    } catch (err) {
        next(err);
    }
});

// Sell stock
// Request must have email, symbol, quantity of shares to sell, and transaction type. 
router.post('/sell', async (req, res, next) => {
    // add cash in user
    // modify user portfolio (part of stock can be sold)
    // add sell transaction history
    try {
        // User must be registered.
        const email = req.body.email;
        const user = User.findOne({
            where: {
                email: email,
            }
        });
        if(user === null) {
            res.status(401).json({
                message: 'You must be a registered user to carry out a transaction.',
                code: 401
            });
        }
        // Check if the stock symbol exists in the DB
        const symbol = req.body.symbol;
        const stock = Stock.findOne({
            where: {
                symbol: symbol,
            }
        });
        if(stock === null) {
            res.status(400).json({
                message: 'Invalid stock symbol.',
                code: 400
            });
        }
        // User's portfolio must have sufficient shares to carry out this transaction. 
        const userPortfolio = Portfolio.findOne({
            where: {
                username: user.username,
                symbol: symbol,
            }
        });
        const currentShares = userPortfolio.shares;
        const sharesToSell = req.body.shares;
        if(sharesToSell > currentShares) {
            res.status(400).json({
                message: 'Insufficient shares in your portfolio.',
                code: 400
            });
        }
        // Update wallet balance of user.
        const currentPrice = stock.price;
        const userBalance = user.cashBalance;
        const newBalance = userBalance + currentPrice * sharesToSell;
        user.cashBalance = newBalance;
        // Modify or remove stock from user's portfolio
        if(sharesToSell === currentShares) {
            // Remove from user's portfolio.
            await Portfolio.destroy({
                where: {
                    username: user.username,
                    symbol: symbol,
                }
            });
        } else {
            const newShares = currentShares - sharesToSell;
            userPortfolio.shares = newShares;
        }
        // Record this sell transaction. 
        const transaction = await Transaction.create({
            username: user.username,
            symbol: symbol,
            transactionType: 'sell',
            shares: sharesToSell,
            price: currentPrice,
        });
        // Save all the changes.
        user.save();
        transaction.save();
        res.status(200).json({
            message: `${sharesToSell} shares for ${stock.companyName} sold successfully.`,
            code: 200
        });
    } catch (err) {
        next(err);
    }
});

// **************ADMIN ACIONS****************

// Request must have Company name, stock symbol, volume, initial price. 
router.post('/admin/create-new-stock', async (req, res, next) => {
    // add Company name, stock ticker, volume, and initial price.
    try {
        const company = req.body.companyName;
        const symbol = req.body.symbol;
        const volume = req.body.volume;
        const initialPrice = req.body.initialPrice;
        var stock = null;
        await Stock.findOne({
            where: {
                symbol: symbol
            }
        }).then(data => {
            if(data !== null) {
                stock = data.dataValues;
            }
        });
        // Check if the symbol already exists or not. 
        if(stock !== null) {
            res.status(400).send('The symbol already exists. Please choose a different symbol.');
        }
        const newStock = await Stock.create({
            symbol: symbol,
            companyName: company,
            volume: volume,
            price: initialPrice,
        });
        await newStock.save();
        res.status(200).json({
            message: 'New stock added successfully.',
            code: 200
        });
    } catch(err) {
        next(err);
    }
});
