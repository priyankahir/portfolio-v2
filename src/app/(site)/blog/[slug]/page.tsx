import { Reveal } from "@/components/animations/Reveal";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogs } from "@/data/portfolio";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

export const revalidate = 30;

export default async function BlogPostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const post = blogs.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex-1 py-24 px-4 bg-background relative overflow-hidden">
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
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Recent"}
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

          {post.mainImage && (
            <div className="mb-12 relative w-full h-[400px] rounded-xl overflow-hidden border border-border/50">
              <Image 
                src={post.mainImage} 
                alt={post.title} 
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <div className="prose prose-invert prose-primary max-w-none font-terminal text-secondary leading-relaxed blog-content">
            {post.body ? (
              <PortableText 
                value={post.body} 
                components={{
                  block: {
                    h2: ({children}: any) => <h2 className="text-white font-heading font-bold text-3xl mt-12 mb-6">{children}</h2>,
                    h3: ({children}: any) => <h3 className="text-primary font-heading font-semibold text-2xl mt-10 mb-4">{children}</h3>,
                    normal: ({children}: any) => <p className="mb-7 text-lg leading-relaxed text-white/80">{children}</p>,
                  }
                }}
              />
            ) : (
              <p>No content available.</p>
            )}
          </div>

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


    </div>
  );
}
