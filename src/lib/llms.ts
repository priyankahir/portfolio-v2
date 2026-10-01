import {
  education,
  experiences,
  faqs,
  profile,
  projects,
  services,
  skillGroups,
  sortedPosts,
} from "@/data";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { formatDateRange, formatMonth } from "@/lib/utils";

/**
 * Builders for /llms.txt and /llms-full.txt (https://llmstxt.org).
 * Everything is derived from `src/data`, so the files stay in sync with the
 * site without a second copy of the content.
 */

const link = (title: string, path: string, description?: string) =>
  `- [${title}](${absoluteUrl(path)})${description ? `: ${description}` : ""}`;

const coreSkills = Array.from(
  new Set(
    skillGroups.flatMap((group) =>
      group.skills.filter((skill) => skill.level === "core").map((skill) => skill.name)
    )
  )
);

const contactLine = `Email ${profile.email} · ${absoluteUrl("/contact")}`;

function keyFacts(): string[] {
  const current = experiences.find((experience) => experience.end === null) ?? experiences[0];
  return [
    `- Name: ${profile.name}`,
    `- Role: ${profile.headline}`,
    `- Location: ${profile.location}`,
    `- Experience: ${profile.experienceLabel} (professional since ${formatMonth(profile.careerStart)})`,
    ...(current ? [`- Current position: ${current.role} at ${current.company}`] : []),
    `- Core skills: ${coreSkills.join(", ")}`,
    `- Availability: ${profile.availability.open ? profile.availability.label : "Not currently looking"}`,
    `- Contact: ${contactLine}`,
  ];
}

const sitePages = () => [
  link("Home", "/", `Overview of ${profile.name}'s work, featured projects and FAQs`),
  link("About", "/about", "Background, experience timeline, skills and working principles"),
  link("Resume", "/resume", "Experience, education and skills on one page"),
  link("Resume (PDF)", profile.resumePath, "Downloadable resume"),
  link("Contact", "/contact", "Email, WhatsApp and contact form"),
];

/** Short, link-first summary for AI assistants. */
export function buildLlmsTxt(): string {
  return [
    `# ${profile.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    profile.tagline,
    "",
    "## Key facts",
    "",
    ...keyFacts(),
    "",
    "## Pages",
    "",
    ...sitePages(),
    "",
    "## Projects",
    "",
    link("All projects", "/projects", "Index of case studies"),
    ...projects.map((project) =>
      link(`${project.title} (${project.domain}, ${project.year})`, `/projects/${project.slug}`, project.summary)
    ),
    "",
    "## Blog",
    "",
    link("All articles", "/blog", "Engineering notes on React, Next.js and the MERN stack"),
    ...sortedPosts.map((post) => link(post.title, `/blog/${post.slug}`, post.excerpt)),
    "",
    "## Optional",
    "",
    link("Full profile for LLMs", "/llms-full.txt", "Complete experience, case studies, skills, services and FAQs as markdown"),
    link("RSS feed", "/rss.xml", "Blog feed"),
    "",
  ].join("\n");
}

/** The whole profile as clean markdown, for assistants that want full context. */
export function buildLlmsFullTxt(): string {
  const sections: string[] = [
    `# ${profile.name} — ${profile.role}`,
    "",
    `> ${siteConfig.description}`,
    "",
    `Website: ${absoluteUrl("/")}`,
    "",
    "## Key facts",
    "",
    ...keyFacts(),
    "",
    "## Summary",
    "",
    ...profile.summary.flatMap((paragraph) => [paragraph, ""]),
    "## Experience",
    "",
  ];

  for (const experience of experiences) {
    sections.push(
      `### ${experience.role} — ${experience.company}`,
      "",
      `${formatDateRange(experience.start, experience.end)} · ${experience.type} · ${experience.location}`,
      "",
      experience.summary,
      "",
      ...experience.highlights.map((highlight) => `- ${highlight}`),
      "",
      `Stack: ${experience.stack.join(", ")}`,
      ""
    );
  }

  sections.push("## Projects", "");
  for (const project of projects) {
    sections.push(
      `### ${project.title} — ${project.subtitle}`,
      "",
      `${project.domain} · ${project.year} · ${project.status} · ${project.role}`,
      `Case study: ${absoluteUrl(`/projects/${project.slug}`)}`,
      "",
      project.summary,
      "",
      "**Problem.** " + project.problem,
      "",
      "**Approach.**",
      "",
      ...project.approach.map((step) => `- ${step}`),
      "",
      "**Outcome.** " + project.outcome,
      "",
      ...(project.metrics.length
        ? [project.metrics.map((metric) => `${metric.label}: ${metric.value}`).join(" · "), ""]
        : []),
      `Stack: ${project.stack.join(", ")}`,
      ""
    );
  }

  sections.push("## Skills", "");
  for (const group of skillGroups) {
    sections.push(
      `### ${group.title}`,
      "",
      group.description,
      "",
      `${group.skills.map((skill) => `${skill.name} (${skill.level})`).join(", ")}`,
      ""
    );
  }

  sections.push("## Services", "");
  for (const service of services) {
    sections.push(
      `### ${service.title}`,
      "",
      service.description,
      "",
      ...service.deliverables.map((deliverable) => `- ${deliverable}`),
      ""
    );
  }

  sections.push("## Education", "");
  for (const entry of education) {
    sections.push(
      `- ${entry.degree}, ${entry.institution} (${entry.board}), ${formatMonth(entry.start)} – ${formatMonth(entry.end)}, ${entry.score}, ${entry.location}`
    );
  }
  sections.push("");

  sections.push("## FAQs", "");
  for (const faq of faqs) {
    sections.push(`### ${faq.question}`, "", faq.answer, "");
  }

  sections.push("## Blog", "");
  for (const post of sortedPosts) {
    sections.push(
      `### [${post.title}](${absoluteUrl(`/blog/${post.slug}`)})`,
      "",
      `${post.publishedAt.slice(0, 10)} · ${post.category} · ${post.readingMinutes} min read`,
      "",
      post.excerpt,
      ""
    );
  }

  sections.push("## Links", "", ...sitePages(), link("Blog", "/blog"), link("Projects", "/projects"), "");

  return sections.join("\n");
}

/** Plain-text response with caching suited to content that changes per deploy. */
export function textResponse(body: string): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
