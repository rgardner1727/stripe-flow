import {useState, useEffect} from 'react';
import {useAuth} from '../../contexts/AuthContext';
import {useNavigate, Link} from 'react-router-dom';
import '../../styles/form.css';

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
        <main className='main-form'>
            <form className='form' onSubmit={handleSubmit}>
                <h1 className='form-title'>Time to login!</h1>
                <fieldset className='fieldset'>
                    <label className='label' htmlFor='email'>Email</label>
                    <input className='input' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </fieldset>
                <fieldset className='fieldset'>
                    <label className='label' htmlFor='password'>Password</label>
                    <input className='input' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </fieldset>
                <button className='submit-button' type='submit'>Login</button>
                <Link className='form-link' to='/register'>Don't have an account? Register here.</Link>
            </form>
        </main>
    )
}

export default LoginComponent;