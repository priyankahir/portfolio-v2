import Link from "next/link";
import { developerDetails } from "@/data/developer";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-12 mb-16 mt-auto">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-secondary font-terminal">
          © {new Date().getFullYear()} {developerDetails.name}. All rights reserved.
        </p>
        <div className="flex gap-6 font-terminal">
          <Link href={developerDetails.socials.github} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors text-xs">
            [ GITHUB ]
          </Link>
          <Link href={developerDetails.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors text-xs">
            [ LINKEDIN ]
          </Link>
          <Link href={developerDetails.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors text-xs">
            [ WHATSAPP ]
          </Link>
        </div>
      </div>
    </footer>
  );
}
