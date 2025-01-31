import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {AuthProvider} from './contexts/AuthContext';
import HomeComponent from './components/HomeComponent';
import ProtectedComponent from './components/ProtectedComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import HeaderComponent from './components/HeaderComponent';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <HeaderComponent/>
          <Routes>
            <Route path='/login' element={<LoginComponent/>}/>
            <Route path='/register' element={<RegisterComponent/>}/>
            <Route path='/' element={<ProtectedComponent><HomeComponent/></ProtectedComponent>}/>
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
