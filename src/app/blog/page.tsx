"use client";

import { Reveal } from "@/components/animations/Reveal";
import { ArrowUpRight, Calendar, Clock, Search, Tag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const BLOG_POSTS = [
  {
    title: "Mastering Next.js 16: What's New?",
    excerpt: "Exploring the latest features in Next.js 16, from enhanced server actions to improved performance optimizations for modern web apps.",
    date: "May 12, 2026",
    readTime: "5 min read",
    author: "Priyank",
    category: "Development",
    slug: "mastering-nextjs-16",
    tags: ["Next.js", "React", "Web Dev"]
  },
  {
    title: "Modern State Management with Zustand",
    excerpt: "Why Zustand is becoming the go-to choice for React developers looking for a lightweight, scalable state management solution.",
    date: "Apr 28, 2026",
    readTime: "4 min read",
    author: "Priyank",
    category: "Architecture",
    slug: "state-management-zustand",
    tags: ["Zustand", "State Management", "React"]
  },
  {
    title: "Building Pixel-Perfect UIs with Tailwind CSS",
    excerpt: "A deep dive into advanced Tailwind techniques for creating highly responsive, maintainable, and visually stunning user interfaces.",
    date: "Apr 15, 2026",
    readTime: "6 min read",
    author: "Priyank",
    category: "Design",
    slug: "pixel-perfect-ui-tailwind",
    tags: ["Tailwind", "CSS", "UI/UX"]
  }
];

export default function BlogListingPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = BLOG_POSTS.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <main className="pt-32 pb-24 px-4 min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-grid-pattern opacity-10 -z-10"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] -z-10"></div>

      <div className="container mx-auto max-w-5xl">
        {/* Header Section */}
        <Reveal>
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-secondary font-terminal">#</span>
              <span className="text-primary font-terminal text-sm tracking-[0.3em] uppercase">The Knowledge Base</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter mb-6">
              Insights & <span className="text-gradient">Technical</span> Logs
            </h1>
            <p className="text-lg text-secondary max-w-2xl font-terminal opacity-80 leading-relaxed">
              Exploring the frontiers of web development, architecture, and system design. 
              Documentation of my journey through the digital landscape.
            </p>
          </div>
        </Reveal>

        {/* Search and Filters */}
        <Reveal delay={0.2}>
          <div className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/50 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="search_logs --query ..."
                className="w-full bg-surface border border-border rounded-lg py-3 pl-12 pr-4 text-sm font-terminal focus:outline-none focus:border-primary transition-all shadow-inner"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {["All", "Development", "Architecture", "Design"].map((cat) => (
                <button 
                  key={cat}
                  className="px-4 py-1.5 rounded-full border border-border text-xs font-terminal whitespace-nowrap hover:border-primary hover:text-primary transition-all"
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, idx) => (
            <Reveal key={idx} delay={0.1 * idx} direction="up">
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <article className="terminal-panel h-full flex flex-col overflow-hidden hover:border-primary/50 transition-all duration-500 bg-surface-card/50 backdrop-blur-sm">
                  <div className="relative aspect-video overflow-hidden bg-surface">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-[10px] font-terminal text-primary border border-primary/30 rounded uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-secondary/50 text-[10px] font-terminal mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-primary/50" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-primary/50" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-heading font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h3>

                    <p className="text-sm text-secondary font-terminal leading-relaxed mb-6 line-clamp-3 opacity-70 group-hover:opacity-100 transition-opacity">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto pt-6 border-t border-border/20 flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[9px] text-secondary/50 font-terminal">#{tag}</span>
                        ))}
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0" />
                    </div>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-24">
            <p className="text-secondary font-terminal">ERROR: NO_LOGS_FOUND_FOR_QUERY</p>
          </div>
        )}
      </div>
    </main>
  );
}
