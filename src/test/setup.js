import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => cleanup());

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

Object.defineProperty(HTMLMediaElement.prototype, 'play', {
  configurable: true,
  value: vi.fn().mockResolvedValue(undefined),
});

Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
  configurable: true,
  value: vi.fn(),
});

window.scrollTo = vi.fn();

class FakeYouTubePlayer {
  constructor(host, options) {
    this.host = host;
    this.options = options;
    this.videoId = options.videoId;
    this.currentTime = 0;
    this.duration = 210;
    this.volume = 70;
    this.destroyed = false;
    window.__lastYouTubePlayer = this;
  }

  triggerReady() { this.options.events?.onReady?.({ target: this }); }
  setVolume(value) { this.volume = value; }
  getCurrentTime() { return this.currentTime; }
  getDuration() { return this.duration; }
  seekTo(value) { this.currentTime = value; }
  cueVideoById(videoId) { this.videoId = videoId; }
  loadVideoById(videoId) { this.videoId = videoId; this.playVideo(); }
  playVideo() { this.options.events?.onStateChange?.({ data: 1 }); }
  pauseVideo() { this.options.events?.onStateChange?.({ data: 2 }); }
  destroy() { this.destroyed = true; }
}

window.YT = {
  Player: FakeYouTubePlayer,
  PlayerState: { ENDED: 0, PLAYING: 1, PAUSED: 2 },
};
