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
    const {email} = useAuth();

    useEffect(() => {
        (async () => {
            if(email) {
                await axios.post('http://localhost:3000/stripe/retrieve-subscription', {email})
                .then(response => {
                    setSubscriptionStatus(response.data.status);
                    setSubscriptionType(response.data.type);
                    console.log('effect triggered');
                })
                .catch(error => console.log(error));
            }
        })();
    }, [email, subscriptionStatus]);

    const refreshSubscriptionStatus = () => {
        setSubscriptionStatus('temporary');
        console.log(subscriptionStatus);
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
        await axios.post('http://localhost:3000/stripe/create-subscription', {email, priceId})
            .then(response => {
                setSubscriptionId(response.data.subscriptionId);
                setClientSecret(response.data.clientSecret);
                setSubscriptionStatus('temporary');
            })
            .catch(error => {throw error});

    }

    const cancelSubscription = async () => {
        await axios.post('http://localhost:3000/stripe/cancel-subscription', {email})
            .then(response => {
                setSubscriptionStatus('temporary');
                alert(response.data.message);
            })
            .catch(error => {throw error});
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
        await axios.post('http://localhost:3000/stripe/change-subscription', {email, priceId})
            .then(response => {
                setSubscriptionId(response.data.subscriptionId);
                setClientSecret(response.data.clientSecret);
                setSubscriptionStatus('temporary');
            })
            .catch(error => {throw error});
    }


    return (
        <SubscriptionContext.Provider value={{
            subscriptionId, clientSecret, createSubscription, 
            subscriptionStatus, subscriptionType, cancelSubscription, 
            refreshSubscriptionStatus, changeSubscription}}>
            {children}
        </SubscriptionContext.Provider>
    )
}

export const useSubscription = () => useContext(SubscriptionContext);
