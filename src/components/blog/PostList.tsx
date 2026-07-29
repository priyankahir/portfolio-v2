"use client";

import { useMemo, useState } from "react";
import { PostCard } from "@/components/blog/PostCard";
import { cn } from "@/lib/utils";
import type { Post } from "@/types";

const ALL = "All";

export function PostList({
  posts,
  categories,
}: {
  posts: Post[];
  categories: string[];
}) {
  const [active, setActive] = useState(ALL);
  const filters = useMemo(() => [ALL, ...categories], [categories]);

  const visible = useMemo(
    () => (active === ALL ? posts : posts.filter((post) => post.category === active)),
    [posts, active]
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter articles by category"
        className="hide-scrollbar -mx-1 mb-10 flex gap-2 overflow-x-auto px-1 pb-1"
      >
        {filters.map((filter) => {
          const selected = filter === active;
          return (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(filter)}
              className={cn(
                "shrink-0 rounded-lg border px-3.5 py-2 font-mono text-xs transition-colors duration-200",
                selected
                  ? "border-line-strong bg-primary-soft text-primary"
                  : "border-line bg-surface text-muted hover:text-fg"
              )}
            >
              {filter}
              {filter !== ALL && (
                <span className="ml-1.5 text-faint">
                  {posts.filter((post) => post.category === filter).length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="panel p-10 text-center font-mono text-sm text-faint">
          No articles in this category yet.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((post) => (
            <PostCard key={post.slug} post={post} titleAs="h2" />
          ))}
        </div>
      )}
    </div>
  );
}
