const express = require('express');
const router = express.Router();

const User = require('../../schemas/userSchema');

router.post('/', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if(!user)
            return res.status(404).send('Could not find user with email.');
        if(password !== user.password)
            return res.status(401).send('Invalid password provided.');
        return res.status(201).send({message: 'User logged in successfully'});
    } catch(error) {
        console.log(error)
        return res.status(500).send({message: 'An internal server error occurred.'});
    }
})

module.exports = router;