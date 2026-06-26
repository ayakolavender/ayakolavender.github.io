/**
 * Loads and validates every YAML content file once, exporting typed data for
 * the whole site. Blog posts are handled separately via Astro content
 * collections (see src/content.config.ts) because they need markdown rendering.
 */
import siteRaw from '../../content/site.yml';
import themeRaw from '../../content/theme.yml';
import homeRaw from '../../content/home.yml';
import aboutRaw from '../../content/about.yml';
import contactRaw from '../../content/contact.yml';
import publicationsRaw from '../../content/publications.yml';
import newsRaw from '../../content/news.yml';
import talksRaw from '../../content/talks.yml';
import projectsRaw from '../../content/projects.yml';
import experienceRaw from '../../content/experience.yml';
import workshopsRaw from '../../content/workshops.yml';
import awardsRaw from '../../content/awards.yml';
import volunteeringRaw from '../../content/volunteering.yml';
import galleryRaw from '../../content/gallery.yml';

import * as S from './schemas';
import { friendlyParse } from './validate';
import { toTime } from './format';

export const site = friendlyParse(S.siteSchema, siteRaw ?? {}, 'site.yml');
export const theme = friendlyParse(S.themeSchema, themeRaw ?? {}, 'theme.yml');
export const home = friendlyParse(S.homeSchema, homeRaw ?? {}, 'home.yml');
export const about = friendlyParse(S.aboutSchema, aboutRaw ?? {}, 'about.yml');
export const contact = friendlyParse(S.contactSchema, contactRaw ?? {}, 'contact.yml');

export const publications = friendlyParse(S.publicationsSchema, publicationsRaw ?? [], 'publications.yml');
export const talks = friendlyParse(S.talksSchema, talksRaw ?? [], 'talks.yml').sort(
  (a, b) => toTime(b.date) - toTime(a.date)
);
export const news = friendlyParse(S.newsSchema, newsRaw ?? [], 'news.yml').sort(
  (a, b) => toTime(b.date) - toTime(a.date)
);
export const projects = friendlyParse(S.projectsSchema, projectsRaw ?? [], 'projects.yml');
export const experience = friendlyParse(S.experienceSchema, experienceRaw ?? [], 'experience.yml');
export const workshops = friendlyParse(S.workshopsSchema, workshopsRaw ?? [], 'workshops.yml').sort(
  (a, b) => toTime(b.date) - toTime(a.date)
);
export const awards = friendlyParse(S.awardsSchema, awardsRaw ?? [], 'awards.yml');
export const volunteering = friendlyParse(S.volunteeringSchema, volunteeringRaw ?? [], 'volunteering.yml');
export const gallery = friendlyParse(S.gallerySchema, galleryRaw ?? [], 'gallery.yml');

/** Research-interest tags shown in the hero and the About block. */
export const interests = home.interests ?? [];
