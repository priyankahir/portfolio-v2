import Link from "next/link";
import { developerDetails } from "@/data/developer";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-8 mt-auto">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-secondary">
          © {new Date().getFullYear()} {developerDetails.name}. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href={developerDetails.socials.github} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors text-sm">
            GitHub
          </Link>
          <Link href={developerDetails.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors text-sm">
            LinkedIn
          </Link>
          <Link href={developerDetails.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors text-sm">
            Twitter
          </Link>
        </div>
      </div>
    </footer>
  );
}
