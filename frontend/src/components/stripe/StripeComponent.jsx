import { useSubscription } from "../../contexts/SubscriptionContext"
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import {Outlet, useLocation} from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_PK_TEST);

const StripeComponent = () => {
    const { clientSecret } = useSubscription();
    const location = useLocation();
    const isSuccessPage = location.pathname.includes('success');

    return (
        <main className='main'>
            {isSuccessPage ? 
                <Elements stripe={stripePromise}><Outlet/></Elements> : 
                <Elements stripe={stripePromise} options={{ clientSecret }}><Outlet/></Elements>
            }
        </main>

    )
}

export default StripeComponent;