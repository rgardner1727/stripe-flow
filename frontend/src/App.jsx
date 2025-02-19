import { AuthProvider } from './contexts/AuthContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import AsideComponent from './components/body/AsideComponent';
import MainComponent from './components/body/MainComponent';
import Footer from './components/body/Footer';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { isLoggedIn } = useAuth();
  return (
    <BrowserRouter>
        <div className={`app-container-${isLoggedIn ? 'logged-in' : 'logged-out'}`}>
          <div className={`aside-main-container-${isLoggedIn ? 'logged-in' : 'logged-out'}`}>
            <AsideComponent/>
            <MainComponent/>
          </div>
          <Footer/>
        </div>
    </BrowserRouter>
  )
}

export default App;
