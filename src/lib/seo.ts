import type { Metadata } from "next";
import { absoluteUrl, siteConfig, siteUrl } from "@/lib/site";

interface MetaOptions {
  title?: string;
  description?: string;
  /** Site-relative path, used for the canonical URL. */
  path?: string;
  /** Absolute or site-relative OG image. Defaults to the generated route image. */
  image?: string;
  keywords?: string[];
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
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
  tags,
}: MetaOptions = {}): Metadata {
  const resolvedTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const url = absoluteUrl(path);

  /**
   * Only set images when the caller passes one explicitly. Routes with an
   * `opengraph-image` file get their card injected by Next at build time, and
   * those URLs carry a content hash we can't reconstruct here — setting
   * `images` ourselves would override them with a 404.
   */
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : absoluteUrl(image)
    : undefined;

  return {
    metadataBase: new URL(siteUrl),
    title: resolvedTitle,
    description,
    keywords: [...siteConfig.keywords, ...(keywords ?? [])],
    authors: [{ name: siteConfig.name, url: siteUrl }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
      canonical: url,
      types: { "application/rss+xml": absoluteUrl("/rss.xml") },
    },
    openGraph: {
      type: type === "profile" ? "profile" : type,
      title: resolvedTitle,
      description,
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
      description,
      ...(ogImage && { images: [ogImage] }),
      creator: siteConfig.twitterHandle,
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
  };
}
