const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get the db
const db = require('./db');
db.sync();

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

console.log('Connected to DB...');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}.`);
})


