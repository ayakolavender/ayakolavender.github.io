// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import yaml from '@modyfi/vite-plugin-yaml';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// ---------------------------------------------------------------------------
// `base` and `site` are computed automatically by the GitHub Actions workflow
// (.github/workflows/deploy.yml) from your repository name, so you normally do
// NOT need to touch this file:
//   - user/org pages   (username.github.io)        -> base "/"
//   - project pages    (username.github.io/myrepo) -> base "/myrepo/"
// You can override them locally with BASE_PATH / SITE_URL env vars.
// ---------------------------------------------------------------------------
const base = process.env.BASE_PATH ?? '/';
const site = process.env.SITE_URL ?? 'https://example.github.io';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  // We use plain <img> tags + files in public/, not Astro's image optimizer,
  // so skip the optional `sharp` dependency entirely.
  image: { service: passthroughImageService() },
  vite: {
    plugins: [tailwindcss(), yaml()],
  },
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      // Dual themes: light + dark. We activate the dark variant via the `.dark`
      // class on <html> (see src/styles/global.css), matching the theme toggle.
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: false,
      wrap: true,
    },
  },
});
