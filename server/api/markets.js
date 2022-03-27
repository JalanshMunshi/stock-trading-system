const { User, MarketHours, MarketSchedule } = require('../db/models');

const router = require('express').Router();
module.exports = router;

router.get('/get-market-hours', async(req, res, next) => {
    try {
        var startTime, endTime;
        const marketHours = await MarketHours.findAll().then((data) => {
            if(data.length) {
                startTime = data[0].dataValues.startTime;
                endTime = data[0].dataValues.endTime;
            }
        });
        if(startTime === undefined || endTime === undefined) {
            res.status(500).send({
                message: 'Error in getting market hours.',
                code: 500,
            });
        }
        res.status(200).send({
            startTime: startTime,
            endTime: endTime
        });
    } catch (err) {
        next(err);
    }
})

// **************ADMIN ACIONS****************

// Request must have email, and start and end times
router.post('/admin/change-market-hours', async (req, res, next) => {
    // change market hours
    try {
        const email = req.body.email;
        var user;
        await User.findOne({
            where: {
                email: email,
            }
        }).then(data => {
            user = data.dataValues;
        });
        // console.log(user);
        if(user === null || user.role !== 'admin') {
            res.status(401).json({
                message: 'You are not authorized to change market hours.',
                code: 401,
            });
        }
        // var marketHours;
        const newStartTime = req.body.startTime;
        const newEndTime = req.body.endTime;
        const marketHours = await MarketHours.findByPk(1);
        // .then(data => {
        //     let newHours = {
        //         startTime: newStartTime,
        //         endTime: newEndTime
        //     };
        //     data.update(newHours);
        // });
        var start = new Date(newStartTime);
        // console.log(start.toLocaleTimeString('it-IT'));
        var end = new Date(newEndTime);
        marketHours.startTime = start.toLocaleTimeString('it-IT');
        marketHours.endTime = end.toLocaleTimeString('it-IT');
        console.log(marketHours);
        await marketHours.save();
        res.status(200).json({
            message: 'Market hours changed successfully.',
            code: 200,
        });
    } catch(err) {
        next(err);
    }
});

// Request should have email and an array of days and their corresponding status (open/close)
router.post('/admin/change-market-schedule', async (req, res, next) => {
    // change market schedule
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
        const marketSchedule = MarketSchedule.findAll();
        const daysToChange = req.body.dayToChange;
        daysToChange.forEach((day, openOrNot) => {
            console.log(day);
        })
        res.status(200).json({
            message: 'Market hours changed successfully.',
            code: 200,
        });
    } catch(err) {
        next(err);
    }
});
