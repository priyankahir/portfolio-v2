import { Reveal } from "@/components/animations/Reveal";
import { BlogCard } from "@/components/blog/BlogCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { blogs } from "@/data/portfolio";

export default async function BlogPage() {


  return (
    <div className="flex-1 py-24 px-4 bg-background">
      <div className="container mx-auto max-w-5xl">
        <Reveal>
          <div className="mb-12">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors font-terminal text-sm mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              cd ..
            </Link>
            
            <div className="flex items-center gap-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold text-primary tracking-wide">
                <span className="text-secondary">#</span> ls /var/log/blog/
              </h1>
              <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/50 to-transparent ml-4"></div>
            </div>
            <p className="text-secondary mt-4 font-terminal max-w-2xl">
              Exploring the frontiers of frontend development, architecture, and design. 
              A collection of insights, tutorials, and performance optimizations.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post: any, idx: number) => {
            const slug = post?.slug || idx.toString();
            return (
              <BlogCard key={slug} post={post} index={idx} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
