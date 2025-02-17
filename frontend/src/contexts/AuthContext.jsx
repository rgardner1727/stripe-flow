import {createContext, useState, useContext, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [accessToken, setAccessToken] = useState();
    const [email, setEmail] = useState(() => localStorage.getItem('email'));
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        (async () => {
            const [_response, error] = await refreshAccessToken();

            if(error) return;
        })();
    }, [accessToken, isLoggedIn]);

    const register = async (firstName, lastName, email, password) => {
        try {
            const response = await axios.post('http://localhost:4000/auth/register', { firstName, lastName, email, password });

            if(response.status === 201)
                return [response, null];
        } catch(error) {
            return [null, error];
        }
    }

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:4000/auth/login', { email, password });

            if(response.status === 201){
                setAccessToken(response.data.accessToken);

                const email = jwtDecode(response.data.accessToken).email;

                setEmail(email);

                localStorage.setItem('email', email);

                setIsLoggedIn(true);

                return [response, null];
            }
        } catch(error) {
            return [null, error];
        }
    }

    const logout = async () => {
        try {
            const response = await axios.post('http://localhost:4000/auth/logout', { email });

            if(response.status === 204) {
                setIsLoggedIn(false);

                setAccessToken(null);

                setEmail(null);

                return [response, null];
            }
        } catch (error) {
            return [null, error];
        }
    }

    const refreshAccessToken = async () => {
        try {
            const response = await axios.post('http://localhost:4000/auth/refresh', { email });

            if(response.status === 201) {
                setAccessToken(response.data.accessToken);

                setEmail(jwtDecode(response.data.accessToken).email);

                localStorage.setItem('email', jwtDecode(response.data.accessToken).email);

                setIsLoggedIn(true);

                return [response, null];
            }
        } catch(error) {
            return [null, error];
        }
    }

    return (
        <AuthContext.Provider value={{ accessToken, email, isLoggedIn, register, login, logout, refreshAccessToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);