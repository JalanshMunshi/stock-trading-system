const router = require('express').Router();
module.exports = router;

// Buy stock
router.post('/buy', async (req, res, next) => {
    // reduce cash in user
    // add to user portfolio
    // add buy transaction history
});

// Sell stock
router.post('/buy', async (req, res, next) => {
    // add cash in user
    // modify user portfolio (part of stock can be sold)
    // add sell transaction history
});

// **************ADMIN ACIONS****************

router.post('/admin/create-new-stock', async (req, res, next) => {
    // add Company name, stock ticker, volume, and initial price.
});


