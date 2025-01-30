const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SK_TEST);

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

    console.log('Webhook signature verification successful.');
    return res.status(200).send('Webhook signature verification successful.');
})

module.exports = router;