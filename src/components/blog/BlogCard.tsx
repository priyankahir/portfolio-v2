"use client";

import { Reveal } from "@/components/animations/Reveal";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@/data/blog";

interface BlogCardProps {
  post: any;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  // Map Sanity fields to frontend display with fallbacks
  const title = post?.title || "Untitled Post";
  const slug = post?.slug || "#";
  const excerpt = post?.excerpt || "No excerpt available for this post.";
  const category = post?.category || "Development"; // Fallback as category is not in schema
  const readTime = post?.readTime || "5 min read"; // Fallback
  
  // Format date safely
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recent";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  const date = formatDate(post?.publishedAt);

  return (
    <Reveal delay={index * 0.1} direction="up">
      <div className="group terminal-panel h-full flex flex-col p-6 hover:border-primary/50 transition-all duration-300 relative overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-12 h-12 bg-primary/5 rounded-bl-3xl -z-10 group-hover:bg-primary/20 transition-all"></div>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-terminal px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">
            {category}
          </span>
          <div className="flex items-center gap-2 text-secondary/50">
            <Clock className="w-3 h-3" />
            <span className="text-[10px] font-terminal">{readTime}</span>
          </div>
        </div>

        <h3 className="text-xl font-heading font-bold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-secondary font-terminal leading-relaxed mb-8 line-clamp-3">
          {excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between pt-6 border-t border-border/50">
          <div className="flex items-center gap-2 text-secondary/70">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-xs font-terminal">{date}</span>
          </div>
          
          <Link 
            href={`/blog/${slug}`} 
            className="inline-flex items-center gap-1 text-primary font-bold text-xs font-terminal group-hover:gap-2 transition-all"
          >
            READ_MORE
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
