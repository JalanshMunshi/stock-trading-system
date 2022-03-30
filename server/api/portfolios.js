const { User, Portfolio } = require('../db/models');

const router = require('express').Router();
module.exports = router;

// Get the portfolio of a user - stocks and cash
// Request must have email. 
router.get('/view/:email', async (req, res, next) => {
    try {
        // Get all portfolios for a given email
        // User must be registered.
        const email = req.params.email;
        const user = await User.findOne({
            where: {
                email: email,
            }
        });
        if(user === null) {
            res.status(401).json({
                message: 'You must be a registered user to view your portfolio.',
            });
        }
        var portfolio = [];
        await Portfolio.findAll({
            where: {
                username: user.username,
            },
            order: [
                ['symbol', 'ASC']
            ],
            attributes: [
                'symbol',
                'shares',
            ]
        }).then(data => {
            var key = 1;
            data.forEach(dp => {
                var p = {};
                p.key = key.toString();
                p.symbol = dp.dataValues.symbol;
                p.shares = dp.dataValues.shares;
                portfolio.push(p);
                key += 1;
            });
        });
        const cashBalance = user.cashBalance;
        const responseObj = {
            portfolio,
            cashBalance,
        };
        res.status(200).json({
            portfolio,
            cashBalance,
        });
    } catch(err) {
        next(err);
    }
});
