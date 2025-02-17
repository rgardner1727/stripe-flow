import {useAuth} from '../../contexts/AuthContext';
import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutComponent = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const [_response, error] = await logout();

            if(error) return;

            navigate('/login');
        })();
    }, []);
}

export default LogoutComponent;