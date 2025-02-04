const express = require('express');
const router = express.Router();
const User = require('../schemas/userSchema');
const stripe = require('stripe')(process.env.STRIPE_SK_TEST);

router.use(express.json());

router.post('/create-subscription', async (req, res) => {
    try {
        const {email, priceId} = req.body;
        const user = await User.findOne({email: email});
        if(!user)
            return res.status(404).json({message: 'User with email not found'});
        if(user.subscription.id && user.subscription.status === 'active')
            return res.status(400).json({message: 'User already has an active subscription'});
        const subscription = await stripe.subscriptions.create({
            customer: user.stripeCustomerId,
            items: [{price: priceId}],
            payment_behavior: 'default_incomplete',
            payment_settings: {save_default_payment_method: 'on_subscription'},
            expand: ['latest_invoice.payment_intent'],
            metadata: {
                email: user.email,
            }
        });

        user.subscription.id = subscription.id;
        user.subscription.status = subscription.status;

        await user.save();

        res.status(201).json({
            subscriptionId: subscription.id, 
            clientSecret: subscription.latest_invoice.payment_intent.client_secret
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({message: 'Failed to create subscription'});
    }
})

router.post('/retrieve-subscription', async (req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email: email});
        if(!user)
            return res.status(404).send({message: 'User with email not found'});
        if(user.subscription.status === 'active')
            return res.status(200).send({status: user.subscription.status, type: user.subscription.type});
        else
            return res.status(200).send({status: 'inactive', type: null});
    } catch(error) {
        console.log(error);
        return res.status(500).send('Internal server error.');
    }
})

router.get('/retrieve-prices', async (req, res) => {
    const prices = await stripe.prices.list();
    res.json(prices);
})

module.exports = router;