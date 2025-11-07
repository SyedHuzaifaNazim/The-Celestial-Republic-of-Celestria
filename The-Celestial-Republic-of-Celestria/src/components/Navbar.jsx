import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-slate-900 text-slate-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="text-xl font-semibold tracking-wide hover:text-sky-300 transition-colors"
          >
            Celestria Government Portal
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="hover:text-sky-300 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate('/about')}
              className="hover:text-sky-300 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => navigate('/auth')}
              className="px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-500 transition-colors"
            >
              Login / Signup
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 rounded-md border border-slate-600 hover:bg-slate-800 transition-colors"
            >
              Dashboard
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-100 hover:text-sky-300 focus:outline-none focus:text-sky-300"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => navigate('/')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 hover:text-sky-300 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate('/about')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 hover:text-sky-300 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => navigate('/auth')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-sky-600 hover:bg-sky-500 transition-colors"
            >
              Login / Signup
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium border border-slate-600 hover:bg-slate-700 hover:text-sky-300 transition-colors"
            >
              Dashboard
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
