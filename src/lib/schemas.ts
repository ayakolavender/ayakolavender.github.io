import { z } from 'astro:content';

/**
 * Zod schemas for every YAML content file. These give friendly, build-time
 * validation: if a user mistypes a field, the build reports the exact file +
 * field instead of producing a broken page. Most fields are optional so a
 * half-filled file still renders.
 */

// A flexible date: YAML turns `2026-01-15` into a Date; quoted/free-text stays a string.
const dateField = z.union([z.date(), z.string()]);

// Authors / lists that accept a single string or an array of strings.
const stringOrArray = z.union([z.string(), z.array(z.string())]);

// Known link types shown with icons on cards (all optional).
const linksSchema = z
  .object({
    pdf: z.string(),
    code: z.string(),
    arxiv: z.string(),
    doi: z.string(),
    slides: z.string(),
    video: z.string(),
    poster: z.string(),
    demo: z.string(),
    website: z.string(),
    project: z.string(),
    data: z.string(),
    bibtex: z.string(),
  })
  .partial();

const socialSchema = z
  .object({
    github: z.string(),
    scholar: z.string(),
    orcid: z.string(),
    linkedin: z.string(),
    twitter: z.string(),
    mastodon: z.string(),
    bluesky: z.string(),
    website: z.string(),
    researchgate: z.string(),
    semanticscholar: z.string(),
    dblp: z.string(),
    youtube: z.string(),
  })
  .partial();

export const siteSchema = z.object({
  profile: z.object({
    name: z.string().min(1, 'Please add your name.'),
    shortName: z.string().optional(),
    role: z.string().optional(),
    affiliation: z.string().optional(),
    email: z.string().optional(),
    photo: z.string().optional(),
    location: z.string().optional(),
  }),
  tagline: z.string().optional(),
  cv: z.string().optional(),
  social: socialSchema.optional(),
  // Extra custom links for the Links page (beyond the social profiles above).
  links: z
    .array(z.object({ label: z.string(), url: z.string(), icon: z.string().optional() }))
    .optional(),
  // The navigation pages (Publications, Talks, Projects, Gallery, Blog, Links).
  sections: z
    .array(
      z.object({
        id: z.string(),
        enabled: z.boolean().optional(),
        label: z.string().optional(),
      })
    )
    .optional(),
  footer: z
    .object({
      note: z.string().optional(),
      showThemeToggle: z.boolean().optional(),
    })
    .optional(),
  seo: z
    .object({
      description: z.string().optional(),
      image: z.string().optional(),
    })
    .optional(),
  // Optional manual overrides (advanced; normally auto-detected by the workflow).
  basePath: z.string().optional(),
  siteUrl: z.string().optional(),
});

export const themeSchema = z.object({
  preset: z.enum(['classic', 'midnight', 'warm', 'ocean']).optional().default('classic'),
  mode: z.enum(['light', 'dark', 'system']).optional().default('system'),
  accent: z.string().optional(),
  radius: z.string().optional(),
  font: z
    .object({
      body: z.string().optional(),
      heading: z.string().optional(),
    })
    .optional(),
});

// Which blocks appear on the home page. Each also hides automatically if its
// underlying content is empty.
const homeBlocks = z
  .object({
    about: z.boolean().optional().default(true),
    news: z.boolean().optional().default(true),
    experience: z.boolean().optional().default(true),
    volunteering: z.boolean().optional().default(true),
    education: z.boolean().optional().default(true),
    awards: z.boolean().optional().default(true),
    publications: z.boolean().optional().default(true),
  })
  .optional()
  .default({});

export const homeSchema = z.object({
  greeting: z.string().optional(),
  interests: z.array(z.string()).optional().default([]),
  showPhoto: z.boolean().optional().default(true),
  blocks: homeBlocks,
  newsCount: z.number().optional().default(5),
  publicationsCount: z.number().optional().default(3),
  // Call-to-action banner at the bottom of the home page.
  cta: z
    .object({
      show: z.boolean().optional().default(true),
      title: z.string().optional(),
      text: z.string().optional(),
      buttonLabel: z.string().optional(),
      email: z.string().optional(),
    })
    .optional()
    .default({}),
});

// "About" content shown on the home page.
export const aboutSchema = z.object({
  bio: z.union([z.string(), z.array(z.string())]).optional(),
  education: z
    .array(
      z.object({
        degree: z.string(),
        institution: z.string().optional(),
        year: z.union([z.string(), z.number()]).optional(),
        thesis: z.string().optional(),
        note: z.string().optional(),
        coursework: z.array(z.string()).optional(),
      })
    )
    .optional()
    .default([]),
});

// Contact details shown on the Links page (all optional / toggleable by leaving blank).
export const contactSchema = z.object({
  email: z.string().optional(),
  office: z.string().optional(),
  address: z.string().optional(),
  officeHours: z.string().optional(),
});

export const publicationSchema = z.object({
  title: z.string(),
  authors: stringOrArray.optional(),
  venue: z.string().optional(),
  year: z.union([z.number(), z.string()]).optional(),
  type: z.string().optional(),
  abstract: z.string().optional(),
  links: linksSchema.optional(),
  award: z.string().optional(),
  featured: z.boolean().optional(),
});
export const publicationsSchema = z.array(publicationSchema);

export const newsSchema = z.array(
  z.object({
    date: dateField,
    title: z.string(),
    description: z.string().optional(),
    type: z.string().optional(),
    link: z.string().optional(),
  })
);

export const talksSchema = z.array(
  z.object({
    title: z.string(),
    event: z.string().optional(),
    date: dateField.optional(),
    location: z.string().optional(),
    type: z.string().optional(),
    links: linksSchema.optional(),
    description: z.string().optional(),
  })
);

// Projects are intentionally generic: research projects, software, datasets,
// creative work, outreach, etc. Every field except `name` is optional.
export const projectsSchema = z.array(
  z.object({
    name: z.string(),
    description: z.string().optional(),
    role: z.string().optional(),
    links: linksSchema.optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    featured: z.boolean().optional(),
    year: z.union([z.number(), z.string()]).optional(),
  })
);

export const experienceSchema = z.array(
  z.object({
    role: z.string(),
    organization: z.string().optional(),
    period: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    highlights: z.array(z.string()).optional(),
    link: z.string().optional(),
  })
);

// Workshops & conferences (attended, presented at, or organized).
export const workshopsSchema = z.array(
  z.object({
    name: z.string(),
    host: z.string().optional(),
    date: dateField.optional(),
    location: z.string().optional(),
    role: z.string().optional(),
    description: z.string().optional(),
    link: z.string().optional(),
  })
);

export const awardsSchema = z.array(
  z.object({
    title: z.string(),
    organization: z.string().optional(),
    year: z.union([z.number(), z.string()]).optional(),
    type: z.string().optional(),
    description: z.string().optional(),
    link: z.string().optional(),
  })
);

// Volunteering & leadership (clubs, mentoring, organizing, community work).
export const volunteeringSchema = z.array(
  z.object({
    role: z.string(),
    organization: z.string().optional(),
    year: z.union([z.string(), z.number()]).optional(),
    location: z.string().optional(),
    description: z.string().optional(),
  })
);

// Photo gallery items.
export const gallerySchema = z.array(
  z.object({
    image: z.string(),
    caption: z.string().optional(),
    alt: z.string().optional(),
  })
);

export type Site = z.infer<typeof siteSchema>;
export type Theme = z.infer<typeof themeSchema>;
export type Home = z.infer<typeof homeSchema>;
export type About = z.infer<typeof aboutSchema>;
export type Contact = z.infer<typeof contactSchema>;
export type Publication = z.infer<typeof publicationSchema>;
export type News = z.infer<typeof newsSchema>[number];
export type Talk = z.infer<typeof talksSchema>[number];
export type Project = z.infer<typeof projectsSchema>[number];
export type Experience = z.infer<typeof experienceSchema>[number];
export type Workshop = z.infer<typeof workshopsSchema>[number];
export type Award = z.infer<typeof awardsSchema>[number];
export type Volunteering = z.infer<typeof volunteeringSchema>[number];
export type GalleryItem = z.infer<typeof gallerySchema>[number];
export type LinkMap = z.infer<typeof linksSchema>;
