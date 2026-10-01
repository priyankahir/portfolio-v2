import { ArrowUpRight, Download, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { education, experiences } from "@/data/experience";
import { profile, stats } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { breadcrumbSchema, jsonLdGraph, resumePageSchema } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/seo";
import { durationBetween, formatMonth } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Résumé — MERN Stack Developer",
  description: `Résumé of ${profile.name} — ${profile.experienceLabel} as a MERN stack developer in React, Next.js, Node.js, Express and MongoDB, with production work across EHS, AI, fintech, franchise and trading platforms.`,
  path: "/resume",
  keywords: [
    "MERN stack developer resume",
    "full stack developer CV",
    "React Node.js developer resume",
    "Priyank Baldaniya resume",
  ],
});

/** Profiles worth listing on a résumé — GitHub/LinkedIn style links only. The
 *  phone and email are shown separately, so WhatsApp and mail are skipped. */
const webProfiles = profile.socials.filter(
  (social) => social.icon !== "mail" && social.icon !== "whatsapp"
);

export default function ResumePage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          resumePageSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Résumé", path: "/resume" },
          ])
        )}
      />

      <PageHeader
        eyebrow="Résumé"
        title="Résumé"
        description={`${profile.role} with ${profile.experienceLabel} of production experience across React, Next.js, Node.js, Express and MongoDB. The same content as the PDF, readable on any screen.`}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Résumé", path: "/resume" },
        ]}
      >
        <div className="flex flex-wrap gap-3 print:hidden">
          <LinkButton href={profile.resumePath} download={profile.resumeFileName}>
            <Download className="h-4 w-4" aria-hidden="true" />
            Download PDF
          </LinkButton>
          <LinkButton href="/contact" variant="secondary">
            <Mail className="h-4 w-4" aria-hidden="true" />
            Get in touch
          </LinkButton>
        </div>
      </PageHeader>

      <Section className="print:py-0">
        {/* The résumé itself — one document card, laid out like a printed CV. */}
        <Reveal>
          <article className="panel-solid mx-auto max-w-5xl overflow-hidden print:border-0 print:shadow-none">
            {/* ---- Document header ---- */}
            <header className="relative border-b border-line px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-transparent"
              />
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h2 className="text-[1.75rem] font-semibold leading-tight tracking-tight sm:text-4xl">
                    {profile.name}
                  </h2>
                  <p className="mt-2 text-base text-primary sm:text-lg">{profile.role}</p>
                </div>

                <ul className="grid gap-x-6 gap-y-2 text-sm text-muted sm:grid-cols-2 lg:text-right lg:[&>li]:justify-end">
                  <ContactItem icon={<Mail className="h-3.5 w-3.5" aria-hidden="true" />}>
                    <a href={`mailto:${profile.email}`} className="break-all hover:text-fg">
                      {profile.email}
                    </a>
                  </ContactItem>
                  <ContactItem icon={<Phone className="h-3.5 w-3.5" aria-hidden="true" />}>
                    <a href={`tel:+${profile.phoneRaw}`} className="hover:text-fg">
                      {profile.phone}
                    </a>
                  </ContactItem>
                  <ContactItem icon={<MapPin className="h-3.5 w-3.5" aria-hidden="true" />}>
                    {profile.location}
                  </ContactItem>
                  {webProfiles.map((social) => (
                    <ContactItem
                      key={social.label}
                      icon={<SocialIcon icon={social.icon} className="h-3.5 w-3.5" />}
                    >
                      <a
                        href={social.url}
                        target="_blank"
                        rel="me noopener noreferrer"
                        className="hover:text-fg"
                      >
                        {social.handle ?? social.label}
                      </a>
                    </ContactItem>
                  ))}
                </ul>
              </div>

              {/* Quick facts */}
              <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-elevated px-4 py-3">
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-faint">
                      {stat.label}
                    </dt>
                    <dd className="mt-1 font-display text-lg font-semibold">
                      {stat.value}
                      {stat.suffix && <span className="text-primary">{stat.suffix}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            </header>

            {/* ---- Body ---- */}
            <div className="divide-y divide-line">
              <ResumeRow title="Summary">
                <div className="space-y-3 text-[15px] leading-relaxed text-muted">
                  {profile.summary.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </ResumeRow>

              <ResumeRow title="Experience">
                <ol className="space-y-8">
                  {experiences.map((job) => (
                    <li key={job.id} className="relative">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <h3 className="text-base font-semibold">
                          {job.role}
                          <span className="font-normal text-muted"> · {job.company}</span>
                        </h3>
                        <p className="shrink-0 font-mono text-xs text-primary">
                          <time dateTime={job.start}>{formatMonth(job.start)}</time>
                          {" — "}
                          {job.end ? (
                            <time dateTime={job.end}>{formatMonth(job.end)}</time>
                          ) : (
                            "Present"
                          )}
                        </p>
                      </div>
                      <p className="mt-1 font-mono text-[11px] text-faint">
                        {job.type} · {job.location} · {durationBetween(job.start, job.end)}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {job.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-3 text-sm text-muted">
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"
                            />
                            <span className="leading-relaxed">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-3 font-mono text-[11px] leading-relaxed text-faint">
                        {job.stack.join(" · ")}
                      </p>
                    </li>
                  ))}
                </ol>
              </ResumeRow>

              <ResumeRow title="Key projects">
                <ul className="grid gap-4 md:grid-cols-2">
                  {projects.map((project) => (
                    <li key={project.id}>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="group block h-full rounded-lg border border-line bg-surface p-4 transition-colors hover:border-line-strong hover:bg-surface-hover"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-sm font-semibold group-hover:text-primary">
                            {project.title}
                          </h3>
                          <ArrowUpRight
                            className="h-3.5 w-3.5 shrink-0 text-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary print:hidden"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="mt-0.5 font-mono text-[11px] text-primary">
                          {project.domain} · {project.year}
                        </p>
                        <p className="mt-2 text-[13px] leading-relaxed text-muted">
                          {project.summary}
                        </p>
                        <p className="mt-3 font-mono text-[11px] leading-relaxed text-faint">
                          {project.stack.slice(0, 6).join(" · ")}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </ResumeRow>

              <ResumeRow title="Skills">
                <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {skillGroups.map((group) => (
                    <div key={group.id}>
                      <dt className="text-sm font-semibold">{group.title}</dt>
                      <dd className="mt-1 text-[13px] leading-relaxed text-muted">
                        {group.skills.map((skill) => skill.name).join(" · ")}
                      </dd>
                    </div>
                  ))}
                </dl>
              </ResumeRow>

              <ResumeRow title="Education">
                <ul className="space-y-5">
                  {education.map((entry) => (
                    <li
                      key={entry.id}
                      className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between"
                    >
                      <div>
                        <h3 className="text-sm font-semibold">{entry.degree}</h3>
                        <p className="mt-0.5 text-[13px] text-muted">
                          {entry.institution} · {entry.board}
                        </p>
                      </div>
                      <p className="shrink-0 font-mono text-xs text-faint sm:text-right">
                        {formatMonth(entry.start)} — {formatMonth(entry.end)}
                        <span className="block text-primary">{entry.score}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </ResumeRow>
            </div>
          </article>
        </Reveal>

        {/* Closing call to action */}
        <div className="mx-auto mt-8 flex max-w-5xl flex-col items-start gap-4 rounded-[var(--radius-panel)] border border-line-strong bg-primary-soft p-6 sm:flex-row sm:items-center sm:justify-between print:hidden">
          <p className="text-sm text-fg">
            <span className="font-semibold">{profile.availability.label}.</span>{" "}
            <span className="text-muted">Happy to share more detail on any role or project.</span>
          </p>
          <div className="flex shrink-0 gap-3">
            <LinkButton href={profile.resumePath} download={profile.resumeFileName} size="sm">
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              PDF
            </LinkButton>
            <LinkButton href="/contact" variant="secondary" size="sm">
              Contact me
            </LinkButton>
          </div>
        </div>
      </Section>
    </>
  );
}

/** One résumé section: label column on the left, content on the right. */
function ResumeRow({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-4 px-5 py-7 sm:px-8 sm:py-8 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-10 lg:px-10">
      <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-primary lg:pt-1">
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function ContactItem({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      <span className="shrink-0 text-primary">{icon}</span>
      <span className="min-w-0">{children}</span>
    </li>
  );
}
