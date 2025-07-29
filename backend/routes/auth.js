const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

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
// Route 1:    check weather the user already exists with the same email. No login
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
    res.status(500).send("Internal server error")
  }

})



//Route 2:  authenticating a user. api/auth/login. No Login required
router.post('/login',[
    body('email','Enter a valid mail ID').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.send(`Hello, ${req.body.name}!`);
        return res.status(400).json({errors: errors.array()});
       
  }
  const {email,password} = req.body;
  try {
    let user = await User.findOne({email})
    if(!user){
        return res.status(400).json({"Error " : "Please use correct credentials"})
    }
    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare){
        return res.status(400).json({"Error " : "Please use correct credentials"})
    }
    const payload={
        user: {
            id: user.id
        }
    }

    const authToken = jwt.sign(payload, JWT_SECRET);
    res.json({authToken})
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error")
  }

})

//Route 3:  Get User details using aip/auth/getuser. Login required

router.post('/getuser', fetchuser, async (req, res)=>{
    try {
        userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
} catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error")
}
})




module.exports = router