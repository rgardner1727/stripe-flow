import {useState, useEffect} from 'react';
import {useAuth} from '../../contexts/AuthContext';
import {useNavigate} from 'react-router-dom';

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {isAuthenticated, login} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated)
            return navigate('/');
    })

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const loginResult = await login(email, password);
            if(loginResult){
                navigate('/');
            }
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <main className='main'>
            <form className='form' onSubmit={handleSubmit}>
                <fieldset className='fieldset'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </fieldset>
                <fieldset className='fieldset'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </fieldset>
                <button type='submit'>Login</button>
            </form>
        </main>
    )
}

export default LoginComponent;