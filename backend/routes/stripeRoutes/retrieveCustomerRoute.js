const express = require('express');
const router = express.Router();
const User = require('../../schemas/userSchema');
const UserCustomer = require('../../schemas/userCustomerSchema');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SK_TEST);


router.post('/', async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email: email});
    if(!user)
        return res.status(404).send('Could not find user with email.');
    const userCustomerPair = await UserCustomer.findOne({userId: user.id});
    if(userCustomerPair)
        return res.status(200).send({message: 'Stripe customer already exists for this user.', customerId: userCustomerPair.customerId});
    const newCustomer = await stripe.customers.create({
        name: user.name,
        email: user.email
    });
    const newUserCustomerPair = new UserCustomer({userId: user.id, customerId: newCustomer.id});
    await newUserCustomerPair.save();
    return res.status(201).send({message: 'Stripe customer created for this user.', customerId: newCustomer.id});
})

module.exports = router;