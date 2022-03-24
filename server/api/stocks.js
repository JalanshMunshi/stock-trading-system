const { Stock, User, Portfolio, Transaction } = require('../db/models');

const router = require('express').Router();
module.exports = router;

// Buy stock
// Request must have email, symbol, quantity of shares, transaction type
router.post('/buy', async (req, res, next) => {
    // reduce cash in user
    // add to user portfolio
    // add buy transaction history
    try {
        // User must be registered.
        const email = req.body.email;
        const user = User.findOne({
            where: {
                email: email,
            }
        });
        if(user === null) {
            res.status(400).json({
                message: 'You must be a registered user carry out a transaction.',
                code: 400
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
        const currentPrice = stock.price;
        const userBalance = user.cashBalance;
        const shares = req.body.shares;
        // User must have sufficient balance to carry out this transaction.
        if(userBalance < currentPrice * shares) {
            res.status(400).json({
                message: 'Insufficient funds in your wallet.',
                code: 400
            });
        }
        // Update wallet balance of user.
        const newBalance = userBalance - currentPrice * shares;
        user.cashBalance = newBalance;
        // Add this to user's portfolio. Modify portfolio if symbol already exists. 
        const portfolio = null;
        const existingPortfolio = await Portfolio.findOne({
            where: {
                username: user.username,
                symbol: symbol,
            }
        });
        if(existingPortfolio !== null) {
            const newShares = existingPortfolio.shares + shares;
            existingPortfolio.shares = newShares;
        } else {
            portfolio = await Portfolio.create({
                username: user.username,
                symbol: symbol,
                shares: shares,
            });
        }
        // Record this buy transaction. 
        const transaction = await Transaction.create({
            username: user.username,
            symbol: symbol,
            transactionType: 'buy',
            shares: shares,
            price: currentPrice,
        });
        // Save all the changes.
        user.save();
        if(portfolio !== null) {
            portfolio.save();
        } else {
            existingPortfolio.save();
        }
        transaction.save();
        res.status(200).json({
            message: `${shares} shares for ${stock.companyName} bought successfully.`,
            code: 200
        });
    } catch (err) {
        next(err);
    }
});

// Sell stock
// Request must have email, symbol, quantity of shares to sell
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
            res.status(400).json({
                message: 'You must be a registered user carry out a transaction.',
                code: 400
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
        // ****************START FROM HERE*********************
        const currentPrice = stock.price;
        const userBalance = user.cashBalance;
        const shares = req.body.shares;
        // User must have sufficient balance to carry out this transaction.
        if(userBalance < currentPrice * shares) {
            res.status(400).json({
                message: 'Insufficient funds in your wallet.',
                code: 400
            });
        }
        // Update wallet balance of user.
        const newBalance = userBalance - currentPrice * shares;
        user.cashBalance = newBalance;
        // Add this to user's portfolio
        const portfolio = await Portfolio.create({
            username: user.username,
            symbol: symbol,
            shares: shares,
            price: currentPrice,
        });
        // Record this buy transaction. 
        const transaction = await Transaction.create({
            username: user.username,
            symbol: symbol,
            transactionType: 'buy',
            shares: shares,
            price: currentPrice,
        });
        // Save all the changes.
        user.save();
        portfolio.save();
        transaction.save();
        res.status(200).json({
            message: `${shares} shares for ${stock.companyName} bought successfully.`,
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
        const stock = Stock.findOne({
            where: {
                symbol: symbol
            }
        });
        // Check if the symbol already exists or not. 
        if(stock !== null) {
            res.status(400).json({
                message: 'The symbol already exists. Please choose a different symbol.',
            });
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
    } catch {
        next(err);
    }
});
