import Link from "next/link";
import { developerDetails } from "@/data/developer";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="flex-1 flex flex-col justify-center items-center text-center px-4 py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] -z-10" />
      
      <StaggerContainer className="max-w-4xl mx-auto flex flex-col items-center">
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-sm text-secondary mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for new opportunities
          </div>
        </FadeUp>
        
        <FadeUp>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 font-heading">
            Hi, I'm <span className="text-gradient">{developerDetails.name.split(" ")[0]}</span> <br />
            {developerDetails.role}
          </h1>
        </FadeUp>
        
        <FadeUp>
          <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            {developerDetails.tagline} specializing in React, Next.js, and modern scalable web architectures.
          </p>
        </FadeUp>
        
        <FadeUp>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link 
              href="/projects" 
              className="inline-flex items-center gap-2 bg-primary text-background px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center"
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-surface border border-border px-6 py-3 rounded-lg font-medium hover:bg-surface-hover transition-colors w-full sm:w-auto justify-center"
            >
              Contact Me
            </Link>
          </div>
        </FadeUp>
      </StaggerContainer>
    </section>
  );
}
