const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myntra');

const db = mongoose.connection;

db.on('error', (err) => { console.error.bind(console, "Error connecting to mongodb"); })

db.once('open', () => {
    console.log("Connected to mongoDB");
})

module.exports = db;