import { useSubscription } from "../contexts/SubscriptionContext"
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_PK_TEST);

const StripeComponent = () => {
    const {subscriptionId, clientSecret} = useSubscription();

    const options = {
        clientSecret,
        appearance: {
            theme: 'stripe'
        }
    }


    return (
        <main className='main'>
            {clientSecret && <Elements stripe={stripePromise} options={options}>
                <PaymentForm/>
            </Elements>}
        </main>
    )
}

export default StripeComponent;