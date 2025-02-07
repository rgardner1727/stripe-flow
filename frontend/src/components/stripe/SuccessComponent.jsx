import { useState, useEffect } from 'react';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { useStripe } from '@stripe/react-stripe-js';

const SuccessComponent = () => {
    const stripe = useStripe();
    const [message, setMessage] = useState('');
    const { subscriptionStatus, refreshSubscription } = useSubscription();

    useEffect(() => {
        if (!stripe) return;
        // Get the payment intent client secret from the URL
        const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');

        refreshSubscription();

        if (clientSecret) {
            stripe.retrievePaymentIntent(clientSecret).then(async ({ paymentIntent }) => {
                if (paymentIntent.status === 'succeeded') {
                    setMessage(
                        <>
                            <h1>Payment Successful! Your subscription status is {subscriptionStatus}.</h1>
                            <p>Your Stripe Payment Intent ID is <b>{paymentIntent.id}</b></p>
                        </>
                    )
                }
            });
        }
    }, [stripe, subscriptionStatus]);

    return (
        <div className='success-container'>
            <div>{message}</div>
        </div>
    );
};

export default SuccessComponent;
