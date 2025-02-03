import {createContext, useState, useContext} from 'react';
import axios from 'axios';

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({children}) => {
    const [subscriptionId, setSubscriptionId] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);

    let priceId;

    const createSubscription = async (email, subscriptionType) => {
        switch (subscriptionType) {
            case 'beginner': 
                priceId = import.meta.env.VITE_BEGINNER_PRICE_ID;
                break;
            case 'intermediate':
                priceId = import.meta.env.VITE_INTERMEDIATE_PRICE_ID;
                break;
            case 'advanced': 
                priceId = import.meta.env.VITE_ADVACNCED_PRICE_ID;
                break;
        }
        await axios.post('http://localhost:3000/create-subscription', {email, priceId})
            .then(response => {
                setSubscriptionId(response.data.subscriptionId);
                setClientSecret(response.data.clientSecret);
            })
            .catch(error => console.log(error));
    }

    return (
        <SubscriptionContext.Provider value={{subscriptionId, clientSecret, createSubscription}}>
            {children}
        </SubscriptionContext.Provider>
    )
}

export const useSubscription = () => useContext(SubscriptionContext);
