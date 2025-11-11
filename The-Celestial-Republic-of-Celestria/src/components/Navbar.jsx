import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Dashboard", path: "/dashboard" },
  ];

  const handleNav = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <nav className="bg-[#0c3962] text-[#85898c] shadow-2xl fixed top-0 left-0 w-full z-50 backdrop-blur-sm bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleNav("/")}
            className="flex items-center gap-3 text-2xl font-extrabold tracking-tight hover:text-white transition-colors duration-300"
            aria-label="Celestria Government Portal Home"
          >
            {/* Placeholder logo – swap src for your actual asset */}
            <img
              src={logo}
              alt="Celestria Crest"
              className="h-10 w-10 object-cover rounded-full"
            />
            <span>Celestria Government Portal</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ label, path }) => (
              <button
                key={path}
                onClick={() => handleNav(path)}
                className="relative px-3 py-2 text-sm font-medium hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#85898c] after:transition-all after:duration-300 hover:after:w-full"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => handleNav("/auth")}
              className="ml-4 px-5 py-2 rounded-full bg-[#85898c] hover:bg-white text-[#0c3962] font-semibold shadow-lg hover:shadow-white/50 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Login / Signup
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-[#85898c] hover:text-white focus:outline-none focus:text-white transition-colors"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#0c3962]/95 backdrop-blur-md px-2 pt-2 pb-4 space-y-2">
          {navLinks.map(({ label, path }) => (
            <button
              key={path}
              onClick={() => handleNav(path)}
              className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium hover:bg-[#85898c] hover:text-[#0c3962] transition-colors duration-300"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => handleNav("/auth")}
            className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium bg-[#85898c] hover:bg-white text-[#0c3962] transition-colors duration-300"
          >
            Login / Signup
          </button>
        </div>
      </div>
    </nav>
  );
}
