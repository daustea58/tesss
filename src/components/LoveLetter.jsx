import { useEffect, useRef, useState } from 'react';
import SectionShell from './SectionShell';
import { PixelFlower, PixelHeart, PixelSparkle } from './PixelArt';
import { siteConfig } from '../data/siteConfig';

export default function LoveLetter({ onBack }) {
  const [opened, setOpened] = useState(false);
  const [visibleText, setVisibleText] = useState('');
  const [readyToType, setReadyToType] = useState(false);
  const fullText = siteConfig.letter.body;
  const replayTimer = useRef(null);

  useEffect(() => () => window.clearTimeout(replayTimer.current), []);

  useEffect(() => {
    if (!opened) return undefined;
    const revealLetter = window.setTimeout(() => setReadyToType(true), 850);
    return () => window.clearTimeout(revealLetter);
  }, [opened]);

  useEffect(() => {
    if (!readyToType) return undefined;
    let cursor = 0;
    const type = window.setInterval(() => {
      cursor += 2;
      setVisibleText(fullText.slice(0, cursor));
      if (cursor >= fullText.length) window.clearInterval(type);
    }, 17);
    return () => window.clearInterval(type);
  }, [readyToType, fullText]);

  function openLetter() {
    if (opened) return;
    setVisibleText('');
    setReadyToType(false);
    setOpened(true);
  }

  function replayLetter() {
    setOpened(false);
    setVisibleText('');
    setReadyToType(false);
    window.clearTimeout(replayTimer.current);
    replayTimer.current = window.setTimeout(() => setOpened(true), 120);
  }

  return (
    <SectionShell
      kicker="03 · A NOTE FROM MY HEART"
      title="A love letter, just for you."
      description="Tap the envelope and let the little paper unfold."
      onBack={onBack}
      className="letter-screen"
    >
      <section className={`letter-stage ${opened ? 'is-opened' : ''}`}>
        <div className="letter-stage__flowers" aria-hidden="true">
          <PixelFlower color="pink" /><PixelFlower color="white" /><PixelSparkle /><PixelHeart />
        </div>
        <button className="pixel-envelope" onClick={openLetter} aria-label={opened ? 'Surat sudah dibuka' : 'Buka surat cinta'} disabled={opened}>
          <span className="envelope-shadow" />
          <span className="envelope-back" />
          <span className="envelope-letter-peek"><i /><i /><i /></span>
          <span className="envelope-body" />
          <span className="envelope-flap" />
          <span className="envelope-fold envelope-fold--left" />
          <span className="envelope-fold envelope-fold--right" />
          <span className="envelope-seal"><PixelHeart /></span>
          <span className="envelope-tap">{opened ? 'opened with love' : 'tap to open'}</span>
        </button>

        <article className="love-paper" aria-live="polite">
          <div className="love-paper__top"><PixelSparkle /><span>private note</span><PixelSparkle /></div>
          <h2>{siteConfig.letter.title}</h2>
          <p className="love-paper__body">{visibleText}{readyToType && visibleText.length < fullText.length && <span className="type-caret">|</span>}</p>
          {visibleText.length >= fullText.length && <p className="love-paper__signature">{siteConfig.letter.signature}</p>}
          <div className="love-paper__flowers"><PixelFlower color="dusty" /><PixelHeart /><PixelFlower color="pink" /></div>
        </article>
      </section>
      <div className="letter-controls">
        {opened && <button className="pixel-button pixel-button--quiet" onClick={replayLetter}>REPLAY LETTER ↻</button>}
        {!opened && <p><PixelHeart /> A small note is waiting inside.</p>}
      </div>
    </SectionShell>
  );
}
