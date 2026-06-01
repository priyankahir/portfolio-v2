"use client";

import { Reveal } from "@/components/animations/Reveal";
import * as LucideIcons from "lucide-react";
import { useMemo } from "react";
import { motion } from "framer-motion";

interface Skill {
  _id: string;
  name: string;
  category: string;
  icon?: string;
}

interface SkillsSectionProps {
  skills?: Skill[];
}

export function SkillsSection({ skills = [] }: SkillsSectionProps) {
  const groupedSkills = useMemo(() => {
    if (!skills || skills.length === 0) return [];

    const groups: Record<string, Skill[]> = {};
    skills.forEach(skill => {
      if (!groups[skill.category]) {
        groups[skill.category] = [];
      }
      groups[skill.category].push(skill);
    });

    return Object.entries(groups).map(([title, items]) => ({
      title,
      skills: items,
    }));
  }, [skills]);

  // Fallback to static data if no Sanity data
  const displayGroups = groupedSkills.length > 0 ? groupedSkills : [];

  return (
    <section id="skills" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <Reveal>
          <div className="flex items-center gap-2 mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-primary tracking-wide">
              <span className="text-secondary">#</span> installed.modules
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/50 to-transparent ml-4"></div>
          </div>
        </Reveal>

        <div className="terminal-panel p-4 sm:p-6 mb-12 relative overflow-hidden group">
          <div className="flex items-center gap-2 mb-4 border-b border-border pb-4 overflow-x-auto">
            <span className="text-secondary whitespace-nowrap">$</span> <span className="text-primary font-terminal font-bold text-sm sm:text-base whitespace-nowrap">apt list --installed | grep frontend</span>
          </div>
          
          {displayGroups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayGroups.map((category, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="bg-surface/50 p-6 rounded border border-border group-hover:border-primary/30 transition-colors">
                    <h3 className="text-xl font-heading font-bold text-primary mb-4 flex items-center gap-2">
                      <span className="text-accent">[{idx + 1}]</span>
                      {category.title}
                    </h3>
                    
                    <motion.div className="flex flex-wrap gap-3"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-50px" }}
                      variants={{
                        hidden: {},
                        visible: {
                          transition: {
                            staggerChildren: 0.05
                          }
                        }
                      }}
                    >
                      {category.skills.map((skill, i) => {
                        const Icon = (skill.icon && (LucideIcons as any)[skill.icon]) || LucideIcons.Code;
                        return (
                          <motion.div 
                            key={i}
                            variants={{
                              hidden: { opacity: 0, scale: 0.8, y: 10 },
                              visible: { 
                                opacity: 1, 
                                scale: 1, 
                                y: 0,
                                transition: { type: "spring", stiffness: 300, damping: 20 } 
                              }
                            }}
                            whileHover={{ scale: 1.05, y: -2, boxShadow: "0px 4px 15px rgba(0,255,65,0.15)" }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 font-terminal text-sm px-3 py-1.5 bg-surface border border-border-focus rounded text-foreground hover:text-primary hover:border-primary transition-colors interactive cursor-default"
                          >
                            <span className="text-lg transition-all duration-300 drop-shadow-md text-primary">
                              <Icon size={18} />
                            </span>
                            {skill.name}
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="text-secondary font-terminal p-4 text-center">
              No modules found. Please install modules via Sanity Studio.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
