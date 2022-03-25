const { User, Transaction } = require('../db/models');

const router = require('express').Router();
module.exports = router;

// Get all transactions of a user
// Request must have email.
router.get('view-history', async (req, res, next) => {
    // Get all transactions for a given email
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
                message: 'You must be a registered user to view your transaction history.',
                code: 401
            });
        }
        const transactions = Transaction.findAll({
            raw: true,
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
        });
        res.status(200).json({
            transactions,
            code: 200,
        })
    } catch (err) {
        next(err);
    }
});
