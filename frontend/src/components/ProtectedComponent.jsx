import {useAuth} from '../contexts/AuthContext';
import {Navigate} from 'react-router-dom';

const ProtectedComponent = ({children}) => {
    const {isAuthenticated} = useAuth();

    if(!isAuthenticated) {
        return <Navigate to='/login'/>;
    }
    return children;
}

export default ProtectedComponent;