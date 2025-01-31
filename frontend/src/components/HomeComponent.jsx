import {useAuth} from '../contexts/AuthContext';

const HomeComponent = () => {
    const {email} = useAuth();
    
    return (
        <main className='main'>
            <h1 className='home-h1'>Welcome to the home page, {email}</h1>
        </main>
    )
}

export default HomeComponent;