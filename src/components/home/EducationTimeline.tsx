"use client";

import { Reveal } from "@/components/animations/Reveal";

const EDUCATION = [
  {
    degree: "B.E. Computer Engineering",
    institution: "Government Engineering College, Rajkot",
    university: "Gujarat Technological University",
    date: "Jun 2021 – May 2025",
    grade: "CPI: 7.91 / 10.0"
  },
  {
    degree: "Class XII (HSC)",
    institution: "Alpha Vidhya Sankul, Junagadh",
    university: "Gujarat Secondary & Higher Secondary Education Board",
    date: "Jun 2020 – May 2021",
    grade: "88.30%"
  }
];

export function EducationTimeline() {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <Reveal>
          <div className="flex items-center gap-2 mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-primary tracking-wide">
              <span className="text-secondary">#</span> cat /var/log/education.log
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/50 to-transparent ml-4"></div>
          </div>
        </Reveal>

        <div className="terminal-panel p-6 md:p-8 font-terminal text-sm md:text-base">
          <div className="space-y-12">
            {EDUCATION.map((edu, idx) => (
              <Reveal key={idx} delay={idx * 0.2}>
                <div className="relative pl-6 border-l-2 border-border-focus group terminal-panel-hover p-4 rounded-r">
                  <div className="absolute w-3 h-3 bg-accent -left-[7px] top-5 shadow-[0_0_10px_rgba(34,211,238,0.8)] group-hover:scale-150 transition-transform"></div>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-accent font-bold text-lg">{edu.degree}</span>
                      <span className="text-secondary">@</span>
                      <span className="text-primary font-bold">{edu.institution}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 md:mt-0">
                      <span className="text-secondary bg-surface px-2 py-1 rounded border border-border">[{edu.date}]</span>
                      <span className="text-primary font-bold">{edu.grade}</span>
                    </div>
                  </div>

                  <div className="mt-4 text-secondary flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">{">"}</span>
                    <span>University: {edu.university}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          
          <div className="mt-8 pt-4 border-t border-border flex items-center text-secondary">
            <span className="animate-blink w-2.5 h-5 bg-accent block mr-2"></span> EOF
          </div>
        </div>
      </div>
    </section>
  );
}
