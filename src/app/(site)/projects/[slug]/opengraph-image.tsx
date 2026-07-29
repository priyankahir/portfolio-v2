import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Project case study";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return renderOgImage({
    eyebrow: `Case study · ${project.domain}`,
    title: project.title,
    subtitle: project.subtitle,
    chips: project.stack,
  });
}
