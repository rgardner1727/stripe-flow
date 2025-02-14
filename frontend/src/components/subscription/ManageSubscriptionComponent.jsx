import { useAuth } from "../../contexts/AuthContext";
import { useSubscription } from "../../contexts/SubscriptionContext";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../../styles/subscription-comp.css';
import SubscriptionCardComponent from './SubscriptionCardComponent';

const ManageSubscriptionComponent = ({}) => {
    const { email } = useAuth();
    const { subscriptionType, cancelSubscription, changeSubscription, refreshSubscription, subscriptionStatus } = useSubscription();
    const navigate = useNavigate();

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

    const subscriptionCards = [
        <SubscriptionCardComponent key={'beginner'}
            type='Beginner' 
            price={10} 
            features={[
                    {title: 'Personal Coaching', description: 'Includes two monthly one-on-one coaching session'}, 
                    {title: 'Access', description: '3,000+ on demand and live sessions in the areas of mental, physical, social, emotional, nutritional and financial wellness'}
            ]} 
            buttonText='Change Subscription'
            handleSubmit={handleChangeSubscription} subscriptionStatus={subscriptionStatus}
        />,
        <SubscriptionCardComponent key={'intermediate'}
            type='Intermediate' 
            price={20} 
            features={[
                {title: 'Personal Coaching', description: 'Includes two monthly one-on-one coaching session'}, 
                {title: 'Access', description: '3,000+ on demand and live sessions in the areas of mental, physical, social, emotional, nutritional and financial wellness'}
            ]} 
            buttonText='Change Subscription'
            handleSubmit={handleChangeSubscription} subscriptionStatus={subscriptionStatus}
        />,

        <SubscriptionCardComponent key={'advanced'}
            type='Advanced' 
            price={30} 
            features={[ 
                {title: 'Personal Coaching', description: 'Includes two monthly one-on-one coaching session'}, 
                {title: 'Access', description: '3,000+ on demand and live sessions in the areas of mental, physical, social, emotional, nutritional and financial wellness'}
            ]} 
            buttonText='Change Subscription'
            handleSubmit={handleChangeSubscription} subscriptionStatus={subscriptionStatus}
        />
    ]

    return (
        <main className='main'>
            <section className='subscription-section'>
                <div className='subscription-header-container'>
                    <h1 className='subscription-header'>Manage Subscription</h1>
                    <button className='cancel-subscription-button' onClick={e => handleCancelSubscription(e)}>Cancel Subscription</button>
                </div>
                <div className='subscriptions-container'>
                    {subscriptionCards.filter(card => card.props.type.toLowerCase() !== subscriptionType)}
                </div>
            </section>
        </main>
    )
}

export default ManageSubscriptionComponent;