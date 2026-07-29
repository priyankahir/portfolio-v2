import type { SkillGroup, ToolboxItem } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    id: "core",
    title: "React & Core",
    command: "npm ls react",
    icon: "Atom",
    description:
      "Component-driven architecture, hooks-first state, and render cost I can account for.",
    skills: [
      { name: "React.js", level: "core" },
      { name: "Hooks & Context", level: "core" },
      { name: "Memo / Lazy / Suspense", level: "strong" },
      { name: "Component Architecture", level: "core" },
      { name: "JSX", level: "core" },
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
    id: "framework",
    title: "Next.js",
    command: "next build",
    icon: "Layers",
    description:
      "App Router by default, Pages Router where legacy demands it. Server components first.",
    skills: [
      { name: "App Router", level: "core" },
      { name: "Server Components", level: "strong" },
      { name: "SSR / SSG / ISR", level: "strong" },
      { name: "Route Handlers", level: "strong" },
      { name: "Metadata & SEO", level: "strong" },
    ],
  },
  {
    id: "backend",
    title: "Backend & Database",
    command: "node server.js",
    icon: "Server",
    description:
      "Express APIs backed by MongoDB — schema design, indexes, and auth that isn't an afterthought.",
    skills: [
      { name: "Node.js", level: "strong" },
      { name: "Express.js", level: "strong" },
      { name: "MongoDB", level: "strong" },
      { name: "Mongoose", level: "working" },
      { name: "REST API Design", level: "core" },
      { name: "JWT Auth", level: "working" },
    ],
  },
  {
    id: "state",
    title: "State & Data",
    command: "cat store/index.ts",
    icon: "Database",
    description:
      "Server state and client state kept apart — cache in Query, UI state in Zustand.",
    skills: [
      { name: "TanStack Query", level: "core" },
      { name: "Zustand", level: "core" },
      { name: "REST APIs", level: "core" },
      { name: "Axios", level: "strong" },
      { name: "Yup Validation", level: "strong" },
    ],
  },
  {
    id: "ui",
    title: "Styling & UI",
    command: "tailwindcss --watch",
    icon: "Palette",
    description:
      "Pixel-accurate against Figma, responsive from 320px up, accessible by construction.",
    skills: [
      { name: "Tailwind CSS", level: "core" },
      { name: "Shadcn UI", level: "strong" },
      { name: "Radix UI", level: "strong" },
      { name: "Framer Motion", level: "strong" },
      { name: "Responsive Design", level: "core" },
      { name: "WCAG / a11y", level: "working" },
    ],
  },
  {
    id: "ai",
    title: "AI Integration",
    command: "curl api.anthropic.com",
    icon: "Sparkles",
    description:
      "LLM features end to end — streaming, retrieval context, and feedback capture.",
    skills: [
      { name: "Claude API", level: "strong" },
      { name: "RAG Interfaces", level: "strong" },
      { name: "Vector Search UX", level: "working" },
      { name: "Streaming Responses", level: "strong" },
    ],
  },
  {
    id: "tooling",
    title: "Tools & DevOps",
    command: "git log --oneline",
    icon: "Wrench",
    description: "Trunk-based Git flow, automated checks, previews before merge.",
    skills: [
      { name: "Git & GitHub", level: "core" },
      { name: "GitHub Actions", level: "working" },
      { name: "Vite", level: "strong" },
      { name: "Figma", level: "strong" },
      { name: "Vercel", level: "strong" },
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
    items: ["Vercel", "GitHub Actions", "Netlify", "Postman"],
  },
];
