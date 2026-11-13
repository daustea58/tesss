import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { galleryItems, musicPlaylist, musicRecommendations, siteConfig } from '../src/data/siteConfig.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];

function expect(condition, message) {
  if (!condition) failures.push(message);
}

async function exists(relativePath) {
  try {
    await access(path.join(root, relativePath), constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

expect(siteConfig.openingStages.length === 4, 'Opening quest must have exactly four NO stages.');
expect(galleryItems.length >= 8, 'Gallery must expose at least eight slots.');
expect(musicPlaylist.length >= 3, 'Music box must have at least three YouTube soundtrack tracks.');
expect(musicRecommendations.length >= 5, 'At least five song recommendations are required.');
expect(siteConfig.letter.body.length > 100, 'Love letter body looks incomplete.');

for (const track of musicPlaylist) {
  expect(/^[\w-]{11}$/.test(track.youtubeId || ''), `Track “${track.title}” is missing a valid YouTube video ID.`);
  expect(track.youtube?.startsWith('https://www.youtube.com/'), `Track “${track.title}” is missing an official YouTube URL.`);
}

for (const item of galleryItems) {
  expect(Boolean(item.src), `Gallery item ${item.id} is missing a photo source.`);
  if (item.src) expect(await exists(`public${item.src}`), `Gallery photo is missing: public${item.src}`);
}

expect(Boolean(siteConfig.surprise.couplePhoto), 'Little Surprise must have its supplied photo configured.');
if (siteConfig.surprise.couplePhoto) {
  expect(await exists(`public${siteConfig.surprise.couplePhoto}`), `Little Surprise image is missing: public${siteConfig.surprise.couplePhoto}`);
}

for (const song of musicRecommendations) {
  expect(song.spotify.startsWith('https://open.spotify.com/'), `Spotify URL is invalid for “${song.title}”.`);
  expect(song.youtube.startsWith('https://www.youtube.com/'), `YouTube URL is invalid for “${song.title}”.`);
}

const interactionSources = [
  ['src/components/OpeningExperience.jsx', ['isDestructing', 'pixel-debris', 'onEnter']],
  ['src/music/MusicContext.jsx', ['YouTube.Player', 'togglePlayback', 'changeTrack']],
  ['src/components/MusicBox.jsx', ['useMusic', 'togglePlayback', 'changeTrack']],
  ['src/components/GlobalMusicDock.jsx', ['useMusic', 'Pause musik']],
  ['src/components/MemoriesGallery.jsx', ['PixelModal', 'move']],
  ['src/components/LoveLetter.jsx', ['setReadyToType', 'pixel-envelope']],
  ['src/components/LittleSurprise.jsx', ['showFinalNote', 'PixelModal']],
];
for (const [file, terms] of interactionSources) {
  const text = await readFile(path.join(root, file), 'utf8');
  for (const term of terms) expect(text.includes(term), `${file} is missing expected interaction hook: ${term}`);
}

if (failures.length) {
  console.error('Project check failed:\n' + failures.map((failure) => `- ${failure}`).join('\n'));
  process.exit(1);
}

console.log(`Project check passed: ${siteConfig.openingStages.length} opening stages, ${galleryItems.length} gallery photos, ${musicPlaylist.length} YouTube soundtrack tracks, ${musicRecommendations.length} external recommendations.`);
