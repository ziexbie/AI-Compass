const express = require('express');
const Model = require('../models/toolModel');
const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    // Logo will now be a Cloudinary URL in req.body
    const newTool = new Model(req.body);
    const result = await newTool.save();
    res.status(200).json(result);
  } catch (err) {
    console.error('Error adding tool:', err);
    res.status(500).json({ message: 'Failed to add tool' });
  }
});

router.get('/getall', async (req, res) => {
  try {
    const tools = await Model.find();
    res.status(200).json(tools);
  } catch (err) {
    console.error('Error fetching tools:', err);
    res.status(500).json({ message: 'Failed to fetch tools' });
  }
});

router.get('/getbyid/:id', async (req, res) => {
  try {
    const tool = await Model.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({ message: 'Tool not found' });
    }
    res.status(200).json(tool);
  } catch (err) {
    console.error('Error fetching tool:', err);
    res.status(500).json({ message: 'Failed to fetch tool' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const tool = await Model.findByIdAndDelete(req.params.id);
    if (!tool) {
      return res.status(404).json({ message: 'Tool not found' });
    }
    res.status(200).json({ message: 'Tool deleted successfully' });
  } catch (err) {
    console.error('Error deleting tool:', err);
    res.status(500).json({ message: 'Failed to delete tool' });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const updatedTool = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!updatedTool) {
      return res.status(404).json({ message: 'Tool not found' });
    }
    
    res.status(200).json(updatedTool);
  } catch (err) {
    console.error('Error updating tool:', err);
    res.status(500).json({ message: 'Failed to update tool' });
  }
});

router.get('/count', async (req, res) => {
  try {
    const count = await Model.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get tool count' });
  }
});



// Add these new route handlers
router.get('/trending', async (req, res) => {
    try {
        const trendingTools = await Model.aggregate([
            {
                $lookup: {
                    from: 'ratings',
                    localField: '_id',
                    foreignField: 'tool', // Changed from 'toolId' to 'tool'
                    as: 'ratings'
                }
            },
            {
                $addFields: {
                    avgRating: { $avg: '$ratings.rating' },
                    totalRatings: { $size: '$ratings' }
                }
            },
            {
                $sort: { avgRating: -1 }
            },
            {
                $limit: 5
            }
        ]);

        res.json(trendingTools);
    } catch (error) {
        console.error('Error fetching trending tools:', error);
        res.status(500).json({ error: 'Failed to fetch trending tools' });
    }
});

router.get('/featured', async (req, res) => {
    try {
        const featuredTools = await Model.find({ featured: true });
        res.json(featuredTools);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch featured tools' });
    }
});



module.exports = router;