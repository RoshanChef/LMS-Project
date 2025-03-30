const mongoose = require('mongoose');
require('dotenv').config();

function connect() {
    mongoose.connect(process.env.mongodb_url).then(() => {
        console.log('Connected to the database');
    }).catch((err) => {
        console.log('Error connecting to the database', err);
        process.exit(1);    
    })
}

module.exports = connect;