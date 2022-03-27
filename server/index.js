const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db');
const { MarketHours, MarketSchedule, User } = require('./db/models');
const sessionStore = new SequelizeStore({db});

module.exports = app;

// register passport
passport.serializeUser((user, done) => done(null, user.user_id));

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.models.user.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
})

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// session middleware
app.use(
    session({
        secret: 'secret',
        store: sessionStore,
        resave: false,
        saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session());

// app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

// Get the db
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
