const {Schema, model} = require('../connection');
 
const userSchema = new Schema({
    username: {
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
    city: {
        type: String,
        default: "NoCity"},
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = model('User', userSchema);