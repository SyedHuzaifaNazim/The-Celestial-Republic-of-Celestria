import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function ProfileSetup() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cnic, setCnic] = useState('');
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (auth.currentUser) {
        const docSnap = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || '');
          setPhone(data.phone || '');
          setCnic(data.cnic || '');
        }
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let photoURL = '';
      // Upload photo if provided
      if (photo) {
        const photoRef = ref(storage, `profilePics/${auth.currentUser.uid}`);
        await uploadBytes(photoRef, photo);
        photoURL = await getDownloadURL(photoRef);
      }
      // Update Firestore with all profile data
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        name: name,
        phone: phone,
        cnic: cnic,
        photoURL: photoURL,
      });
      // Navigate to dashboard after saving
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Complete Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          <span className="text-gray-700">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md"
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
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Upload Your Picture</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="mt-1 block w-full"
            required
          />
        </label>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Save Profile
        </button>
      </form>
    </div>
  );
}
