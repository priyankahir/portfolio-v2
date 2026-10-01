import type { Metadata } from "next";
import { absoluteUrl, siteConfig, siteUrl } from "@/lib/site";

interface MetaOptions {
  title?: string;
  description?: string;
  /** Site-relative path, used for the canonical URL. */
  path?: string;
  /** Absolute or site-relative OG image. Defaults to the site-wide card. */
  image?: string;
  keywords?: string[];
  /**
   * The route has its own `opengraph-image` file (blog posts, case studies).
   * Its card is injected by Next with a hashed URL, so we must not set
   * `images` here — an explicit value would replace that card.
   */
  hasOwnOgImage?: boolean;
  noIndex?: boolean;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

/**
 * Builds a complete metadata object: canonical, OpenGraph, Twitter and robots.
 * Every route calls this so no page ships without a canonical URL.
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image,
  keywords,
  hasOwnOgImage = false,
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
  tags,
}: MetaOptions = {}): Metadata {
  const resolvedTitle = resolveTitle(title);
  const url = absoluteUrl(path);
  const summary = clampDescription(description);

  /**
   * Every page needs an og:image. Metadata objects merge shallowly, so a page's
   * `openGraph` replaces the inherited one — root card included — and the
   * default has to be set here. Routes with their own `opengraph-image` file
   * opt out via `hasOwnOgImage` (verified in the build output: an explicit
   * value here would replace their generated card).
   */
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : absoluteUrl(image)
    : hasOwnOgImage
      ? undefined
      : absoluteUrl("/opengraph-image");

  return {
    metadataBase: new URL(siteUrl),
    title: resolvedTitle,
    description: summary,
    applicationName: siteConfig.name,
    category: "technology",
    referrer: "origin-when-cross-origin",
    keywords: [...siteConfig.keywords, ...(keywords ?? [])],
    authors: [{ name: siteConfig.name, url: siteUrl }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": [
          { url: absoluteUrl("/rss.xml"), title: `${siteConfig.name} — Blog` },
        ],
        // llms.txt convention: a plain-text site summary for AI assistants.
        "text/plain": [{ url: absoluteUrl("/llms.txt"), title: "LLM summary" }],
      },
    },
    openGraph: {
      type: type === "profile" ? "profile" : type,
      title: resolvedTitle,
      description: summary,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      ...(ogImage && {
        images: [{ url: ogImage, width: 1200, height: 630, alt: resolvedTitle }],
      }),
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: [siteUrl],
        tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: summary,
      // No twitter:image on purpose: X falls back to og:image, which keeps
      // each post's own generated card instead of forcing the site-wide one.
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    formatDetection: { email: false, address: false, telephone: false },
    verification: buildVerification(),
  };
}

/** Search results show ~60 characters of a title; drop the name suffix when it would push past that. */
const MAX_TITLE = 65;

function resolveTitle(title?: string): string {
  if (!title) return siteConfig.title;
  const withName = `${title} | ${siteConfig.name}`;
  return withName.length <= MAX_TITLE ? withName : title;
}

/** Search results truncate descriptions around 160 characters; cut at a word boundary instead. */
const MAX_DESCRIPTION = 160;

function clampDescription(text: string): string {
  if (text.length <= MAX_DESCRIPTION) return text;
  const cut = text.slice(0, MAX_DESCRIPTION - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:—-]+$/, "")}…`;
}

/**
 * Search-console ownership tokens, read from the environment:
 * GOOGLE_SITE_VERIFICATION (Google Search Console) and
 * BING_SITE_VERIFICATION (Bing Webmaster Tools, emitted as `msvalidate.01`).
 */
function buildVerification(): Metadata["verification"] | undefined {
  const google = process.env.GOOGLE_SITE_VERIFICATION;
  const bing = process.env.BING_SITE_VERIFICATION;
  if (!google && !bing) return undefined;
  return {
    ...(google && { google }),
    ...(bing && { other: { "msvalidate.01": bing } }),
  };
}
