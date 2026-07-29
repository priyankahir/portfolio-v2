import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { Experience } from "@/components/home/Experience";
import { LinkButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { profile } from "@/data/profile";
import { principles, processSteps } from "@/data/services";
import { toolbox } from "@/data/skills";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Priyank Baldaniya — MERN stack developer in Ahmedabad with 1.7+ years shipping React, Next.js, Node.js and MongoDB applications for SaaS products across EHS, AI, fintech and trading.",
  path: "/about",
  keywords: [
    "about Priyank Baldaniya",
    "MERN developer bio",
    "React developer Ahmedabad",
  ],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ])
        )}
      />

      <PageHeader
        command="cat ~/about.md"
        title="A full-stack developer who designs the API before the mockup"
        description={profile.tagline}
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
              I finished a B.E. in Computer Engineering at Government Engineering
              College, Rajkot under Gujarat Technological University in May 2025,
              having already started working as a developer that January. The
              last stretch of the degree ran in parallel with real client delivery —
              which taught me more about component architecture than any coursework
              did.
            </p>
            <p className="text-[1.0625rem] leading-[1.8] text-muted">
              Since then I&apos;ve worked across six distinct product domains at
              Vivansh InfoTech. That variety is the part I value most: an EHS
              compliance platform and a stock-trading dashboard fail in completely
              different ways, and building both teaches you which patterns are
              universal and which were just habit.
            </p>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="space-y-4">
            <div className="panel p-6">
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-faint">
                What I&apos;m looking for
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
A product-focused MERN role where the app has genuine complexity on both
                sides — dashboards, builders, AI surfaces, APIs that have to stay fast —
                and where code review is a real conversation rather than a rubber stamp.
              </p>
            </div>

            <div className="panel p-6">
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-faint">
                Outside the editor
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                I read other people&apos;s source. Most of what I know about component
                API design came from reading Radix and TanStack, not from tutorials.
                It&apos;s also where most of the ideas on this site&apos;s blog
                started.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tinted>
        <SectionHeading
          command="cat principles.txt"
          title="What I optimise for"
          description="Opinions I've formed from shipping, and would defend in a code review."
        />

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle) => (
            <StaggerItem key={principle.id}>
              <article className="panel panel-interactive h-full p-6">
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

      <Section>
        <SectionHeading
          command="./process --verbose"
          title="How a feature actually gets built"
          description="Five steps, in the order they happen. The first two are where most of the bugs get prevented."
        />

        <ol className="space-y-3">
          {processSteps.map((step, index) => (
            <li key={step.id}>
              <Reveal delay={index * 0.06}>
                <article className="panel flex gap-5 p-6">
                  <span
                    aria-hidden="true"
                    className="font-display text-2xl font-semibold text-line-strong"
                  >
                    {step.step}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Experience />

      <Section tinted>
        <SectionHeading
          command="ls /usr/local/bin"
          title="Daily toolbox"
          description="The things actually open on my machine on a normal working day."
        />

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {toolbox.map((group) => (
            <StaggerItem key={group.category}>
              <div className="panel h-full p-5">
                <h3 className="font-mono text-[11px] uppercase tracking-widest text-primary">
                  {group.category}
                </h3>
                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="font-mono text-sm text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
