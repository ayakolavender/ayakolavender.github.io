import { getCollection } from 'astro:content';
import { withBase } from './url';
import { site, publications, talks, projects, gallery, workshops, contact } from './content';

/** Navigation pages (the home page is always present and links from the logo). */
export type SectionId =
  | 'home' | 'publications' | 'talks' | 'workshops' | 'projects' | 'gallery' | 'blog' | 'links';

export interface NavItem {
  id: SectionId;
  label: string;
  icon: string;
  path: string;
}

export const META: Record<SectionId, { label: string; icon: string }> = {
  home: { label: 'Home', icon: 'home' },
  publications: { label: 'Publications', icon: 'book-open' },
  talks: { label: 'Talks', icon: 'presentation' },
  workshops: { label: 'Workshops', icon: 'calendar' },
  projects: { label: 'Projects', icon: 'folder' },
  gallery: { label: 'Gallery', icon: 'image' },
  blog: { label: 'Blog', icon: 'pen' },
  links: { label: 'Links', icon: 'link' },
};

/** Default nav order + enabled state used when site.yml omits `sections`. */
const DEFAULTS: { id: SectionId; enabled: boolean }[] = [
  { id: 'publications', enabled: true },
  { id: 'talks', enabled: true },
  { id: 'workshops', enabled: true },
  { id: 'projects', enabled: true },
  { id: 'gallery', enabled: true },
  { id: 'blog', enabled: true },
  { id: 'links', enabled: true },
];

export function pathFor(id: SectionId): string {
  if (id === 'home') return withBase('/');
  if (id === 'blog') return withBase('/blog');
  return withBase(`/${id}`);
}

function hasSocial(): boolean {
  return !!site.social && Object.values(site.social).some(Boolean);
}

/** Whether a nav page has anything to show (drives auto-hide on empty). */
function hasContent(id: SectionId, blogCount: number): boolean {
  switch (id) {
    case 'publications': return publications.length > 0;
    case 'talks': return talks.length > 0;
    case 'workshops': return workshops.length > 0;
    case 'projects': return projects.length > 0;
    case 'gallery': return gallery.length > 0;
    case 'blog': return blogCount > 0;
    case 'links':
      return !!(site.profile.email || contact.email || site.cv || hasSocial() || site.links?.length);
    default:
      return false;
  }
}

/**
 * The ordered list of nav pages to show AND to generate. A page appears only if
 * it is enabled AND has content. Home is separate (the logo links to it).
 */
export async function getVisibleSections(): Promise<NavItem[]> {
  const posts = await getCollection('blog', (e) =>
    import.meta.env.PROD ? e.data.draft !== true : true
  );
  const blogCount = posts.length;

  const configured =
    site.sections && site.sections.length
      ? site.sections
      : DEFAULTS.map((d) => ({ id: d.id, enabled: d.enabled, label: undefined as string | undefined }));

  return configured
    .filter((s) => s.enabled !== false)
    .filter((s): s is { id: SectionId; enabled?: boolean; label?: string } =>
      (META as Record<string, unknown>)[s.id] !== undefined && s.id !== 'home'
    )
    .filter((s) => hasContent(s.id, blogCount))
    .map((s) => ({
      id: s.id,
      label: s.label ?? META[s.id].label,
      icon: META[s.id].icon,
      path: pathFor(s.id),
    }));
}
