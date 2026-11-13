import { useEffect } from 'react';
import { PixelHeart, PixelSparkle } from './PixelArt';

export default function PixelModal({ children, onClose, label = 'Dialog' }) {
  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [onClose]);

  return (
    <div className="pixel-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="pixel-modal" role="dialog" aria-modal="true" aria-label={label}>
        <div className="pixel-modal__top"><PixelSparkle /><span>special moment</span><PixelHeart /></div>
        <button className="pixel-modal__close" onClick={onClose} aria-label="Tutup popup">×</button>
        {children}
      </section>
    </div>
  );
}
