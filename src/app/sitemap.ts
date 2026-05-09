import { MetadataRoute } from "next";
import { developerDetails } from "@/data/developer";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/projects", "/blogs", "/contact", "/resume"].map(
    (route) => ({
      url: `${developerDetails.seo.url}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })
  );

  return [...routes];
}
