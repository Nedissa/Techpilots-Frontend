'use client';

import { useState, useEffect } from 'react';

interface ImageZoomDialogProps {
  images: Array<{ id: string; url: string; altText: string }>;
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageZoomDialog({
  images,
  initialIndex,
  isOpen,
  onClose,
}: ImageZoomDialogProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length, onClose]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-[90vw] h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Container */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
          <img
            src={currentImage.url}
            alt={currentImage.altText}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Thumbnails */}
        <div className="px-6 py-4 flex gap-6 justify-center overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {images.map((img, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-24 aspect-square flex items-center justify-center"
            >
              <button
                onClick={() => setCurrentIndex(idx)}
                className={`aspect-square overflow-hidden transition-all duration-150 flex items-center justify-center ${
                  currentIndex === idx ? 'w-24' : 'w-16'
                }`}
              >
                <img src={img.url} alt="" className="w-full h-full object-contain" />
              </button>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
            }
            className="p-2 hover:bg-gray-100 rounded transition-colors"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <span className="text-sm text-gray-600">
            {currentIndex + 1} / {images.length}
          </span>

          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev + 1) % images.length)
            }
            className="p-2 hover:bg-gray-100 rounded transition-colors"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
