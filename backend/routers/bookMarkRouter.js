const express = require('express');
const router = express.Router();
const Bookmark = require('../models/bookmark');
// const Tool = require('../models/toolModel');

// Add bookmark
router.post('/add', async (req, res) => {
    console.log('Received request to add bookmark:', req.body); // Debug log
    try {
        const { userId, toolId } = req.body;

        // Check if bookmark already exists
        const existingBookmark = await Bookmark.findOne({ userId, toolId });
        if (existingBookmark) {
            return res.status(200).json({
                message: 'Tool already bookmarked',
                isBookmarked: true
            });
        }

        // Create new bookmark
        const bookmark = new Bookmark({ userId, toolId });
        await bookmark.save();

        res.status(201).json({
            message: 'Tool bookmarked successfully',
            isBookmarked: true
        });
    } catch (error) {
        console.error('Bookmark error:', error);
        res.status(500).json({
            error: 'Failed to bookmark tool',
            details: error.message
        });
    }
});

// Remove bookmark
router.delete('/remove/:userId/:toolId', async (req, res) => {
    try {
        await Bookmark.findOneAndDelete({
            userId: req.params.userId,
            toolId: req.params.toolId
        });
        res.status(200).json({ message: 'Bookmark removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Check if tool is bookmarked
router.get('/check/:userId/:toolId', async (req, res) => {
    try {
        const bookmark = await Bookmark.findOne({
            userId: req.params.userId,
            toolId: req.params.toolId
        });
        res.status(200).json({ isBookmarked: !!bookmark });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user's bookmarked tools
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        console.log('Fetching bookmarks for user:', userId); // Debug log

        // Find bookmarks and populate tool details
        const bookmarks = await Bookmark.find({ userId })
            .populate({
                path: 'toolId',
                model: 'Tool',
                select: 'name description category logo rating'
            })
            .lean(); // Convert to plain JavaScript objects

        console.log('Found bookmarks:', bookmarks); // Debug log

        // Extract and filter valid tool data
        const tools = bookmarks
            .filter(bookmark => bookmark.toolId)
            .map(bookmark => bookmark.toolId);

        console.log('Returning tools:', tools); // Debug log
        res.status(200).json(tools);
    } catch (error) {
        console.error('Bookmark fetch error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch bookmarked tools',
            details: error.message
        });
    }
});

module.exports = router;