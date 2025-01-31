const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SK_TEST);
const User = require('../../schemas/userSchema');

router.use(express.json());

router.post('/', async (req, res) => {
    try {
        const {email, priceId} = req.body;
        const user = await User.findOne({email: email});
        if(!user)
            return res.status(404).json({message: 'User with email not found'});
        const subscription = await stripe.subscriptions.create({
            customer: user.stripeCustomerId,
            items: [{price: priceId}],
            payment_behavior: 'default_incomplete',
            payment_settings: {save_default_payment_method: 'on_subscription'},
            expand: ['latest_invoice.payment_intent']
        })

        res.status(201).json({
            subscriptionId: subscription.id, 
            clientSecret: subscription.latest_invoice.payment_intent.client_secret
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({message: 'Failed to create subscription'});
    }
})

module.exports = router;
