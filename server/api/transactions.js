const { User, Transaction } = require('../db/models');

const router = require('express').Router();
module.exports = router;

// Get all transactions of a user
// Request must have email.
router.get('/history/:email', async (req, res, next) => {
    // Get all transactions for a given email
    try {
        // User must be registered.
        const email = req.params.email;
        console.log(email);
        const user = await User.findOne({
            where: {
                email: email,
            }
        });
        if(user === null) {
            res.status(401).json({
                message: 'You must be a registered user to view your transaction history.',
                code: 401
            });
        }
        var transactions = [];
        await Transaction.findAll({
            where: {
                username: user.username,
            },
            order: [
                ['symbol', 'ASC']
            ],
            attributes: [
                'symbol',
                'transactionType',
                'shares',
                'price',
            ]
        }).then(data => {
            var key = 1;
            data.forEach(dp => {
                var transaction = {};
                transaction.key = key.toString();
                transaction.symbol = dp.dataValues.symbol;
                transaction.transactionType = dp.dataValues.transactionType;
                transaction.shares = dp.dataValues.shares;
                transaction.price = dp.dataValues.price;
                transactions.push(transaction);
                key += 1;
            });
        });
        res.status(200).send({
            transactions
        })
    } catch (err) {
        next(err);
    }
});
