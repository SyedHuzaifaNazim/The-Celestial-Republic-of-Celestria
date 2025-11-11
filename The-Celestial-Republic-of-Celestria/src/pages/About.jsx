import React from 'react';

export default function About() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0c3962] to-[#0a2a4a] flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 md:p-12 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          About <span className="text-[#85898c]">Celestria</span>
        </h1>
        <p className="text-lg md:text-xl leading-relaxed mb-6">
          The Celestial Republic of Celestria is an imaginary nation in this demonstration.
        </p>
        <p className="text-base md:text-lg leading-relaxed opacity-90">
          Our government portal offers citizens the ability to log in, fill out necessary personal forms,
          and manage official documents online. This is a sample implementation using React and Firebase.
        </p>
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-6 py-3 rounded-lg bg-[#85898c] hover:bg-[#6d7073] text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Back to Top
          </button>
          <a
            href="/"
            className="px-6 py-3 rounded-lg border-2 border-[#85898c] text-[#85898c] hover:bg-[#85898c] hover:text-white font-semibold transition-all duration-300"
          >
            Return Home
          </a>
        </div>
      </div>
    </section>
  );
}
