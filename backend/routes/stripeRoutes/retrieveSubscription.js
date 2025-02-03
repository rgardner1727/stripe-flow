const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SK_TEST)
const User = require('../../schemas/userSchema');
router.use(express.json())

router.post('/', async (req, res) => {
    try {
        console.log('Endpoint hit');
        const {email} = req.body;
        const user = await User.findOne({email: email});
        if(!user)
            return res.status(404).send({message: 'User with email not found'});
        if(!user.stripeSubscriptionId)
            return res.status(200).send({status: 'null'});
        const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
        if(subscription.status === 'active')
            return res.status(200).send({status: 'active'});
        else 
            return res.status(200).send({status: 'inactive'});
    } catch(error) {
        console.log(error);
        return res.status(500).send('Internal server error.');
    }
})

module.exports = router;