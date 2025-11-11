import React from 'react';
import { SparklesIcon, GlobeAltIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/5 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-white/5 blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
            <SparklesIcon className="h-5 w-5 text-yellow-300" />
            <span className="text-sm font-medium">Official Government Portal</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Celestial Republic
            <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              of Celestria
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 sm:text-xl">
            Access government services securely and efficiently. Your gateway to a smarter, digital Celestria.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 px-8 py-3 font-semibold text-gray-900 transition-all hover:scale-105 hover:shadow-2xl">
              <span className="absolute inset-0 rounded-xl bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative">Sign In to Dashboard</span>
            </button>
            <button className="group relative inline-flex items-center justify-center rounded-xl border-2 border-white/30 px-8 py-3 font-semibold text-white backdrop-blur transition-all hover:bg-white/10">
              <GlobeAltIcon className="mr-2 h-5 w-5" />
              <span>Explore Services</span>
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: ShieldCheckIcon, title: 'Secure Access', desc: 'Bank-level encryption protects your data' },
            { icon: GlobeAltIcon, title: '24/7 Available', desc: 'Government services anytime, anywhere' },
            { icon: SparklesIcon, title: 'Instant Updates', desc: 'Real-time notifications on your requests' },
          ].map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl bg-white/5 p-6 backdrop-blur transition-all hover:bg-white/10 hover:scale-105"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500">
                <item.icon className="h-6 w-6 text-gray-900" />
              </div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-white/70">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="mt-16 text-center text-sm text-white/60">
          By accessing this portal you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
