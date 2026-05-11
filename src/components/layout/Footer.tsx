import Link from "next/link";
import { developerDetails } from "@/data/developer";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-8 md:py-12 mb-16 mt-auto">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 text-center md:text-left">
        <p className="text-xs sm:text-sm text-secondary font-terminal order-2 md:order-1">
          © {new Date().getFullYear()} {developerDetails.name}. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 font-terminal order-1 md:order-2">
          <Link href={developerDetails.socials.github} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors text-[10px] sm:text-xs">
            [ GITHUB ]
          </Link>
          <Link href={developerDetails.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors text-[10px] sm:text-xs">
            [ LINKEDIN ]
          </Link>
          <Link href={developerDetails.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors text-[10px] sm:text-xs">
            [ WHATSAPP ]
          </Link>
        </div>
      </div>
    </footer>
  );
}
