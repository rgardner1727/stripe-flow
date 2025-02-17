import {createContext, useState, useContext, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from './AuthContext';
import axios from 'axios';

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({children}) => {
    const [subscriptionId, setSubscriptionId] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);
    const [subscriptionStatus, setSubscriptionStatus] = useState(null);
    const [subscriptionType, setSubscriptionType] = useState(null);
    const { accessToken, email, logout } = useAuth();

    useEffect(() => {
        (async () => {
            if(accessToken) {
                const [_response, error] = await retrieveSubscription();

                if(error) return;
            }
        })();
    }, [subscriptionStatus, subscriptionType, accessToken]);

    const config = {
        headers : {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    }

    const retrieveSubscription = async () => {
        try {
            const response = await axios.post('http://localhost:4000/stripe/retrieve-subscription', { email }, config);

            setSubscriptionStatus(response.data.status);

            setSubscriptionType(response.data.type);

            return [response, null];
        } catch(error) {
            return [null, error];
        }
    }
    const cancelSubscription = async () => {
        try {
            const response = await axios.post('http://localhost:4000/stripe/cancel-subscription', {email}, config);

            setSubscriptionStatus(response.data.subscriptionStatus);

            alert(response.data.message);

            return [response, null];
        } catch(error) {
            return [null, error];
        }
    }

    const createSubscription = async (subscriptionType) => {
        let priceId;

        switch (subscriptionType) {
            case 'beginner':    
                priceId = import.meta.env.VITE_BEGINNER_PRICE_ID;
                break;
            case 'intermediate':
                priceId = import.meta.env.VITE_INTERMEDIATE_PRICE_ID;
                break;
            case 'advanced':
                priceId = import.meta.env.VITE_ADVANCED_PRICE_ID;
                break;
            default:
                console.log('Invalid subscription type');
                return;
        }
        try {
            const response = await axios.post('http://localhost:4000/stripe/create-subscription', { email, priceId }, config);

            setSubscriptionId(response.data.subscriptionId);

            setClientSecret(response.data.clientSecret);

            return [response, null];
        } catch(error) {
            return [null, error];
        }
    }

    const changeSubscription = async (subscriptionType) => {
        let priceId;

        switch (subscriptionType) {
            case 'beginner':    
                priceId = import.meta.env.VITE_BEGINNER_PRICE_ID;
                break;
            case 'intermediate':
                priceId = import.meta.env.VITE_INTERMEDIATE_PRICE_ID;
                break;
            case 'advanced':
                priceId = import.meta.env.VITE_ADVANCED_PRICE_ID;
                break;
            default:
                console.log('Invalid subscription type');
                return;
        }
        try {
            const response = await axios.post('http://localhost:4000/stripe/change-subscription', {email, priceId}, config);

            setSubscriptionId(response.data.subscriptionId);

            setClientSecret(response.data.clientSecret);

            setSubscriptionStatus('temporary');

            return [response, null];
        } catch(error) {
            return [null, error];
        }
    }


    return (
        <SubscriptionContext.Provider value={{
            subscriptionId, clientSecret, createSubscription, 
            subscriptionStatus, subscriptionType, cancelSubscription, changeSubscription, retrieveSubscription}}>
            {children}
        </SubscriptionContext.Provider>
    )

}

export const useSubscription = () => useContext(SubscriptionContext);
