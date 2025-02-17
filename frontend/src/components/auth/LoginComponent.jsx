import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/form.css';

const LoginComponent = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const { accessToken, login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(accessToken) 
            navigate('/');
    }, [accessToken, navigate]);


    const handleChange = e => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const [_response, error] = await login(form.email, form.password);

        if(error) return;

        navigate('/');
    }

    return (
        <main className='main-form'>
            <form className='form' onSubmit={handleSubmit}>
                <h1 className='form-title'>Time to login!</h1>
                <fieldset className='fieldset'>
                    <label className='label' htmlFor='email'>Email</label>
                    <input className='input' type='email' name='email' value={form.email} placeholder='Email' onChange={handleChange}/>
                </fieldset>
                <fieldset className='fieldset'>
                    <label className='label' htmlFor='password'>Password</label>
                    <input className='input' type='password' name='password' value={form.password} placeholder='Password' onChange={handleChange}/>
                </fieldset>
                <button className='submit-button' type='submit'>Login</button>
                <Link className='form-link' to='/register'>Don't have an account? Register here.</Link>
            </form>
        </main>
    )
}

export default LoginComponent;