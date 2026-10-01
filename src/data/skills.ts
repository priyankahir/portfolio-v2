import type { SkillGroup, ToolboxItem } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    id: "core",
    title: "React & Core",
    command: "npm ls react",
    icon: "Atom",
    description:
      "Reusable component architecture, hooks-first state, and render cost I can account for.",
    skills: [
      { name: "React.js", level: "core" },
      { name: "Hooks & Context API", level: "core" },
      { name: "Component Architecture", level: "core" },
      { name: "Memo / Lazy / Suspense", level: "strong" },
      { name: "JSX", level: "core" },
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
      { name: "Node.js", level: "strong" },
      { name: "Express.js", level: "strong" },
      { name: "REST API Design", level: "strong" },
      { name: "Middleware", level: "strong" },
      { name: "JWT Authentication", level: "working" },
      { name: "Role-Based Authorisation", level: "working" },
      { name: "Socket.IO", level: "working" },
    ],
  },
  {
    id: "database",
    title: "MongoDB & Payments",
    command: "mongosh",
    icon: "Database",
    description:
      "MongoDB with Mongoose schemas modelled on how the data is read, plus Stripe and Razorpay payment flows wired through the API.",
    skills: [
      { name: "MongoDB", level: "strong" },
      { name: "Mongoose", level: "working" },
      { name: "Schema Design", level: "working" },
      { name: "Stripe", level: "working" },
      { name: "Razorpay", level: "working" },
    ],
  },
  {
    id: "framework",
    title: "Next.js",
    command: "next build",
    icon: "Layers",
    description:
      "App Router by default, Pages Router where an existing codebase needs it. Server components first.",
    skills: [
      { name: "App Router", level: "core" },
      { name: "Pages Router", level: "strong" },
      { name: "Server Components", level: "strong" },
      { name: "SSR / SSG / ISR", level: "strong" },
      { name: "Route Handlers", level: "strong" },
      { name: "Metadata & SEO", level: "strong" },
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
    title: "State, Forms & Data",
    command: "cat store/index.ts",
    icon: "Network",
    description:
      "Server state and client state kept apart — cache in TanStack Query, UI state in Zustand or Context, forms validated at the edge.",
    skills: [
      { name: "TanStack Query", level: "core" },
      { name: "Zustand", level: "core" },
      { name: "Context API", level: "core" },
      { name: "React Hook Form", level: "strong" },
      { name: "Yup Validation", level: "strong" },
      { name: "Axios", level: "strong" },
    ],
  },
  {
    id: "ui",
    title: "Styling & UI",
    command: "tailwindcss --watch",
    icon: "Palette",
    description:
      "Accurate to Figma, responsive from 320px up, accessible by construction.",
    skills: [
      { name: "Tailwind CSS", level: "core" },
      { name: "Responsive Design", level: "core" },
      { name: "Shadcn UI", level: "strong" },
      { name: "Radix UI", level: "strong" },
      { name: "Framer Motion", level: "strong" },
      { name: "WCAG / a11y", level: "working" },
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
    id: "ai",
    title: "AI Integration",
    command: "curl api.anthropic.com",
    icon: "Sparkles",
    description:
      "LLM features end to end — retrieval-grounded answers, structured report output, and a human handoff when the model isn't enough.",
    skills: [
      { name: "Claude API", level: "strong" },
      { name: "RAG", level: "strong" },
      { name: "Vector Databases", level: "working" },
      { name: "Streaming Responses", level: "strong" },
    ],
  },
  {
    id: "tooling",
    title: "Deployment & Tools",
    command: "pm2 status",
    icon: "Wrench",
    description:
      "Git-based workflows, automated checks in CI, and Node.js services kept running on AWS EC2 with PM2.",
    skills: [
      { name: "Git & GitHub", level: "core" },
      { name: "GitHub Actions", level: "working" },
      { name: "AWS EC2", level: "working" },
      { name: "PM2", level: "working" },
      { name: "Vercel", level: "strong" },
      { name: "Vite", level: "strong" },
      { name: "Figma", level: "strong" },
      { name: "Agile / Scrum", level: "strong" },
    ],
  },
];

/** Flat, deduplicated list — used for JSON-LD `knowsAbout` and the hero ticker. */
export const allSkills: string[] = Array.from(
  new Set(skillGroups.flatMap((group) => group.skills.map((skill) => skill.name)))
);

export const toolbox: ToolboxItem[] = [
  {
    category: "Editor & Terminal",
    items: ["VS Code", "Cursor", "iTerm2", "Oh My Zsh", "GitHub Copilot"],
  },
  {
    category: "Design & Handoff",
    items: ["Figma", "Figma Dev Mode", "Excalidraw"],
  },
  {
    category: "Debug & Audit",
    items: ["React DevTools", "TanStack Query Devtools", "Lighthouse", "Chrome Perf"],
  },
  {
    category: "Ship",
    items: ["AWS EC2", "PM2", "Vercel", "GitHub Actions", "Postman"],
  },
];
