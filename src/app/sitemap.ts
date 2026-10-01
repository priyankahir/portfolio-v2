import type { MetadataRoute } from "next";
import { posts } from "@/data/posts";
import { projects } from "@/data/projects";
import { absoluteUrl, contentUpdatedAt } from "@/lib/site";

/**
 * Static routes plus one entry per project and article.
 * Adding content to `src/data` puts it in the sitemap automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // A fixed content date, not build time: crawlers trust lastmod only when it is honest.
  const contentDate = new Date(contentUpdatedAt);

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { path: "/", priority: 1, changeFrequency: "weekly" },
      { path: "/about", priority: 0.9, changeFrequency: "monthly" },
      { path: "/projects", priority: 0.9, changeFrequency: "monthly" },
      { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
      { path: "/resume", priority: 0.8, changeFrequency: "monthly" },
      { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
    ] as const
  ).map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: contentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: contentDate,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
