const { User, MarketHours } = require('../db/models');

const router = require('express').Router();
module.exports = router;

// **************ADMIN ACIONS****************

// Request must have email, and start and end times
router.post('/admin/change-market-hours', async (req, res, next) => {
    // change market hours
    try {
        const email = req.body.email;
        const user = User.findOne({
            where: {
                email: email,
            }
        });
        if(user.role !== 'admin') {
            res.status(401).json({
                message: 'You are not authorized to change market hours.',
                code: 401,
            });
        }
        const marketHours = MarketHours.findAll();
        const newStartTime = req.body.startTime;
        const newEndTime = req.body.endTime;
        marketHours.startTime = newStartTime;
        marketHours.endTime = newEndTime;
        marketHours.save();
        res.status(200).json({
            message: 'Market hours changed successfully.',
            code: 200,
        });
    } catch {
        next(err);
    }
});

router.post('/admin/change-market-schedule', async (req, res, next) => {
    // change market schedule
});
