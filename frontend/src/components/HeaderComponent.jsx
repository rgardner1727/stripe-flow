import {useAuth} from '../contexts/AuthContext';
import {Link} from 'react-router-dom';

const HeaderComponent = () => {
    const {isAuthenticated, logout} = useAuth();

    return (
        isAuthenticated && <header className='header'>
            <nav className='nav'>
                <ul className='nav-list'>
                    <li className='nav-item'><Link to='/'>Home</Link></li>
                    <li className='nav-item'><Link to='/subscriptions'>Subscriptions</Link></li>
                    <li className='nav-item'><Link to='/logout' onClick={logout}>Logout</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default HeaderComponent;