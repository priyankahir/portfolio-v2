"use client";

import { Reveal } from "@/components/animations/Reveal";
import { Mail, Phone, MapPin, Download } from "lucide-react";

const SKILLS = [
  {
    category: "LANGUAGES",
    items: ["HTML", "CSS", "JavaScript", "TypeScript"]
  },
  {
    category: "FRONTEND",
    items: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion"]
  },
  {
    category: "STATE & DATA",
    items: ["Zustand", "React Query", "Axios", "Yup"]
  }
];

const EXPERIENCE = [
  {
    role: "Web Developer",
    company: "Vivansh InfoTech",
    location: "Ahmedabad, India",
    date: "Apr 2025 – Present",
    points: [
      "Design and develop scalable frontend applications using React.js and Next.js.",
      "Build pixel-perfect, fully responsive UIs with Tailwind CSS.",
      "Integrate RESTful APIs using Axios and TanStack Query.",
      "Ensure cross-browser compatibility and accessibility compliance."
    ]
  },
  {
    role: "Web Developer Intern",
    company: "Vivansh InfoTech",
    location: "Ahmedabad, India",
    date: "Jan 2025 – Mar 2025",
    points: [
      "Translated Figma designs into responsive interfaces.",
      "Built and maintained reusable UI components.",
      "Handled REST API integration and form validation."
    ]
  }
];

export function ResumeSection() {
  return (
    <section id="resume" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div>
              <h2 className="text-5xl md:text-7xl font-heading font-bold text-foreground mb-4">Resume</h2>
              <p className="text-xl text-primary font-terminal">Frontend Developer based in Gujarat, India</p>
            </div>
            <a 
              href="#" 
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-white dark:text-black rounded-full font-bold text-lg hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] dark:hover:shadow-[0_0_25px_rgba(0,255,65,0.4)] transition-all overflow-hidden"
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              Download PDF
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
          
          {/* Left Column: Contact & Skills */}
          <div className="space-y-12">
            <Reveal direction="left">
              <div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-8 flex items-center gap-3">
                  <Mail className="w-6 h-6 text-primary" />
                  Contact
                </h3>
                <div className="space-y-6 font-terminal">
                  <div className="flex items-center gap-4 text-secondary hover:text-primary transition-colors group">
                    <Mail className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                    <span className="text-sm">priyankahir333@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-4 text-secondary hover:text-primary transition-colors group">
                    <Phone className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                    <span className="text-sm">+91 99797-00935</span>
                  </div>
                  <div className="flex items-center gap-4 text-secondary hover:text-primary transition-colors group">
                    <MapPin className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                    <span className="text-sm">Ahmedabad, Gujarat, India</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.2}>
              <div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-8">Technical Skills</h3>
                <div className="space-y-8">
                  {SKILLS.map((skillGroup, idx) => (
                    <div key={idx}>
                      <h4 className="text-xs font-bold text-primary mb-4 tracking-widest">{skillGroup.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill, i) => (
                          <span 
                            key={i} 
                            className="px-4 py-2 bg-surface border border-border rounded-lg text-sm text-secondary font-terminal hover:border-primary/50 hover:text-primary transition-all"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Experience */}
          <div className="space-y-12">
            <Reveal direction="right">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-12 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                Work Experience
              </h3>
              
              <div className="space-y-16 border-l-2 border-border/50 pl-8 ml-3">
                {EXPERIENCE.map((exp, idx) => (
                  <div key={idx} className="relative">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(37,99,235,0.6)] dark:shadow-[0_0_15px_rgba(0,255,65,0.6)] border-4 border-background"></div>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                      <h4 className="text-2xl font-heading font-bold text-foreground">{exp.role}</h4>
                      <span className="px-3 py-1 bg-surface border border-border rounded text-xs font-terminal text-secondary">
                        {exp.date}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-primary font-terminal text-sm mb-6">
                      <span className="font-bold">{exp.company}</span>
                      <span className="text-secondary">•</span>
                      <span className="text-secondary opacity-80">{exp.location}</span>
                    </div>

                    <ul className="space-y-4">
                      {exp.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-secondary group">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 shrink-0 group-hover:bg-primary transition-colors"></span>
                          <span className="leading-relaxed text-sm md:text-base">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
