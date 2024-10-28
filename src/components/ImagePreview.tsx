import React from 'react';
import { X, Download, Share2, Heart } from 'lucide-react';

interface ImagePreviewProps {
  url: string;
  title: string;
  onClose: () => void;
}

export function ImagePreview({ url, title, onClose }: ImagePreviewProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-6xl mx-auto p-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
        >
          <X size={24} />
        </button>
        
        <div className="relative">
          <img
            src={`${url}?auto=format&fit=contain&w=1200&h=800&q=90`}
            alt={title}
            className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
          />
          
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
            <h2 className="text-white text-xl font-semibold mb-2">{title}</h2>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
                <Download size={20} />
                <span>Download</span>
              </button>
              <button className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
                <Share2 size={20} />
                <span>Share</span>
              </button>
              <button className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
                <Heart size={20} />
                <span>Favorite</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}