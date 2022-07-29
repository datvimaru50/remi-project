require('dotenv').config();
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const routes = require('./routes/routes');

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database Connected');
});

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', routes);

module.exports = app.listen(process.env.PORT, () => {
    console.log(`Server connected at ${process.env.PORT}`);
});