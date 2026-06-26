# Academic Website Template

A ready-to-use academic website. **Fork it, edit a few text files, and publish your own site** on GitHub Pages. No coding.

## Quick start

1. Click **Fork** (top right of this page) to copy this repo to your account.
2. Edit the files in `content/` (your name, bio, papers, etc.).
3. Turn on GitHub Pages so it goes live (see [Put it online](#put-it-online-github-pages)).

Everything you change lives in the `content/` folder. You never touch `src/`.

---

## Run it on your computer (optional)

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install      # do this once
npm run dev      # start preview at http://localhost:4321
```

Open the link. Edit a file in `content/`. Save. The page updates by itself.

Stop the preview with `Ctrl+C`.

---

## Edit your content

Open the `content/` folder. Edit these files:

| File | What it holds |
|------|----------------|
| `site.yml` | Name, role, email, photo, CV, social links, the menu |
| `theme.yml` | Colors, font, light/dark |
| `home.yml` | Home page: greeting, interests, which blocks show |
| `about.yml` | Bio, education, coursework |
| `news.yml` | News & updates feed |
| `experience.yml` | Jobs and internships (with bullet points) |
| `volunteering.yml` | Volunteering & leadership |
| `awards.yml` | Awards and honors |
| `publications.yml` | Your papers |
| `talks.yml` | Talks and presentations |
| `workshops.yml` | Workshops and conferences |
| `projects.yml` | Projects (any kind, not just code) |
| `gallery.yml` | Photo gallery |
| `blog/*.md` | Blog posts |

Three rules:

1. Use spaces, not tabs.
2. Copy the shape of the examples already in the file.
3. If you break something, the build prints the exact file and field. Go fix it.

To put your name in bold on a paper, write it in `publications.yml` exactly as it
appears in `site.yml` (`profile.name`).

---

## Change the look

Edit `content/theme.yml`:

```yaml
preset: classic      # classic | midnight | warm | ocean
mode: system         # light | dark | system
accent: "#4f46e5"    # your main color (any hex)
radius: "14px"       # corner roundness
font:
  body: "Inter"      # any font from fonts.google.com
  heading: "Sora"
```

Pick a preset. Done. Change `accent` or `font` if you want.

---

## Add your photo, CV, and gallery images

Put the files in the `public/assets/` folder. Then point to them:

- Photo: in `site.yml`, set `photo: "assets/my-photo.jpg"`.
- CV: in `site.yml`, set `cv: "assets/my-cv.pdf"`.
- Gallery: drop images in `public/assets/gallery/`, then list them in `gallery.yml`.

(On GitHub you upload files with **Add file -> Upload files**.)

---

## Write a blog post

Make a new file in `content/blog/`, for example `content/blog/hello.md`:

```markdown
---
title: "My First Post"
date: 2026-02-01
tags: [Notes]
---

Write here in plain text.

Math works: $E = mc^2$

Code works too:

print("hi")
```

The file name becomes the web address. Set `draft: true` to hide a post.

---

## Hide a section

- A menu page (Publications, Talks, Workshops, Projects, Gallery, Blog, Links):
  in `site.yml`, set `enabled: false` under that page.
- A home block (About, News, Experience, etc.): in `home.yml`, set it to `false`.
- Empty a file and that section hides itself.

---

## Put it online (GitHub Pages)

1. Click **Fork** (top right) to make your own copy.
2. Name the repo `YOUR-USERNAME.github.io` for your main site. (Any other name works too.)
3. In your repo: **Settings -> Pages -> Build and deployment -> Source -> GitHub Actions**.
4. Edit your files in `content/`. Commit the changes.
5. Wait about 1 minute. Your site is live at `https://YOUR-USERNAME.github.io`.

Every time you commit, the site rebuilds and updates. Watch it under the **Actions** tab.

If a build fails (red X), open it. It tells you which file to fix.

---

## Build it yourself (optional)

```bash
npm run build      # builds the finished site into dist/
npm run preview    # view the built site
```

That is everything. Edit, commit, done.
