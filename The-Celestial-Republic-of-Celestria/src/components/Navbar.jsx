import React from 'react';
import AuthPage from '../pages/AuthPage';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-slate-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="/"
          className="text-xl font-semibold tracking-wide hover:text-sky-300 transition-colors"
        >
          Celestria Government Portal
        </a>
        <ul className="flex items-center space-x-6">
          <li>
            <a href="/" className="hover:text-sky-300 transition-colors">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-sky-300 transition-colors">
              About
            </a>
          </li>
          <button>
            <a
              href="/auth"
              className="px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-500 transition-colors"
            >
              Login / Signup
            </a>
          </button>
          <button>
            <a
              href="/dashboard"
              className="px-4 py-2 rounded-md border border-slate-600 hover:bg-slate-800 transition-colors"
            >
              Dashboard
            </a>
          </button>
        </ul>
      </div>
    </nav>
  );
}
