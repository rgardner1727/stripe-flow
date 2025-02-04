import { useAuth } from "../../contexts/AuthContext";
import { useSubscription } from "../../contexts/SubscriptionContext";
import { useNavigate } from "react-router-dom";
import '../../styles/subscription-comp.css';


const SubscriptionsComponent = () => {
    const {email} = useAuth();
    const {createSubscription, subscriptionStatus, subscriptionType} = useSubscription();
    const navigate = useNavigate();

    const handleSubmit = async (e, subscriptionType) => {
        e.preventDefault();
        if(!email)
            return;
        try {
            await createSubscription(subscriptionType);
            navigate('/stripe/payment');
        } catch(error) {
            console.log(error);
        }
    }

    const subscriptions = [
        <div className='subscription-card' id='beginner'>
            <h2 className='subscription-title'>Beginner Plan</h2>
            <p className='subscription-price'>$10/month</p>
            <ul className='subscription-features'>
                <li className='subscription-feature'>Feature 1</li>
                <li className='subscription-feature'>Feature 2</li>
                <li className='subscription-feature'>Feature 3</li>
            </ul>
            <button className='subscribe-button' type='submit' onClick={(e) => handleSubmit(e, 'beginner')}>Subscribe</button>
        </div>, 

        <div className='subscription-card' id='intermediate'>
            <h2 className='subscription-title'>Intermediate Plan</h2>
            <p className='subscription-price'>$20/month</p>
            <ul className='subscription-features'>
                <li className='subscription-feature'>Feature 1</li>
                <li className='subscription-feature'>Feature 2</li>
                <li className='subscription-feature'>Feature 3</li>
                <li className='subscription-feature'>Feature 4</li>
            </ul>
            <button className='subscribe-button' type='submit' onClick={(e) => handleSubmit(e, 'intermediate')}>Subscribe</button>
        </div>,
        <div className='subscription-card' id='advanced'>
            <h2 className='subscription-title'>Advanced Plan</h2>
            <p className='subscription-price'>$30/month</p>
            <ul className='subscription-features'>
                <li className='subscription-feature'>Feature 1</li>
                <li className='subscription-feature'>Feature 2</li>
                <li className='subscription-feature'>Feature 3</li>
                <li className='subscription-feature'>Feature 4</li>
                <li className='subscription-feature'>Feature 5</li>
            </ul>
            <button className='subscribe-button' type='submit' onClick={(e) => handleSubmit(e, 'advanced')}>Subscribe</button>
        </div>
    ]

    return (
        <main className={`main-${subscriptionStatus}`}>
            {subscriptionStatus === 'active' ? 
                <>
                    <div className='active-subscription-details-container'>
                        <h1 className='active-subscription-header'>Your Subscription Details</h1>
                        {subscriptions.filter(subscription => subscription.props.id === subscriptionType)}
                    </div>
                    <div className='update-subscription-container'>
                           <h1 className='update-subscription-header'>Update Subscription</h1>
                    </div>
                </>
                :
                <>
                    <div className='no-subscription-container'>
                        {subscriptions}
                    </div>
                </>
            }

        </main>
    )
}

export default SubscriptionsComponent;