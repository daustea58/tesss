import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { musicPlaylist } from '../data/siteConfig';

const MusicContext = createContext(null);
const YOUTUBE_API_URL = 'https://www.youtube.com/iframe_api';

function loadYouTubeIframeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (window.__haiYouTubeApiPromise) return window.__haiYouTubeApiPromise;

  window.__haiYouTubeApiPromise = new Promise((resolve, reject) => {
    const previousReadyHandler = window.onYouTubeIframeAPIReady;
    const finish = () => {
      if (window.YT?.Player) resolve(window.YT);
      else reject(new Error('YouTube IFrame API tidak tersedia.'));
    };

    window.onYouTubeIframeAPIReady = () => {
      previousReadyHandler?.();
      finish();
    };

    let script = document.querySelector(`script[src="${YOUTUBE_API_URL}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = YOUTUBE_API_URL;
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener('error', () => reject(new Error('YouTube IFrame API gagal dimuat.')), { once: true });
  });

  return window.__haiYouTubeApiPromise;
}

export function MusicProvider({ children }) {
  const playerHostRef = useRef(null);
  const playerRef = useRef(null);
  const trackIndexRef = useRef(0);
  const volumeRef = useRef(0.7);
  const [trackIndex, setTrackIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [notice, setNotice] = useState('Menyiapkan soundtrack dari YouTube…');
  const track = musicPlaylist[trackIndex];

  useEffect(() => {
    trackIndexRef.current = trackIndex;
  }, [trackIndex]);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  useEffect(() => {
    let alive = true;
    let ownedPlayer = null;

    async function createPlayer() {
      try {
        const YouTube = await loadYouTubeIframeApi();
        if (!alive || !playerHostRef.current) return;

        ownedPlayer = new YouTube.Player(playerHostRef.current, {
          height: '1',
          width: '1',
          videoId: musicPlaylist[trackIndexRef.current].youtubeId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            rel: 0,
            playsinline: 1,
            modestbranding: 1,
            enablejsapi: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event) => {
              if (!alive) return;
              playerRef.current = event.target;
              event.target.setVolume(Math.round(volumeRef.current * 100));
              setReady(true);
              setNotice('Pilih play untuk memulai lagu ♡');
            },
            onStateChange: (event) => {
              if (!alive) return;
              if (event.data === YouTube.PlayerState.PLAYING) {
                setIsPlaying(true);
                setNotice(`Now playing: ${musicPlaylist[trackIndexRef.current].title}`);
              }
              if (event.data === YouTube.PlayerState.PAUSED) setIsPlaying(false);
              if (event.data === YouTube.PlayerState.ENDED) {
                setIsPlaying(false);
                setNotice('Lagunya selesai — pilih next untuk lanjut ♡');
              }
            },
            onError: () => {
              if (!alive) return;
              setNotice('Video YouTube ini tidak bisa diputar di perangkat ini. Pilih lagu lain.');
              setIsPlaying(false);
            },
          },
        });
        playerRef.current = ownedPlayer;
      } catch {
        if (alive) setNotice('YouTube belum dapat dimuat. Periksa koneksi internet lalu coba lagi.');
      }
    }

    createPlayer();
    return () => {
      alive = false;
      if (ownedPlayer?.destroy) ownedPlayer.destroy();
      if (playerRef.current === ownedPlayer) playerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!ready) return undefined;
    const timer = window.setInterval(() => {
      const player = playerRef.current;
      if (!player) return;
      try {
        setCurrentTime(Number(player.getCurrentTime()) || 0);
        setDuration(Number(player.getDuration()) || 0);
      } catch {
        // The player can be briefly unavailable while YouTube changes tracks.
      }
    }, 500);
    return () => window.clearInterval(timer);
  }, [ready]);

  const togglePlayback = useCallback(() => {
    const player = playerRef.current;
    if (!ready || !player) {
      setNotice('Music box masih menyiapkan YouTube. Coba lagi sebentar ya.');
      return;
    }
    if (isPlaying) {
      player.pauseVideo();
      setNotice('Music paused — taman kecil ini menunggu kamu.');
    } else {
      player.playVideo();
      setNotice(`Memulai ${musicPlaylist[trackIndex].title}…`);
    }
  }, [isPlaying, ready, trackIndex]);

  const changeTrack = useCallback((direction) => {
    const nextIndex = (trackIndex + direction + musicPlaylist.length) % musicPlaylist.length;
    const nextTrack = musicPlaylist[nextIndex];
    const player = playerRef.current;
    const shouldKeepPlaying = isPlaying;

    setTrackIndex(nextIndex);
    setCurrentTime(0);
    setDuration(0);
    setNotice(`${shouldKeepPlaying ? 'Memutar' : 'Memilih'}: ${nextTrack.title}`);

    if (!ready || !player) return;
    if (shouldKeepPlaying) player.loadVideoById(nextTrack.youtubeId);
    else player.cueVideoById(nextTrack.youtubeId);
  }, [isPlaying, ready, trackIndex]);

  const seek = useCallback((nextTime) => {
    const player = playerRef.current;
    if (!ready || !player) return;
    player.seekTo(nextTime, true);
    setCurrentTime(nextTime);
  }, [ready]);

  const updateVolume = useCallback((nextVolume) => {
    const normalized = Number(nextVolume);
    setVolume(normalized);
    playerRef.current?.setVolume(Math.round(normalized * 100));
  }, []);

  const value = useMemo(() => ({
    track,
    trackIndex,
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
  }), [track, trackIndex, ready, isPlaying, currentTime, duration, volume, notice, togglePlayback, changeTrack, seek, updateVolume]);

  return (
    <MusicContext.Provider value={value}>
      {children}
      <div className="youtube-engine" aria-hidden="true"><div ref={playerHostRef} /></div>
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const value = useContext(MusicContext);
  if (!value) throw new Error('useMusic harus digunakan di dalam MusicProvider.');
  return value;
}
