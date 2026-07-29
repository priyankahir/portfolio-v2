import type { Profile, Stat } from "@/types";

export const profile: Profile = {
  name: "Priyank Baldaniya",
  role: "MERN Stack Developer",
  headline: "MERN Stack Developer — React, Next.js, Node.js & MongoDB",
  experienceLabel: "1.7+ years",
  careerStart: "2025-01",
  tagline:
    "I build full-stack web applications end to end — React and Next.js on the front, Node.js, Express and MongoDB behind it — with a bias toward interfaces that stay fast under real production load.",
  summary: [
    "I'm a MERN stack developer based in Ahmedabad, India, working across EHS compliance, AI tooling, fintech, franchise management and stock-trading products. My work runs from the database schema through the API layer to the interface people actually use.",
    "Most of it lives in the hard parts of a product: dynamic form engines, report builders, role-based dashboards and data-heavy tables where a careless query or a careless re-render both cost real money. I care about architecture that survives the second and third feature request, not just the first.",
    "Lately I've been shipping AI-facing features — chat surfaces backed by RAG and vector search, document-summary pipelines, and adaptive question generation — which means designing for streaming, latency and gracefully wrong answers on both sides of the wire.",
  ],
  location: "Ahmedabad, Gujarat, India",
  locationShort: "AHMEDABAD, IN",
  email: "priyankahir333@gmail.com",
  phone: "+91 99797 00935",
  phoneRaw: "919979700935",
  avatar: "/images/profile.jpeg",
  resumePath: "/images/Priyank Baldaniya Frontend CV.pdf",
  resumeFileName: "Priyank-Baldaniya-MERN-Developer.pdf",
  availability: {
    open: true,
    label: "Open to MERN stack roles",
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

export const stats: Stat[] = [
  {
    label: "Experience",
    value: "1.7",
    suffix: "+ yrs",
    hint: "Shipping production web apps since Jan 2025",
  },
  {
    label: "Products shipped",
    value: "6",
    suffix: "+",
    hint: "SaaS platforms across six distinct domains",
  },
  {
    label: "Stack",
    value: "MERN",
    hint: "MongoDB · Express · React · Node.js",
  },
  {
    label: "Also fluent in",
    value: "Next.js",
    hint: "TypeScript · Tailwind · TanStack Query",
  },
];

/** Domains worked in — rendered as the marquee strip under the hero. */
export const domains: string[] = [
  "EHS & Compliance",
  "AI / LLM Interfaces",
  "Fintech & Payments",
  "Franchise Management",
  "Stock Trading",
  "Psychometric Assessment",
  "Real Estate",
];
