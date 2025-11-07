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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* <Home /> */}
      <Footer />
    </div>
  );
}

export default App;

