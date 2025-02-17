import { useSubscription } from '../../contexts/SubscriptionContext';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const BeginnerWrapperComponent = ({children}) => {
    const { subscriptionType } = useSubscription();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(subscriptionType === 'beginner' || subscriptionType === 'intermediate' || subscriptionType === 'advanced')
            return;
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [subscriptionType]);

    if(subscriptionType === 'beginner' || subscriptionType === 'intermediate' || subscriptionType === 'advanced')
        return children;
    else
        return <main className='main'><h1>Loading...</h1></main>
}

export default BeginnerWrapperComponent;