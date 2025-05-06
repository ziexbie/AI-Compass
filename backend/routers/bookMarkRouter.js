const express = require('express');
const router = express.Router();
const Bookmark = require('../models/bookmark');
const Tool = require('../models/toolModel'); // Make sure to import Tool model

// Add bookmark
router.post('/add', async (req, res) => {
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
        
        // Find all bookmarks for the user
        const bookmarks = await Bookmark.find({ userId }).populate({
            path: 'toolId',
            model: 'Tool',
            select: 'name description category logo rating'
        });

        // Check if bookmarks exist
        if (!bookmarks) {
            return res.status(404).json({ message: 'No bookmarks found' });
        }

        // Extract tool data from bookmarks
        const tools = bookmarks.map(bookmark => bookmark.toolId).filter(tool => tool !== null);

        res.status(200).json(tools);
    } catch (error) {
        console.error('Error fetching bookmarks:', error);
        res.status(500).json({ 
            error: 'Failed to fetch bookmarks',
            details: error.message 
        });
    }
});

module.exports = router;