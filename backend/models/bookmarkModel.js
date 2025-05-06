const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    toolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tools',
        required: true
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Create compound index for unique bookmarks
bookmarkSchema.index({ userId: 1, toolId: 1 }, { unique: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);