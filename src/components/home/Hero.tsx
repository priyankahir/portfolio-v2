import { ArrowDown, Download, MapPin } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { Tilt } from "@/components/animations/Tilt";
import { RoleTicker } from "@/components/home/RoleTicker";
import { Marquee } from "@/components/ui/Marquee";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { TechIcon, type TechName } from "@/components/ui/TechIcon";
import { domains, profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { getExperience } from "@/lib/experience";

const ROLES = [
  "MERN Stack Developer",
  "React & Next.js Developer",
  "Node.js & Express API Developer",
  "AI Feature Builder",
];

/** The four layers of the stack, in request order. */
const STACK: { icon: TechName; name: string; layer: string }[] = [
  { icon: "mongodb", name: "MongoDB", layer: "Database" },
  { icon: "express", name: "Express", layer: "API" },
  { icon: "react", name: "React", layer: "Interface" },
  { icon: "nodejs", name: "Node.js", layer: "Runtime" },
];

/** Languages and libraries orbiting the portrait, evenly spaced. */
const ORBIT: TechName[] = [
  "react",
  "nodejs",
  "typescript",
  "mongodb",
  "nextjs",
  "express",
  "javascript",
  "tailwind",
];

/**
 * When the pulse on the rail reaches each node, in seconds. Derived from the
 * `flow-x` keyframes: a 30%-wide pulse travelling -30% → 102% of the rail in
 * 3.2s reaches a node at fraction p after 3.2 × (p + 0.15) / 1.32.
 */
const NODE_DELAYS = [0, 1 / 3, 2 / 3, 1].map((p) => `${((3.2 * (p + 0.15)) / 1.32).toFixed(2)}s`);

/**
 * Headline, split into words for the masked rise. `accent` words get the
 * gradient; the `underline` word also gets the hand-drawn stroke.
 * "Schema to screen" is the whole MERN stack in three words: MongoDB model
 * at one end, React interface at the other.
 */
const HEADLINE: { text: string; accent?: boolean; underline?: boolean }[] = [
  { text: "I" },
  { text: "build" },
  { text: "MERN" },
  { text: "apps" },
  { text: "from" },
  { text: "schema", accent: true },
  { text: "to" },
  { text: "screen.", accent: true, underline: true },
];

/** Grid beams: x position (on 56px grid lines, kept clear of the text
 *  column), speed and offset. */
const BEAMS = [
  { left: "56px", duration: "8s", delay: "0s" },
  { left: "calc(56px * 13)", duration: "10s", delay: "-4s" },
  { left: "calc(56px * 25)", duration: "9s", delay: "-6.5s" },
];

/** Stagger offset for the CSS `.enter` animation, in ms. */
const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

/**
 * Server component on purpose: the headline and portrait are the LCP
 * candidates, so they must be in the initial HTML rather than waiting for a JS
 * animation library to hydrate. All motion here is CSS (see "Hero motion" in
 * globals.css) — transform/opacity only, and flattened for reduced motion.
 */
export function Hero() {
  const experience = getExperience();

  return (
    <section
      aria-labelledby="hero-title"
      data-spotlight
      className="noise relative overflow-hidden pt-28 pb-10 md:pt-36 md:pb-12"
    >
      {/* Ambient background — generated in CSS instead of an image or video, so
          it costs no bytes and can never become the LCP element. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora absolute -inset-[15%]" />
        <div className="mask-fade-y absolute inset-0">
          <div className="bg-grid absolute inset-0 opacity-70" />
          {BEAMS.map((beam) => (
            <span
              key={beam.left}
              className="grid-beam hidden md:block"
              style={
                {
                  left: beam.left,
                  "--beam-duration": beam.duration,
                  "--beam-delay": beam.delay,
                } as CSSProperties
              }
            />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          {/* ---- Copy ---- */}
          <div>
            {/* Name and role live inside the h1 so the page's primary heading
                carries the terms people actually search for. */}
            <h1 id="hero-title">
              <span
                className="enter block font-sans text-base font-medium tracking-normal text-muted sm:text-lg"
                style={delay(60)}
              >
                {profile.name}
                <span aria-hidden="true" className="mx-2 text-faint">
                  /
                </span>
                <span className="whitespace-nowrap text-fg">{profile.role}</span>
              </span>

              {/* Words rise out of a mask one after another. Transform-only, so
                  the line's layout box is final from the first frame and
                  `text-wrap: balance` still decides the line breaks. */}
              <span className="mt-3 block text-[2.5rem] font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-[4.1rem]">
                {HEADLINE.map((word, index) => (
                  <span key={word.text}>
                    {word.underline ? (
                      <span className="relative inline-block">
                        <span className="word">
                          {/* Rise and sheen are separate animations, so they
                              live on separate spans. */}
                          <span style={{ "--i": index } as CSSProperties}>
                            <span className="text-gradient animate-[sheen_5s_ease-in-out_infinite]">
                              {word.text}
                            </span>
                          </span>
                        </span>
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 200 12"
                          preserveAspectRatio="none"
                          className="draw absolute -bottom-[0.12em] left-0 h-[0.22em] w-full text-primary"
                        >
                          <path
                            d="M2 9 C 40 3, 90 3, 130 6 S 185 9, 198 4"
                            pathLength={1}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    ) : (
                      <span className="word">
                        <span style={{ "--i": index } as CSSProperties}>
                          {word.accent ? (
                            <span className="text-gradient animate-[sheen_5s_ease-in-out_infinite]">
                              {word.text}
                            </span>
                          ) : (
                            word.text
                          )}
                        </span>
                      </span>
                    )}
                    {index < HEADLINE.length - 1 && " "}
                  </span>
                ))}
              </span>
            </h1>

            {/* Rotating role line — full text is in the DOM for crawlers. */}
            <p
              className="enter mt-6 flex min-h-[1.75rem] flex-wrap items-center gap-x-2 font-mono text-sm text-muted sm:text-base"
              style={delay(420)}
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
              style={delay(480)}
            >
              {profile.tagline}
            </p>

            <div
              className="enter mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={delay(540)}
            >
              <a
                  href="#work"
                  className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-on-primary transition-[filter] duration-200 hover:brightness-110 sm:w-auto"
                >
                  See my projects
                  <ArrowDown
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
                <a
                  href={profile.resumePath}
                  download={profile.resumeFileName}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-line bg-surface px-6 text-sm font-medium transition-colors duration-200 hover:border-line-strong hover:bg-surface-hover sm:w-auto"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download CV
                </a>
            </div>

            {/* MERN "data flow": a pulse runs along the rail and each layer
                lights up as it passes. Decorative motion over a real list. */}
            <ol
              aria-label="Core stack"
              className="enter relative mt-10 grid max-w-md grid-cols-4 gap-2"
              style={delay(620)}
            >
              <span
                aria-hidden="true"
                className="flow-line absolute left-[12.5%] right-[12.5%] top-5 h-px overflow-hidden bg-line"
              />
              {STACK.map((item, index) => (
                <li key={item.name} className="relative flex flex-col items-center text-center">
                  <span
                    aria-hidden="true"
                    className="flow-node grid h-10 w-10 place-items-center rounded-full border border-line bg-elevated"
                    style={{ "--node-delay": NODE_DELAYS[index] } as CSSProperties}
                  >
                    <TechIcon name={item.icon} className="h-5 w-5" />
                  </span>
                  <span className="mt-2 font-mono text-[11px] text-fg">{item.name}</span>
                  <span className="text-[10px] uppercase tracking-wider text-faint">
                    {item.layer}
                  </span>
                </li>
              ))}
            </ol>

            <div
              className="enter mt-9 flex flex-wrap items-center gap-x-5 gap-y-3"
              style={delay(700)}
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
                      className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-surface text-muted transition-colors duration-200 hover:border-line-strong hover:text-primary"
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
            className="enter relative isolate mx-auto w-full max-w-sm lg:mx-0 lg:ml-auto"
            style={delay(160)}
          >
            {/* Orbit of the four stack layers behind the card (desktop). The
                card hides each node as it passes behind, which reads as depth. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 lg:block"
            >
              <div className="absolute inset-0 rounded-full border border-dashed border-line" />
              <div className="absolute inset-[12%] rounded-full border border-line opacity-60" />
              <div className="orbit absolute inset-0">
                {ORBIT.map((icon, index) => (
                  <span
                    key={icon}
                    className="orbit-node"
                    style={
                      {
                        "--a": `${(index * 360) / ORBIT.length + 10}deg`,
                        "--r": "270px",
                      } as CSSProperties
                    }
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-elevated shadow-[0_10px_30px_-12px_var(--glow)]">
                      <TechIcon name={icon} className="h-6 w-6" />
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <Tilt max={5}>
              <div className="border-beam rounded-[var(--radius-panel)]">
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
                        {experience.label}
                      </dd>
                    </div>
                    <div className="bg-elevated p-4">
                      <dt className="font-mono text-[10px] uppercase tracking-widest text-faint">
                        Products shipped
                      </dt>
                      <dd className="mt-1 font-mono text-sm text-primary">
                        {projects.length} in production
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </Tilt>

            {/* Floating stack badges for tablet widths, where the orbit would
                not fit. Decorative, transform-only animation. */}
            <span
              aria-hidden="true"
              className="float absolute -left-4 top-16 hidden items-center gap-2 rounded-lg border border-line bg-elevated/90 px-3 py-2 font-mono text-[11px] text-fg shadow-lg backdrop-blur sm:flex lg:hidden"
            >
              <TechIcon name="mongodb" className="h-4 w-4" />
              <TechIcon name="express" className="h-4 w-4" />
              MongoDB · Express
            </span>
            <span
              aria-hidden="true"
              className="float absolute -right-4 bottom-28 hidden items-center gap-2 rounded-lg border border-line bg-elevated/90 px-3 py-2 font-mono text-[11px] text-fg shadow-lg backdrop-blur sm:flex lg:hidden"
              style={{ animationDelay: "-3s" }}
            >
              <TechIcon name="react" className="h-4 w-4" />
              <TechIcon name="nodejs" className="h-4 w-4" />
              React · Node.js
            </span>
          </div>
        </div>

        {/* Scroll cue */}
        <a
          href="#work"
          aria-label="Scroll to projects"
          className="enter group mx-auto mt-14 hidden w-fit flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint transition-colors hover:text-primary md:flex"
          style={delay(900)}
        >
          <span className="flex h-8 w-5 justify-center rounded-full border border-line-strong pt-1.5">
            <span className="scroll-wheel h-1.5 w-0.5 rounded-full bg-primary" />
          </span>
          Scroll
        </a>
      </div>

      <div className="mt-10 border-y border-line py-4 md:mt-12">
        <Marquee items={domains} />
      </div>
    </section>
  );
}
