import { PostList } from "@/components/blog/PostList";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { postCategories, sortedPosts } from "@/data/posts";
import {
  breadcrumbSchema,
  collectionPageSchema,
  jsonLdGraph,
} from "@/lib/json-ld";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Notes on React architecture, TanStack Query and Zustand, AI/RAG interfaces, schema-driven forms and Core Web Vitals for data-heavy dashboards.",
  path: "/blog",
  keywords: [
    "React blog",
    "Next.js articles",
    "full stack architecture writing",
    "TanStack Query guide",
  ],
});

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
          collectionPageSchema({
            name: "Blog",
            description:
              "Articles on full-stack architecture, AI interfaces and web performance.",
            path: "/blog",
            items: sortedPosts.map((post) => ({
              name: post.title,
              path: `/blog/${post.slug}`,
            })),
          })
        )}
      />

      <PageHeader
        command="ls -lt ~/notes"
        title="Writing"
        description="Things I worked out on the job and wrote down so I'd remember them — state architecture, AI interfaces, dynamic forms, and why dashboard performance is its own problem."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />

      <Section>
        <PostList posts={sortedPosts} categories={postCategories} />
      </Section>
    </>
  );
}
