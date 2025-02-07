import {useState, useEffect} from 'react';
import {useAuth} from '../../contexts/AuthContext';
import {useNavigate, Link} from 'react-router-dom';
import '../../styles/form.css';

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
        <main className='main-form'>
            <form className='form' onSubmit={handleSubmit}>
                <h1 className='form-title'>Time to register!</h1>
                <fieldset className='fieldset'>
                    <label className='label' htmlFor='name'>Name</label>
                    <input className='input' type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
                </fieldset>
                <fieldset className='fieldset'>
                    <label className='label' htmlFor='email'>Email</label>
                    <input className='input' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>

                </fieldset>
                <fieldset className='fieldset'>
                    <label className='label' htmlFor='password'>Password</label>
                    <input className='input' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </fieldset>
                <button className='submit-button' type='submit'>Register</button>
                <Link className='form-link' to='/login'>Already have an account? Login here.</Link>
            </form>
        </main>
    )
}

export default RegisterComponent;