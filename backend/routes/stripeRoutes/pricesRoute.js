const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SK_TEST);

router.get('/', async (req, res) => {
    const prices = await stripe.prices.list();
    res.json(prices);
})

module.exports = router;