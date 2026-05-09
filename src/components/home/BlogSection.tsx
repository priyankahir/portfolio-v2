"use client";

import { Reveal } from "@/components/animations/Reveal";
import { ArrowUpRight, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";

const BLOG_POSTS = [
  {
    title: "Mastering Next.js 16: What's New?",
    excerpt: "Exploring the latest features in Next.js 16, from enhanced server actions to improved performance optimizations for modern web apps.",
    date: "May 12, 2026",
    readTime: "5 min read",
    author: "Priyank",
    category: "Development",
    slug: "mastering-nextjs-16"
  },
  {
    title: "Modern State Management with Zustand",
    excerpt: "Why Zustand is becoming the go-to choice for React developers looking for a lightweight, scalable state management solution.",
    date: "Apr 28, 2026",
    readTime: "4 min read",
    author: "Priyank",
    category: "Architecture",
    slug: "state-management-zustand"
  },
  {
    title: "Building Pixel-Perfect UIs with Tailwind CSS",
    excerpt: "A deep dive into advanced Tailwind techniques for creating highly responsive, maintainable, and visually stunning user interfaces.",
    date: "Apr 15, 2026",
    readTime: "6 min read",
    author: "Priyank",
    category: "Design",
    slug: "pixel-perfect-ui-tailwind"
  }
];

export function BlogSection() {
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
          {BLOG_POSTS.map((post, idx) => (
            <Reveal key={idx} delay={idx * 0.1} direction="up">
              <div className="group terminal-panel h-full flex flex-col p-6 hover:border-primary/50 transition-all duration-300 relative overflow-hidden">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-primary/5 rounded-bl-3xl -z-10 group-hover:bg-primary/20 transition-all"></div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-terminal px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2 text-secondary/50">
                    <Clock className="w-3 h-3" />
                    <span className="text-[10px] font-terminal">{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-heading font-bold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-sm text-secondary font-terminal leading-relaxed mb-8 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-border/50">
                  <div className="flex items-center gap-2 text-secondary/70">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-xs font-terminal">{post.date}</span>
                  </div>
                  
                  <Link 
                    href={`/blog/${post.slug}`} 
                    className="inline-flex items-center gap-1 text-primary font-bold text-xs font-terminal group-hover:gap-2 transition-all"
                  >
                    READ_MORE
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
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
