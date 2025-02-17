import { useAuth } from '../../contexts/AuthContext';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { useEffect } from 'react';

const HomeComponent = () => {
    const { subscriptionStatus, subscriptionType } = useSubscription();

    return (
        subscriptionStatus && <main className='main'>
            <h1 className='home-h1'>Welcome to the home page</h1>
            <h2 className='home-h2'>Your current subscription is { subscriptionStatus }</h2>
            <h2 className='home-h2'>{subscriptionType ? `Your subscription type is ${ subscriptionType }` : 'You do not have a subscription'}</h2>
        </main>
    )

}

export default HomeComponent;