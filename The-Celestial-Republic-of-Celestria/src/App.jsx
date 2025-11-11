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
    <div className="min-h-screen bg-gradient-to-br from-[#0c3962] via-[#85898c] to-[#0c3962] text-white flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route
            path="/dashboard"
            element={
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#85898c]"></div>
                  </div>
                }
              >
                <Dashboard />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
