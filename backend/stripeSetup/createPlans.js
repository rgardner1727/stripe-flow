const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SK_TEST);

const createPlans = async () => {
    const beginnerPlan = await stripe.prices.create({
        currency: 'usd',
        unit_amount: 1000,
        recurring: {
            interval: 'month'
        },
        product_data: {
            name: 'Beginner Product'
        }
    })

    const intermediatePlan = await stripe.prices.create({
        currency: 'usd',
        unit_amount: 2000,
        recurring: {
            interval: 'month'
        },
        product_data: {
            name: 'Intermediate Product'
        }
    })

    const advancedPlan = await stripe.prices.create({
        currency: 'usd',
        unit_amount: 2000,
        recurring: {
            interval: 'month'
        },
        product_data: {
            name: 'Advanced Product'
        }
    })
}

createPlans();