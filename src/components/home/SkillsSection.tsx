"use client";

import { Reveal } from "@/components/animations/Reveal";
import { 
  SiReact, SiNextdotjs, SiJavascript, SiTypescript, SiHtml5, SiCss,
  SiTailwindcss, SiFramer, SiFigma, SiGit, SiGithubactions, SiVite,
  SiReactquery, SiJson
} from "react-icons/si";
import { TbApi, TbDeviceDesktopAnalytics } from "react-icons/tb";
import { FiDatabase, FiBox, FiCpu } from "react-icons/fi";

const SKILL_CATEGORIES = [
  {
    title: "Frontend & Core",
    skills: [
      { name: "React.js", icon: <SiReact className="text-[#61DAFB]" /> },
      { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
      { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
      { name: "HTML5", icon: <SiHtml5 className="text-[#E34F26]" /> },
      { name: "CSS3", icon: <SiCss className="text-[#1572B6]" /> },
    ],
  },
  {
    title: "State Management & Data",
    skills: [
      { name: "Zustand", icon: <FiBox className="text-amber-700" /> },
      { name: "TanStack Query", icon: <SiReactquery className="text-[#FF4154]" /> },
      { name: "Axios", icon: <FiDatabase className="text-purple-500" /> },
      { name: "RESTful APIs", icon: <TbApi className="text-green-500" /> },
      { name: "JSON", icon: <SiJson className="text-white" /> },
    ],
  },
  {
    title: "Styling & UI",
    skills: [
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
      { name: "Framer Motion", icon: <SiFramer className="text-white" /> },
      { name: "Shadcn UI", icon: <FiBox className="text-zinc-400" /> },
      { name: "Radix UI", icon: <FiBox className="text-purple-400" /> },
      { name: "Responsive Design", icon: <TbDeviceDesktopAnalytics className="text-blue-400" /> },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
      { name: "GitHub Actions", icon: <SiGithubactions className="text-[#2088FF]" /> },
      { name: "Vite", icon: <SiVite className="text-[#646CFF]" /> },
      { name: "Figma", icon: <SiFigma className="text-[#F24E1E]" /> },
      { name: "Claude API", icon: <FiCpu className="text-amber-500" /> },
    ],
  },
];

export function SkillsSection() {
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SKILL_CATEGORIES.map((category, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="bg-surface/50 p-6 rounded border border-border group-hover:border-primary/30 transition-colors">
                  <h3 className="text-xl font-heading font-bold text-primary mb-4 flex items-center gap-2">
                    <span className="text-accent">[{idx + 1}]</span>
                    {category.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, i) => (
                      <div 
                        key={i}
                        className="flex items-center gap-2 font-terminal text-sm px-3 py-1.5 bg-surface border border-border-focus rounded text-foreground hover:text-primary hover:border-primary transition-colors interactive cursor-default"
                      >
                        <span className="text-lg transition-all duration-300 drop-shadow-md">
                          {skill.icon}
                        </span>
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
