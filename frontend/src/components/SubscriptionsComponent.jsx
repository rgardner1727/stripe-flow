import { useAuth } from "../contexts/AuthContext";
import { useSubscription } from "../contexts/SubscriptionContext";
import { useNavigate } from "react-router-dom";

const SubscriptionsComponent = () => {
    const {email} = useAuth();
    const {createSubscription} = useSubscription();
    const navigate = useNavigate();

    const handleSubmit = async (e, subscriptionType) => {
        e.preventDefault();
        if(!email)
            return;
        try {
            await createSubscription(email, subscriptionType);
            navigate('/payment');
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <main className='main'>
            <h1 className='subscriptions-header'>Subscriptions</h1>
            <div className='subscriptions-container'>
                <div className='subscription-card'>
                    <h2 className='subscription-title'>Beginner Plan</h2>
                    <p className='subscription-price'>$10/month</p>
                    <button className='subscribe-button' type='submit' onClick={(e) => {handleSubmit(e, 'beginner')}}>Subscribe</button>
                </div>
            </div>
        </main>
    )
}

export default SubscriptionsComponent;