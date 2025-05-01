import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './components/AuthProvider';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Verification from './pages/Verification';
import Report from './pages/Report';
import Modeling from './pages/Modeling'
// Admin imports
import AdminHome from './admin/AdminHome';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<Verification />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />  
            <Route path="/home" element={<Home />} /> 
            <Route path="/report" element={<Report />} /> 
            <Route path="/model" element={<Modeling />} />
            {/* Admin routes */}
            <Route path="/admin" element={<AdminHome />} /> 
            {/* Add more routes as needed */}      
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
