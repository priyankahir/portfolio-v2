import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { SkillsSection } from "@/components/home/SkillsSection";
import { TechnicalPhilosophy } from "@/components/home/TechnicalPhilosophy";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { EducationTimeline } from "@/components/home/EducationTimeline";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ResumeSection } from "@/components/home/ResumeSection";
import { BlogSection } from "@/components/home/BlogSection";
import { InteractiveConsole } from "@/components/home/InteractiveConsole";
import { ContactSection } from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <SkillsSection />
      <TechnicalPhilosophy />
      <ExperienceSection />
      <ProjectsSection />
      <EducationTimeline />
      <ResumeSection />
      <BlogSection />
      <InteractiveConsole />
      <ContactSection />
    </>
  );
}
