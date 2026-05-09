"use client";

import { Reveal } from "@/components/animations/Reveal";

const EXPERIENCES = [
  {
    role: "Web Developer",
    company: "Vivansh InfoTech",
    date: "Apr 2025 – Present",
    status: "[ ACTIVE ]",
    description: [
      "Design and develop scalable frontend applications using React.js, Next.js, TypeScript, and JavaScript, following modern UI/UX and clean code standards.",
      "Build pixel-perfect, fully responsive UIs with Tailwind CSS and implement reusable, modular components to improve team development efficiency.",
      "Integrate RESTful APIs using Axios and TanStack Query, ensuring efficient data fetching, caching, and robust error handling.",
      "Ensure cross-browser compatibility and accessibility compliance; collaborate closely with backend developers and designers across agile sprint cycles."
    ]
  },
  {
    role: "Web Developer Intern",
    company: "Vivansh InfoTech",
    date: "Jan 2025 – Mar 2025",
    status: "[ COMPLETED ]",
    description: [
      "Translated Figma designs into responsive, production-ready interfaces using React.js and Tailwind CSS.",
      "Built and maintained reusable UI components following component-driven development practices.",
      "Handled REST API integration, form validation using Yup, and client-side data management.",
      "Worked with Git-based workflows and actively participated in agile development ceremonies."
    ]
  }
];

export function ExperienceSection() {
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
            {EXPERIENCES.map((exp, idx) => (
              <Reveal key={idx} delay={idx * 0.2}>
                <div className="relative pl-6 border-l-2 border-border-focus group terminal-panel-hover p-4 rounded-r">
                  <div className="absolute w-3 h-3 bg-primary -left-[7px] top-5 shadow-[0_0_10px_rgba(0,255,65,0.8)] group-hover:scale-150 transition-transform"></div>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-primary font-bold text-lg">{exp.role}</span>
                      <span className="text-secondary">@</span>
                      <span className="text-accent font-bold">{exp.company}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 md:mt-0">
                      <span className="text-secondary bg-surface px-2 py-1 rounded border border-border">[{exp.date}]</span>
                      <span className={exp.status.includes("ACTIVE") ? "text-primary animate-pulse" : "text-secondary"}>{exp.status}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mt-4 text-foreground">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 group-hover:text-primary transition-colors">
                        <span className="text-accent mt-0.5 shrink-0">{">"}</span>
                        <span className="leading-relaxed opacity-90 group-hover:opacity-100">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          
          <div className="mt-8 pt-4 border-t border-border flex items-center text-secondary">
            <span className="animate-blink w-2.5 h-5 bg-primary block mr-2"></span> EOF
          </div>
        </div>
      </div>
    </section>
  );
}
