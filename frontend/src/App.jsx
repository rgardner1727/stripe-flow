import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {AuthProvider} from './contexts/AuthContext';
import HomeComponent from './components/HomeComponent';
import ProtectedComponent from './components/ProtectedComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import HeaderComponent from './components/HeaderComponent';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import SubscriptionsComponent from './components/SubscriptionsComponent';
import StripeComponent from './components/StripeComponent';

function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <BrowserRouter>
          <HeaderComponent/>
            <Routes>
              <Route path='/login' element={<LoginComponent/>}/>
              <Route path='/register' element={<RegisterComponent/>}/>
              <Route path='/' element={<ProtectedComponent><HomeComponent/></ProtectedComponent>}/>
              <Route path='/subscriptions' element={<ProtectedComponent><SubscriptionsComponent/></ProtectedComponent>}/>
              <Route path='/payment' element={<ProtectedComponent><StripeComponent/></ProtectedComponent>}/>
            </Routes>
        </BrowserRouter>
      </SubscriptionProvider>
    </AuthProvider>
  )
}

export default App
