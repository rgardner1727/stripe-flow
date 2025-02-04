import {useAuth} from '../../contexts/AuthContext';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const LogoutComponent = () => {
    const {logout} = useAuth();

    useEffect(() => {
        logout();
    })
}

export default LogoutComponent;