const express = require('express');
const router = express.Router();
const User = require('../schemas/userSchema');
const RefreshToken = require('../schemas/refreshTokenSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SK_TEST);

router.use(express.json());

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser)
            return res.sendStatus(409);

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName: firstName, 
            lastName: lastName, 
            email: email, 
            password: hashedPassword
        });

        const customer = await createStripeCustomer(newUser);

        newUser.stripeCustomerId = customer.id;

        await newUser.save();

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        
        if(!existingUser)
            return res.sendStatus(404);

        const isValidPassword = await bcrypt.compare(password, existingUser.password);

        if(!isValidPassword)
            return res.sendStatus(401);

        const accessToken = generateAccessToken(existingUser);

        await generateRefreshToken(existingUser);

        res.status(201).json({ accessToken: accessToken });    
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.post('/refresh', async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email: email });

        if(!user)
            return res.sendStatus(404, { message: 'User with provided email not found' });

        const existingRefreshToken = await RefreshToken.findOne({ email: email });

        if(!existingRefreshToken)
            return res.sendStatus(404, { message: 'Refresh token not found' });

        jwt.verify(existingRefreshToken.refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if(err)
                return res.sendStatus(403);

            const accessToken = generateAccessToken(user);

            res.status(201).json({ accessToken: accessToken });
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

router.post('/logout', async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email: email });

        if(!user)
            return res.sendStatus(404);

        await RefreshToken.deleteMany({ email: email });

        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

const generateAccessToken = (user) => {
    return jwt.sign({ email: user.email, firstName: user.firstName, lastName: user.lastName }, process.env.JWT_SECRET, { expiresIn: '15s' });
}

const generateRefreshToken = async (user) => {
    try {
        const refreshToken = jwt.sign({ email: user.email, firstName: user.firstName, lastName: user.lastName }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

        const newRefreshToken = new RefreshToken({
            email: user.email,
            refreshToken: refreshToken
        });

        await newRefreshToken.save();

        return refreshToken;
    } catch (error) {
        console.log(error);
    }
}

const createStripeCustomer = async (user) => {
    try {
        const customer = await stripe.customers.create({
            email: user.email,
            metadata: {
                firstName: user.firstName,
                lastName: user.lastName
            }
        });

        return customer;
    } catch (error) {
        console.log(error);
    }
}

module.exports = router;