import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

const AuthenticatedComponent = ({children}) => {
    const { accessToken, isLoggedIn, refreshAccessToken } = useAuth();

    (async () => {
        if(!accessToken && isLoggedIn) {
            const [_response, error] = await refreshAccessToken();

            if(error) return <Navigate to='/login'/>;
        }
    })();

    return children;
}

export default AuthenticatedComponent;