const express = require('express')
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser")
const router = express.Router();
const { body, validationResult } = require('express-validator');
const JWT_Secret = "harshwanttobecomeasoftwaredeveloper";


// Route : 1 Create a user using POST : "/api/auth/createuser" ,No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password' ,'Enter a password atleast 5 character').isLength({ min: 5 })
], async (req, res) => {
    //if there are errors , return bad request and errors
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).send({success, Error: errors.array() });
    }
    //check whether the user exist with same email
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success,Error: "Sorry a user with this email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(req.body.password,salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass
        })
        const data = {
            user:{
                id : user.id
            }
        }
        var auth_token = await jwt.sign(data,JWT_Secret);
        success = true;
        res.status(200).json({success,Authtoken: auth_token});

        // res.status(200).json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error Ocurred")
    }
})


//Route : 2 Login a user using POST : "/api/auth/login" ,No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password' ,'Password cannot be Blank').exists()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({success, Error: errors.array() });
    }
    //check whether the user exist with email or not
    const {email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({success, Error: "Please try to login with correct credentials" });
        }
        const password_compare = await bcrypt.compare(password,user.password);
        if (!password_compare) {
            return res.status(400).json({success, Error: "Please try to login with correct credentials" });
        }
        const payload = {
            user:{
                id : user.id
            }
        }
        var auth_token = await jwt.sign(payload,JWT_Secret);
        success = true;
        res.status(200).json({success,Authtoken: auth_token});

    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})

//Route : 3 Get loggedin user details using POST : "/api/auth/getuser" ,login required
router.post('/getuser', fetchuser ,async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.status(200).send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})
module.exports = router