import { ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Post } from "@/types";

export function PostCard({
  post,
  className,
  featured = false,
  /** h2 on the blog index, h3 inside a section that already has an h2. */
  titleAs: Title = "h3",
}: {
  post: Post;
  className?: string;
  featured?: boolean;
  titleAs?: "h2" | "h3";
}) {
  return (
    <article
      className={cn(
        "panel panel-interactive group relative flex h-full flex-col p-6",
        featured && "md:p-8",
        className
      )}
    >
      <header className="flex items-center gap-3">
        <Tag tone="primary">{post.category}</Tag>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-faint">
          <Clock className="h-3 w-3" aria-hidden="true" />
          {post.readingMinutes} min
        </span>
      </header>

      <Title
        className={cn(
          "mt-4 font-semibold leading-snug",
          featured ? "text-2xl" : "text-lg"
        )}
      >
        <Link
          href={`/blog/${post.slug}`}
          className="after:absolute after:inset-0 after:content-['']"
        >
          {post.title}
        </Link>
      </Title>

      <p
        className={cn(
          "mt-3 flex-1 leading-relaxed text-muted",
          featured ? "text-[15px]" : "text-sm"
        )}
      >
        {post.excerpt}
      </p>

      <footer className="mt-6 flex items-center justify-between border-t border-line pt-4">
        <time
          dateTime={post.publishedAt}
          className="font-mono text-[11px] text-faint"
        >
          {formatDate(post.publishedAt)}
        </time>
        <span className="inline-flex items-center gap-1 font-mono text-xs text-primary">
          Read
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </footer>
    </article>
  );
}
