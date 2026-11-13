// Resolve a path from /public so it works both at the domain root (dev, Netlify)
// and under a GitHub Pages project path (https://user.github.io/repo/).
export function assetUrl(path = '') {
  const base = import.meta.env?.BASE_URL ?? '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${String(path).replace(/^\/+/, '')}`;
}
