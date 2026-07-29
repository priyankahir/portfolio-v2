import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostBody } from "@/components/blog/PostBody";
import { PostCard } from "@/components/blog/PostCard";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { JsonLd } from "@/components/ui/JsonLd";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Section } from "@/components/ui/Section";
import { Tag, TagList } from "@/components/ui/Tag";
import { getPostBySlug, posts, sortedPosts } from "@/data/posts";
import { profile } from "@/data/profile";
import { blogPostingSchema, breadcrumbSchema, jsonLdGraph } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return buildMetadata({ title: "Article not found", noIndex: true });
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
    tags: post.tags,
    keywords: post.tags,
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  // Prefer same-category articles, then fill from the rest, newest first.
  const related = [
    ...sortedPosts.filter(
      (entry) => entry.slug !== post.slug && entry.category === post.category
    ),
    ...sortedPosts.filter(
      (entry) => entry.slug !== post.slug && entry.category !== post.category
    ),
  ].slice(0, 3);

  return (
    <>
      <ScrollProgress />
      <JsonLd
        data={jsonLdGraph(
          blogPostingSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ])
        )}
      />

      <article>
        <header className="relative overflow-hidden border-b border-line pt-32 pb-12 md:pt-40 md:pb-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="bg-grid mask-fade-y absolute inset-0 opacity-60" />
            <div className="absolute -top-32 left-1/2 h-[300px] w-[min(90vw,620px)] -translate-x-1/2 rounded-full bg-primary/10 blur-[110px]" />
          </div>

          <div className="container-page">
            <nav aria-label="Breadcrumb" className="mb-8">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 font-mono text-xs text-faint transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                All articles
              </Link>
            </nav>

            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <Tag tone="primary">{post.category}</Tag>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-faint">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  {post.readingMinutes} min read
                </span>
                <time
                  dateTime={post.publishedAt}
                  className="font-mono text-[11px] text-faint"
                >
                  {formatDate(post.publishedAt)}
                </time>
              </div>

              <h1 className="mt-6 text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl md:text-[3rem]">
                {post.title}
              </h1>

              <p className="mt-5 text-lg leading-relaxed text-muted">{post.excerpt}</p>

              <div className="mt-8 flex items-center gap-3 border-t border-line pt-6">
                <span
                  aria-hidden="true"
                  className="grid h-9 w-9 place-items-center rounded-full bg-primary text-sm font-bold text-on-primary"
                >
                  P
                </span>
                <span className="text-sm">
                  <span className="block font-medium">{profile.name}</span>
                  <span className="block font-mono text-[11px] text-faint">
                    {profile.role}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </header>

        <Section className="py-14 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-16">
            <div className="min-w-0 max-w-[46rem]">
              <PostBody blocks={post.body} />

              <footer className="mt-14 border-t border-line pt-8">
                <h2 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-faint">
                  Tagged
                </h2>
                <TagList items={post.tags} />
              </footer>
            </div>

            <TableOfContents blocks={post.body} />
          </div>
        </Section>

        <Section tinted>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold">Keep reading</h2>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              All articles
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {related.map((entry) => (
              <PostCard key={entry.slug} post={entry} titleAs="h3" />
            ))}
          </div>

          <div className="panel mt-10 flex flex-col items-start gap-5 p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold">Need this built, not just written about?</h3>
              <p className="mt-1.5 text-sm text-muted">
                I&apos;m open to MERN stack roles and freelance work.
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex h-11 shrink-0 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-on-primary transition-all hover:brightness-110"
            >
              Work with me
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Section>
      </article>
    </>
  );
}
