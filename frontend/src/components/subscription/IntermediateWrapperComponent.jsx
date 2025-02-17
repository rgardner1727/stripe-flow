import {useSubscription} from '../../contexts/SubscriptionContext';
import {Navigate} from 'react-router-dom';

const IntermediateWrapperComponent = ({children}) => {
    const {subscriptionType} = useSubscription();
    
    if(subscriptionType === 'intermediate' || subscriptionType === 'advanced')
        return children;
    else
        return <main className='main'><h1>Loading...</h1></main>
}

export default IntermediateWrapperComponent;