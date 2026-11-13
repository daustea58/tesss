import { PixelGarden, PixelHeart, PixelSparkle } from './PixelArt';

export default function SectionShell({ kicker, title, description, onBack, children, className = '' }) {
  return (
    <main className={`world-screen section-screen ${className}`}>
      <PixelGarden subtle />
      <header className="section-topbar">
        <button className="back-button" onClick={onBack} aria-label="Kembali ke dunia utama">
          <span>←</span> BACK TO GARDEN
        </button>
        <span className="world-badge"><i /> LOVE QUEST <i /></span>
      </header>
      <section className="section-intro">
        <p className="pixel-kicker">{kicker}</p>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
        <div className="section-sparkles"><PixelSparkle /><PixelHeart /><PixelSparkle /></div>
      </section>
      {children}
    </main>
  );
}
