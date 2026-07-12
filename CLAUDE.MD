# Nathan Ansel — Technical Portfolio

## Project Overview
A personal technical portfolio site replacing a previous Notion-API-based build (via `nextjs-notion-starter-kit`). Goal: zero external CMS/API dependency — all content lives as files in this repo, fully version-controlled and easy to hand-edit.

## Tech Stack
- **Next.js** (App Router) + **React**
- **MDX** for content pages (project/experience write-ups) — Markdown + embeddable React components
- **next-mdx-remote** (`/rsc` entrypoint) compiles `.mdx` content that's stored as data in `content/projects/`, not as route files — rendered via `<MDXRemote>` in `app/projects/[slug]/page.tsx`
- **Tailwind CSS** (v4) for styling, plus **@tailwindcss/typography** for the `prose` classes that style rendered MDX body content
- **gray-matter** for frontmatter parsing
- **react-icons** for the floating social icon buttons (not `lucide-react` — it dropped brand/logo icons like GitHub/LinkedIn)
- **remark-math** + **rehype-katex** (+ `katex` for the stylesheet) for LaTeX math rendering in MDX body content — see "Math Rendering" below
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
draft: true # optional — see Draft Workflow below
---
```

Body content below the frontmatter is normal MDX — headings, paragraphs, and the custom components below. Standard markdown works as expected: `> blockquote`, `**bold**`, `*italic*`, `***bold italic***`, and raw inline HTML/JSX (e.g. `<mark>highlighted</mark>`) all render normally through the `prose` typography styles.

### Draft Workflow
Add `draft: true` to a project's frontmatter while you're still writing it:
- **`npm run dev`**: draft projects appear normally in the grid and at their URL, with a small "Draft" badge, so you can preview your work.
- **`npm run build` / production**: draft projects are excluded from the grid, excluded from `generateStaticParams`, and their route 404s even if requested directly.

Delete the `draft` line (or set it to `false`) when ready to publish — no other changes needed. See `lib/projects.ts` (`SHOW_DRAFTS`).

## Reusable MDX Components

Build these once, then use them freely inside any project `.mdx` file:

- `<ProjectImage src="" alt="" caption="" />` — responsive, optimized image with optional caption. `caption` accepts plain text or a JSX expression (e.g. `caption={<>Source: <a href="...">Wikipedia</a></>}`) if you need a link inside it.
- `<ImageGrid images={[{ src, alt, caption? }, ...]} columns={2|3} />` — side-by-side images/collage (e.g. before/after, multi-panel figures). Each cell uses `object-contain` (never crops) inside a `not-prose` wrapper.
- `<PdfEmbed src="" title="" />` — embedded PDF viewer with a "Download / Open in new tab" fallback link
- `<VideoEmbed src="" />` — supports both self-hosted video files and YouTube/Vimeo embed URLs
- `<LinkCard href="" title="" description="" />` — slim Notion-style bookmark card (not a bare `<a>` tag). Automatically scrapes the target URL's Open Graph image at **build time** and shows it as a thumbnail — no image prop needed. Renders with no thumbnail (not a blank placeholder box) if the target has no `og:image`/`twitter:image`, or 404s/errors.
- `<TagPill tag="" />` — used both on cards and inside project pages if referencing specific tools inline; color is a deterministic hash per tag (`lib/tag-colors.ts`), so the same tag always gets the same pastel color

Register these as the MDX custom components mapping (`lib/mdx-components.tsx`) so they can be used directly inside `.mdx` files without manual imports each time.

### Implementation Notes (read before adding a new MDX component)
- **JS-expression props require `blockJS: false`.** `next-mdx-remote` strips *any* `{ }` JSX-expression attribute (arrays, objects, numbers — not plain string literals) by default, as a security guard against untrusted CMS content. Since every `.mdx` file here is self-authored and checked into this repo (never third-party content), that guard is disabled via `options={{ blockJS: false }}` on `<MDXRemote>` in `app/projects/[slug]/page.tsx`. This is already project-wide — no action needed unless you're debugging a component whose array/object/number prop is mysteriously arriving as `undefined`.
- **Don't use MDX-level `export const` to build a prop value.** Top-level `export`/`import` statements in `.mdx` bodies are stripped separately (a different opt-in, `useDynamicImport`, which isn't enabled). Write array/object literals inline in the JSX attribute instead.
- **Any component using `next/image fill` inside an `overflow-hidden` box must add the `not-prose` class to its wrapper.** Tailwind Typography's `.prose img` rule applies `margin-top`/`margin-bottom` to every image in the article. That margin conflicts with `fill`'s absolute positioning (`inset: 0; height: 100%`), pushing the image past the bottom of its box — and since the box clips overflow, it looks like the image is being cropped. `not-prose` opts the whole subtree out of Typography's styling. (`ImageGrid` already does this; `ProjectImage` doesn't need it since it doesn't use `fill`.)

## Math Rendering

Equations in project write-ups (e.g. model formulations, objective functions) render as real typeset math via **KaTeX**, wired through `remark-math` + `rehype-katex` in the `MDXRemote` `options.mdxOptions` in `app/projects/[slug]/page.tsx`, with `katex/dist/katex.min.css` imported once in `app/layout.tsx`.

- **Inline math**: `$x_{fgi}$` → $x_{fgi}$
- **Display math**: a `$$...$$` block on its own lines (blank line before/after) renders as a centered equation block.
- **Do not** write raw LaTeX braces (`{`, `}`) outside of `$...$`/`$$...$$` delimiters or a code span/fence — MDX's JSX-expression parser treats a bare `{` as the start of a JS expression and will throw an acorn parse error. Once wrapped in `$`/`$$`, remark-math's syntax extension claims the span before MDX's JSX extension sees the braces inside it, so standard LaTeX (`\{`, `_{...}`, `\text{...}`, etc.) works fine.
- Previously this repo used ` ```math ` fenced code blocks as a stand-in for equations (they preserved the LaTeX source but rendered as plain monospace text, not real math) — that convention is superseded. Use `$...$`/`$$...$$` for all new equations; existing content has been migrated.

## Folder Layout

```
/app
  /page.tsx                # Home/About
  /layout.tsx              # root layout — mounts FloatingSocialBar on every page
  /projects/[slug]/page.tsx
/content
  /projects
    urban-resilience-fragmentation.mdx
    crums.mdx
    ...
/components
  ProjectCard.tsx
  ProjectImage.tsx
  ImageGrid.tsx
  PdfEmbed.tsx
  VideoEmbed.tsx
  LinkCard.tsx
  TagPill.tsx
  FloatingSocialBar.tsx
  ProfilePicture.tsx
/lib
  projects.ts              # scans content/projects/*.mdx, frontmatter parsing, draft filtering
  mdx-components.tsx       # custom component -> MDX tag mapping, passed to <MDXRemote>
  social-links.ts          # shared LinkedIn/GitHub/Email links (bio row + floating bar)
  tag-colors.ts            # deterministic pastel color per tag
  og-image.ts              # build-time Open Graph image scraper used by LinkCard
/public
  profile.jpg               # About Me profile picture
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
- Multi-image layouts (side-by-side figures, before/after, collages): use `<ImageGrid>` rather than hand-rolling a grid `<div>` around multiple `<ProjectImage>`s — it handles consistent cell sizing/gutters without double margins

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run lint` — lint check before commits

## Constraints
- No Notion, no external content APIs
- No hardcoded project data in components — everything must be driven by the MDX files in `content/projects/`
- Keep components small and composable; prefer editing content over editing components once the system is built
- `<LinkCard>` fetches each target URL's HTML at **build time** to scrape its Open Graph image (`lib/og-image.ts`) — this means `npm run build` needs network access to complete promptly (it fails soft/blank on timeout, not hard), and a preview image is only as fresh as the last rebuild
- Image assets: JPG/PNG for photos, screenshots, and figures; reserve SVG for true vector art (logos, hand-drawn diagrams, matplotlib `.svg` exports) — don't convert photos/screenshots to SVG