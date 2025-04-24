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

router.post('/authenticate', (req,res)=> {
    Model.findOne(req.body)
    .then((result) => {
        if(result){
            //email and password matched
            //generate token
            const {_id,email,password}  = result;
            const payload = { _id,email,password};

            jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1d'},(err,token)=>
           {
            if(err){
                console.log(err);
                res.status(500).json(err);
            }
                else
                {
                    
                    res.status(200).json(token)
                }
            
           } )
        }else{
            //email and password not matched
            res.status(400).json({message:'Invalid email or password'})
        }
        
    }).catch((err) => {
        
    });
})





module.exports = router;