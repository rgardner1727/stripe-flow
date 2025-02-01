import {PaymentElement} from '@stripe/react-stripe-js';
import {useStripe, useElements} from '@stripe/react-stripe-js';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit = async e => {
        e.preventDefault();
        if(!stripe || !elements) return;
        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'http://localhost:5173/payment/success'
            }
        })
        if(error) {
            console.log(error);
        }
    }
    return (
        <form className='payment-form' onSubmit={handleSubmit}>
            <PaymentElement />
            <button className='payment-button' type='submit'>Pay</button>
        </form>
    )
}

export default PaymentForm;