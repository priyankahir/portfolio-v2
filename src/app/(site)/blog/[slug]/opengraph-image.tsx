import { notFound } from "next/navigation";
import { getPostBySlug, posts } from "@/data/posts";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Article";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return renderOgImage({
    eyebrow: `${post.category} · ${post.readingMinutes} min read`,
    title: post.title,
    subtitle: post.excerpt,
    chips: post.tags,
  });
}
