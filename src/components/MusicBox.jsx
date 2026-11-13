import SectionShell from './SectionShell';
import { PixelFlower, PixelHeart, PixelSparkle } from './PixelArt';
import { musicRecommendations } from '../data/siteConfig';
import { useMusic } from '../music/MusicContext';

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainder}`;
}

export default function MusicBox({ onBack }) {
  const {
    track,
    ready,
    isPlaying,
    currentTime,
    duration,
    volume,
    notice,
    togglePlayback,
    changeTrack,
    seek,
    updateVolume,
  } = useMusic();

  return (
    <SectionShell
      kicker="01 · SOUNDTRACK OF US"
      title="A little melody for you ♡"
      description="Pilih play sekali, lalu musik YouTube akan tetap menemani saat kamu menjelajahi halaman lain."
      onBack={onBack}
      className="music-screen"
    >
      <section className="music-box-layout">
        <div className="music-box-shell">
          <div className="music-box-lid"><span /><span /><span /></div>
          <div className="music-box__ornament"><PixelFlower color="white" /><PixelHeart /><PixelFlower color="pink" /></div>
          <div className="music-box__main">
            <div className={`vinyl-stage ${isPlaying ? 'is-playing' : ''}`}>
              <div className="album-cover"><PixelHeart /><span>OUR<br />SONG</span><PixelSparkle /></div>
              <div className="vinyl-record"><i /><i /><i /></div>
              <span className="vinyl-shine" />
            </div>
            <div className="track-display">
              <p className="pixel-kicker">{ready ? 'NOW PLAYING · YOUTUBE' : 'CONNECTING TO YOUTUBE'}</p>
              <h2>{track.title}</h2>
              <p>{track.artist}</p>
              <div className={`equalizer ${isPlaying ? 'is-playing' : ''}`} aria-label={isPlaying ? 'Equalizer aktif' : 'Equalizer diam'}>
                {Array.from({ length: 11 }, (_, index) => <i key={index} style={{ '--bar': index }} />)}
              </div>
            </div>
          </div>
          <div className="music-progress">
            <span>{formatTime(currentTime)}</span>
            <input
              aria-label="Posisi lagu"
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={Math.min(currentTime, duration || 0)}
              onChange={(event) => seek(Number(event.target.value))}
              style={{ '--progress': duration ? `${(currentTime / duration) * 100}%` : '0%' }}
            />
            <span>{formatTime(duration)}</span>
          </div>
          <div className="music-controls">
            <button className="music-control music-control--skip" onClick={() => changeTrack(-1)} aria-label="Lagu sebelumnya"><i /></button>
            <button className={`music-control music-control--play ${isPlaying ? 'is-playing' : ''}`} onClick={togglePlayback} aria-label={isPlaying ? 'Pause' : 'Play'}><i /></button>
            <button className="music-control music-control--skip music-control--next" onClick={() => changeTrack(1)} aria-label="Lagu selanjutnya"><i /></button>
          </div>
          <div className="music-volume"><span>VOL</span><input aria-label="Volume" type="range" min="0" max="1" step="0.01" value={volume} onChange={(event) => updateVolume(event.target.value)} style={{ '--progress': `${volume * 100}%` }} /><span>{Math.round(volume * 100)}</span></div>
          <p className="music-notice" aria-live="polite">{notice}</p>
          <a className="track-youtube-link" href={track.youtube} target="_blank" rel="noreferrer">OPEN ON YOUTUBE ↗</a>
        </div>

        <aside className="music-guide">
          <div className="music-guide__note">
            <PixelSparkle />
            <div><b>Plays through YouTube</b><p>Gunakan tombol play sekali; player resmi YouTube tetap terpasang saat berpindah ke taman, galeri, surat, atau surprise.</p></div>
          </div>
          <h2>Dreamy song picks</h2>
          <p className="music-guide__intro">Pilihan lembut, romantis, dan hangat untuk menemani dunia kecil ini.</p>
          <div className="recommendation-list">
            {musicRecommendations.map((song, index) => (
              <article className="recommendation" key={song.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><h3>{song.title}</h3><p>{song.artist}</p><small>{song.reason}</small></div>
                <div className="recommendation__links">
                  <a href={song.spotify} target="_blank" rel="noreferrer">Spotify ↗</a>
                  <a href={song.youtube} target="_blank" rel="noreferrer">YouTube ↗</a>
                </div>
              </article>
            ))}
          </div>
          <p className="music-disclaimer">Suara diputar lewat embed resmi YouTube setelah interaksi. Tidak ada musik berhak cipta yang diunduh ke website ini.</p>
        </aside>
      </section>
    </SectionShell>
  );
}
