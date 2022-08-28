// dependencies
const express = require("express");
require('dotenv').config({});
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');

// middleware
app.use(express.json());
app.use(cors());
app.use(require("./middleware/logger"));


// mongoose connection
mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/atmos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// controllers 
const cacheController = require('./controllers/cache_controllers.js');
app.use('/cache', cacheController);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`)
});