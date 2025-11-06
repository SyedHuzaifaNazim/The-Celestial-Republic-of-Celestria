import React, { useState } from 'react';
import { auth, storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

export default function Dashboard() {
  const [docFile, setDocFile] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (docFile && auth.currentUser) {
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
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert('Please log in and select a file first.');
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/'); // Changed to a valid route
  };

  if (!auth.currentUser) {
    return <div className="p-8 text-red-600">Please log in first.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Here you can upload and save your documents.</p>

      <div className="mt-4">
        <input type="file" onChange={(e) => setDocFile(e.target.files[0])} />
        <button onClick={handleUpload} className="bg-green-500 text-white px-4 py-2 ml-2 rounded-md">
          Upload Document
        </button>
      </div>

      {message && <p className="mt-2 text-green-700">{message}</p>}

      <button onClick={handleSignOut} className="mt-4 text-red-500 hover:underline">
        Sign Out
      </button>
    </div>
  );
}
