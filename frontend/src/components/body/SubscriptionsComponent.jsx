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
        if(subscriptionStatus === 'active' || subscriptionStatus === 'cancelled')
            return navigate('/manage-subscription');
        try {
            await createSubscription(subscriptionType);
            navigate('/stripe/payment');
        } catch(error) {
            console.log(error);
        }
    }

    const createSubscriptionCard = (type, price, features) => {
        return (
            <div className='subscription-card' id={type.toLowerCase()} key={type.toLowerCase()}>
            <h1 className='subscription-title'>{type} Plan</h1>
            <div className='price-container'>
                <h2 className='subscription-price'>${price}</h2>
                <div className='per-month-container'>
                    <h3 className='per-month-text'>per month</h3>
                    <p className='per-month-text-small'>Billed monthly</p>
                </div>
            </div>
            <div className='features-container'>
                <ul className='subscription-features'>
                    {features.map((feature, index) => (
                        <li className='subscription-feature' key={index}><span className='feature-title'>{feature.title}:</span> {feature.description}</li>
                    ))}
                </ul>

            </div>
            <button className='subscription-button' type='submit' onClick={e => handleSubmit(e, type.toLowerCase())}>{subscriptionStatus === 'active' || subscriptionStatus === 'cancelled' ? 'Manage Subscription' : 'Subscribe'}</button>
        </div>
        )
    }

    const subscriptions = [
        createSubscriptionCard('Beginner', 10, [{title: 'Personal Coaching', description: 'Includes two monthly one-on-one coaching session'}, {title: 'Access', description: '3,000+ on demand and live sessions in the areas of mental, physical, social, emotional, nutritional and financial wellness'}]),
        createSubscriptionCard('Intermediate', 20, [{title: 'Personal Coaching', description: 'Includes two monthly one-on-one coaching session'}, {title: 'Access', description: '3,000+ on demand and live sessions in the areas of mental, physical, social, emotional, nutritional and financial wellness'}]),
        createSubscriptionCard('Advanced', 30, [{title: 'Personal Coaching', description: 'Includes two monthly one-on-one coaching session'}, {title: 'Access', description: '3,000+ on demand and live sessions in the areas of mental, physical, social, emotional, nutritional and financial wellness'}])   
    ]


    return (
        <main className='main'>
            {subscriptionStatus === 'active' || subscriptionStatus === 'cancelled' ? 
                <>
                    <section className='subscription-section'>
                        <div className='subscription-header-container'>
                            <h1 className='subscription-header'>Current Subscription</h1>
                        </div>
                        <div className='subscriptions-container'>
                            {subscriptionStatus === 'cancelled' && <p className='subscription-cancelled'>Your subscription has been cancelled and will inactive at the end of the current period.</p>}
                            {subscriptions.filter(subscription => subscription.props.id === subscriptionType)}
                        </div>
                    </section>
                </>
                :
                <>
                    <section className='subscription-section'>
                        <div className='subscription-header-container'>
                            <h1 className='subscription-header'>Available Subscriptions</h1>
                        </div>
                        <div className='subscriptions-container'>{subscriptions}</div>
                    </section>
                </>
            }
        </main>
    )
}

export default SubscriptionsComponent;