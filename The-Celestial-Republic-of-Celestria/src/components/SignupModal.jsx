import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function SignupModal({ onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cnic, setCnic] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        `${cnic}@celestria.gov`,
        password
      );
      const user = userCredential.user;

      // Save details in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        phone,
        cnic,
      });

      console.log('User signed up successfully:', user.uid);

      if (onClose) onClose(); // ✅ only call if defined
      alert('Sign up successful! Please log in.');
    } catch (error) {
      console.error('Signup error:', error);
      alert(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded p-8 w-96">
        <h2 className="text-xl mb-4">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <label className="block mb-2">
            <span className="text-gray-700">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md"
              placeholder="Enter your name"
              required
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Phone Number</span>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md"
              placeholder="Enter your phone number"
              required
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">CNIC</span>
            <input
              type="text"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md"
              placeholder="Enter your CNIC"
              required
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md"
              placeholder="Create a password"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Sign Up
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-blue-500 hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
}
