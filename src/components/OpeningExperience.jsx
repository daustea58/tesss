import { useEffect, useMemo, useState } from 'react';
import { LuxuryBouquet, PixelFlower, PixelHeart, PixelSparkle } from './PixelArt';
import { siteConfig } from '../data/siteConfig';

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return reduced;
}

function makePixelParticles() {
  const palette = ['#d9859a', '#f5b9c7', '#fff7ec', '#c6c8cc', '#813f59', '#9eb4a3'];
  return Array.from({ length: 168 }, (_, index) => {
    const angle = (index * 137.508) * (Math.PI / 180);
    const ring = 10 + (index % 17) * 5;
    return {
      id: index,
      x: 50 + Math.cos(angle) * ring * 0.76,
      y: 44 + Math.sin(angle) * ring * 0.48,
      drift: Math.round(Math.cos(angle) * (30 + (index % 7) * 8)),
      fall: 90 + (index % 13) * 17,
      delay: (index % 19) * 0.018,
      size: index % 11 === 0 ? 8 : index % 3 === 0 ? 5 : 3,
      color: palette[index % palette.length],
    };
  });
}

export default function OpeningExperience({ onEnter }) {
  const [stage, setStage] = useState(0);
  const [busy, setBusy] = useState(false);
  const [isDestructing, setIsDestructing] = useState(false);
  const [destroyed, setDestroyed] = useState(false);
  const reducedMotion = useReducedMotion();
  const particles = useMemo(makePixelParticles, []);
  const current = siteConfig.openingStages[stage];

  useEffect(() => {
    if (!isDestructing) return undefined;
    const finish = window.setTimeout(() => {
      setDestroyed(true);
      setBusy(false);
    }, reducedMotion ? 120 : 1350);
    return () => window.clearTimeout(finish);
  }, [isDestructing, reducedMotion]);

  function handleNo() {
    if (busy || isDestructing || destroyed) return;
    if (stage < siteConfig.openingStages.length - 1) {
      setBusy(true);
      window.setTimeout(() => {
        setStage((value) => value + 1);
        setBusy(false);
      }, reducedMotion ? 1 : 280);
      return;
    }
    setBusy(true);
    setIsDestructing(true);
  }

  function handleOpen() {
    if (busy && !destroyed) return;
    onEnter();
  }

  return (
    <main className="opening-screen">
      <div className="opening-pattern" aria-hidden="true">
        <PixelHeart className="opening-heart opening-heart--one" />
        <PixelHeart className="opening-heart opening-heart--two" />
        <PixelHeart className="opening-heart opening-heart--three" />
        <PixelFlower color="pink" className="opening-flower opening-flower--one" />
        <PixelFlower color="white" className="opening-flower opening-flower--two" />
        <PixelFlower color="dusty" className="opening-flower opening-flower--three" />
        <PixelSparkle className="opening-sparkle opening-sparkle--one" />
        <PixelSparkle className="opening-sparkle opening-sparkle--two" />
        <PixelSparkle className="opening-sparkle opening-sparkle--three" />
        <span className="opening-star opening-star--one" />
        <span className="opening-star opening-star--two" />
        <span className="opening-star opening-star--three" />
      </div>

      {!destroyed ? (
        <section
          key={stage}
          className={`opening-popup opening-popup--${current.flavor} ${isDestructing ? 'is-crumbling' : ''}`}
          aria-live="polite"
        >
          <div className="window-topbar">
            <span className="window-dot" /><span className="window-dot" /><span className="window-dot" />
            <small>love_letter.exe</small>
          </div>
          <div className="opening-popup__content">
            <div className="opening-mini-bouquet"><LuxuryBouquet compact /></div>
            <PixelHeart className="opening-popup__heart" />
            <p className="pixel-kicker">A SMALL QUEST FOR YOU</p>
            <h1>{current.title}</h1>
            <p className="opening-message">{current.message}</p>
            <div className="opening-actions">
              <button className="pixel-button pixel-button--primary" onClick={handleOpen} disabled={busy}>
                OPEN IT <span>♡</span>
              </button>
              <button className="pixel-button pixel-button--quiet" onClick={handleNo} disabled={busy}>
                NO <span>:(</span>
              </button>
            </div>
            <p className="opening-progress">{stage + 1} / 4 little chances</p>
          </div>
          {isDestructing && (
            <>
              <div className="pixel-cracks" aria-hidden="true"><i /><i /><i /><i /></div>
              <div className="pixel-debris" aria-hidden="true">
                {particles.map((particle) => (
                  <i
                    key={particle.id}
                    style={{
                      '--x': `${particle.x}%`,
                      '--y': `${particle.y}%`,
                      '--drift': `${particle.drift}px`,
                      '--fall': `${particle.fall}px`,
                      '--delay': `${particle.delay}s`,
                      '--size': `${particle.size}px`,
                      '--particle-color': particle.color,
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      ) : (
        <section className="only-choice" aria-live="polite">
          <div className="only-choice__sparkles" aria-hidden="true">
            <PixelSparkle /><PixelSparkle /><PixelHeart /><PixelHeart />
          </div>
          <p className="pixel-kicker">QUEST UPDATED</p>
          <p>Okay, now you have only one choice hehe &gt;&lt;</p>
          <button className="pixel-button pixel-button--primary pixel-button--large" onClick={handleOpen}>
            OPEN IT <span>♡</span>
          </button>
        </section>
      )}
    </main>
  );
}
