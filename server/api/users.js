const { User } = require('../db/models');

const router = require('express').Router();

module.exports = router;

// Create new user
// Accepts and returns User object
router.post('/create-new-user', async (req, res, next) => {
    try {
        const newUser = User.create({
            username: req.body.username,
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
        });
        res.status(200).json(newUser);
    } catch {
        next(err);
    }
});

// Request must have email, cash amount.
// Return 200 code. 
router.post('/deposit-cash', async (req, res, next) => {
    // Add cash to wallet
    try {
        const email = req.body.email, cashToDeposit = req.body.cash;
        const user = User.findOne({
            where: {
                email: email,
            }
        });
        if(user === null) {
            console.log(`User not found: ${email}`);
            res.status(404).send('The user does not exist. ');
        }
        await user.update({
            cashBalance: cashToDeposit,
        });
        await user.save();
        res.status(200).json({
            message: 'Cash deposited succesfully!'
        });
    } catch {
        next(err);
    }
});

// Request must have email, cash amount
// Returns 200 code. 
router.post('/withdraw-cash', async (req, res, next) => {
    // Withdraw cash from wallet
    try {
        const email = req.body.email, cashToWithdraw = req.body.cash;
        // Fetch user
        const user = User.findOne({
            where: {
                email: email,
            }
        });
        // Check if user exists
        if(user === null) {
            console.log(`User not found: ${email}`);
            res.status(404).json({
                message: 'The user does not exist.'
            });
        }
        // Check if funds are sufficient
        const currentBalance = user.cashBalance;
        if(cashToWithdraw > currentBalance) {
            res.status(400).json({
                message: 'Insufficient funds in your wallet.'
            });
        }
        // Update balance
        const newBalance = currentBalance - cashToWithdraw;
        await user.update({
            cashBalance: newBalance,
        });
        await user.save();
        res.status(200).json({
            message: 'Cash deposited succesfully!'
        });
    } catch {
        next(err);
    }
});