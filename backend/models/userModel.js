const { Schema, model } = require('../connection');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = model('Users', userSchema);