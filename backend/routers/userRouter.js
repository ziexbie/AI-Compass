const express = require('express');
const Model = require('../models/userModel'); //importing user model
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

router.post('/add', (req, res) => {
    console.log(req.body);

    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            if (err.code === 11000) {
                res.status(400).json({ message: 'User Email Already Exists' });
            }
            else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
})

router.get('/getall', (req, res) => {

    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({ message: 'Internal Server Error' });
            console.log(err);
        });

})

router.get('/getbyid/:id', (req,res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({message: 'Internal Server Error'});
            console.log(err);
        });
})

router.delete('/delete/:id', (req, res) => {
   Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({message: 'Internal Server Error'});
            console.log(err);
        });
})

router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json({message: 'Internal Server Error'});
            console.log(err);
        });
    });




router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
        .then((result) => {
            if (result) {
                // email and password matched
                const { _id, email, name, role } = result;
                const payload = { _id, email, name, role };

                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' },
                    (err, token) => {
                        if (err) {
                            console.error('Token generation error:', err);
                            res.status(500).json({ message: 'Error generating token' });
                        } else {
                            res.status(200).json({ 
                                message: 'Login successful',
                                token: token 
                            });
                        }
                    }
                );
            } else {
                res.status(400).json({ message: 'Invalid email or password' });
            }
        })
        .catch((err) => {
            console.error('Authentication error:', err);
            res.status(500).json({ message: 'Internal server error' });
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