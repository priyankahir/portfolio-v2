import type { SkillGroup } from "@/types";

/**
 * Levels describe how often a skill is used, not a proficiency score:
 * core = daily driver, strong = comfortable, working = working knowledge.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "react",
    title: "React & Next.js",
    command: "next build",
    icon: "Atom",
    description:
      "Reusable component architecture with server components first and client components only where interaction needs them.",
    skills: [
      { name: "React.js", level: "core" },
      { name: "Next.js App Router", level: "core" },
      { name: "Server Components", level: "strong" },
      { name: "SSR / SSG", level: "strong" },
      { name: "Pages Router", level: "strong" },
      { name: "Hooks & Context API", level: "core" },
    ],
  },
  {
    id: "backend",
    title: "Node.js & Express",
    command: "node server.js",
    icon: "Server",
    description:
      "REST APIs on Node.js and Express — middleware, authentication and authorisation handled at the boundary, not bolted on later.",
    skills: [
      { name: "Node.js", level: "core" },
      { name: "Express.js", level: "core" },
      { name: "REST API Design", level: "strong" },
      { name: "Middleware", level: "strong" },
      { name: "JWT Authentication", level: "strong" },
      { name: "Role-Based Authorisation", level: "working" },
    ],
  },
  {
    id: "database",
    title: "MongoDB",
    command: "mongosh",
    icon: "Database",
    description:
      "Mongoose schemas modelled on how the data is read, with indexes for the queries the app actually runs.",
    skills: [
      { name: "MongoDB", level: "core" },
      { name: "Mongoose", level: "strong" },
      { name: "Schema Design", level: "strong" },
    ],
  },
  {
    id: "languages",
    title: "Languages",
    command: "tsc --version",
    icon: "Code2",
    description: "Typed by default. Strict mode on, `any` treated as a code smell.",
    skills: [
      { name: "TypeScript", level: "core" },
      { name: "JavaScript (ES6+)", level: "core" },
      { name: "HTML5", level: "core" },
      { name: "CSS3", level: "core" },
    ],
  },
  {
    id: "state",
    title: "State & Forms",
    command: "cat store/index.ts",
    icon: "Network",
    description:
      "Server state and client state kept apart — cache in TanStack Query, UI state in Zustand or Context, forms validated before they submit.",
    skills: [
      { name: "TanStack Query", level: "core" },
      { name: "Zustand", level: "core" },
      { name: "Context API", level: "core" },
      { name: "React Hook Form", level: "strong" },
      { name: "Yup", level: "strong" },
    ],
  },
  {
    id: "integrations",
    title: "APIs & Integrations",
    command: "curl /api/v1",
    icon: "Layers",
    description:
      "Payment, real-time and AI features wired through the API into the product.",
    skills: [
      { name: "REST API Integration", level: "core" },
      { name: "Axios", level: "core" },
      { name: "Socket.IO", level: "strong" },
      { name: "Stripe", level: "strong" },
      { name: "Razorpay", level: "strong" },
      { name: "Claude API", level: "working" },
    ],
  },
  {
    id: "ui",
    title: "Styling & UI",
    command: "tailwindcss --watch",
    icon: "Palette",
    description: "Accurate to Figma, responsive from 320px up, accessible by construction.",
    skills: [
      { name: "Tailwind CSS", level: "core" },
      { name: "Responsive Design", level: "core" },
      { name: "Shadcn UI", level: "strong" },
      { name: "Radix UI", level: "strong" },
      { name: "Framer Motion", level: "strong" },
      { name: "Accessibility", level: "working" },
    ],
  },
  {
    id: "performance",
    title: "Performance & SEO",
    command: "lighthouse --view",
    icon: "Gauge",
    description:
      "Less JavaScript shipped, fewer wasted renders, and search metadata that's correct on every route.",
    skills: [
      { name: "Code Splitting", level: "strong" },
      { name: "Lazy Loading", level: "strong" },
      { name: "Rendering Optimisation", level: "strong" },
      { name: "Image Optimisation", level: "strong" },
      { name: "Lighthouse", level: "strong" },
      { name: "Technical SEO", level: "strong" },
    ],
  },
  {
    id: "tooling",
    title: "Deployment & Tools",
    command: "pm2 status",
    icon: "Wrench",
    description:
      "Git-based team workflows, automated checks in CI, and Node.js services kept running on AWS EC2 with PM2.",
    skills: [
      { name: "Git", level: "core" },
      { name: "GitHub", level: "core" },
      { name: "GitHub Actions", level: "working" },
      { name: "AWS EC2", level: "working" },
      { name: "PM2", level: "working" },
      { name: "Vite", level: "strong" },
      { name: "Figma", level: "strong" },
      { name: "Agile / Scrum", level: "strong" },
    ],
  },
];

/** Flat, deduplicated list — used for JSON-LD `knowsAbout`. */
export const allSkills: string[] = Array.from(
  new Set(skillGroups.flatMap((group) => group.skills.map((skill) => skill.name)))
);
