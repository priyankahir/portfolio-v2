import { ArrowDown, Download, MapPin } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { Magnetic } from "@/components/animations/Magnetic";
import { Tilt } from "@/components/animations/Tilt";
import { RoleTicker } from "@/components/home/RoleTicker";
import { Marquee } from "@/components/ui/Marquee";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { domains, profile } from "@/data/profile";
import { projects } from "@/data/projects";

const ROLES = [
  "MERN Stack Developer",
  "React & Next.js Engineer",
  "Node.js & MongoDB Developer",
  "AI Interface Builder",
];

/** Stagger offset for the CSS `.enter` animation, in ms. */
const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

/**
 * Server component on purpose: the headline and portrait are the LCP
 * candidates, so they must be visible in the initial HTML rather than waiting
 * for a JS animation library to hydrate. Entrance motion is CSS-only.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      data-spotlight
      className="noise relative overflow-hidden pt-28 pb-14 md:pt-36 md:pb-16"
    >
      {/* Ambient background — generated in CSS instead of an image or video, so
          it costs no bytes and can never become the LCP element. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora absolute -inset-[15%]" />
        <div className="bg-grid mask-fade-y absolute inset-0 opacity-70" />
      </div>

      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          {/* ---- Copy ---- */}
          <div>
            <p
              className="enter inline-flex items-center gap-2 rounded-full border border-line-strong bg-primary-soft px-3.5 py-1.5 font-mono text-[11px] text-primary"
              style={delay(0)}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              {profile.availability.label}
            </p>

            {/* Name and role live inside the h1 so the page's primary heading
                carries the terms people actually search for. */}
            <h1 id="hero-title" className="mt-6">
              <span
                className="enter block font-sans text-base font-medium tracking-normal text-muted sm:text-lg"
                style={delay(60)}
              >
                {profile.name}
                <span aria-hidden="true" className="mx-2 text-faint">
                  /
                </span>
                <span className="text-fg">{profile.role}</span>
              </span>
              {/* No entrance animation: this line is the LCP element, and a
                  fade-in would delay the moment it counts as painted. */}
              <span className="mt-3 block text-[2.5rem] font-semibold leading-[1.06] tracking-tight sm:text-6xl lg:text-[4.1rem]">
                {/* No hard <br>: `text-wrap: balance` distributes the lines per
                    viewport. nowrap keeps the hyphen from breaking. */}
                I build <span className="whitespace-nowrap">full-stack</span> apps that{" "}
                <span className="text-gradient animate-[sheen_5s_ease-in-out_infinite] whitespace-nowrap">
                  hold up
                </span>{" "}
                in production.
              </span>
            </h1>

            {/* Rotating role line — full text is in the DOM for crawlers. */}
            <p
              className="enter mt-6 flex min-h-[1.75rem] flex-wrap items-center gap-x-2 font-mono text-sm text-muted sm:text-base"
              style={delay(180)}
            >
              <span className="text-faint" aria-hidden="true">
                $
              </span>
              <span className="text-primary">whoami</span>
              <span className="text-faint" aria-hidden="true">
                →
              </span>
              <RoleTicker roles={ROLES} />
            </p>

            <p
              className="enter mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
              style={delay(240)}
            >
              {profile.tagline}
            </p>

            <div
              className="enter mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={delay(300)}
            >
              <Magnetic className="w-full sm:w-auto [&>*]:w-full">
                <a
                  href="#work"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-on-primary shadow-[0_8px_28px_-12px_var(--glow)] transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
                >
                  See my projects
                  <ArrowDown
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </Magnetic>
              <Magnetic className="w-full sm:w-auto [&>*]:w-full">
                <a
                  href={profile.resumePath}
                  download={profile.resumeFileName}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-line bg-surface px-6 text-sm font-medium transition-all duration-300 hover:border-line-strong hover:bg-surface-hover active:scale-[0.98]"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download CV
                </a>
              </Magnetic>
            </div>

            <div
              className="enter mt-9 flex flex-wrap items-center gap-x-5 gap-y-3"
              style={delay(360)}
            >
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-faint">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {profile.location}
              </span>
              <span aria-hidden="true" className="hidden h-4 w-px bg-line sm:block" />
              <ul className="flex items-center gap-2">
                {profile.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.url}
                      target={social.url.startsWith("http") ? "_blank" : undefined}
                      rel={
                        social.url.startsWith("http")
                          ? "me noopener noreferrer"
                          : undefined
                      }
                      aria-label={social.label}
                      className="grid h-10 w-10 place-items-center rounded-lg border border-line text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:text-primary"
                    >
                      <SocialIcon icon={social.icon} className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ---- Portrait card ---- */}
          <div
            className="enter relative mx-auto w-full max-w-sm lg:mx-0 lg:ml-auto"
            style={delay(160)}
          >
            <Tilt max={5}>
              <div className="panel-solid overflow-hidden shadow-[0_24px_60px_-28px_var(--glow)]">
                <div className="flex items-center gap-3 border-b border-line bg-bg-subtle px-4 py-2.5">
                  <div aria-hidden="true" className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
                  </div>
                  <span className="flex-1 truncate text-center font-mono text-[11px] text-faint">
                    ~/priyank/profile
                  </span>
                </div>

                <div className="relative aspect-[4/5]">
                  <Image
                    src={profile.avatar}
                    alt={`${profile.name}, ${profile.role} based in ${profile.location}`}
                    fill
                    // LCP image: `priority` is deprecated in Next 16 — the docs
                    // recommend eager loading plus a high fetch priority instead.
                    loading="eager"
                    fetchPriority="high"
                    sizes="(max-width: 1024px) 384px, 420px"
                    className="object-cover object-center"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-elevated via-elevated/10 to-transparent"
                  />
                </div>

                <dl className="grid grid-cols-2 gap-px border-t border-line bg-line">
                  <div className="bg-elevated p-4">
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-faint">
                      Experience
                    </dt>
                    <dd className="mt-1 font-mono text-sm text-primary">
                      {profile.experienceLabel}
                    </dd>
                  </div>
                  <div className="bg-elevated p-4">
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-faint">
                      Products shipped
                    </dt>
                    <dd className="mt-1 font-mono text-sm text-primary">
                      {projects.length}+ in production
                    </dd>
                  </div>
                </dl>
              </div>
            </Tilt>

            <div
              aria-hidden="true"
              className="absolute -inset-3 -z-10 rounded-2xl border border-line/60"
            />

            {/* Floating stack badges — decorative, transform-only animation. */}
            <span
              aria-hidden="true"
              className="float absolute -left-4 top-16 hidden items-center gap-2 rounded-lg border border-line bg-elevated/90 px-3 py-2 font-mono text-[11px] text-fg shadow-lg backdrop-blur sm:flex"
            >
              <span className="h-2 w-2 rounded-full bg-[#47a248]" />
              MongoDB · Express
            </span>
            <span
              aria-hidden="true"
              className="float absolute -right-4 bottom-28 hidden items-center gap-2 rounded-lg border border-line bg-elevated/90 px-3 py-2 font-mono text-[11px] text-fg shadow-lg backdrop-blur sm:flex"
              style={{ animationDelay: "-3s" }}
            >
              <span className="h-2 w-2 rounded-full bg-[#61dafb]" />
              React · Node.js
            </span>
          </div>
        </div>
      </div>

      <div className="mt-14 border-y border-line py-4 md:mt-16">
        <Marquee items={domains} />
      </div>
    </section>
  );
}
