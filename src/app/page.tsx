import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { SkillsSection } from "@/components/home/SkillsSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { EducationTimeline } from "@/components/home/EducationTimeline";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ResumeSection } from "@/components/home/ResumeSection";
import { BlogSection } from "@/components/home/BlogSection";
import { ContactSection } from "@/components/home/ContactSection";
import { TerminalBootLoader } from "@/components/layout/TerminalBootLoader";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationTimeline />
      <ResumeSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}
