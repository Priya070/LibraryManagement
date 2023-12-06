const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User = require('../models/user');
const scretkey = 'secretkey';

router.post('/signUp', async (req, res) => {
    try {
        // Salted Password
        const salt = await bcrypt.genSalt(10);
        const hashedPasssword = await bcrypt.hash(req.body.password, salt);;

        // Creating a User
        const user = new User({
            username: req.body.username,
            emailId: req.body.email,
            password: hashedPasssword,
            role: req.body.role,
        });
        console.log(1);

        // Saving User
        user.save();

        console.log(user);
        //data storing id of user 
        const data = {
            user: {
                id: user.id
            }
        }
        console.log(process.env.JWT_SECRET);
        const authtoken = jwt.sign(data, process.env.JWT_SECRET || scretkey);
        res.json({ authtoken })
        
    }
    catch (err) {
        res.send(err.message);
    }

    
}
);

router.post('/login', async (req, res) => { 
    try {
        let user
        if (req.body.emailId !== "") {
            user = await User.findOne({ emailId: req.body.emailId }).exec();
        }
        console.log(1)

        !user && res.status(404).json("User not found")
        const validPassword = await bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                res.json({
                    error: err
                })
            }
            if (result) {
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const authtoken = jwt.sign(data, process.env.JWT_SECRET || scretkey);
                res.json({ authtoken })
            } else {
                res.json({
                    message: 'Invalid Password'
                })
            }
        }
        )
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }

});

module.exports = router;