import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Blog posts are authored as Markdown files in content/blog/*.md with YAML
 * frontmatter. They render through Astro's Markdown pipeline (math + code
 * highlighting configured in astro.config.mjs). The frontmatter is validated
 * here, so a malformed post fails the build with a clear message.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.union([z.date(), z.string()]),
    excerpt: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    featured: z.boolean().optional().default(false),
    readingTime: z.number().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog };
