import '../../styles/footer.css';
import { useAuth } from '../../contexts/AuthContext';

const Footer = () => {
    const { accessToken } = useAuth();
    return (
        accessToken && <footer className='footer'>
            <p className='footer-text'>@ 2025 Ryan Gardner</p>
        </footer>
    )
}


export default Footer;