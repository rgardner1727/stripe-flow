import {useSubscription} from '../../contexts/SubscriptionContext';
import {Navigate} from 'react-router-dom';

const AdvancedWrapperComponent = ({children}) => {
    const {subscriptionType} = useSubscription();

    if(subscriptionType === 'advanced')
        return children;
    else
        return <main className='main'><h1>Loading...</h1></main>
}

export default AdvancedWrapperComponent;