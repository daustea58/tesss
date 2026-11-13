import { PixelHeart } from './PixelArt';
import { useMusic } from '../music/MusicContext';

export default function GlobalMusicDock({ onOpenMusic }) {
  const { track, ready, isPlaying, togglePlayback } = useMusic();

  return (
    <aside className="global-music-dock" aria-label="Music box yang tetap menyala">
      <button className="global-music-dock__track" onClick={onOpenMusic} aria-label="Buka pemutar mini">
        <span className="global-music-dock__record"><i /></span>
        <span><b>{track.title}</b><small>{ready ? 'YouTube soundtrack' : 'loading YouTube…'}</small></span>
      </button>
      <button
        className={`global-music-dock__toggle ${isPlaying ? 'is-playing' : ''}`}
        onClick={togglePlayback}
        aria-label={isPlaying ? 'Pause musik' : 'Play musik'}
      >
        <i />
      </button>
      <PixelHeart />
    </aside>
  );
}
