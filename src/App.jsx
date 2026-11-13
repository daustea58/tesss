import { useEffect, useRef, useState } from 'react';
import OpeningExperience from './components/OpeningExperience';
import WorldHome from './components/WorldHome';
import MusicBox from './components/MusicBox';
import MemoriesGallery from './components/MemoriesGallery';
import LoveLetter from './components/LoveLetter';
import LittleSurprise from './components/LittleSurprise';
import GlobalMusicDock from './components/GlobalMusicDock';
import { MusicProvider } from './music/MusicContext';

export default function App() {
  const [enteredWorld, setEnteredWorld] = useState(false);
  const [section, setSection] = useState('home');
  const rootRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [section, enteredWorld]);

  function enterWorld() {
    setEnteredWorld(true);
    setSection('home');
  }

  function navigate(nextSection) {
    setSection(nextSection);
  }

  function handlePointerMove(event) {
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;
    root.style.setProperty('--parallax-x', x.toFixed(3));
    root.style.setProperty('--parallax-y', y.toFixed(3));
  }

  if (!enteredWorld) return <OpeningExperience onEnter={enterWorld} />;

  let content;
  if (section === 'music') content = <MusicBox onBack={() => navigate('home')} />;
  else if (section === 'memories') content = <MemoriesGallery onBack={() => navigate('home')} />;
  else if (section === 'letter') content = <LoveLetter onBack={() => navigate('home')} />;
  else if (section === 'surprise') content = <LittleSurprise onBack={() => navigate('home')} />;
  else content = <WorldHome onNavigate={navigate} />;

  return (
    <MusicProvider>
      <div ref={rootRef} className="app-shell" onPointerMove={handlePointerMove}>
        {content}
        <GlobalMusicDock onOpenMusic={() => navigate('music')} />
      </div>
    </MusicProvider>
  );
}
