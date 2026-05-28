import { Reveal } from "@/components/animations/Reveal";
import { Mail, Phone, MapPin, Download, MessageSquare,GitCompareArrows,Link  } from "lucide-react";
import { PortableText } from '@portabletext/react';
import { useMemo } from "react";

interface SocialLink {
  platform: string;
  url: string;
}

interface AboutData {
  role?: string;
  location?: string;
  email?: string;
  socials?: SocialLink[];
}

interface ResumeSectionProps {
  resumeUrl?: string;
  about?: AboutData | null;
  experience?: Record<string, any>[];
  skills?: Record<string, any>[];
}

export function ResumeSection({ resumeUrl, about, experience = [], skills = [] }: ResumeSectionProps) {
  const groupedSkills = useMemo(() => {
    if (!skills || skills.length === 0) return [];
    const groups: Record<string, string[]> = {};
    skills.forEach(skill => {
      if (!groups[skill.category]) groups[skill.category] = [];
      groups[skill.category].push(skill.name);
    });
    return Object.entries(groups).map(([category, items]) => ({
      category,
      items,
    }));
  }, [skills]);

  // Format date safely
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const getSocialUrl = (platform: string) => {
    if (!about?.socials) return "#";
    const link = about.socials.find((s) => s.platform.toLowerCase() === platform.toLowerCase());
    return link ? link.url : "#";
  };

  const whatsappLink = getSocialUrl('whatsapp');
  const githubLink = getSocialUrl('github');
  const linkedinLink = getSocialUrl('linkedin');

  return (
    <section id="resume" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div>
              <h2 className="text-5xl md:text-7xl font-heading font-bold text-foreground mb-4">
                <span className="text-primary">05.</span> Resume
              </h2>
              <p className="text-xl text-primary font-terminal">{about?.role || "Frontend Developer"} based in {about?.location || "India"}</p>
            </div>
            {resumeUrl && (
              <a 
                href={resumeUrl} 
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-white dark:text-black rounded font-bold text-lg hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] dark:hover:shadow-[0_0_25px_rgba(0,255,65,0.4)] transition-all overflow-hidden"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                [ DOWNLOAD_CV ]
              </a>
            )}
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
                  <a href={`mailto:${about?.email || "hello@example.com"}`} className="flex items-center gap-4 text-secondary hover:text-primary transition-colors group text-xs">
                    <Mail className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                    <span>{about?.email || "hello@example.com"}</span>
                  </a>
                  {whatsappLink !== "#" && (
                    <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-secondary hover:text-primary transition-colors group text-xs">
                      <MessageSquare className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                  <div className="flex items-center gap-4 text-secondary text-xs">
                    <MapPin className="w-4 h-4 opacity-70" />
                    <span>{about?.location || "Location"}</span>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-border/30 flex gap-4">
                  {githubLink !== "#" && (
                    <a href={githubLink} target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transition-colors">
                      <GitCompareArrows  className="w-5 h-5" />
                    </a>
                  )}
                  {linkedinLink !== "#" && (
                    <a href={linkedinLink} target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transition-colors">
                      <Link className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>

            {groupedSkills.length > 0 && (
              <Reveal direction="left" delay={0.2}>
                <div>
                  <h3 className="text-lg font-heading font-bold text-primary mb-8 flex items-center gap-3 uppercase tracking-widest">
                    <span className="text-xs text-secondary font-terminal">#</span>
                    TECH_STACK
                  </h3>
                  <div className="space-y-8">
                    {groupedSkills.map((skillGroup, idx) => (
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
            )}
          </div>

          {/* Right Column: Experience */}
          <div className="space-y-12">
            <Reveal direction="right">
              <h3 className="text-lg font-heading font-bold text-primary mb-12 flex items-center gap-3 uppercase tracking-widest">
                <span className="text-xs text-secondary font-terminal">#</span>
                DEPLOYMENT_HISTORY
              </h3>
              
              <div className="space-y-16 border-l border-border/30 pl-8 ml-3">
                {experience?.map((exp, idx) => {
                  const dateStr = `${formatDate(exp.startDate)} – ${exp.current ? 'Present' : formatDate(exp.endDate)}`;
                  
                  return (
                    <div key={exp._id || idx} className="relative group">
                      {/* Timeline Dot */}
                      <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded bg-surface border border-border group-hover:border-primary group-hover:bg-primary/20 transition-all shadow-[0_0_10px_rgba(0,255,65,0)] group-hover:shadow-[0_0_10px_rgba(0,255,65,0.4)]"></div>
                      
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                        <h4 className="text-2xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">{exp.role}</h4>
                        <span className="px-2 py-1 bg-surface border border-border rounded text-[10px] font-terminal text-secondary">
                          {dateStr}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-primary font-terminal text-xs mb-6">
                        <span className="font-bold uppercase tracking-widest">{exp.company}</span>
                        <span className="text-secondary opacity-30">|</span>
                        <span className="text-secondary opacity-80">{exp.location}</span>
                      </div>

                      <div className="font-terminal text-xs md:text-sm text-secondary portable-text-container">
                        {exp.description ? (
                          <PortableText 
                            value={exp.description}
                            components={{
                              listItem: ({children}: any) => (
                                <li className="flex items-start gap-3 group/li mb-4">
                                  <span className="text-primary mt-1 shrink-0 opacity-50 group-hover/li:opacity-100 transition-opacity">{"->"}</span>
                                  <span className="leading-relaxed">{children}</span>
                                </li>
                              ),
                              list: ({children}: any) => <ul className="space-y-4">{children}</ul>,
                              block: ({children}: any) => <p className="mb-4 leading-relaxed">{children}</p>
                            }}
                          />
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
