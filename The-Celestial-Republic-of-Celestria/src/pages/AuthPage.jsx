import React, { useState } from 'react';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';

export default function AuthPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c3962] via-[#0c3962] to-[#85898c] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-white">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            Celestria Portal
          </h1>
          <p className="text-sm opacity-80">
            Access your citizen dashboard
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setShowLogin(true)}
            className="w-full bg-gradient-to-r from-[#0c3962] to-[#0c3962] hover:from-[#0a2a4a] hover:to-[#0a2a4a] text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#85898c]"
          >
            Login
          </button>
          <button
            onClick={() => setShowSignup(true)}
            className="w-full bg-gradient-to-r from-[#85898c] to-[#85898c] hover:from-[#6c7073] hover:to-[#6c7073] text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#0c3962]"
          >
            Sign Up
          </button>
        </div>

        <div className="mt-8 text-center text-xs opacity-60">
          Secure & encrypted citizen authentication
        </div>
      </div>

      {/* Modals */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </div>
  );
}
