import { profile } from "@/data/profile";

/**
 * Canonical origin for the deployed site.
 * Set `NEXT_PUBLIC_SITE_URL` in the environment (Vercel sets it per-deployment)
 * so canonical URLs, sitemaps and OG image paths resolve correctly.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://priyankbaldaniya.vercel.app"
).replace(/\/$/, "");

export const siteConfig = {
  url: siteUrl,
  name: profile.name,
  shortName: "Priyank B.",
  // Kept under ~60 characters so search results don't truncate it.
  title: `${profile.name} — ${profile.role} | React & Next.js`,
  description:
    "Priyank Baldaniya is a MERN stack developer in Ahmedabad, India, building production SaaS apps with MongoDB, Express, React, Node.js and Next.js.",
  locale: "en_IN",
  language: "en",
  themeColor: {
    light: "#f7f8fa",
    dark: "#07090c",
  },
  keywords: [
    "Priyank Baldaniya",
    "MERN stack developer",
    "full stack developer",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "MERN stack developer Ahmedabad",
    "full stack developer India",
    "portfolio",
  ],
} as const;

/**
 * Last meaningful content update for static pages and case studies. Used as
 * `lastModified` in the sitemap instead of the build time, so crawlers only
 * see a change when the content actually changed. Bump it when you edit them.
 */
export const contentUpdatedAt = "2026-10-10";

/** Builds an absolute URL from a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
