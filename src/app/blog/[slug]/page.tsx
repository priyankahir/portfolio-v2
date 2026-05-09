"use client";

import { Reveal } from "@/components/animations/Reveal";
import { ArrowLeft, Calendar, Clock, Share2, Tag, User } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const BLOG_POSTS = [
  {
    title: "Mastering Next.js 16: What's New?",
    content: `
      <p>Next.js 16 marks a significant milestone in the evolution of React frameworks. This release focuses on developer experience, performance, and the maturity of the App Router architecture.</p>
      
      <h2>Server Actions Maturity</h2>
      <p>One of the most exciting updates is the stabilization of Server Actions. This allows developers to handle form submissions and data mutations directly within their components, reducing the need for boilerplate API routes.</p>
      
      <blockquote>"The boundary between client and server is becoming more fluid, yet more distinct in its responsibilities."</blockquote>
      
      <h2>Enhanced Performance</h2>
      <p>Under the hood, Next.js 16 introduces an optimized build process that reduces bundle sizes by up to 15%. The new caching mechanism is more intuitive, giving developers granular control over revalidation periods.</p>
      
      <pre><code>
export const revalidate = 3600; // revalidate every hour

export default async function Page() {
  const data = await fetch('...');
  return &lt;main&gt;...&lt;/main&gt;;
}
      </code></pre>
      
      <h2>Conclusion</h2>
      <p>Next.js 16 is not just an update; it's a refinement of the vision for a unified web development experience. Stay tuned for more deep dives into specific features.</p>
    `,
    date: "May 12, 2026",
    readTime: "5 min read",
    author: "Priyank Baldaniya",
    category: "Development",
    slug: "mastering-nextjs-16",
    tags: ["Next.js", "React", "Web Dev"]
  },
  // ... other posts would be here
];

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug) || BLOG_POSTS[0]; // Fallback for demo

  return (
    <main className="pt-32 pb-24 px-4 min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-grid-pattern opacity-5 opacity-10 -z-10"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px] -z-10"></div>

      <div className="container mx-auto max-w-3xl">
        {/* Back Link */}
        <Reveal>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors font-terminal text-sm mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            [ BACK_TO_LOGS ]
          </Link>
        </Reveal>

        {/* Post Metadata Header */}
        <article>
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-terminal rounded border border-primary/20 uppercase tracking-widest">
                {post.category}
              </span>
              <span className="h-[1px] w-8 bg-border"></span>
              <div className="flex items-center gap-4 text-secondary/50 text-[10px] font-terminal">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-8 leading-[1.1] tracking-tight">
              {post.title}
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex items-center justify-between py-6 border-y border-border/50 mb-12">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                  {post.author[0]}
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">{post.author}</div>
                  <div className="text-[10px] text-secondary/50 font-terminal uppercase tracking-tighter">Author / Systems Architect</div>
                </div>
              </div>
              <button className="p-2 hover:bg-surface rounded-full transition-colors text-secondary/50 hover:text-primary">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </Reveal>

          {/* Main Content Area */}
          <Reveal delay={0.4}>
            <div 
              className="prose prose-invert prose-primary max-w-none font-sans text-secondary leading-relaxed
                prose-headings:font-heading prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                prose-p:mb-6 prose-p:text-lg
                prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r
                prose-pre:bg-surface prose-pre:border prose-pre:border-border prose-pre:p-6
                prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </Reveal>

          {/* Footer Tags */}
          <Reveal delay={0.5}>
            <div className="mt-16 pt-8 border-t border-border/50 flex flex-wrap gap-3">
              {post.tags.map(tag => (
                <span 
                  key={tag} 
                  className="px-3 py-1.5 bg-surface border border-border rounded-lg text-xs font-terminal text-secondary hover:border-primary hover:text-primary transition-all cursor-default"
                >
                  <Tag className="w-3 h-3 inline mr-2 opacity-50" />
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </article>
      </div>
    </main>
  );
}
