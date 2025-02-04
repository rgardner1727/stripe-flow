import {useSubscription} from '../../contexts/SubscriptionContext';
import {Navigate} from 'react-router-dom';

const IntermediateWrapperComponent = ({children}) => {
    const {subscriptionType} = useSubscription();

    if(subscriptionType === 'intermediate' || subscriptionType === 'advanced')
        return children;
    else
        return <Navigate to='/'/>
}

export default IntermediateWrapperComponent;