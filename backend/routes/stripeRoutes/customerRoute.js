const express = require('express');
const router = express.Router();
router.use(express.json({type: 'application/json'}));
const stripe = require('stripe')(process.env.STRIPE_SK_TEST);
const User = require('../../schemas/userSchema');

router.post('/create-customer', async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email: email});
    if(!user)
        return res.status(404).send('Could not find user with email.');
    if(user.stripeCustomerId)
        return res.status(200).send({
            message: 'Stripe customer already exists for this user.', 
            customerId: user.stripeCustomerId
        });
    const newCustomer = await stripe.customers.create({
        name: user.name,
        email: user.email
    })
    user.stripeCustomerId = newCustomer.id;
    await user.save();
    return res.status(201).send({
        message: 'Stripe customer created for this user.',
        customerId: newCustomer.id
    })
})

module.exports = router;
