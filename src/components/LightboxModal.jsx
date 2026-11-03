import React, { useEffect } from 'react';
import { X, ZoomIn, Download } from 'lucide-react';

export default function LightboxModal({ isOpen, imageSrc, title, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !imageSrc) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl max-h-[92vh] w-full flex flex-col rounded-[28px] overflow-hidden border-2 border-[#D4AF37]/50 bg-black shadow-2xl"
      >
        {/* Top bar */}
        <div className="p-4 px-6 border-b border-[#D4AF37]/30 flex items-center justify-between bg-[#3D0A14] text-white">
          <h3 className="font-cinzel text-sm sm:text-base font-bold text-white truncate pr-4">
            {title || 'SS Convention Hall Preview'}
          </h3>
          <div className="flex items-center gap-2">
            <a
              href={imageSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-gold-500/20 text-gold-300 hover:text-gold-200 transition-colors"
              title="Open full resolution in new tab"
            >
              <ZoomIn className="w-5 h-5" />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gold-500/20 text-gold-300 hover:text-white transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Container */}
        <div className="flex-1 overflow-auto flex items-center justify-center p-3 sm:p-6 bg-[#140407] max-h-[80vh]">
          <img
            src={imageSrc}
            alt={title || 'Enlarged Preview'}
            className="max-h-[74vh] max-w-full object-contain rounded-2xl shadow-2xl border border-gold-500/30"
          />
        </div>
      </div>
    </div>
  );
}
