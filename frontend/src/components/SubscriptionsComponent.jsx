import { useAuth } from "../contexts/AuthContext";
import { useSubscription } from "../contexts/SubscriptionContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


const SubscriptionsComponent = () => {
    const {email} = useAuth();
    const {createSubscription} = useSubscription();
    const navigate = useNavigate();
    const [subscriptionStatus, setSubscriptionStatus] = useState(null);

    useEffect(() => {
        (async () => await axios.post('http://localhost:3000/retrieve-subscription', {email})
            .then(response => {
                setSubscriptionStatus(response.data.status);
                console.log(response.data.status);
            })
            .catch(error => console.log(error)))();
    }, [])

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
            {(subscriptionStatus === 'null' || subscriptionStatus === 'inactive') && <>
                    <h1 className='subscriptions-header'>Subscriptions</h1>
                    <div className='subscriptions-container'>
                        <div className='subscription-card'>
                            <h2 className='subscription-title'>Beginner Plan</h2>
                            <p className='subscription-price'>$10/month</p>
                            <button className='subscribe-button' type='submit' onClick={(e) => {handleSubmit(e, 'beginner')}}>Subscribe</button>
                        </div>
                    </div>
                </>
            }
        </main>
    )
}

export default SubscriptionsComponent;