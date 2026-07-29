# priyank.dev — portfolio

Portfolio site for Priyank Baldaniya, frontend developer.
Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion.

All content is static and lives in `src/data` — there is no CMS and no runtime
data fetching. Every page except the contact API is prerendered at build time.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

```bash
npm run build && npm start   # production build
npm run lint                 # eslint, zero warnings allowed
npx tsc --noEmit             # typecheck
```

## Editing content

Everything a visitor reads comes from one directory. Nothing else needs touching.

| File | What it holds |
| --- | --- |
| `src/data/profile.ts` | Name, role, tagline, bio, contact details, socials, headline stats |
| `src/data/experience.ts` | Work history and education |
| `src/data/projects.ts` | Project case studies — each one generates `/projects/<slug>` |
| `src/data/skills.ts` | Skill groups and the daily toolbox |
| `src/data/services.ts` | Services, working process, principles, FAQ |
| `src/data/posts.ts` | Blog articles — each one generates `/blog/<slug>` |
| `src/data/navigation.ts` | Header and footer links |

Every file is typed against `src/types/index.ts`, so a malformed entry fails the
build rather than the page. Adding a project or post automatically adds it to the
sitemap, the RSS feed, the ⌘K palette and its own generated OG image — no other
edits required.

## Architecture

```
src/
  app/               routes; (site) group shares the chrome
    api/contact/     contact form handler (validation + rate limit + honeypot)
    opengraph-image  generated social cards, one per route
    sitemap · robots · manifest · rss.xml
  components/
    animations/      Reveal, Stagger, TypeLine, Counter
    blog/  contact/  home/  layout/  projects/  ui/
  data/              all site content (see above)
  hooks/             useScrollSpy, useScrolled, useMediaQuery, useMounted, …
  lib/               site config, metadata builder, JSON-LD, OG renderer, utils
  types/             content contracts
```

Server Components are the default. `"use client"` appears only where there's real
interactivity: the navbar, command palette, terminal, contact form, theme toggle
and the four animation primitives.

## SEO

- Per-route canonical URL, OpenGraph and Twitter metadata via `src/lib/seo.ts`
- JSON-LD graph (`Person`, `WebSite`, `ProfilePage`, `BlogPosting`, `CreativeWork`,
  `BreadcrumbList`, `FAQPage`) via `src/lib/json-ld.ts`
- Generated 1200×630 OG image per page, project and article
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, `rss.xml`
- Semantic landmarks, skip link, visible focus rings, `prefers-reduced-motion`
  honoured globally

Set `NEXT_PUBLIC_SITE_URL` before deploying — canonical URLs and the sitemap are
built from it.

## Contact form

`POST /api/contact` validates input, rejects bot submissions via a honeypot field,
rate-limits to 3 messages per minute per IP, and sends through Gmail SMTP using
`EMAIL_USER` / `EMAIL_PASS`. Without those variables the endpoint returns a 503 and
the UI tells the visitor to email directly, so the site still works unconfigured.

## Theming

Light and dark are both first-class. `next-themes` follows the OS on first visit
and stores an explicit choice after that. All colours are CSS custom properties in
`src/app/globals.css`, mapped into Tailwind's theme — change them in one place and
the whole site follows.
