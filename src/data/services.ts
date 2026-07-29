import type { FaqItem, Principle, ProcessStep, Service } from "@/types";

export const services: Service[] = [
  {
    id: "product-ui",
    title: "Product UI Engineering",
    description:
      "Dashboards, builders and data-heavy screens built as a component system — so feature four costs less than feature one, not more.",
    icon: "LayoutDashboard",
    deliverables: [
      "Reusable component library",
      "Design-system tokens",
      "Responsive from 320px up",
      "Typed props, no `any`",
    ],
  },
  {
    id: "figma-to-code",
    title: "Figma → Production",
    description:
      "Pixel-accurate translation of design files into React. Spacing, states and edge cases the mockup didn't cover, handled.",
    icon: "PenTool",
    deliverables: [
      "Pixel-perfect implementation",
      "Hover / focus / empty / error states",
      "Dark-mode parity",
      "Design-token handoff",
    ],
  },
  {
    id: "backend-api",
    title: "Node & Express APIs",
    description:
      "REST services on Node.js and Express with MongoDB behind them — schema design, indexes, auth and validation at the boundary.",
    icon: "Server",
    deliverables: [
      "Express route + controller layer",
      "MongoDB schema & indexes",
      "JWT auth and role guards",
      "Request validation",
    ],
  },
  {
    id: "api-integration",
    title: "API & State Architecture",
    description:
      "Client integration where caching is deliberate — server cache in TanStack Query, UI state in Zustand, and no accidental waterfalls.",
    icon: "Network",
    deliverables: [
      "TanStack Query cache strategy",
      "Optimistic updates",
      "Error & retry boundaries",
      "Yup schema validation",
    ],
  },
  {
    id: "ai-interfaces",
    title: "AI Feature Development",
    description:
      "Chat surfaces, RAG-grounded answers, document summarisation and adaptive forms — designed for streaming, latency and being wrong gracefully.",
    icon: "Sparkles",
    deliverables: [
      "Streaming response UI",
      "Retrieval-context display",
      "Feedback capture",
      "Human-handoff flow",
    ],
  },
  {
    id: "performance",
    title: "Performance & Core Web Vitals",
    description:
      "Render profiling, bundle trimming and image strategy until LCP, CLS and INP are green on a mid-range phone, not just a MacBook.",
    icon: "Gauge",
    deliverables: [
      "Lighthouse & field-data audit",
      "Bundle analysis",
      "Re-render elimination",
      "Image & font strategy",
    ],
  },
  {
    id: "seo",
    title: "Technical SEO for Apps",
    description:
      "Server-rendered metadata, structured data, sitemaps and canonical hygiene — the parts of SEO that are actually an engineering job.",
    icon: "Search",
    deliverables: [
      "Per-route metadata",
      "JSON-LD structured data",
      "Sitemap & robots",
      "OG image generation",
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: "understand",
    step: "01",
    title: "Understand the constraint",
    description:
      "Before any component gets written I want the real constraint — the data shape, the permission model, the screen it breaks on. Most UI bugs are requirement bugs wearing a costume.",
  },
  {
    id: "model",
    step: "02",
    title: "Model the state",
    description:
      "Server state and client state get separated first. Cache keys, invalidation rules and loading boundaries are decided up front, not patched in after the first race condition.",
  },
  {
    id: "build",
    step: "03",
    title: "Build the primitives",
    description:
      "Small, typed, composable components before screens. If a pattern shows up twice it becomes a primitive; if it shows up once it stays local.",
  },
  {
    id: "harden",
    step: "04",
    title: "Harden the edges",
    description:
      "Empty, loading, error, offline, too-long-string, 320px-wide. The states nobody designs are the states users find first.",
  },
  {
    id: "measure",
    step: "05",
    title: "Measure, then ship",
    description:
      "Profiler for re-renders, Lighthouse for vitals, keyboard for accessibility. Ship when the numbers agree, not when it looks done.",
  },
];

export const principles: Principle[] = [
  {
    id: "readable",
    title: "Readable beats clever",
    body: "The next person to open this file is the real audience. A clever one-liner that costs ten minutes of comprehension is a net loss.",
    icon: "BookOpen",
  },
  {
    id: "types",
    title: "Types are documentation that runs",
    body: "Strict TypeScript catches the whole class of bugs that would otherwise surface in QA. `any` is a decision to debug later.",
    icon: "ShieldCheck",
  },
  {
    id: "render",
    title: "Render cost is a feature",
    body: "Every state update has a blast radius. Knowing which components re-render — and why — is the difference between a smooth table and a janky one.",
    icon: "Gauge",
  },
  {
    id: "a11y",
    title: "Accessible by construction",
    body: "Semantic elements, focus order and keyboard paths are decided while building, not retrofitted after an audit flags them.",
    icon: "Accessibility",
  },
  {
    id: "ai",
    title: "AI is a UI problem",
    body: "Model quality is only half of it. Latency, streaming, showing retrieval sources, and a path out when the answer is wrong — that's engineering work on both sides of the API.",
    icon: "Sparkles",
  },
  {
    id: "ship",
    title: "Shipped beats perfect",
    body: "Scope down, ship the vertical slice, learn from real usage. Perfection in a branch helps nobody.",
    icon: "Rocket",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "What kind of roles are you looking for?",
    answer:
      "MERN stack and full-stack product roles working in React, Next.js, Node.js and MongoDB — ideally on SaaS products with real complexity, like dashboards, builders or AI-facing surfaces. I'm based in Ahmedabad, India and open to on-site, hybrid or remote.",
  },
  {
    question: "How much experience do you have?",
    answer:
      "1.7+ years of professional experience, starting January 2025 at Vivansh InfoTech. In that time I've shipped production web applications across EHS compliance, AI tooling, fintech, franchise management, psychometric assessment and stock trading.",
  },
  {
    question: "What's your core stack?",
    answer:
      "MERN — MongoDB, Express.js, React.js and Node.js — with Next.js and TypeScript on top. Tailwind CSS for styling, TanStack Query for server state and Zustand for client state, Shadcn UI and Radix for accessible primitives, and Yup for validation.",
  },
  {
    question: "What AI work have you actually done?",
    answer:
      "Integration work for Claude API features inside an EHS platform — a RAG-grounded chatbot backed by a vector database, an AI report-summary flow over uploaded documents, adaptive form flows where the model generates follow-up questions, and a human-handoff interface with a waiting room and live agent join.",
  },
  {
    question: "Do you work from Figma files?",
    answer:
      "Yes — most of my delivery starts as a Figma handoff. I implement pixel-accurate against the file, then fill in the states designers usually don't mock: empty, loading, error, overflow and the 320px breakpoint.",
  },
  {
    question: "How do you approach performance?",
    answer:
      "Server components by default so less JavaScript ships at all, indexed MongoDB queries so the API isn't the bottleneck, deliberate cache keys so data isn't refetched blindly, React Profiler to find unnecessary re-renders, and animation limited to transform and opacity. Targets are LCP under 2.5s, CLS under 0.1 and INP under 200ms.",
  },
  {
    question: "What's the fastest way to reach you?",
    answer:
      "Email at priyankahir333@gmail.com or WhatsApp at +91 99797 00935. The contact form on this site reaches the same inbox, and I reply within a day.",
  },
];
