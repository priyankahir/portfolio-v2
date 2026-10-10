import type { Profile, Stat } from "@/types";
import { projects } from "./projects";

export const profile: Profile = {
  name: "Priyank Baldaniya",
  role: "MERN Stack Developer",
  headline: "MERN Stack Developer — MongoDB, Express, React, Node.js & Next.js",
  // Single source for every experience figure on the site. Never store a
  // computed duration anywhere — use `getExperience()` from src/lib/experience.
  careerStart: "2025-01-01",
  tagline:
    "Full-stack developer at Vivansh Infotech LLP, shipping SaaS products end to end — Express APIs, MongoDB data models and fast, accessible React interfaces.",
  summary: [
    "I work on the parts of a product that carry the most weight: role-based dashboards, ticketing workflows, Stripe and Razorpay payments, report builders and an AI assistant.",
    "On the server that means Express APIs with JWT auth and Mongoose schemas built around real queries. On the client, server-rendered React with deliberate caching and every loading, empty and error state handled.",
  ],
  location: "Ahmedabad, Gujarat, India",
  locationShort: "AHMEDABAD, IN",
  email: "priyankahir333@gmail.com",
  phone: "+91 99797 00935",
  phoneRaw: "919979700935",
  avatar: "/images/profile.png",
  resumePath: "/images/Priyank_Baldaniya_FullStack.pdf",
  resumeFileName: "Priyank-Baldaniya-MERN-Stack-Developer.pdf",
  availability: {
    open: true,
    label: "Open to MERN stack & full stack roles",
  },
  socials: [
    {
      label: "GitHub",
      url: "https://github.com/priyankahir",
      icon: "github",
      handle: "@priyankahir",
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/priyank-baldaniya-6073002b6/",
      icon: "linkedin",
      handle: "priyank-baldaniya",
    },
    {
      label: "Email",
      url: "mailto:priyankahir333@gmail.com",
      icon: "mail",
      handle: "priyankahir333@gmail.com",
    },
    {
      label: "WhatsApp",
      url: "https://wa.me/919979700935",
      icon: "whatsapp",
      handle: "+91 99797 00935",
    },
  ],
};

/**
 * Headline numbers. The experience tile is not here: it's time-dependent, so
 * components prepend `experienceStat()` from src/lib/experience at render time.
 */
export const stats: Stat[] = [
  {
    label: "Products delivered",
    value: String(projects.length),
    hint: "EHS, AI, franchise, stock, assessment and real estate",
  },
  {
    label: "Stack",
    value: "MERN",
    hint: "MongoDB · Express · React · Node.js",
  },
  {
    label: "Framework",
    value: "Next.js",
    hint: "App Router · Server Components · SSR / SSG",
  },
];

/** Domains worked in — rendered as the marquee strip under the hero. */
export const domains: string[] = [
  "EHS & Compliance",
  "AI / LLM Interfaces",
  "Payments (Stripe & Razorpay)",
  "Franchise Management",
  "Stock & Inventory",
  "Psychometric Assessment",
  "Real Estate",
];
