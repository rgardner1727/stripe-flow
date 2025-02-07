import {PaymentElement} from '@stripe/react-stripe-js';
import {useStripe, useElements} from '@stripe/react-stripe-js';
import '../../styles/stripe-form.css';

const PaymentComponent = () => {
    const stripe = useStripe();
    const elements = useElements();
    
    const handleSubmit = async e => {
        e.preventDefault();
        if(!stripe || !elements) return;
        
        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/stripe/success`
            }
        })
        if(error) {
            console.log(error);
        }
    }
    
    return (
        <form className='payment-form' onSubmit={handleSubmit}>
            <h1 className='payment-title'>Purchase your subscription</h1>
            <PaymentElement />
            <button className='payment-button' type='submit'>Pay</button>
        </form>
    )
}

export default PaymentComponent;