"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { TypeLine } from "@/components/animations/TypeLine";
import { Marquee } from "@/components/ui/Marquee";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { domains, profile } from "@/data/profile";

const ROLES = [
  "MERN Stack Developer",
  "React & Next.js Engineer",
  "Node.js & MongoDB Developer",
  "AI Interface Builder",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
      {/* Ambient background — decorative only, kept off the layout path. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="bg-grid mask-fade-y absolute inset-0 opacity-70" />
        <div className="absolute -top-24 left-1/2 h-[420px] w-[min(90vw,720px)] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 right-[8%] h-[320px] w-[320px] rounded-full bg-accent/10 blur-[110px]" />
      </div>

      <div className="container-page">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.09 }}
          className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16"
        >
          {/* ---- Copy ---- */}
          <div>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-primary-soft px-3.5 py-1.5 font-mono text-[11px] text-primary"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              {profile.availability.label}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-[2.5rem] font-semibold leading-[1.06] tracking-tight sm:text-6xl lg:text-[4.1rem]"
            >
              {/* No hard <br>: `text-wrap: balance` (globals.css) distributes the
                  lines per viewport. nowrap keeps the hyphen from breaking. */}
              I build <span className="whitespace-nowrap">full-stack</span> apps that{" "}
              <span className="text-gradient animate-[sheen_5s_ease-in-out_infinite] whitespace-nowrap">
                hold up
              </span>{" "}
              in production.
            </motion.h1>

            {/* Rotating role line — full text is in the DOM for crawlers. */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 flex flex-wrap items-center gap-x-2 font-mono text-sm text-muted sm:text-base"
            >
              <span className="text-faint" aria-hidden="true">
                $
              </span>
              <span className="text-primary">whoami</span>
              <span className="text-faint" aria-hidden="true">
                →
              </span>
              <TypeLine
                key={roleIndex}
                text={ROLES[roleIndex]}
                speed={45}
                // Only the first role waits; later ones start almost at once so
                // the line is never sitting visibly empty.
                delay={roleIndex === 0 ? 500 : 120}
                className="text-fg"
                onDone={() =>
                  setTimeout(
                    () => setRoleIndex((index) => (index + 1) % ROLES.length),
                    2600
                  )
                }
              />
            </motion.p>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="/projects"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-on-primary shadow-[0_8px_28px_-12px_var(--glow)] transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
              >
                View my work
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={profile.resumePath}
                download={profile.resumeFileName}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-line bg-surface px-6 text-sm font-medium transition-all duration-300 hover:border-line-strong hover:bg-surface-hover active:scale-[0.98]"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download CV
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3"
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
                      className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:text-primary"
                    >
                      <SocialIcon icon={social.icon} className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* ---- Portrait card ---- */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-sm lg:mx-0 lg:ml-auto"
          >
            <div className="panel-solid overflow-hidden">
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
                  alt={`${profile.name}, ${profile.role}`}
                  fill
                  priority
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
                    Focus
                  </dt>
                  <dd className="mt-1 font-mono text-sm text-primary">Full-stack</dd>
                </div>
              </dl>
            </div>

            <div
              aria-hidden="true"
              className="absolute -inset-3 -z-10 rounded-2xl border border-line/60"
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-16 border-y border-line py-4 md:mt-20">
        <Marquee items={domains} />
      </div>
    </section>
  );
}
