import { useState, useEffect } from 'react';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { useStripe } from '@stripe/react-stripe-js';

const SuccessComponent = () => {
    const stripe = useStripe();
    const [paymentIntentId, setPaymentIntentId] = useState('');
    const { subscriptionStatus, subscriptionType, retrieveSubscription } = useSubscription();
    const [isLoading, setIsLoading] = useState(true);

    setTimeout(() => {
        setIsLoading(false);
    }, 2000);

    useEffect(() => {
        (async () => {
            if(isLoading) return;
            if (!stripe) return;
            // Get the payment intent client secret from the URL
            const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');

            await retrieveSubscription();

            if (clientSecret) {
                stripe.retrievePaymentIntent(clientSecret).then(async ({ paymentIntent }) => {
                    if (paymentIntent.status === 'succeeded') {
                        setPaymentIntentId(paymentIntent.id);
                    }
                });
            }
        })();
    }, [stripe, subscriptionStatus, isLoading]);

    return (
        <main className='main'>
            {
                isLoading ? <h1>Loading...</h1> : 
                <>
                    <h1>Payment Successful! Your subscription status is {subscriptionStatus}.</h1>
                    <h2>Your subscription type is {subscriptionType}.</h2>
                    <p>Your Stripe Payment Intent ID is <b>{paymentIntentId}</b></p>
                </>
            }
        </main>
    );
};

export default SuccessComponent;
