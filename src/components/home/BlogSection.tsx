"use client";

import { Reveal } from "@/components/animations/Reveal";
import Link from "next/link";
import { BlogCard } from "@/components/blog/BlogCard";

interface BlogSectionProps {
  blogs?: Record<string, unknown>[];
}

export function BlogSection({ blogs = [] }: BlogSectionProps) {
  // Show only the first 3 posts on the home page
  const featuredPosts = blogs.slice(0, 3);

  if (featuredPosts.length === 0) {
    return null; // Hide section if no blogs
  }

  return (
    <section id="blog" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <Reveal>
          <div className="flex items-center gap-2 mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-primary tracking-wide">
              <span className="text-secondary">#</span> read /var/log/blog.md
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/50 to-transparent ml-4"></div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post: any, idx) => {
            const slug = post?.slug || idx.toString();
            return (
              <BlogCard key={slug} post={post} index={idx} />
            );
          })}
        </div>
        
        <Reveal delay={0.4}>
          <div className="mt-16 text-center">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 px-8 py-3 border border-border rounded-lg text-secondary font-terminal hover:text-primary hover:border-primary transition-all interactive"
            >
              [ VIEW_ALL_POSTS ]
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
