import { AuthProvider } from './contexts/AuthContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import HeaderComponent from './components/body/HeaderComponent';
import LoginComponent from './components/auth/LoginComponent';
import RegisterComponent from './components/auth/RegisterComponent';
import LogoutComponent from './components/auth/LogoutComponent';
import AuthenticatedComponent from './components/auth/AuthenticatedComponent';
import HomeComponent from './components/body/HomeComponent';
import SubscriptionsComponent from './components/subscription/SubscriptionsComponent';
import ManageSubscriptionComponent from './components/subscription/ManageSubscriptionComponent';
import StripeComponent from './components/stripe/StripeComponent';
import PaymentComponent from './components/stripe/PaymentComponent';
import SuccessComponent from './components/stripe/SuccessComponent';
import BeginnerWrapperComponent from './components/subscription/BeginnerWrapperComponent';
import BeginnerFeatureComponent from './components/feature/BeginnerFeatureComponent';
import IntermediateWrapperComponent from './components/subscription/IntermediateWrapperComponent';
import IntermediateFeatureComponent from './components/feature/IntermediateFeatureComponent';
import AdvancedWrapperComponent from './components/subscription/AdvancedWrapperComponent';
import AdvancedFeatureComponent from './components/feature/AdvancedFeatureComponent';
import Footer from './components/body/Footer';
function App() {
  return (
    <AuthProvider>
        <BrowserRouter>
          <SubscriptionProvider>
            <HeaderComponent/>
            <Routes>
              <Route path='/login' element={<LoginComponent/>}/>
              <Route path='/register' element={<RegisterComponent/>}/>
              <Route path='/logout' element={<AuthenticatedComponent><LogoutComponent/></AuthenticatedComponent>}/>
              <Route path='/' element={<AuthenticatedComponent><HomeComponent/></AuthenticatedComponent>}/>
              <Route path='/subscriptions' element={<AuthenticatedComponent><SubscriptionsComponent/></AuthenticatedComponent>}/>

              <Route path='/manage-subscription' element={<AuthenticatedComponent><ManageSubscriptionComponent/></AuthenticatedComponent>}/>
              <Route path='/stripe' element={<AuthenticatedComponent><StripeComponent/></AuthenticatedComponent>}>
                <Route path='payment' element={<AuthenticatedComponent><PaymentComponent/></AuthenticatedComponent>}/>
                <Route path='success' element={<AuthenticatedComponent><SuccessComponent/></AuthenticatedComponent>}/>
              </Route>
              <Route path='/beginner-feature' element={
                <AuthenticatedComponent>
                  <BeginnerWrapperComponent>
                    <BeginnerFeatureComponent/>
                  </BeginnerWrapperComponent>
                </AuthenticatedComponent>
              }/>
              <Route path='/intermediate-feature' element={
                <AuthenticatedComponent>
                  <IntermediateWrapperComponent>
                    <IntermediateFeatureComponent/>
                  </IntermediateWrapperComponent>
                </AuthenticatedComponent>
              }/>
              <Route path='/advanced-feature' element={
                <AuthenticatedComponent>
                  <AdvancedWrapperComponent>
                    <AdvancedFeatureComponent/>
                  </AdvancedWrapperComponent>
                </AuthenticatedComponent>
              }/>
            </Routes>
            <Footer/>
          </SubscriptionProvider>
        </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
