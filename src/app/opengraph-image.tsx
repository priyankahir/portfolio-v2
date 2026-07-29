import { profile } from "@/data/profile";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: profile.availability.label,
    title: "I build full-stack apps that hold up in production.",
    subtitle: `${profile.role} · ${profile.experienceLabel} · ${profile.location}`,
    chips: ["MongoDB", "Express", "React", "Node.js", "Next.js"],
  });
}
