const express = require('express');
const Model = require('../models/userModel'); //importing user model
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

// Add role field to user registration route
router.post('/add', (req, res) => {
    new Model(req.body).save()
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

router.get('/getall', (req, res) => {

    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({ message: 'Internal Server Error' });
            console.log(err);
        });

})

router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({ message: 'Internal Server Error' });
            console.log(err);
        });
})

router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({ message: 'Internal Server Error' });
            console.log(err);
        });
})

// Update to include role field when updating user
router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

// Make sure authenticate returns role in token
router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
        .then((userdata) => {
            if (userdata) {
                const payload = { _id: userdata._id, email: userdata.email, role: userdata.role };
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET || 'fallbacksecretkey',
                    { expiresIn: '24h' },
                    (err, token) => {
                        if (err) {
                            console.error(err);
                            res.status(500).json(err);
                        } else {
                            res.status(200).json({ token: token });
                        }
                    }
                );
            } else {
                res.status(400).json({ message: 'Invalid email or password' });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
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