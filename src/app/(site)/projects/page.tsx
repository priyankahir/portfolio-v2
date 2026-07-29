import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { projects } from "@/data/projects";
import {
  breadcrumbSchema,
  collectionPageSchema,
  jsonLdGraph,
} from "@/lib/json-ld";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects",
  description:
    "Case studies from production SaaS work: an AI chatbot with RAG grounding, an EHS compliance platform, a franchise fintech dashboard, a report template builder and a real-time stock trading UI.",
  path: "/projects",
  keywords: [
    "React project case studies",
    "Next.js SaaS projects",
    "MERN stack portfolio projects",
  ],
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]),
          collectionPageSchema({
            name: "Projects",
            description:
              "Full-stack case studies across EHS, AI, fintech, assessment and trading platforms.",
            path: "/projects",
            items: projects.map((project) => ({
              name: project.title,
              path: `/projects/${project.slug}`,
            })),
          })
        )}
      />

      <PageHeader
        command="ls -la ./case-studies"
        title="Work I've shipped"
        description={`${projects.length} production products across six domains. Each one below is a short case study — the constraint, what I built, and what shipped.`}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ]}
      />

      <Section>
        <Stagger className="grid gap-4 lg:grid-cols-2">
          {projects.map((project, index) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} index={index} titleAs="h2" />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
