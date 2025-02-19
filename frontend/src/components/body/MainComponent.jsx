import { Routes, Route } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

import LoginComponent from '../auth/LoginComponent'
import RegisterComponent from '../auth/RegisterComponent'
import LogoutComponent from '../auth/LogoutComponent'
import AuthenticatedComponent from '../auth/AuthenticatedComponent'

import HomeComponent from '../body/HomeComponent'

import SubscriptionsComponent from '../subscription/SubscriptionsComponent'
import ManageSubscriptionComponent from '../subscription/ManageSubscriptionComponent'
import BeginnerWrapperComponent from '../subscription/BeginnerWrapperComponent'
import IntermediateWrapperComponent from '../subscription/IntermediateWrapperComponent'
import AdvancedWrapperComponent from '../subscription/AdvancedWrapperComponent'

import StripeComponent from '../stripe/StripeComponent'
import PaymentComponent from '../stripe/PaymentComponent'
import SuccessComponent from '../stripe/SuccessComponent'

import BeginnerFeatureComponent from '../feature/BeginnerFeatureComponent'
import IntermediateFeatureComponent from '../feature/IntermediateFeatureComponent'
import AdvancedFeatureComponent from '../feature/AdvancedFeatureComponent'

const MainComponent = () => {
    const { isLoggedIn } = useAuth();
    return (
        <main className={`main-${isLoggedIn ? 'logged-in' : 'logged-out'}`}>
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
        </main>
    )
}

export default MainComponent;