import { LuxuryBouquet, PixelGarden, PixelHeart, PixelIcon, PixelSparkle } from './PixelArt';
import { siteConfig } from '../data/siteConfig';

const portals = [
  { id: 'music', title: 'MUSIC BOX ♡', description: 'A little melody for you.', icon: 'music', color: 'pink', tag: '01' },
  { id: 'memories', title: 'OUR MEMORIES', description: 'Every picture tells a story.', icon: 'camera', color: 'blue', tag: '02' },
  { id: 'letter', title: 'LOVE LETTER', description: 'Something from my heart.', icon: 'letter', color: 'lilac', tag: '03' },
  { id: 'surprise', title: 'LITTLE SURPRISE', description: 'A little something just for you.', icon: 'gift', color: 'sage', tag: '04' },
];

export default function WorldHome({ onNavigate }) {
  return (
    <main className="world-screen world-home">
      <PixelGarden />
      <header className="world-topbar">
        <span className="world-badge"><i /> LITTLE LOVE WORLD <i /></span>
        <span className="world-save">AUTOSAVE: ♡</span>
      </header>
      <section className="home-hero">
        <div className="hero-copy">
          <p className="pixel-kicker hero-kicker">WELCOME, PRETTY GIRL</p>
          <h1>{siteConfig.homeTitle}</h1>
          <p>{siteConfig.homeSubtitle}</p>
          <div className="hero-note"><PixelSparkle /> <span>tap a little portal below to explore</span> <PixelSparkle /></div>
        </div>
        <div className="hero-bouquet-wrap">
          <LuxuryBouquet />
          <PixelHeart className="hero-floating-heart hero-floating-heart--one" />
          <PixelHeart className="hero-floating-heart hero-floating-heart--two" />
        </div>
        <div className="bouquet-message">
          <p className="serif-eyebrow">{siteConfig.bouquetTitle}</p>
          <p>{siteConfig.bouquetMessage}</p>
        </div>
      </section>

      <section className="portal-section" aria-label="Little world destinations">
        <div className="section-heading">
          <p className="pixel-kicker">CHOOSE A LITTLE DOOR</p>
          <h2>Where should we go first?</h2>
        </div>
        <div className="portal-grid">
          {portals.map((portal) => (
            <button key={portal.id} className={`portal-card portal-card--${portal.color}`} onClick={() => onNavigate(portal.id)}>
              <span className="portal-card__tag">{portal.tag}</span>
              <span className="portal-card__icon"><PixelIcon type={portal.icon} /></span>
              <span className="portal-card__copy">
                <b>{portal.title}</b>
                <small>{portal.description}</small>
              </span>
              <span className="portal-card__arrow">→</span>
            </button>
          ))}
        </div>
      </section>
      <footer className="world-footer"><PixelHeart /> made with many tiny pixels &amp; a lot of love <PixelHeart /></footer>
    </main>
  );
}
