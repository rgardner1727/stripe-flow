import { useAuth } from "../../contexts/AuthContext";
import { useSubscription } from "../../contexts/SubscriptionContext";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../../styles/subscription-comp.css';

const ManageSubscriptionComponent = ({}) => {
    const {email} = useAuth();
    const {subscriptionType, cancelSubscription, changeSubscription, refreshSubscription, subscriptionStatus} = useSubscription();
    const navigate = useNavigate();

    useEffect(() => {
        refreshSubscription();
    }, [subscriptionStatus]);

    const handleCancelSubscription = async e => {
        e.preventDefault();
        cancelSubscription()
            .catch(error => alert(error.response.data.message));
    }

    const handleChangeSubscription = async (e, type) => {
        e.preventDefault();
        try {
            await changeSubscription(type);
            return navigate('/stripe/payment');
        } catch(error) {
            console.log(error);
        }
    }


    const createSubscriptionCard = (type, price, features) => {
        return (
            <div className='subscription-card' id={type.toLowerCase()} key={type.toLowerCase()}>
            <h1 className='subscription-title'>{type} Plan</h1>
            <div className='price-container'>
                <h2 className='subscription-price'>${price}</h2>
                <div className='per-month-container'>
                    <h3 className='per-month-text'>per month</h3>
                    <p className='per-month-text-small'>Billed monthly</p>
                </div>
            </div>
            <div className='features-container'>
                <ul className='subscription-features'>
                    {features.map((feature, index) => (
                        <li className='subscription-feature' key={index}><span className='feature-title'>{feature.title}:</span> {feature.description}</li>
                    ))}
                </ul>

            </div>
            <button className='subscription-button' type='submit' onClick={e => handleChangeSubscription(e, type.toLowerCase())}>Change Subscription</button>
        </div>
        )
    }

    const subscriptions = [
        createSubscriptionCard('Beginner', 10, [{title: 'Personal Coaching', description: 'Includes two monthly one-on-one coaching session'}, {title: 'Access', description: '3,000+ on demand and live sessions in the areas of mental, physical, social, emotional, nutritional and financial wellness'}]),  
        createSubscriptionCard('Intermediate', 20, [{title: 'Personal Coaching', description: 'Includes two monthly one-on-one coaching session'}, {title: 'Access', description: '3,000+ on demand and live sessions in the areas of mental, physical, social, emotional, nutritional and financial wellness'}]),
        createSubscriptionCard('Advanced', 30, [{title: 'Personal Coaching', description: 'Includes two monthly one-on-one coaching session'}, {title: 'Access', description: '3,000+ on demand and live sessions in the areas of mental, physical, social, emotional, nutritional and financial wellness'}])   
    ]

    return (

        <main className='main'>
            <section className='subscription-section'>
                <div className='subscription-header-container'>
                    <h1 className='subscription-header'>Manage Subscription</h1>
                    <button className='cancel-subscription-button' onClick={e => handleCancelSubscription(e)}>Cancel Subscription</button>
                </div>
                <div className='subscriptions-container'>
                    {subscriptions.filter(subscription => subscription.props.id !== subscriptionType)}
                </div>
            </section>
        </main>

    )
}

export default ManageSubscriptionComponent;