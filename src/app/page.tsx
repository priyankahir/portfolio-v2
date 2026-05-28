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

import { client } from "@/sanity/lib/client";
import {
  getAboutQuery,
  getProjectsQuery,
  getSkillsQuery,
  getExperienceQuery,
  getBlogsQuery,
} from "@/sanity/lib/queries";

export default async function Home() {
  let about = null, projects = [], skills = [], experience = [], blogs = [];
  
  try {
    [about, projects, skills, experience, blogs] = await Promise.all([
      client.fetch(getAboutQuery),
      client.fetch(getProjectsQuery),
      client.fetch(getSkillsQuery),
      client.fetch(getExperienceQuery),
      client.fetch(getBlogsQuery),
    ]);
  } catch (error) {
    console.warn("Failed to fetch data from Sanity. Make sure environment variables are set.", error);
  }

  return (
    <>
      <HeroSection about={about} />
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
