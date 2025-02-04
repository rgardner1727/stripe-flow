import {useState, useEffect} from 'react';
import {useAuth} from '../../contexts/AuthContext';
import {useNavigate} from 'react-router-dom';

const RegisterComponent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {isAuthenticated, register} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated)
            return navigate('/');
    })

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const registerResult = await register(name, email, password);
            if(registerResult){
                navigate('/login');
            }
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <main className='main'>
            <form className='form' onSubmit={handleSubmit}>
                <fieldset className='fieldset'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
                </fieldset>
                <fieldset className='fieldset'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </fieldset>
                <fieldset className='fieldset'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </fieldset>
                <button type='submit'>Register</button>
            </form>
        </main>
    )
}

export default RegisterComponent;