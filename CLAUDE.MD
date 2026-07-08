# Nathan Ansel — Technical Portfolio

## Project Overview
A personal technical portfolio site replacing a previous Notion-API-based build (via `nextjs-notion-starter-kit`). Goal: zero external CMS/API dependency — all content lives as files in this repo, fully version-controlled and easy to hand-edit.

## Tech Stack
- **Next.js** (App Router) + **React**
- **MDX** for content pages (project/experience write-ups) — Markdown + embeddable React components
- **Tailwind CSS** for styling
- **gray-matter** or Next.js MDX frontmatter support for metadata parsing
- Deployment target: **Vercel** (static export where possible)

Do not reintroduce Notion, react-notion-x, or any third-party CMS API. All content must be local files.

## Site Structure

### Pages
1. **Home / About Me** (`/`)
   - Short bio/intro
   - Button row linking to: LinkedIn, GitHub, Email (mailto:)
   - Grid/list of project cards (see below)

2. **Project/Experience pages** (`/projects/[slug]`)
   - One MDX file per project/experience in `content/projects/`
   - Rendered via a shared `[slug]/page.tsx` route that loads the matching `.mdx` file

### Project Card (on homepage)
Each card is auto-generated from the frontmatter of its MDX file. Must show:
- Cover image
- Title
- Date range (e.g. "Sep 23 - Jun 24")
- Tag pills (tech stack / skills used, color-coded by category if easy — otherwise a neutral palette is fine)

Clicking a card navigates to the full project page.

## Content Schema (MDX Frontmatter)

Every file in `content/projects/*.mdx` must start with:

```yaml
---
title: "Strengthening Urban Resilience in the Age of Fragmentation"
slug: "urban-resilience-fragmentation"
dateStart: "2023-09"
dateEnd: "2024-06"
coverImage: "/projects/urban-resilience/cover.jpg"
tags: ["Python", "R", "Computer Vision", "Machine Learning", "geopandas", "selenium", "openpyxl", "transbigdata", "osmnx", "cv2", "scipy", "matplotlib", "seaborn"]
summary: "One-line description shown in card hover or meta tags."
---
```

Body content below the frontmatter is normal MDX — headings, paragraphs, and the custom components below.

## Reusable MDX Components

Build these once, then use them freely inside any project `.mdx` file:

- `<ProjectImage src="" alt="" caption="" />` — responsive, optimized image with optional caption
- `<PdfEmbed src="" title="" />` — embedded PDF viewer with a "Download / Open in new tab" fallback link
- `<VideoEmbed src="" />` — supports both self-hosted video files and YouTube/Vimeo embed URLs
- `<LinkCard href="" title="" description="" />` — styled external link card (not a bare `<a>` tag)
- `<TagPill tag="" />` — used both on cards and inside project pages if referencing specific tools inline

Register these as the MDX custom components mapping so they can be used directly inside `.mdx` files without manual imports each time.

## Folder Layout

```
/app
  /page.tsx                # Home/About
  /projects/[slug]/page.tsx
/content
  /projects
    urban-resilience-fragmentation.mdx
    crums.mdx
    ...
/components
  ProjectCard.tsx
  ProjectImage.tsx
  PdfEmbed.tsx
  VideoEmbed.tsx
  LinkCard.tsx
  TagPill.tsx
/public
  /projects
    /urban-resilience-fragmentation/cover.jpg
    /crums/report.pdf
    ...
```

## Editing Workflow (the whole point of this rebuild)
Adding a new project should require ONLY:
1. Drop media files into `public/projects/<slug>/`
2. Create `content/projects/<slug>.mdx` with frontmatter + body
3. No code changes needed — the homepage grid and routing pick it up automatically by scanning the `content/projects/` directory at build time

## Design Notes
- Clean, minimal, resume-adjacent aesthetic — this is a professional portfolio for data science / AI engineering job applications, not a flashy consumer product
- Tag pills should be visually similar to the reference screenshot: soft pastel backgrounds, rounded, small text
- Mobile-responsive is required — recruiters might view this on phones
- Tag pills: rectangular with subtle rounded corners (~4-6px radius), not fully rounded/pill-shaped
- Social links (LinkedIn/GitHub/Email): persistent floating circular icon buttons, fixed to the right side of the viewport, rendered in the root layout so they appear on every page, not just the homepage
- Profile picture: circular, placed in the About Me section near the intro text

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run lint` — lint check before commits

## Constraints
- No Notion, no external content APIs
- No hardcoded project data in components — everything must be driven by the MDX files in `content/projects/`
- Keep components small and composable; prefer editing content over editing components once the system is built