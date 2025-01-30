const express = require('express');
const router = express.Router();
const User = require('../../schemas/userSchema');
router.use(express.json({type: 'application/json'}));

router.post('/', async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const userWithEmail = await User.findOne({email: email});
        if(userWithEmail)
            return res.status(409).send('Email already in use.');
        const newUser = new User({name, email, password});
        await newUser.save();
        return res.status(201).send({message: 'User registered successfully.'});
    } catch(error) {
        console.log(error);
        return res.status(500).send({message: 'An internal server error occurred.'});
    }
})

module.exports = router;