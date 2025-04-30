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

router.put('/update/:id', (req, res) => {
  Model.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then((result) => {
          res.status(200).json(result);
      }).catch((err) => {
          res.status(500).json({message: 'Internal Server Error'});
          console.log(err);
      });
  });





        
 





module.exports = router;