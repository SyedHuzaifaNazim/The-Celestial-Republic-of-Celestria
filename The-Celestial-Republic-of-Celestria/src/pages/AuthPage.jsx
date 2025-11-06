import React, { useState } from 'react';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';

export default function AuthPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl mb-6">Citizen Login / Sign Up</h1>
      <div className="space-x-4">
        <button
          onClick={() => setShowLogin(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Login
        </button>
        <button
          onClick={() => setShowSignup(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Sign Up
        </button>
      </div>

      {/* Conditionally render the modals */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </div>
  );
}
