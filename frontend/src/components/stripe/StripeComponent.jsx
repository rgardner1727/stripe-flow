import { useSubscription } from "../../contexts/SubscriptionContext"
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import {Outlet, useLocation} from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';

const stripePromise = loadStripe(import.meta.env.VITE_PK_TEST);

const StripeComponent = () => {
    const { clientSecret } = useSubscription();
    const location = useLocation();
    const isSuccessPage = location.pathname.includes('success');
    const { isAccessTokenExpired } = useAuth();

    return (
        <>
            {isSuccessPage ? 
                <Elements stripe={stripePromise}><Outlet/></Elements> : 
                <Elements stripe={stripePromise} options={{ clientSecret }}><Outlet/></Elements>
            }
        </>
    )
}

export default StripeComponent;