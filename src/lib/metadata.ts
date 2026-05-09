import { Metadata } from "next";
import { developerDetails } from "@/data/developer";

export function constructMetadata({
  title = developerDetails.seo.title,
  description = developerDetails.seo.description,
  image = "/og/og-image.jpg",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: developerDetails.seo.url,
      siteName: developerDetails.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@priyankbaldaniya", // Ensure matching twitter handle
    },
    icons,
    metadataBase: new URL(developerDetails.seo.url),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
