import type { Profile, Stat } from "@/types";

export const profile: Profile = {
  name: "Priyank Baldaniya",
  role: "MERN Stack Developer",
  headline: "MERN Stack Developer — React, Next.js, Node.js, Express & MongoDB",
  experienceLabel: "1.9+ years",
  careerStart: "2025-01",
  tagline:
    "Full stack developer building production web apps on the MERN stack — React and Next.js on the front end, Node.js, Express and MongoDB behind it — with a focus on fast, maintainable interfaces and APIs that hold up in production.",
  summary: [
    "I'm a MERN stack developer based in Ahmedabad, India, with 1.9+ years of building production-grade web applications in React.js, Next.js, TypeScript, Node.js, Express and MongoDB. I've delivered features across SaaS products in EHS compliance, AI tooling, franchise management, stock operations and assessments, working in Agile/Scrum teams alongside backend, design, QA and product.",
    "Most of my work sits in the parts of a product that carry the most weight: multi-tenant and role-based dashboards, ticket and corrective-action workflows, Stripe and Razorpay payment flows, dynamic report builders and data-heavy screens. On the server side that means Express REST APIs with middleware, JWT authentication and authorisation, and Mongoose schemas designed around how the data is actually queried.",
    "I also build AI and real-time features: a Claude API assistant grounded with RAG over a vector database, an AI report builder, and a live AI-to-human support handoff over Socket.IO. Across all of it I care about performance and SEO as engineering work — code splitting, lazy loading, image optimisation, and proper metadata, sitemaps and semantic markup.",
  ],
  location: "Ahmedabad, Gujarat, India",
  locationShort: "AHMEDABAD, IN",
  email: "priyankahir333@gmail.com",
  phone: "+91 99797 00935",
  phoneRaw: "919979700935",
  avatar: "/images/profile.png",
  resumePath: "/images/Priyank_Baldaniya_FullStack.pdf",
  resumeFileName: "Priyank-Baldaniya-FullStack.pdf",
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

export const stats: Stat[] = [
  {
    label: "Experience",
    value: "1.9",
    suffix: "+ yrs",
    hint: "Building production web apps since Jan 2025",
  },
  {
    label: "Products delivered",
    value: "6",
    suffix: "+",
    hint: "SaaS, EHS, AI, franchise, stock and assessment platforms",
  },
  {
    label: "Stack",
    value: "MERN",
    hint: "MongoDB · Express · React · Node.js",
  },
  {
    label: "Also fluent in",
    value: "Next.js",
    hint: "TypeScript · Tailwind CSS · TanStack Query · Socket.IO",
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
