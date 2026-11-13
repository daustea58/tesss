# HAI, MEITA CANTIKKU ♡

A premium, mobile-first romantic pixel-art micro-world made with React + Vite. It is deliberately built like a tiny interactive game—not a conventional landing page.

## Included experiences

- **4× NO opening quest** — Four deterministic retro popup stages, then a crack-and-pixel-particle destruction sequence before the one remaining `OPEN IT ♡` choice.
- **Pixel flower garden** — Parallax-aware pastel sky, clouds, pixel trees, grass, flowers, butterflies, hearts, and sparkles.
- **Luxury bouquet** — An original, inline SVG pixel-art bouquet with layered dusty-pink roses, white flowers, sage leaves, silver details, multi-layer wrapping, ribbon, and staggered bloom animation.
- **Music Box** — A persistent official YouTube soundtrack with previous / play-pause / next, progress, duration, volume, vinyl, equalizer, and a mini player that stays audible while moving between pages.
- **Curated music links** — Twenty direct Spotify and official YouTube song choices selected by you, all ready to play through the official embed.
- **Our Memories** — Fourteen supplied scrapbook photos with their full composition preserved, plus lightbox, next/previous controls, and keyboard Escape close.
- **Love Letter** — A clickable pixel envelope, open sequence, letter lift, and editable typewriter message.
- **Little Surprise** — Pixel sunset, bouquet, the supplied “kamu kangen aku yaa?” image, and final secret popup.
- **Responsive design** — Mobile-first layout, touch-safe controls, desktop expansion, and `prefers-reduced-motion` support.

## Local development

```bash
npm install
npm run dev
```

Vite prints a localhost URL (normally `http://localhost:5173/`). Build a production bundle with:

```bash
npm run check
npm run test
npm run build
npm run preview
```

## Personalize it in one file

Edit [`src/data/siteConfig.js`](src/data/siteConfig.js) to change:

| What | Field |
| --- | --- |
| Greeting / recipient name | `siteConfig.recipientName`, `homeTitle`, `homeSubtitle` |
| Luxury bouquet text | `bouquetTitle`, `bouquetMessage` |
| Four opening messages | `openingStages` |
| Love letter | `siteConfig.letter` |
| Final surprise words and couple photo | `siteConfig.surprise` |
| Tracks shown in the local player | `musicPlaylist` |
| Spotify / YouTube recommendations | `musicRecommendations` |
| All fourteen gallery captions and paths | `galleryItems` |

### Change photos later

The supplied photos are already wired into [`src/data/siteConfig.js`](src/data/siteConfig.js). To swap one later, put a new original image in [`public/assets/images/gallery/`](public/assets/images/gallery/) and update that item’s `src`. Change `siteConfig.surprise.couplePhoto` for the Little Surprise image.

Photos are never converted to pixel art or force-cropped; only their surrounding UI is pixel-styled.

### Change music later

1. Update a playlist item's `youtubeId`, `youtube`, `title`, and `artist` in [`src/data/siteConfig.js`](src/data/siteConfig.js).
2. The soundtrack uses YouTube's official iframe player, begins only after the visitor presses Play, and continues across the internal pages.
3. The `public/assets/music/` folder remains available if a future version needs licensed local audio files.

No copyrighted music is downloaded. Spotify and YouTube recommendations remain direct external links.

## Project map

```text
src/
  components/       interactive scenes and shared pixel-art components
  data/siteConfig.js single personalization/configuration file
  styles/global.css responsive design system and animations
public/assets/
  images/gallery/   supplied original gallery photos
  music/            optional licensed local audio
.github/workflows/
  deploy-pages.yml  manual GitHub Pages deployment workflow
```

## Deployment preparation

- **Netlify:** [`netlify.toml`](netlify.toml) uses `npm run build` and publishes `dist`.
- **GitHub Pages:** [`deploy-pages.yml`](.github/workflows/deploy-pages.yml) builds and deploys on every push to `main` (and can be run manually). In the repo go to Settings → Pages → Source: **GitHub Actions** once. It uses Vite’s relative `base: './'`, which keeps assets valid under a project Pages path.

No credentials, tokens, or private photos are included.
