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
        res.json(newUser);
    } catch {
        next(err);
    }
});

router.post('/deposit-cash', async (req, res, next) => {
    // Add cash to wallet
});

router.post('/withdraw-cash', async (req, res, next) => {
    // Withdraw cash from wallet
});