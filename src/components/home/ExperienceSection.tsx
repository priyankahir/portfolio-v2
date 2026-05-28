"use client";

import { Reveal } from "@/components/animations/Reveal";
import { PortableText } from '@portabletext/react';

interface Experience {
  _id: string;
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: any;
}

interface ExperienceSectionProps {
  experience?: Experience[];
}

export function ExperienceSection({ experience = [] }: ExperienceSectionProps) {
  // Format date safely
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section id="experience" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <Reveal>
          <div className="flex items-center gap-2 mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-primary tracking-wide">
              <span className="text-secondary">#</span> cat /var/log/experience.log
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/50 to-transparent ml-4"></div>
          </div>
        </Reveal>

        <div className="terminal-panel p-6 md:p-8 font-terminal text-sm md:text-base">
          <div className="space-y-12">
            {experience?.length > 0 ? (
              experience.map((exp, idx) => {
                const dateStr = `${formatDate(exp.startDate)} – ${exp.current ? 'Present' : formatDate(exp.endDate)}`;
                const status = exp.current ? "[ ACTIVE ]" : "[ COMPLETED ]";

                return (
                  <Reveal key={exp._id || idx} delay={idx * 0.2}>
                    <div className="relative pl-6 border-l-2 border-border-focus group terminal-panel-hover p-4 rounded-r">
                      <div className="absolute w-3 h-3 bg-primary -left-[7px] top-5 shadow-[0_0_10px_rgba(0,255,65,0.8)] group-hover:scale-150 transition-transform"></div>
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-primary font-bold text-lg">{exp.role}</span>
                          <span className="text-secondary">@</span>
                          <span className="text-accent font-bold">{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 md:mt-0">
                          <span className="text-secondary bg-surface px-2 py-1 rounded border border-border">[{dateStr}]</span>
                          <span className={exp.current ? "text-primary animate-pulse" : "text-secondary"}>{status}</span>
                        </div>
                      </div>

                      <div className="mt-4 text-foreground portable-text-container">
                        {exp.description ? (
                          <PortableText 
                            value={exp.description} 
                            components={{
                              listItem: ({children}: any) => (
                                <li className="flex items-start gap-2 group-hover:text-primary transition-colors mb-2">
                                  <span className="text-accent mt-0.5 shrink-0">{">"}</span>
                                  <span className="leading-relaxed opacity-90 group-hover:opacity-100">{children}</span>
                                </li>
                              ),
                              list: ({children}: any) => <ul className="space-y-3">{children}</ul>,
                              block: ({children}: any) => <p className="mb-2 leading-relaxed opacity-90">{children}</p>
                            }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </Reveal>
                );
              })
            ) : (
              <div className="text-secondary p-4">No logs found.</div>
            )}
          </div>
          
          <div className="mt-8 pt-4 border-t border-border flex items-center text-secondary">
            <span className="animate-blink w-2.5 h-5 bg-primary block mr-2"></span> EOF
          </div>
        </div>
      </div>
    </section>
  );
}
