<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Portfolio Website Development Guidelines

## Main Goals
- Maximum SEO optimization & Fast rendering performance
- Smooth animations & Lightweight architecture
- Modern UI/UX & Excellent Core Web Vitals
- Scalable folder structure (src/app based) & Mobile-first responsiveness

## Core Development Rules
ALWAYS prioritize: SEO, Performance, Accessibility, Semantic HTML, Clean architecture, Scalability

## Tech Stack
Next.js 16+, TypeScript, Tailwind CSS, Framer Motion, App Router, Server Components.
Required packages: framer-motion, clsx, tailwind-merge, lucide-react. Optional: zustand.

## Folder Structure
Use `src/` directory with: `app/`, `components/` (common, layout, home, projects, animations, ui), `lib/`, `hooks/`, `services/`, `constants/`, `types/`, `data/`, `styles/`.
Assets in `public/images/`, `public/icons/`, `public/og/`.

## Component & Rendering Strategy
- Use Server Components by default; minimize `"use client"`.
- Use client components ONLY for animations, sliders, forms, interactive UI.
- Keep components reusable, isolated, maintainable. Avoid giant components or deep nesting.
- Semantic HTML tags required (`header`, `main`, `section`, etc.).

## SEO & Performance Standards
- Every page must include title, meta description, canonical URL, OpenGraph, Twitter metadata.
- URLs must be short, readable, lowercase, keyword-friendly.
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms.
- Optimize images with `next/image` (priority for hero, optimized formats).
- Optimize fonts with `next/font` (no CDN imports).

## Animation Guidelines (Framer Motion)
- Use only for hero reveals, section transitions, hover effects, card animations.
- Prefer opacity, transform, translate, scale. Avoid layout-shifting animations.
- Animation components in `src/components/animations/` (FadeUp.tsx, SlideIn.tsx, Stagger.tsx).

## Final Golden Rules
ALWAYS optimize rendering, minimize JS, and maintain accessibility. NEVER sacrifice performance for visuals or overuse client rendering.
