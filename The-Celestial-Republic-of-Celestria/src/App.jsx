import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import About from './pages/About';
import ProfileSetup from './pages/ProfileSetup';

// Lazy load Dashboard
const Dashboard = React.lazy(() => import('./pages/Dashboard.jsx'));

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        {/* Suspense provides fallback while lazy component loads */}
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
              <Dashboard />
            </Suspense>
          }
        />
        {/* Catch-all redirect to home if no route matches */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
