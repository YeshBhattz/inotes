const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'yeshraj'


router.post('/createuser',[
    body('email').isEmail(),
    body('name').isLength({min: 3}),
    body('password').isLength({min: 6}),
], async (req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.send(`Hello, ${req.body.name}!`);
        return res.status(400).json({errors: errors.array()});
       
  }
  try {
//   check weather the user already exists with the same email
    let user = await User.findOne({email: req.body.email})
    if(user){
        return res.status(400).json({error: "Someone already registered using this email!"})
    }
    //creating a user
    const salt = await bcrypt.genSalt(10);
    securepass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
                name:req.body.name,
                email: req.body.email,
                password:securepass
            })

            const data={
                user: {
                    id: user.id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({authToken})
        // .then(user=>res.json(user)).catch(e=>{res.json({error: "Duplicate Email!"})})
    } catch (error) {
    console.error(error.message)
    res.status(500).send("Error Occurred")
  }

})

module.exports = router