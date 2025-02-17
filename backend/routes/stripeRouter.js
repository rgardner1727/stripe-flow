const express = require('express');
const router = express.Router();
const User = require('../schemas/userSchema');
const stripe = require('stripe')(process.env.STRIPE_SK_TEST);
const authenticateAccessToken = require('../middleware/authenticateAccessToken');

router.use(express.json());

router.post('/create-subscription', authenticateAccessToken, async (req, res) => {
    try {
        const { email, priceId } = req.body;
        const user = await User.findOne({ email: email });
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

router.post('/retrieve-subscription', authenticateAccessToken, async (req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email: email});
        if(!user)
            return res.status(404).send({message: 'User with email not found'});
        user.subscription.status === 'active' || user.subscription.status === 'cancelled' ? 
            res.status(200).send({status: user.subscription.status, type: user.subscription.type}) :
            res.status(200).send({status: 'inactive', type: null});
    } catch(error) {
        console.log(error);
        return res.status(500).send('Internal server error.');
    }
})

router.post('/cancel-subscription', authenticateAccessToken, async (req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email: email});
        if(!user)
            return res.status(404).send({message: 'User with email not found'});
        if(user.subscription.status === 'cancelled')
            return res.status(400).send({message: 'Subscription already cancelled.'});
        if(!user.subscription.status === 'active')
            return res.status(400).send({message: 'User does not have an active subscription.'});
        await stripe.subscriptions.update(user.subscription.id, {
            cancel_at_period_end: true,
        });
        user.subscription.status = 'cancelled';
        await user.save();
        return res.status(200).send({message: 'Subscription will be cancelled at the end of the current period.', subscriptionStatus: 'cancelled'});
    } catch(error) {
        console.log(error);
        res.status(500).send('Internal server error. Could not cancel subscription.');
    }
})

router.post('/change-subscription', authenticateAccessToken, async (req, res) => {
    try {
        const {email, priceId} = req.body;
        const user = await User.findOne({email: email});
        if(!user)
            return res.status(404).send({message: 'User with email not found'});
        if(user.subscription.status === 'active'){
            await stripe.subscriptions.update(user.subscription.id, {
                cancel_at_period_end: true,
            });
        }
        const newSubscription = await stripe.subscriptions.create({
            customer: user.stripeCustomerId,
            items: [{price: priceId}],
            payment_behavior: 'default_incomplete',
            payment_settings: {save_default_payment_method: 'on_subscription'},
            expand: ['latest_invoice.payment_intent'],
            metadata: {
                email: user.email
            }
        })
        user.subscription.id = newSubscription.id;
        await user.save();
        return res.status(200).send({
            subscriptionId: newSubscription.id,
            clientSecret: newSubscription.latest_invoice.payment_intent.client_secret
        })
    } catch(error) {
        console.log(error);
        res.status(500).send('Internal server error. Could not change subscription.');
    }
})

router.get('/retrieve-prices', authenticateAccessToken, async (req, res) => {
    const prices = await stripe.prices.list();
    res.json(prices);
})

module.exports = router;