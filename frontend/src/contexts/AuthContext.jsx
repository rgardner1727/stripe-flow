import {createContext, useState, useContext, useEffect} from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAuthenticated') === 'true');
    const [email, setEmail] = useState(() => {
        const storedEmail = localStorage.getItem('userEmail');
        return storedEmail || '';
    });

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', {email, password});
            if(response.status === 201){
                setIsAuthenticated(true);
                setEmail(email);
                localStorage.setItem('userEmail', email);
                localStorage.setItem('isAuthenticated', 'true');
                return true;
            }
        } catch(error) {
            console.log(error);
        }
    }

    const register = async (name, email, password) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/register', {name, email, password});
            if(response.status === 201)
                return true;
        } catch(error) {
            console.log(error);
        }
    }

    const logout = () => {
        setIsAuthenticated(false);
        setEmail('');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('isAuthenticated');
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, email, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);