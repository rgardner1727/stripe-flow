import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useStripe } from '@stripe/react-stripe-js';

const SuccessComponent = () => {
    const stripe = useStripe();
    const { email } = useAuth();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    console.log(email);

    useEffect(() => {
        if (!stripe) return;

        // Get the payment intent client secret from the URL
        const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');

        if (clientSecret) {
            stripe.retrievePaymentIntent(clientSecret).then(async ({ paymentIntent }) => {
                if (paymentIntent.status === 'succeeded') {
                    setMessage(`Payment successful. Your payment intent is ${paymentIntent.id}. 
                        If your subscription is not updated, please refresh the page.`);
                }
            });
        }

    }, [stripe, email]);

    return (
        <div className='success-container'>
            <h1>{message}</h1>
            <p>Your subscription has been activated.</p>
        </div>
    );
};

export default SuccessComponent;
