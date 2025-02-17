import {useState, useEffect} from 'react';
import {useAuth} from '../../contexts/AuthContext';
import {useNavigate, Link} from 'react-router-dom';
import '../../styles/form.css';

const RegisterComponent = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '', 
        password: ''
    })

    const {isAuthenticated, register} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated)
            return navigate('/');
    })

    const handleChange = e => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const registerResult = await register(form.firstName, form.lastName, form.email, form.password);
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
                    <label className='label' htmlFor='firstName'>First Name</label>
                    <input className='input' type='text' name='firstName' value={form.firstName} placeholder='First Name' onChange={handleChange}/>
                </fieldset>
                <fieldset className='fieldset'>
                    <label className='label' htmlFor='lastName'>Last Name</label>
                    <input className='input' type='text' name='lastName' value={form.lastName} placeholder='Last Name' onChange={handleChange}/>
                </fieldset>
                <fieldset className='fieldset'>
                    <label className='label' htmlFor='email'>Email</label>
                    <input className='input' type='email' name='email' value={form.email} placeholder='Email' onChange={handleChange}/>
                </fieldset>
                <fieldset className='fieldset'>
                    <label className='label' htmlFor='password'>Password</label>
                    <input className='input' type='password' name='password' value={form.password} placeholder='Password' onChange={handleChange}/>
                </fieldset>
                <button className='submit-button' type='submit'>Register</button>
                <Link className='form-link' to='/login'>Already have an account? Login here.</Link>
            </form>
        </main>
    )
}

export default RegisterComponent;