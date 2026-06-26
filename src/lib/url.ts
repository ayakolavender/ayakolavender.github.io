/**
 * URL helpers that respect Astro's `base` (so the site works both at
 * `username.github.io` (base `/`) and `username.github.io/repo` (base `/repo/`)
 * with no edits from the user).
 */
const BASE = import.meta.env.BASE_URL; // e.g. "/" or "/my-repo/"

function isExternal(path: string): boolean {
  return /^(https?:)?\/\//.test(path) || path.startsWith('mailto:') || path.startsWith('#');
}

/** Prefix an internal route/path with the site base. External URLs pass through. */
export function withBase(path: string): string {
  if (isExternal(path)) return path;
  const base = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}` || '/';
}

/** Resolve a content asset path (e.g. "assets/profile.jpg") to a served URL. */
export function assetUrl(path?: string | null): string | undefined {
  if (!path) return undefined;
  if (isExternal(path)) return path;
  return withBase(path);
}

/** Turn a bare DOI ("10.1000/xyz") into a full link; pass URLs through. */
export function doiUrl(doi: string): string {
  if (isExternal(doi) || doi.startsWith('http')) return doi;
  return `https://doi.org/${doi}`;
}
