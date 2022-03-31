const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const cron = require('node-cron');
// const session = require('express-session');
// const passport = require('passport');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db');
const moment = require('moment-timezone')
const { MarketHours, MarketSchedule, User, Stock } = require('./db/models');
// const sessionStore = new SequelizeStore({db});

module.exports = app;

// register passport
// passport.serializeUser((user, done) => done(null, user.user_id));

// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await db.models.user.findByPk(id);
//         done(null, user);
//     } catch (err) {
//         done(err);
//     }
// })

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// session middleware
// app.use(
//     session({
//         secret: 'secret',
//         store: sessionStore,
//         resave: false,
//         saveUninitialized: false
//     })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

const dayMap = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
};

// Runs every 2 seconds
// If I run every second, it is too fast. 
cron.schedule('*/2 * * * * *', async () => {
    var marketDayOpen = true, marketTimeOpen = true;
    const day = dayMap[moment().day()];
    // console.log(day);
    await MarketSchedule.findAll().then(data => {
        // console.log(data[0].dataValues[day]);
        if(data[0].dataValues[day] == false) {
            marketDayOpen = false;
        }
    });
    var startTime, endTime;
    await MarketHours.findAll().then(data => {
        startTime = moment(data[0].dataValues.startTime, 'HH:mm:ss');
        endTime = moment(data[0].dataValues.endTime, 'HH:mm:ss');
    });
    var currentTime = moment();
    // var currentTime = moment().add(1, 'hour'); // This works!
    // console.log(startTime);
    // console.log(endTime);
    // console.log(currentTime);
    // console.log(currentTime.isBetween(startTime, endTime));
    if(!currentTime.isBetween(startTime, endTime)) {
        marketTimeOpen = false;
    }
    if(marketDayOpen && marketTimeOpen) {
        await Stock.findAll({
            order: [
                ['symbol', 'ASC']
            ],
        }).then(data => {
            // stocks = data;
            if(data.length) {
                data.forEach(stock => {
                    var oldPrice = stock.price;
                    // console.log(stock.symbol);
                    // console.log(oldPrice)
                    const volatility = 0.02;
                    var rnd = Math.random(); // generate number, 0 <= x < 1.0
                    var changePercent = 2 * volatility * rnd;
                    if (changePercent > volatility) {
                        changePercent -= (2 * volatility);
                    }
                    var changeAmount = oldPrice * changePercent;
                    var newPrice = oldPrice + changeAmount;
                    // Update the opening price of all stocks
                    if(currentTime.isSame(startTime)) {
                        stock.update({
                            openingPrice: newPrice,
                        });
                    }
                    // Just a hack to avoid null values. 
                    // Can be deleted after relevant DB changes.
                    if(stock.low === null) {
                        stock.low = 1000000;
                    }
                    // Set a new stock price high for the day
                    if(newPrice > stock.high) {
                        // console.log(`Changed high for ${stock.symbol}.`);
                        stock.update({
                            high: newPrice,
                        });
                    }
                    // Set a new stock price low for the day
                    if(newPrice < stock.low) {
                        // console.log(`Changed low for ${stock.symbol}.`);
                        stock.update({
                            low: newPrice,
                        });
                    }
                    // Update the current price.
                    stock.update({
                        price: newPrice,
                    });
                    // console.log(`Updated price of ${stock.symbol}`);
                })
            }
        });
    }
});

// Get the db and add some mock data to it
db.sync().then(() => {
    User.findOne({
        where: {
            email: 'admin@stockup.com'
        }
    }).then(data => {
        if(data === null) {
            User.create({
                username: 'admin',
                fullName: 'Jalansh Munshi',
                email: 'admin@stockup.com',
                password: 'admin',
                role: 'admin'
            });
        }
    });

    User.findAll({
        where: {
            role: 'customer'
        }
    }).then(data => {
        // console.log(data);
        if(data.length == 0) {
            User.create({
                username: 'user1',
                fullName: 'Rob Brown',
                email: 'user1@gmail.com',
                password: 'user1',
                role: 'customer',
            });
            User.create({
                username: 'user2',
                fullName: 'Mary Jones',
                email: 'user2@gmail.com',
                password: 'user2',
                role: 'customer',
            });
        }
    });

    Stock.findAll().then(data => {
        if(data.length === 0) {
            Stock.create({
                symbol: 'AA',
                companyName: 'company1',
                volume: 1000,
                price: 10.5,
                high: 10.5,
                low: 10.5,
                openingPrice: 10.5,
            });
            Stock.create({
                symbol: 'BB',
                companyName: 'company2',
                volume: 2000,
                price: 15.5,
                high: 15.5,
                low: 15.5,
                openingPrice: 15.5,
            });
            Stock.create({
                symbol: 'CC',
                companyName: 'company3',
                volume: 1500,
                price: 20.12,
                high: 20.12,
                low: 20.12,
                openingPrice: 20.12,
            });
        }
    })

    MarketHours.findAll().then((data) => {
        if(data.length === 0) {
            MarketHours.create({
                startTime: '08:00:00',
                endTime: '17:00:00',
            });
        }
    });
    
    MarketSchedule.findAll().then(data => {
        if(data.length === 0) {
            MarketSchedule.create({
                Monday: true,
                Tuesday: true,
                Wednesday: true,
                Thursday: true,
                Friday: true,
                Saturday: false,
                Sunday: false,
            });
        }
    });
});

// db.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

console.log('Connected to DB...');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}.`);
})
