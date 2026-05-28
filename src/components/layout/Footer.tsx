import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { getAboutQuery } from "@/sanity/lib/queries";

interface SocialLink {
  platform: string;
  url: string;
}

interface AboutData {
  name?: string;
  socials?: SocialLink[];
}

export async function Footer() {
  let about: AboutData | null = null;
  try {
    about = await client.fetch(getAboutQuery);
  } catch (error) {
    console.warn("Failed to fetch data from Sanity in Footer.", error);
  }

  const getSocialUrl = (platform: string) => {
    if (!about?.socials) return "#";
    const link = about.socials.find((s) => s.platform.toLowerCase() === platform.toLowerCase());
    return link ? link.url : "#";
  };

  const whatsappLink = getSocialUrl('whatsapp');
  const githubLink = getSocialUrl('github');
  const linkedinLink = getSocialUrl('linkedin');

  return (
    <footer className="border-t border-border/40 py-8 md:py-12 mb-16 mt-auto">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 text-center md:text-left">
        <p className="text-xs sm:text-sm text-secondary font-terminal order-2 md:order-1">
          © {new Date().getFullYear()} {about?.name || "Developer"}. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 font-terminal order-1 md:order-2">
          {githubLink !== "#" && (
            <Link href={githubLink} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors text-[10px] sm:text-xs">
              [ GITHUB ]
            </Link>
          )}
          {linkedinLink !== "#" && (
            <Link href={linkedinLink} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors text-[10px] sm:text-xs">
              [ LINKEDIN ]
            </Link>
          )}
          {whatsappLink !== "#" && (
            <Link href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors text-[10px] sm:text-xs">
              [ WHATSAPP ]
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
