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
    } catch(err) {
        next(err);
    }
});

// Request must have email, cash amount.
// Return 200 code. 
router.post('/deposit-cash', async (req, res, next) => {
    // Add cash to wallet
    try {
        const email = req.body.email, cashToDeposit = req.body.cash;
        const user = await User.findOne({
            where: {
                email: email,
            }
        });
        if(user === null) {
            console.log(`User not found: ${email}`);
            res.status(401).send({
                message: 'You need to be registered to add cash.',
                code: 401
            });
        }
        if(cashToDeposit <= 0) {
            res.status(400).send({
                message: 'Please enter a valid amount.',
                code: 400
            });
        }
        const newBalance = parseFloat(user.cashBalance) + parseFloat(cashToDeposit);
        await user.update({
            cashBalance: newBalance,
        });
        await user.save();
        res.status(200).json({
            message: 'Cash deposited succesfully!',
            code: 200
        });
    } catch(err) {
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
                message: 'The user does not exist.',
                code: 404
            });
        }
        // Check if funds are sufficient
        const currentBalance = user.cashBalance;
        if(cashToWithdraw > currentBalance) {
            res.status(400).json({
                message: 'Insufficient funds in your wallet.',
                code: 400
            });
        }
        // Update balance
        const newBalance = currentBalance - cashToWithdraw;
        await user.update({
            cashBalance: newBalance,
        });
        await user.save();
        res.status(200).json({
            message: 'Cash deposited succesfully!',
            code: 200
        });
    } catch(err) {
        next(err);
    }
});