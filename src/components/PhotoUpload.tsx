import React, { useCallback, useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { v4 as uuidv4 } from 'uuid';

export function PhotoUpload() {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { user } = useAuth();

  const handleUpload = async (file: File) => {
    if (!user) {
      alert('Please log in to upload photos');
      return;
    }
    
    try {
      setUploading(true);
      const fileId = uuidv4();
      const storageRef = ref(storage, `photos/${user.id}/${fileId}`);
      
      // Upload file to Firebase Storage
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      
      // Save photo metadata to Firestore
      await addDoc(collection(db, 'photos'), {
        userId: user.id,
        url: downloadURL,
        title: file.name,
        createdAt: new Date().toISOString(),
      });

      // Trigger a refresh of the image grid
      window.location.reload();
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    if (imageFiles[0]) {
      handleUpload(imageFiles[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
        dragActive 
          ? 'border-blue-500 bg-blue-500/10' 
          : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
      }`}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl"></div>
      {uploading ? (
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
          <p className="text-sm text-gray-600">Uploading your masterpiece...</p>
        </div>
      ) : (
        <div className="relative">
          <Upload className="mx-auto h-12 w-12 text-blue-500" />
          <p className="mt-2 text-sm text-gray-600">
            Drag and drop your photos here, or
          </p>
          <label className="mt-2 inline-block">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileInput}
            />
            <span className="cursor-pointer text-blue-500 hover:text-blue-600 font-medium">
              browse to upload
            </span>
          </label>
          <p className="mt-2 text-xs text-gray-500">
            Supports: JPG, PNG, WebP • Max size: 10MB
          </p>
        </div>
      )}
    </div>
  );
}