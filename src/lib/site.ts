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
  title: `${profile.name} — ${profile.headline}`,
  description:
    "MERN stack developer with 1.7+ years building production web applications in React, Next.js, Node.js, Express and MongoDB across EHS, AI, fintech and trading. Available for full-stack roles.",
  locale: "en_IN",
  language: "en",
  themeColor: {
    light: "#f7f7f5",
    dark: "#07090c",
  },
  keywords: [
    "Priyank Baldaniya",
    "MERN stack developer",
    "full stack developer",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "MongoDB developer",
    "Express.js developer",
    "TypeScript developer",
    "MERN developer Ahmedabad",
    "full stack developer India",
    "AI interface developer",
    "portfolio",
  ],
  twitterHandle: "@priyankbaldaniya",
} as const;

/** Builds an absolute URL from a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
