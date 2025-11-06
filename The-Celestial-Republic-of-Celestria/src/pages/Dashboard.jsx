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
        // Upload file to Storage under "documents/{uid}/{filename}"
        const fileRef = ref(storage, `documents/${auth.currentUser.uid}/${docFile.name}`);
        await uploadBytes(fileRef, docFile);
        const url = await getDownloadURL(fileRef);
        // Save document metadata in Firestore under users/{uid}/documents
        await addDoc(collection(db, 'users', auth.currentUser.uid, 'documents'), {
          name: docFile.name,
          url: url,
          uploadedAt: new Date().toISOString(),
        });
        setMessage('Document uploaded successfully.');
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/auth');
  };

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
