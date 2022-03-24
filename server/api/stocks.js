const { Stock } = require('../db/models');

const router = require('express').Router();
module.exports = router;

// Buy stock
router.post('/buy', async (req, res, next) => {
    // reduce cash in user
    // add to user portfolio
    // add buy transaction history
});

// Sell stock
router.post('/sell', async (req, res, next) => {
    // add cash in user
    // modify user portfolio (part of stock can be sold)
    // add sell transaction history
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
