import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './components/AuthProvider';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />  
            <Route path="/home" element={<Home />} />       
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
