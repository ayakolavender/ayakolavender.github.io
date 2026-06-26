/** Date/format helpers tolerant of both real dates (YAML `2026-01-15`) and
 *  free-text strings ("Spring 2025", "In press"). */

export function toDate(v: string | Date | undefined | null): Date | null {
  if (!v) return null;
  if (v instanceof Date) return isNaN(v.getTime()) ? null : v;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}

/** Sortable timestamp; unparseable values sort last. */
export function toTime(v: string | Date | undefined | null): number {
  const d = toDate(v);
  return d ? d.getTime() : -Infinity;
}

export function formatDate(
  v: string | Date | undefined | null,
  opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
): string {
  const d = toDate(v);
  if (!d) return typeof v === 'string' ? v : '';
  return d.toLocaleDateString('en-US', { ...opts, timeZone: 'UTC' });
}

export function yearOf(v: string | Date | undefined | null): string {
  const d = toDate(v);
  if (d) return String(d.getUTCFullYear());
  return typeof v === 'string' ? v : '';
}

/** Normalize an author field (string | string[]) into an array. */
export function authorList(authors?: string | string[]): string[] {
  if (!authors) return [];
  return Array.isArray(authors) ? authors : [authors];
}

/** Estimated minutes to read, from the post body (~200 wpm), unless given. */
export function estimateReadingTime(body?: string, explicit?: number): number {
  if (explicit) return explicit;
  const words = body ? body.trim().split(/\s+/).filter(Boolean).length : 0;
  return Math.max(1, Math.round(words / 200));
}
