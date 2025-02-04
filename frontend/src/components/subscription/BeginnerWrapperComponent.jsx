import {useSubscription} from '../../contexts/SubscriptionContext';
import {Navigate} from 'react-router-dom';

const BeginnerWrapperComponent = ({children}) => {
    const {subscriptionType} = useSubscription();

    if(subscriptionType === 'beginner' || subscriptionType === 'intermediate' || subscriptionType === 'advanced')
        return children;
    else
        return <Navigate to='/'/>
}

export default BeginnerWrapperComponent;