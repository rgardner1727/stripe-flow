import { useAuth } from '../../contexts/AuthContext';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../styles/aside.css';


const AsideComponent = () => {
    const { accessToken } = useAuth();
    const { subscriptionType } = useSubscription();

    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [isAsideOpen, setIsAsideOpen] = useState(false);
    const windowSizeIsLessThan1280 = windowSize < 1280;

    useEffect(() => {
        const handleResize = () => setWindowSize(window.innerWidth);

        window.addEventListener('resize', handleResize);

        windowSizeIsLessThan1280 ? setIsAsideOpen(false) : setIsAsideOpen(true);

        return () => window.removeEventListener('resize', handleResize);
    }, [windowSize]);

    return (
        <>
            {accessToken && <aside className={`aside-${isAsideOpen ? 'open' : 'closed'}`}>
                    <nav className='nav'>
                        <ul className='nav-list'>
                            <li className='nav-item'><Link to='/'>Home</Link></li>
                            <li className='nav-item'><Link to='/subscriptions'>Subscriptions</Link></li>
                            {(subscriptionType === 'beginner' || subscriptionType === 'intermediate' || subscriptionType === 'advanced') && <li className='nav-item'><Link to='/beginner-feature'>Beginner</Link></li>}
                            {(subscriptionType === 'intermediate' || subscriptionType === 'advanced') && <li className='nav-item'><Link to='/intermediate-feature'>Intermediate</Link></li>}
                            {(subscriptionType === 'advanced') && <li className='nav-item'><Link to='/advanced-feature'>Advanced</Link></li>}
                            <div className='separate-nav-item'>
                            <li className='nav-item'><Link to='/logout'>Logout</Link></li>
                            </div>
                        </ul>
                    </nav>
                </aside>
            }
            {accessToken && windowSizeIsLessThan1280 && <button className='toggle-aside-button' onClick={() => setIsAsideOpen(!isAsideOpen)}>{isAsideOpen ? 'Close' : 'Open'}</button>}
        </>
    )
}

export default AsideComponent;