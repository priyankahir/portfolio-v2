import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { Experience } from "@/components/home/Experience";
import { LinkButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { principles } from "@/data/approach";
import { currentPosition } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { getExperience } from "@/lib/experience";
import { aboutPageSchema, breadcrumbSchema, jsonLdGraph } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Priyank Baldaniya is a MERN stack developer in Ahmedabad, building React, Next.js, Node.js and MongoDB applications for SaaS products since January 2025.",
  path: "/about",
  keywords: [
    "about Priyank Baldaniya",
    "MERN stack developer Ahmedabad",
    "React developer Ahmedabad",
  ],
});

export default function AboutPage() {
  const experience = getExperience();

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          aboutPageSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ])
        )}
      />

      <PageHeader
        eyebrow="About me"
        title="A full-stack developer who designs the API before the mockup"
        description={`${profile.role} at ${currentPosition.company} in Ahmedabad, with ${experience.label} of professional experience across MongoDB, Express, React and Node.js.`}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <LinkButton href={profile.resumePath} download={profile.resumeFileName}>
            Download résumé
          </LinkButton>
          <LinkButton href="/contact" variant="secondary">
            Get in touch
          </LinkButton>
        </div>
      </PageHeader>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <Reveal className="space-y-5">
            {profile.summary.map((paragraph, index) => (
              <p key={index} className="text-[1.0625rem] leading-[1.8] text-muted">
                {paragraph}
              </p>
            ))}

            <h2 className="pt-6 text-xl font-semibold text-fg">Where I came from</h2>
            <p className="text-[1.0625rem] leading-[1.8] text-muted">
              I started at {currentPosition.company} in January 2025, while finishing a
              B.E. in Computer Engineering (GTU, 2025). Since then I&apos;ve shipped{" "}
              {projects.length} products across very different domains — and learned
              which patterns hold up everywhere.
            </p>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="space-y-4">
            <div className="panel p-6">
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-faint">
                What I&apos;m looking for
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                A product-focused MERN role with real complexity on both sides of the
                API, and code review that is a conversation, not a rubber stamp.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tinted>
        <SectionHeading
          eyebrow="Principles"
          title="What I optimise for"
          description="Opinions formed from shipping."
        />

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle) => (
            <StaggerItem key={principle.id}>
              <article data-spotlight className="panel panel-interactive h-full p-6">
                <Icon name={principle.icon} className="h-5 w-5 text-primary" />
                <h3 className="mt-4 text-base font-semibold">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {principle.body}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Experience />
    </>
  );
}
