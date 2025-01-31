import {createContext, useState, useContext} from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState('');

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3000/login', {email, password});
            if(response.status === 201){
                setIsAuthenticated(true);
                setEmail(email);
                return true;
            }
        } catch(error) {
            console.log(error);
        }
    }

    const register = async (name, email, password) => {
        try {
            const response = await axios.post('http://localhost:3000/register', {name, email, password});
            if(response.status === 201){
                setIsAuthenticated(true);
                return true;
            }
        } catch(error) {
            console.log(error);
        }
    }

    const logout = () => {
        setIsAuthenticated(false);
        setEmail('');
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, email, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);