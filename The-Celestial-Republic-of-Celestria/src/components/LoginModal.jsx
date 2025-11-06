import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function LoginModal({ onClose }) {
  const [cnic, setCnic] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Append domain to CNIC to form an email
      const userCredential = await signInWithEmailAndPassword(auth, `${cnic}@celestria.gov`, password);
      console.log('Logged in:', userCredential.user);
      navigate('/profile-setup');  // go to profile form after login
      onClose();                  // close the modal
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded p-8 w-96">
        <h2 className="text-xl mb-4">Login</h2>
        <form onSubmit={handleLogin}>
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
              placeholder="Enter your password"
              required
            />
          </label>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Login</button>
        </form>
        <button onClick={onClose} className="mt-4 text-blue-500 hover:underline">Close</button>
      </div>
    </div>
  );
}
