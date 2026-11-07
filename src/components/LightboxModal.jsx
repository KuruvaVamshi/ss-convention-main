import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LightboxModal({ isOpen, imageSrc, title, onClose, onPrev, onNext, index = 0, total = 1 }) {
  const touchStartX = React.useRef(null);
  const multiple = total > 1;
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (multiple && e.key === 'ArrowLeft') onPrev?.();
      if (multiple && e.key === 'ArrowRight') onNext?.();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext, multiple]);

  if (!isOpen || !imageSrc) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/98 backdrop-blur-2xl animate-fade-in select-none"
    >
      {/* Prominent High-Visibility Floating Close Button */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 sm:top-5 sm:right-6 z-[100000] flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#3D0A14] hover:bg-[#8A1828] border-2 border-[#D4AF37] text-amber-200 hover:text-white shadow-[0_4px_30px_rgba(0,0,0,0.95)] backdrop-blur-md transition-all hover:scale-105 active:scale-95 group cursor-pointer"
        title="Close (Escape)"
        aria-label="Close Lightbox"
      >
        <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-200 group-hover:text-white">
          CLOSE
        </span>
        <div className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center border border-amber-400/50">
          <X className="w-3.5 h-3.5 text-amber-300 group-hover:text-white" />
        </div>
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl max-h-[92vh] w-full flex flex-col rounded-[24px] sm:rounded-[28px] overflow-hidden border-2 border-[#D4AF37]/50 bg-black shadow-2xl"
      >
        {/* Top bar */}
        <div className="p-3.5 sm:p-4 px-5 sm:px-6 border-b border-[#D4AF37]/30 flex items-center justify-between bg-[#3D0A14] text-white pr-32 sm:pr-40">
          <h3 className="font-cinzel text-xs sm:text-base font-bold text-white truncate pr-2">
            {title || 'SS Convention Hall Preview'}
          </h3>
          {multiple && (
            <span className="text-xs text-amber-200 whitespace-nowrap tabular-nums mr-2">{index + 1} / {total}</span>
          )}
          <div className="flex items-center gap-2">
            <a
              href={imageSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2 rounded-full hover:bg-gold-500/20 text-gold-300 hover:text-gold-200 transition-colors"
              title="Open full resolution in new tab"
            >
              <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>

        {/* Image Container */}
        <div
          className="relative flex-1 overflow-auto flex items-center justify-center p-2 sm:p-6 bg-[#140407] max-h-[80vh]"
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (!multiple || touchStartX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > 50) (dx < 0 ? onNext : onPrev)?.();
            touchStartX.current = null;
          }}
        >
          {multiple && (
            <>
              <button
                onClick={onPrev}
                aria-label="Previous photo"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/60 border border-[#D4AF37]/50 text-amber-200 flex items-center justify-center hover:bg-amber-400 hover:text-[#3D0A14] transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={onNext}
                aria-label="Next photo"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/60 border border-[#D4AF37]/50 text-amber-200 flex items-center justify-center hover:bg-amber-400 hover:text-[#3D0A14] transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          {imageSrc.endsWith('.mp4') ? (
            <video
              src={imageSrc}
              controls
              autoPlay
              playsInline
              className="max-h-[72vh] sm:max-h-[76vh] max-w-full rounded-xl sm:rounded-2xl shadow-2xl border border-gold-500/30 bg-black"
            />
          ) : (
            <img
              src={imageSrc}
              alt={title || 'Enlarged Preview'}
              className="max-h-[72vh] sm:max-h-[76vh] max-w-full object-contain rounded-xl sm:rounded-2xl shadow-2xl border border-gold-500/30"
            />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
