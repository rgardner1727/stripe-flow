import { useSubscription } from '../../contexts/SubscriptionContext';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const BeginnerWrapperComponent = ({children}) => {
    const { subscriptionType } = useSubscription();

    if(subscriptionType === 'beginner' || subscriptionType === 'intermediate' || subscriptionType === 'advanced')
        return children;
    else
        return <main className='main'><h1>Loading...</h1></main>
}

export default BeginnerWrapperComponent;