const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    toolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tool',
        required: true
    }
}, { timestamps: true });

bookmarkSchema.index({ userId: 1, toolId: 1 }, { unique: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);