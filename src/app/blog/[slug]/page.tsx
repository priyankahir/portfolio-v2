"use client";

import { Reveal } from "@/components/animations/Reveal";
import { BLOG_POSTS } from "@/data/blog";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

export default function BlogPostDetail() {
  const params = useParams();
  const slug = params.slug as string;
  
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen py-24 px-4 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 -z-10 bg-[radial-gradient(#00FF41_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      <div className="container mx-auto max-w-3xl relative">
        <Reveal>
          <div className="mb-12">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors font-terminal text-sm mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              cd ..
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] font-terminal px-3 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-secondary/60 text-[10px] font-terminal">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </div>
              <div className="flex items-center gap-2 text-secondary/60 text-[10px] font-terminal">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-8 leading-tight tracking-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-between py-6 border-y border-border/50 mb-12">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{post.author}</p>
                  <p className="text-[10px] text-secondary font-terminal uppercase tracking-tighter">Frontend Developer</p>
                </div>
              </div>
              
              <button className="p-2 rounded-lg border border-border hover:border-primary/50 text-secondary hover:text-primary transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="prose prose-invert prose-primary max-w-none font-terminal text-secondary leading-relaxed">
            <div 
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-24 p-8 terminal-panel relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-all"></div>
            <h3 className="text-xl font-heading font-bold mb-4 text-primary">Enjoyed this article?</h3>
            <p className="text-secondary font-terminal text-sm mb-6 max-w-md">
              I write about modern web development, performance, and architecture. 
              Follow me for more insights into the frontend ecosystem.
            </p>
            <div className="flex gap-4">
              <Link 
                href="/blog" 
                className="px-6 py-2 border border-border rounded text-xs font-terminal hover:border-primary hover:text-primary transition-all interactive"
              >
                [ BACK_TO_LOGS ]
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

      <style jsx global>{`
        .blog-content h2 {
          color: white;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.875rem;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          letter-spacing: -0.025em;
        }
        .blog-content h3 {
          color: var(--primary);
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 1.5rem;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .blog-content p {
          margin-bottom: 1.75rem;
          font-size: 1.125rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
        }
        .blog-content code {
          color: var(--primary);
          background: rgba(0, 255, 65, 0.1);
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.9rem;
          font-family: var(--font-terminal);
        }
        .blog-content .terminal-panel {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(0, 255, 65, 0.1);
          border-radius: 0.5rem;
          margin: 2.5rem 0;
        }
        .blog-content pre {
          background: transparent !important;
          margin: 0 !important;
          padding: 0 !important;
        }
      `}</style>
    </main>
  );
}
