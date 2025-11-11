import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function LoginModal({ onClose }) {
  const [cnic, setCnic] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        `${cnic}@celestria.gov`,
        password
      );
      console.log('Logged in:', userCredential.user);
      navigate('/profile-setup');
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white/90 p-8 shadow-2xl ring-1 ring-black/5">
        {/* Close icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-[#85898c] hover:bg-[#0c3962]/10 hover:text-[#0c3962]"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="mb-6 text-center text-2xl font-bold text-[#0c3962]">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* CNIC Input */}
          <div>
            <label
              htmlFor="cnic"
              className="block text-sm font-medium text-[#85898c]"
            >
              CNIC
            </label>
            <input
              id="cnic"
              type="text"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              placeholder="xxxxxxxxxxxxx"
              required
              className="mt-1 w-full rounded-lg border border-[#85898c] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0c3962]"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#85898c]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="mt-1 w-full rounded-lg border border-[#85898c] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0c3962]"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-center text-sm text-red-600">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-[#0c3962] to-[#0c3962]/80 py-2.5 text-white font-semibold shadow hover:from-[#0a2a4a] hover:to-[#0a2a4a]/80 focus:outline-none focus:ring-2 focus:ring-[#0c3962] disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-[#85898c]">
          By logging in, you agree to our{' '}
          <a href="#" className="underline hover:text-[#0c3962]">
            Terms
          </a>{' '}
          and{' '}
          <a href="#" className="underline hover:text-[#0c3962]">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
