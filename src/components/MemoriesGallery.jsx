import { useEffect, useState } from 'react';
import SectionShell from './SectionShell';
import PixelModal from './PixelModal';
import { PixelFlower, PixelHeart, PixelSparkle } from './PixelArt';
import { galleryItems } from '../data/siteConfig';
import { assetUrl } from '../utils/asset';

function GalleryImage({ item, large = false }) {
  return (
    <img
      src={assetUrl(item.src)}
      alt={item.caption}
      className={large ? 'gallery-image gallery-image--large' : 'gallery-image'}
      loading={large ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}

export default function MemoriesGallery({ onBack }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const active = activeIndex === null ? null : galleryItems[activeIndex];

  function move(direction) {
    setActiveIndex((index) => (index + direction + galleryItems.length) % galleryItems.length);
  }

  const isOpen = activeIndex !== null;
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (event) => {
      if (event.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + galleryItems.length) % galleryItems.length);
      if (event.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % galleryItems.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  return (
    <SectionShell
      kicker="02 · OUR LITTLE SCRAPBOOK"
      title="Every picture tells a story."
      description={`${galleryItems.length} little memories, kept exactly as sweet as they are.`}
      onBack={onBack}
      className="memories-screen"
    >
      <section className="scrapbook">
        <div className="scrapbook__spiral" aria-hidden="true">{Array.from({ length: 14 }, (_, index) => <i key={index} />)}</div>
        <div className="scrapbook__deco scrapbook__deco--one"><PixelFlower color="pink" /><PixelHeart /></div>
        <div className="scrapbook__deco scrapbook__deco--two"><PixelSparkle /><PixelFlower color="white" /></div>
        <div className="scrapbook__header"><span>our memories.log</span><p>click a polaroid to look closer ♡</p></div>
        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <button
              className={`polaroid polaroid--${item.tone}`}
              key={item.id}
              style={{ '--rotation': `${item.rotation}deg`, '--entry-delay': `${index * 0.075}s` }}
              onClick={() => setActiveIndex(index)}
              aria-label={`Buka foto: ${item.caption}`}
            >
              <span className="washi-tape" />
              <span className="polaroid__sticker"><PixelHeart /></span>
              <span className="polaroid__image" style={{ aspectRatio: item.aspectRatio }}><GalleryImage item={item} /></span>
              <span className="polaroid__caption">{item.caption}</span>
              <span className="polaroid__corner">{String(item.id).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
      </section>

      {active && (
        <PixelModal label={`Foto: ${active.caption}`} onClose={() => setActiveIndex(null)}>
          <div className="gallery-modal">
            <p className="pixel-kicker">MEMORY {String(active.id).padStart(2, '0')} / {String(galleryItems.length).padStart(2, '0')}</p>
            <div className="gallery-modal__photo"><GalleryImage item={active} large /></div>
            <p className="gallery-modal__caption">{active.caption}</p>
            <div className="gallery-modal__actions">
              <button className="pixel-button pixel-button--quiet" onClick={() => move(-1)}>← PREVIOUS</button>
              <button className="pixel-button pixel-button--primary" onClick={() => move(1)}>NEXT →</button>
            </div>
          </div>
        </PixelModal>
      )}
    </SectionShell>
  );
}
