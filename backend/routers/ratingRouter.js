const express = require('express');
const router = express.Router();
const Rating = require('../models/ratingModel');
const Tool = require('../models/toolModel'); 

// Add new review
router.post('/add', async (req, res) => {
    try {
        const { toolId, rating, comment, userId } = req.body;
        
        // Validate input
        if (!toolId || !rating || !userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newRating = new Rating({
            tool: toolId,
            user: userId,
            rating,
            comment: comment || '' // Handle optional comment
        });

        const savedRating = await newRating.save();

        // Update tool's average rating
        const allRatings = await Rating.find({ tool: toolId });
        const avgRating = allRatings.reduce((acc, curr) => acc + curr.rating, 0) / allRatings.length;
        
        await Tool.findByIdAndUpdate(toolId, { rating: avgRating });

        res.status(201).json(savedRating);
    } catch (err) {
        console.error('Rating submission error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Get reviews by extension
router.get('/bytool/:id', async (req, res) => {
    try {
        const reviews = await Rating.find({ tool: req.params.id })
            .populate('user', 'name email')
            .sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get average rating for extension
router.get('/average/:id', async (req, res) => {
    try {
        const reviews = await Rating.find({ tool: req.params.id });
        const avgRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length || 0;
        res.status(200).json({ averageRating: avgRating });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/count', async (req, res) => {
    try {
        const count = await Tool.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get tool count' });
    }
});

module.exports = router;