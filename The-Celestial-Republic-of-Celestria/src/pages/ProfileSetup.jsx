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
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!auth.currentUser) {
        setLoading(false);
        return;
      }
      try {
        const docSnap = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || '');
          setPhone(data.phone || '');
          setCnic(data.cnic || '');
          if (data.photoURL) setPreview(data.photoURL);
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert('Please log in first.');
      return;
    }
    setSaving(true);
    try {
      let photoURL = preview;
      if (photo) {
        const photoRef = ref(storage, `profilePics/${auth.currentUser.uid}`);
        await uploadBytes(photoRef, photo);
        photoURL = await getDownloadURL(photoRef);
      }
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        name,
        phone,
        cnic,
        photoURL,
      });
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0c3962] to-[#85898c]">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c3962] to-[#85898c] flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-white">
        <h1 className="text-3xl font-extrabold mb-6 text-center tracking-wide">
          Complete Your Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Photo Upload */}
          <div className="flex flex-col items-center mb-4">
            <div className="relative">
              <img
                src={preview || 'https://via.placeholder.com/120?text=Photo'}
                alt="Preview"
                className="w-32 h-32 rounded-full object-cover border-4 border-white/30 shadow-lg"
              />
              <label className="absolute bottom-0 right-0 bg-[#0c3962] text-white p-2 rounded-full cursor-pointer hover:bg-[#0a2d4d] transition">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            </div>
            <span className="text-sm mt-2 opacity-80">Upload Your Picture</span>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="03XX-XXXXXXX"
              required
            />
          </div>

          {/* CNIC */}
          <div>
            <label className="block text-sm font-medium mb-1">CNIC</label>
            <input
              type="text"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="XXXXX-XXXXXXX-X"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={saving}
            className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
              saving
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#0c3962] hover:bg-[#0a2d4d]'
            }`}
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              'Save Profile'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
