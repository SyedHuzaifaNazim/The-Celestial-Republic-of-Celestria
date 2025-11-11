import React from 'react';
import { SparklesIcon, GlobeAltIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c3962] via-[#0c3962]/90 to-[#85898c] text-white">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/5 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-white/5 blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center animate-fade-in">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur animate-slide-in-top">
            <SparklesIcon className="h-5 w-5 text-[#85898c]" />
            <span className="text-sm font-medium">Official Government Portal</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl animate-slide-in-left">
            Celestial Republic
            <span className="block bg-gradient-to-r from-[#85898c] to-[#0c3962] bg-clip-text text-transparent animate-slide-in-right">
              of Celestria
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 sm:text-xl animate-fade-in-delay">
            Access government services securely and efficiently. Your gateway to a smarter, digital Celestria.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row animate-fade-in-late">
            <button className="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#85898c] to-[#0c3962] px-8 py-3 font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl animate-bounce-subtle">
              <span className="absolute inset-0 rounded-xl bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative">Sign In to Dashboard</span>
            </button>
            <button className="group relative inline-flex items-center justify-center rounded-xl border-2 border-white/30 px-8 py-3 font-semibold text-white backdrop-blur transition-all hover:bg-white/10 animate-bounce-subtle delay-300">
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
          ].map((item, idx) => (
            <div
              key={item.title}
              className="group rounded-2xl bg-white/5 p-6 backdrop-blur transition-all hover:bg-white/10 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#85898c] to-[#0c3962] transition-transform group-hover:rotate-12">
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-white/70">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="mt-16 text-center text-sm text-white/60 animate-fade-in-delay">
          By accessing this portal you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>

      {/* Custom keyframe animations via Tailwind config or inline styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-delay {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-top {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        .animate-fade-in-delay { animation: fade-in-delay 1s ease-out 0.3s forwards; opacity: 0; }
        .animate-fade-in-late { animation: fade-in-delay 1s ease-out 0.6s forwards; opacity: 0; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; opacity: 0; }
        .animate-slide-in-top { animation: slide-in-top 0.8s ease-out forwards; }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out forwards; }
        .animate-slide-in-right { animation: slide-in-right 0.8s ease-out forwards; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
}
