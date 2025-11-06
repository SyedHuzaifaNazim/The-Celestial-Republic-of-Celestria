import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
          Welcome to the Celestial Republic of Celestria Portal
        </h1>
        <p className="mt-6 text-base text-gray-700 sm:text-lg md:text-xl">
          This portal provides citizens of Celestria access to government services online.
          Navigate using the menu above to access different sections. You must log in to access your dashboard.
        </p>
      </div>
    </div>
  );
}
