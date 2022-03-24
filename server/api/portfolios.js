const { User, Portfolio } = require('../db/models');

const router = require('express').Router();
module.exports = router;

// Get the portfolio of a user - stocks and cash
// Request must have email. 
router.get('/get-portfolio', async (req, res, next) => {
    try {
        // Get all portfolios for a given email
        // User must be registered.
        const email = req.body.email;
        const user = User.findOne({
            where: {
                email: email,
            }
        });
        if(user === null) {
            res.status(400).json({
                message: 'You must be a registered user to view your portfolio.',
                code: 400
            });
        }
        const portfolio = Portfolio.findAll({
            raw: true,
            where: {
                username: user.username,
            },
        });
        const cashBalance = user.cashBalance;
        const responseObj = {
            portfolio,
            cashBalance,
        };
        res.status(200).json({
            responseObj,
            code: 200
        });
    } catch(err) {
        next(err);
    }
});
