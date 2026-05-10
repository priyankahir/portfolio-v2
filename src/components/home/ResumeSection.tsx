import { Reveal } from "@/components/animations/Reveal";
import { Mail, Phone, MapPin, Download, MessageSquare,GitCompareArrows,Link  } from "lucide-react";
import { developerDetails } from "@/data/developer";

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
    items: ["Zustand", "React Query", "Axios", "RESTful APIs"]
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
      "Build and maintain reusable UI components following component-driven development practices.",
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
              <h2 className="text-5xl md:text-7xl font-heading font-bold text-foreground mb-4">
                <span className="text-primary">05.</span> Resume
              </h2>
              <p className="text-xl text-primary font-terminal">Frontend Developer based in Gujarat, India</p>
            </div>
            <a 
              href="/images/Priyank Baldaniya Frontend CV.pdf" 
              download="Priyank_Baldaniya_Resume.pdf"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-white dark:text-black rounded font-bold text-lg hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] dark:hover:shadow-[0_0_25px_rgba(0,255,65,0.4)] transition-all overflow-hidden"
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              [ DOWNLOAD_CV ]
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
          
          {/* Left Column: Contact & Skills */}
          <div className="space-y-12">
            <Reveal direction="left">
              <div className="terminal-panel p-6">
                <h3 className="text-lg font-heading font-bold text-primary mb-8 flex items-center gap-3">
                  <span className="text-xs text-secondary font-terminal">#</span>
                  CONTACT_HANDLERS
                </h3>
                <div className="space-y-6 font-terminal">
                  <a href={`mailto:${developerDetails.email}`} className="flex items-center gap-4 text-secondary hover:text-primary transition-colors group text-xs">
                    <Mail className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                    <span>{developerDetails.email}</span>
                  </a>
                  <a href={developerDetails.socials.whatsapp} className="flex items-center gap-4 text-secondary hover:text-primary transition-colors group text-xs">
                    <MessageSquare className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                    <span>{developerDetails.phone}</span>
                  </a>
                  <div className="flex items-center gap-4 text-secondary text-xs">
                    <MapPin className="w-4 h-4 opacity-70" />
                    <span>Ahmedabad, Gujarat, IN</span>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-border/30 flex gap-4">
                  <a href={developerDetails.socials.github} target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transition-colors">
                    <GitCompareArrows  className="w-5 h-5" />
                  </a>
                  <a href={developerDetails.socials.linkedin} target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transition-colors">
                    <Link className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.2}>
              <div>
                <h3 className="text-lg font-heading font-bold text-primary mb-8 flex items-center gap-3 uppercase tracking-widest">
                  <span className="text-xs text-secondary font-terminal">#</span>
                  TECH_STACK
                </h3>
                <div className="space-y-8">
                  {SKILLS.map((skillGroup, idx) => (
                    <div key={idx}>
                      <h4 className="text-[10px] font-bold text-secondary mb-4 tracking-[0.2em] uppercase">{skillGroup.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1.5 bg-surface border border-border rounded text-[11px] text-secondary font-terminal hover:border-primary/50 hover:text-primary transition-all cursor-default"
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
              <h3 className="text-lg font-heading font-bold text-primary mb-12 flex items-center gap-3 uppercase tracking-widest">
                <span className="text-xs text-secondary font-terminal">#</span>
                DEPLOYMENT_HISTORY
              </h3>
              
              <div className="space-y-16 border-l border-border/30 pl-8 ml-3">
                {EXPERIENCE.map((exp, idx) => (
                  <div key={idx} className="relative group">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded bg-surface border border-border group-hover:border-primary group-hover:bg-primary/20 transition-all shadow-[0_0_10px_rgba(0,255,65,0)] group-hover:shadow-[0_0_10px_rgba(0,255,65,0.4)]"></div>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                      <h4 className="text-2xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">{exp.role}</h4>
                      <span className="px-2 py-1 bg-surface border border-border rounded text-[10px] font-terminal text-secondary">
                        {exp.date}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-primary font-terminal text-xs mb-6">
                      <span className="font-bold uppercase tracking-widest">{exp.company}</span>
                      <span className="text-secondary opacity-30">|</span>
                      <span className="text-secondary opacity-80">{exp.location}</span>
                    </div>

                    <ul className="space-y-4 font-terminal">
                      {exp.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-secondary group/li">
                          <span className="text-primary mt-1 shrink-0 opacity-50 group-hover/li:opacity-100 transition-opacity">{"->"}</span>
                          <span className="leading-relaxed text-xs md:text-sm">{point}</span>
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
