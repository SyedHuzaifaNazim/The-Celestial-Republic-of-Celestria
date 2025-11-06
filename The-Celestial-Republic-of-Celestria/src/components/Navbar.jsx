import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="font-bold">Celestria Government Portal</div>
      <div>
        <Link to="/" className="mx-2 hover:underline">Home</Link>
        <Link to="/about" className="mx-2 hover:underline">About</Link>
        <Link to="/auth" className="mx-2 hover:underline">Login/Signup</Link>
        <Link to="/dashboard" className="mx-2 hover:underline">Dashboard</Link>
      </div>
    </nav>
  );
}
