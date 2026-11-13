import { useState } from 'react';
import SectionShell from './SectionShell';
import PixelModal from './PixelModal';
import { LuxuryBouquet, PixelCouplePlaceholder, PixelFlower, PixelHeart, PixelSparkle } from './PixelArt';
import { siteConfig } from '../data/siteConfig';
import { assetUrl } from '../utils/asset';

export default function LittleSurprise({ onBack }) {
  const [showFinalNote, setShowFinalNote] = useState(false);
  const surprise = siteConfig.surprise;

  return (
    <SectionShell
      kicker="04 · THE LAST LITTLE DOOR"
      title="A tiny forever kind of feeling."
      description="The garden saved its warmest light for this page."
      onBack={onBack}
      className="surprise-screen"
    >
      <section className="sunset-scene">
        <div className="sunset-sky"><span className="sunset-sun" /><span className="sunset-cloud sunset-cloud--one" /><span className="sunset-cloud sunset-cloud--two" /></div>
        <div className="sunset-hills"><i /><i /><i /></div>
        <div className="sunset-stars" aria-hidden="true">{Array.from({ length: 14 }, (_, index) => <PixelSparkle key={index} className={`sunset-star sunset-star--${index + 1}`} />)}</div>
        <div className="surprise-bouquet"><LuxuryBouquet compact /></div>
        <div className="surprise-portrait">
          <div className="portrait-tape portrait-tape--one" /><div className="portrait-tape portrait-tape--two" />
          {surprise.couplePhoto ? <img src={assetUrl(surprise.couplePhoto)}alt={surprise.couplePhotoAlt || 'Foto surprise'} /> : <PixelCouplePlaceholder />}
          <p>kamu kangen aku yaa? ♡</p>
        </div>
        <div className="surprise-content">
          <p className="pixel-kicker">A FINAL LITTLE THING</p>
          <h2>{surprise.title}</h2>
          <p>{surprise.subtitle}</p>
          <button className="pixel-button pixel-button--primary pixel-button--large" onClick={() => setShowFinalNote(true)}>ONE MORE THING <span>♡</span></button>
        </div>
        <PixelHeart className="sunset-heart sunset-heart--one" />
        <PixelHeart className="sunset-heart sunset-heart--two" />
        <PixelHeart className="sunset-heart sunset-heart--three" />
        <div className="surprise-flowers"><PixelFlower color="pink" /><PixelFlower color="white" /><PixelFlower color="dusty" /><PixelFlower color="pink" /></div>
      </section>

      {showFinalNote && (
        <PixelModal label="Pesan terakhir" onClose={() => setShowFinalNote(false)}>
          <div className="final-note">
            <div className="final-note__icon"><PixelHeart /></div>
            <p className="pixel-kicker">FOR YOU, ALWAYS</p>
            <h2>One more thing...</h2>
            <p>{surprise.message}</p>
            <div className="final-note__flowers"><PixelFlower color="pink" /><PixelSparkle /><PixelFlower color="white" /></div>
            <button className="pixel-button pixel-button--primary" onClick={() => setShowFinalNote(false)}>KEEP THIS ♡</button>
          </div>
        </PixelModal>
      )}
    </SectionShell>
  );
}
