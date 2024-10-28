import React, { useEffect, useState } from 'react';
import { Image as ImageIcon, ZoomIn, Download, Share2 } from 'lucide-react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

interface Photo {
  id: string;
  url: string;
  title: string;
  createdAt: string;
}

interface ImageGridProps {
  onImageClick: (photo: Photo) => void;
}

export function ImageGrid({ onImageClick }: ImageGridProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadPhotos = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, 'photos'),
          where('userId', '==', user.id),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const loadedPhotos = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Photo[];
        
        setPhotos(loadedPhotos);
      } catch (error) {
        console.error('Error loading photos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-12">
        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No photos</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by uploading a photo.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 cursor-pointer hover:shadow-lg transition-all duration-300"
          onClick={() => onImageClick(photo)}
        >
          <img
            src={photo.url}
            alt={photo.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-lg font-semibold">{photo.title}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}