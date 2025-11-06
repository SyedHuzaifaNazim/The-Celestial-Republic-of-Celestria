import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import ProfileSetup from './pages/ProfileSetup';

// Lazy load Dashboard
const Dashboard = React.lazy(() => import('./pages/Dashboard.jsx'));

function App() {
  return (
    <>
      <Navbar />

      {/* Suspense provides fallback while lazy component loads */}
      <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Catch-all redirect to home if no route matches */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
}

export default App;
