const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    tool: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tool',
        required: true
    },
    user: {
        type: String, // Changed to String for now since we're using hardcoded ID
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: false // Make it optional
    }
}, { timestamps: true });

module.exports = mongoose.model('Rating', ratingSchema);