import React, { useState } from 'react';
import { auth, storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

export default function Dashboard() {
  const [docFile, setDocFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (docFile && auth.currentUser) {
      setUploading(true);
      setMessage('');
      try {
        const fileRef = ref(storage, `documents/${auth.currentUser.uid}/${docFile.name}`);
        await uploadBytes(fileRef, docFile);
        const url = await getDownloadURL(fileRef);
        await addDoc(collection(db, 'users', auth.currentUser.uid, 'documents'), {
          name: docFile.name,
          url: url,
          uploadedAt: new Date().toISOString(),
        });
        setMessage('✅ Document uploaded successfully.');
        setDocFile(null);
      } catch (error) {
        setMessage('❌ Upload failed: ' + error.message);
      } finally {
        setUploading(false);
      }
    } else {
      setMessage('⚠️ Please log in and select a file first.');
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/');
  };

  if (!auth.currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0c3962] to-[#85898c] flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-[#0c3962] mb-2">Access Denied</h2>
          <p className="text-[#85898c]">Please log in to continue.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c3962] to-[#85898c]">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Dashboard</h1>
            <p className="text-[#d1d5db] mt-1">Upload and manage your documents securely.</p>
          </div>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-[#85898c] hover:bg-[#6b6f72] transition"
          >
            Sign Out
          </button>
        </header>

        <section className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#0c3962] mb-2">
              Select a document to upload
            </label>
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[#0c3962] rounded-xl cursor-pointer hover:bg-[#e5e7eb] transition">
              <svg
                className="w-10 h-10 text-[#0c3962] mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v5a4 4 0 01-4 4H7z"
                />
              </svg>
              <span className="text-sm text-[#85898c]">
                {docFile ? docFile.name : 'Click to choose a file'}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setDocFile(e.target.files[0])}
              />
            </label>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleUpload}
              disabled={uploading || !docFile}
              className={`inline-flex items-center px-5 py-2.5 rounded-lg text-white font-semibold transition ${
                uploading || !docFile
                  ? 'bg-[#d1d5db] cursor-not-allowed'
                  : 'bg-[#0c3962] hover:bg-[#0a2a4a]'
              }`}
            >
              {uploading && (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              )}
              {uploading ? 'Uploading…' : 'Upload Document'}
            </button>

            {message && (
              <span
                className={`text-sm font-medium ${
                  message.includes('✅') ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {message}
              </span>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
