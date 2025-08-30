import React, { useState, useEffect } from 'react';
import { fetchPexelsImages } from '../api/pexels';

interface ImageDisplayProps {
  query: string;
  isDarkMode: boolean;
}

export function ImageDisplay({ query, isDarkMode }: ImageDisplayProps) {
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query) {
      const getImages = async () => {
        setIsLoading(true);
        const fetchedImages = await fetchPexelsImages(query);
        setImages(fetchedImages);
        setIsLoading(false);
      };
      getImages();
    } else {
      setImages([]);
    }
  }, [query]);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <svg className="animate-spin h-8 w-8 text-indigo-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Fetching related images...
        </p>
      </div>
    );
  }

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h3 className={`text-xl font-bold mb-4 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        Related Images
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="rounded-lg overflow-hidden shadow-lg">
            <img src={image.src.medium} alt={image.alt} className="w-full h-40 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
