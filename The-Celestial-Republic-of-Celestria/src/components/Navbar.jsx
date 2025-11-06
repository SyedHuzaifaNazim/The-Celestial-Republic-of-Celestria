import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-slate-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold tracking-wide hover:text-sky-300 transition-colors">
          Celestria Government Portal
        </Link>
        <ul className="flex items-center space-x-6">
          <li>
            <Link to="/" className="hover:text-sky-300 transition-colors">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-sky-300 transition-colors">About</Link>
          </li>
          <li>
            <Link
              to="/"
              className="px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-500 transition-colors"
            >
              Login / Signup
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-md border border-slate-600 hover:bg-slate-800 transition-colors"
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
