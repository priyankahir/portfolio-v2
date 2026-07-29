import { Check, Download, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { education, experiences } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/seo";
import { durationBetween, formatMonth } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Résumé",
  description: `Résumé of ${profile.name} — ${profile.experienceLabel} as a MERN stack developer in React, Next.js, Node.js and MongoDB, with production work across EHS, AI, fintech, franchise and trading platforms.`,
  path: "/resume",
  keywords: [
    "MERN stack developer resume",
    "full stack developer CV",
    "Priyank Baldaniya resume",
  ],
});

export default function ResumePage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Résumé", path: "/resume" },
          ])
        )}
      />

      <PageHeader
        command="cat resume.txt"
        title="Résumé"
        description={`${profile.headline} · ${profile.experienceLabel} of production experience.`}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Résumé", path: "/resume" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <LinkButton href={profile.resumePath} download={profile.resumeFileName}>
            <Download className="h-4 w-4" aria-hidden="true" />
            Download PDF
          </LinkButton>
          <LinkButton href={`mailto:${profile.email}`} variant="secondary">
            <Mail className="h-4 w-4" aria-hidden="true" />
            Email me
          </LinkButton>
        </div>
      </PageHeader>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-14">
          {/* ---- Sidebar ---- */}
          <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <Reveal className="panel p-6">
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-faint">
                Contact
              </h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-2.5 text-muted">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                  <a
                    href={`mailto:${profile.email}`}
                    className="link-underline break-all hover:text-fg"
                  >
                    {profile.email}
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-muted">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                  <a href={`tel:+${profile.phoneRaw}`} className="link-underline hover:text-fg">
                    {profile.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-muted">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                  {profile.location}
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.06} className="panel p-6">
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-faint">
                Core skills
              </h2>
              <dl className="mt-4 space-y-4">
                {skillGroups.map((group) => (
                  <div key={group.id}>
                    <dt className="text-xs font-medium text-primary">{group.title}</dt>
                    <dd className="mt-1 text-[13px] leading-relaxed text-muted">
                      {group.skills.map((skill) => skill.name).join(" · ")}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.12} className="panel p-6">
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-faint">
                Education
              </h2>
              <ul className="mt-4 space-y-4">
                {education.map((entry) => (
                  <li key={entry.id}>
                    <p className="text-sm font-medium">{entry.degree}</p>
                    <p className="mt-0.5 text-[13px] text-muted">{entry.institution}</p>
                    <p className="mt-1 font-mono text-[11px] text-faint">
                      {formatMonth(entry.start)} — {formatMonth(entry.end)} ·{" "}
                      {entry.score}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* ---- Main column ---- */}
          <div className="space-y-12">
            <Reveal>
              <h2 className="font-mono text-xs uppercase tracking-widest text-primary">
                Summary
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-[1.8] text-muted">
MERN stack developer with {profile.experienceLabel} building scalable,
                high-performance web applications in React.js, Next.js, Node.js,
                Express and MongoDB. Skilled at translating Figma wireframes into
                pixel-perfect responsive UIs and designing the REST APIs behind them,
                with deliberate state management on the client. Delivered production
                SaaS across EHS, AI chatbot, fintech, franchise management and stock
                trading domains, with a consistent focus on clean code, reusable
                architecture and agile delivery.
              </p>
            </Reveal>

            <Reveal>
              <h2 className="font-mono text-xs uppercase tracking-widest text-primary">
                Experience
              </h2>
              <ol className="mt-6 space-y-8">
                {experiences.map((job) => (
                  <li key={job.id}>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <h3 className="text-base font-semibold">
                        {job.role}
                        <span className="text-muted"> · {job.company}</span>
                      </h3>
                      <p className="shrink-0 font-mono text-[11px] text-faint">
                        {formatMonth(job.start)} — {job.end ? formatMonth(job.end) : "Present"}{" "}
                        ({durationBetween(job.start, job.end)})
                      </p>
                    </div>

                    <ul className="mt-4 space-y-2.5">
                      {job.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3 text-sm text-muted">
                          <Check
                            className="mt-1 h-3.5 w-3.5 shrink-0 text-primary"
                            aria-hidden="true"
                          />
                          <span className="leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal>
              <h2 className="font-mono text-xs uppercase tracking-widest text-primary">
                Key projects
              </h2>
              <ul className="mt-6 space-y-6">
                {projects.map((project) => (
                  <li key={project.id}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="text-base font-semibold">{project.title}</h3>
                      <span className="text-sm text-muted">— {project.subtitle}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {project.summary}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.stack.map((item) => (
                        <Tag key={item} tone="outline">
                          {item}
                        </Tag>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
