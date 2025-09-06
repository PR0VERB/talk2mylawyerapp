import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import ClientDashboard from './pages/client/ClientDashboard';
import LawyerDashboard from './pages/lawyer/LawyerDashboard';
import LawyerOnboarding from './pages/lawyer/LawyerOnboarding';
import FindLawyers from './pages/FindLawyers';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/client/dashboard" element={<ClientDashboard />} />
            <Route path="/lawyer/dashboard" element={<LawyerDashboard />} />
            <Route path="/lawyer/onboarding" element={<LawyerOnboarding />} />
            <Route path="/find-lawyers" element={<FindLawyers />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;