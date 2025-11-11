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
          className="absolute top-4 right-4 rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
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

        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* CNIC Input */}
          <div>
            <label
              htmlFor="cnic"
              className="block text-sm font-medium text-gray-700"
            >
              CNIC
            </label>
            <input
              id="cnic"
              type="text"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              placeholder="xxxxx-xxxxxxx-x"
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
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
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 py-2.5 text-white font-semibold shadow hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-500">
          By logging in, you agree to our{' '}
          <a href="#" className="underline hover:text-gray-700">
            Terms
          </a>{' '}
          and{' '}
          <a href="#" className="underline hover:text-gray-700">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
