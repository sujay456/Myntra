const mongoose = require('mongoose');
const env=require('./environment');
mongoose.connect(`mongodb://localhost:27017/${env.db_name}`);

const db = mongoose.connection;

db.on('error', (err) => { console.error.bind(console, "Error connecting to mongodb"); })

db.once('open', () => {
    console.log("Connected to mongoDB");
})

module.exports = db;