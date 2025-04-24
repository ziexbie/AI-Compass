
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file


const url = process.env.DB_URL

mongoose.connect(url)
    .then((result) => {
        console.log('ho gya connect mongodb se dude');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

module.exports = mongoose;
