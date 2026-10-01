import Link from "next/link";
import { footerLinks } from "@/data/navigation";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line bg-bg-subtle print:hidden">
      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-display text-base font-semibold tracking-tight"
            >
              <Logo className="h-8 w-8" />
              {profile.name}
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {profile.role} building fast, accessible web applications with React,
              Next.js, Node.js and MongoDB. Based in {profile.location}.
            </p>

            {profile.availability.open && (
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line-strong bg-primary-soft px-3 py-1.5 font-mono text-[11px] text-primary">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                {profile.availability.label}
              </p>
            )}
          </div>

          {footerLinks.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="mb-4 font-mono text-[11px] uppercase tracking-widest text-faint">
                {column.title}
              </h2>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="link-underline text-sm text-muted transition-colors hover:text-fg"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Every case study linked from every page — keeps them one click from
              anywhere for visitors and crawlers alike. */}
          <nav aria-label="Projects">
            <h2 className="mb-4 font-mono text-[11px] uppercase tracking-widest text-faint">
              Projects
            </h2>
            <ul className="space-y-2.5">
              {projects.map((project) => (
                <li key={project.id}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="link-underline text-sm text-muted transition-colors hover:text-fg"
                  >
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center gap-6 border-t border-line pt-8 sm:flex-row sm:justify-between">
          <p className="text-center font-mono text-[11px] text-faint sm:text-left">
            © {year} {profile.name}. Built with Next.js &amp; Tailwind CSS.
          </p>

          <ul className="flex items-center gap-2">
            {profile.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.url}
                  target={social.url.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.url.startsWith("http") ? "me noopener noreferrer" : undefined
                  }
                  aria-label={social.label}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-primary"
                >
                  <SocialIcon icon={social.icon} className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
