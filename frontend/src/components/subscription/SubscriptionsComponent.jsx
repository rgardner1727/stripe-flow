import { useEffect } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { useSubscription } from "../../contexts/SubscriptionContext";
import { useNavigate } from "react-router-dom";
import '../../styles/subscription-comp.css';
import SubscriptionCardComponent from './SubscriptionCardComponent';


const SubscriptionsComponent = () => {
    const {email} = useAuth();
    const {createSubscription, subscriptionStatus, subscriptionType, refreshSubscription} = useSubscription();
    const navigate = useNavigate();

    useEffect(() => {
        refreshSubscription();
    }, []);

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

    const subscriptionCards = [
        <SubscriptionCardComponent key={'beginner'}
            type='Beginner' 
            price={10} 
            features={[
                    {title: 'Personal Coaching', description: 'Includes two monthly one-on-one coaching session'}, 
                    {title: 'Access', description: '3,000+ on demand and live sessions in the areas of mental, physical, social, emotional, nutritional and financial wellness'}
            ]}
            buttonText={subscriptionStatus === 'active' || subscriptionStatus === 'cancelled' ? 'Manage Subscription' : 'Subscribe'}
            handleSubmit={handleSubmit} subscriptionStatus={subscriptionStatus}
        />,
        <SubscriptionCardComponent key={'intermediate'}
            type='Intermediate' 
            price={20} 
            features={[
                {title: 'Personal Coaching', description: 'Includes two monthly one-on-one coaching session'}, 
                {title: 'Access', description: '3,000+ on demand and live sessions in the areas of mental, physical, social, emotional, nutritional and financial wellness'}
            ]} 
            buttonText={subscriptionStatus === 'active' || subscriptionStatus === 'cancelled' ? 'Manage Subscription' : 'Subscribe'}
            handleSubmit={handleSubmit} subscriptionStatus={subscriptionStatus}
        />,
        <SubscriptionCardComponent key={'advanced'}
            type='Advanced' 
            price={30} 
            features={[ 
                {title: 'Personal Coaching', description: 'Includes two monthly one-on-one coaching session'}, 
                {title: 'Access', description: '3,000+ on demand and live sessions in the areas of mental, physical, social, emotional, nutritional and financial wellness'}
            ]} 
            buttonText={subscriptionStatus === 'active' || subscriptionStatus === 'cancelled' ? 'Manage Subscription' : 'Subscribe'}
            handleSubmit={handleSubmit} subscriptionStatus={subscriptionStatus}
        />
    ]



    return (
        <main className='main'>
            {subscriptionStatus === 'active' || subscriptionStatus === 'cancelled' ? 
                <>
                    <section className='subscription-section'>
                        <div className='subscription-header-container'>
                            <h1 className='subscription-header'>Your Subscription</h1>
                        </div>
                        <div className='subscriptions-container'>
                            {subscriptionCards.filter(card => card.props.type.toLowerCase() === subscriptionType.toLowerCase())}
                        </div>
                    </section>
                </>
                :
                <>
                    <section className='subscription-section'>
                        <div className='subscription-header-container'>
                            <h1 className='subscription-header'>Available Subscriptions</h1>
                        </div>
                        <div className='subscriptions-container'>
                            {subscriptionCards}
                        </div>
                    </section>
                </>
            }
        </main>
    )
}

export default SubscriptionsComponent;