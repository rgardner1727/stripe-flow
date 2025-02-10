import { useAuth } from '../../contexts/AuthContext';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../styles/header.css';


const HeaderComponent = () => {
    const { isAuthenticated } = useAuth();
    const { subscriptionType } = useSubscription();

    return (
        isAuthenticated && <header className='header'>
            <nav className='nav'>
                <ul className='nav-list'>
                    <li className='nav-item'><Link to='/'>Home</Link></li>
                    <li className='nav-item'><Link to='/subscriptions'>Subscriptions</Link></li>
                    {(subscriptionType === 'beginner' || subscriptionType === 'intermediate' || subscriptionType === 'advanced') && <li className='nav-item'><Link to='/beginner-feature'>Beginner</Link></li>}
                    {(subscriptionType === 'intermediate' || subscriptionType === 'advanced') && <li className='nav-item'><Link to='/intermediate-feature'>Intermediate</Link></li>}
                    {(subscriptionType === 'advanced') && <li className='nav-item'><Link to='/advanced-feature'>Advanced</Link></li>}
                </ul>

                <ul className='nav-list-right'>

                    <li className='nav-item'><Link to='/logout'>Logout</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default HeaderComponent;