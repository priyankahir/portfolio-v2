import { MetadataRoute } from "next";
import { developerDetails } from "@/data/developer";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${developerDetails.seo.url}/sitemap.xml`,
  };
}
