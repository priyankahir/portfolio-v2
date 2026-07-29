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

import { about, projects, skills, experience, blogs } from "@/data/portfolio";

export default function Home() {

  return (
    <>
      <HeroSection about={about} skills={skills} />
      <AboutSection about={about} />
      <ServicesSection />
      <SkillsSection skills={skills} />
      <TechnicalPhilosophy />
      <ExperienceSection experience={experience} />
      <ProjectsSection projects={projects} />
      <EducationTimeline />
      <ResumeSection resumeUrl={about?.resumeUrl} about={about} experience={experience} skills={skills} />
      <BlogSection blogs={blogs} />
      <InteractiveConsole />
      <ContactSection about={about} />
    </>
  );
}
