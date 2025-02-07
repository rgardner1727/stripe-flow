const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SK_TEST);
const User = require('../schemas/userSchema');

router.use(express.raw({type: 'application/json'}));

router.post('/', (req, res) => {
    const payload = req.body;
    const signature = req.headers['stripe-signature'];
    
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            payload,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch(error) {
        console.log('Webhook signature verification failed.', error);
        return res.status(400).send('Webhook signature verification failed.');
    }

    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object;
            console.log('Payment intent succeeded', paymentIntentSucceeded.id);
            break;
        case 'invoice.payment_succeeded':
            const invoice = event.data.object;
            console.log('Invoice payment succeeded', invoice.id);
            const email = invoice.customer_email;
            (async () => {
                try {
                    const user = await User.findOne({email: email});
                    if(!user)
                        return res.status(404).json({message: 'User with email not found'});
                    const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
                    user.subscription.id = subscription.id;
                    user.subscription.status = subscription.status;
                    switch (subscription.items.data[0].price.id) {
                        case process.env.STRIPE_BEGINNER_PRICE_ID:
                            user.subscription.type = 'beginner';
                            break;
                        case process.env.STRIPE_INTERMEDIATE_PRICE_ID:
                            user.subscription.type = 'intermediate';
                            break;
                        case process.env.STRIPE_ADVANCED_PRICE_ID:
                            user.subscription.type = 'advanced';
                            break;
                    }
                    await user.save();

                } catch(error) {
                    console.log('Error updating subscription status', error);
                }
            })();
            break;

        case 'customer.subscription.deleted':
            const subscriptionDeleted = event.data.object;
            console.log('Subscription deleted', subscriptionDeleted.id);
            (async () => {
                try {
                    const email = subscriptionDeleted.customer_email;
                    const user = await User.findOne({email: email});
                    if(!user)
                        return res.status(404).json({message: 'User with email not found.'});
                    user.subscription.id = null;
                    user.subscription.status = 'inactive';
                    user.subscription.type = null;
                    await user.save();
                } catch(error) {
                    console.log('Error cancelling subscription', error);
                }
            })();
            break;
            
        case 'customer.subscription.updated':
            const subscription = event.data.object;
            console.log('Subscription updated', subscription.id);
            break;

        case 'payment_intent.payment_failed':
            const paymentIntentFailed = event.data.object;
            console.log('Payment intent failed', paymentIntentFailed.id);
            break;
        default: 
            console.log('Unhandled event type', event.type);
    }
    return res.status(200).send('Webhook processed successfully.');
})

module.exports = router;