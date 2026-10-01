import type { FaqItem, Principle, ProcessStep, Service } from "@/types";

export const services: Service[] = [
  {
    id: "full-stack-mern",
    title: "Full Stack MERN Development",
    description:
      "End-to-end features on MongoDB, Express, React and Node.js — from the Mongoose schema and API route through to the screen people use, built to be extended rather than rewritten.",
    icon: "Layers",
    deliverables: [
      "React / Next.js front end",
      "Express REST API",
      "MongoDB data model",
      "Typed end to end with TypeScript",
    ],
  },
  {
    id: "backend-api",
    title: "Node.js & Express APIs",
    description:
      "REST services on Node.js and Express with MongoDB behind them — middleware, JWT authentication, role-based authorisation and request validation at the boundary.",
    icon: "Server",
    deliverables: [
      "Route, controller & middleware layers",
      "Mongoose schema design",
      "JWT auth and role guards",
      "Stripe & Razorpay payment flows",
    ],
  },
  {
    id: "product-ui",
    title: "React & Next.js Product UI",
    description:
      "Dashboards, builders and data-heavy screens built as a reusable component system — so the fourth feature costs less than the first, not more.",
    icon: "LayoutDashboard",
    deliverables: [
      "Reusable component library",
      "Role-based dashboards",
      "Responsive from 320px up",
      "Typed props, no `any`",
    ],
  },
  {
    id: "figma-to-code",
    title: "Figma → Production",
    description:
      "Accurate translation of design files into React and Tailwind CSS, including the states and edge cases the mockup didn't cover.",
    icon: "PenTool",
    deliverables: [
      "Pixel-accurate implementation",
      "Hover / focus / empty / error states",
      "Dark-mode parity",
      "Shadcn UI & Radix primitives",
    ],
  },
  {
    id: "api-integration",
    title: "State, Forms & Real-Time Data",
    description:
      "Client integration where caching is deliberate — server cache in TanStack Query, UI state in Zustand or Context, forms in React Hook Form, and Socket.IO where data has to arrive live.",
    icon: "Network",
    deliverables: [
      "TanStack Query cache strategy",
      "React Hook Form + Yup validation",
      "Socket.IO real-time updates",
      "Error & retry handling",
    ],
  },
  {
    id: "ai-interfaces",
    title: "AI Feature Development",
    description:
      "Claude API features grounded with RAG over a vector database, structured AI report generation, and a live human handoff for when the model isn't the right answer.",
    icon: "Sparkles",
    deliverables: [
      "RAG-grounded assistant",
      "AI report generation",
      "Streaming response UI",
      "AI-to-human handoff",
    ],
  },
  {
    id: "performance",
    title: "Performance & Core Web Vitals",
    description:
      "Code splitting, lazy loading, rendering optimisation and image strategy until LCP, CLS and INP hold up on a mid-range phone, not just a fast laptop.",
    icon: "Gauge",
    deliverables: [
      "Lighthouse audit",
      "Bundle analysis & code splitting",
      "Re-render elimination",
      "Image & font strategy",
    ],
  },
  {
    id: "seo",
    title: "Technical SEO for Next.js",
    description:
      "Server-rendered metadata, semantic structure, structured data, sitemaps and robots.txt — the parts of SEO that are an engineering job.",
    icon: "Search",
    deliverables: [
      "Per-route metadata",
      "JSON-LD structured data",
      "Sitemap & robots.txt",
      "OpenGraph images",
    ],
  },
  {
    id: "deployment",
    title: "Deployment & Delivery",
    description:
      "Node.js services deployed to AWS EC2 and kept alive with PM2, Next.js front ends on Vercel, and GitHub Actions checks before anything merges.",
    icon: "Rocket",
    deliverables: [
      "AWS EC2 + PM2 setup",
      "GitHub Actions CI",
      "Environment configuration",
      "Git branching workflow",
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: "understand",
    step: "01",
    title: "Understand the constraint",
    description:
      "Before writing code I want the real constraint — the data shape, the permission model, the screen it breaks on. Most bugs are requirement bugs in disguise.",
  },
  {
    id: "model",
    step: "02",
    title: "Model the data and state",
    description:
      "The MongoDB schema, the API contract, and the split between server and client state are settled first. Cache keys and invalidation are decided up front, not patched in after the first race condition.",
  },
  {
    id: "build",
    step: "03",
    title: "Build the primitives",
    description:
      "Small, typed, composable pieces before full screens — on both sides of the API. If a pattern shows up twice it becomes shared; if it shows up once it stays local.",
  },
  {
    id: "harden",
    step: "04",
    title: "Harden the edges",
    description:
      "Empty, loading, error, unauthorised, too-long-string, 320px-wide. The states nobody designs are the states users find first.",
  },
  {
    id: "measure",
    step: "05",
    title: "Measure, then ship",
    description:
      "Profiler for re-renders, Lighthouse for vitals, keyboard for accessibility, QA for everything else. Ship when the checks agree, not when it looks done.",
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
    body: "Strict TypeScript and validated API boundaries catch a whole class of bugs that would otherwise surface in QA. `any` is a decision to debug later.",
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
    title: "AI is a product problem",
    body: "Model quality is only half of it. Grounding answers in real documents, handling latency, and giving users a path to a human when the answer is wrong — that's engineering work on both sides of the API.",
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
      "MERN stack and full stack developer roles working with React, Next.js, Node.js, Express and MongoDB — ideally on SaaS products with real complexity such as dashboards, workflows, payments or AI features. I'm based in Ahmedabad, India and open to on-site, hybrid or remote positions.",
  },
  {
    question: "How much experience do you have?",
    answer:
      "1.7+ years of professional experience, starting in January 2025 at Vivansh InfoTech as an intern and continuing as a Web Developer from April 2025. In that time I've delivered production features across EHS compliance, AI, franchise management, stock operations, assessment and real estate products.",
  },
  {
    question: "What's your core tech stack?",
    answer:
      "The MERN stack — MongoDB, Express.js, React.js and Node.js — with Next.js and TypeScript on top. I use Tailwind CSS, Shadcn UI and Radix UI for interfaces, TanStack Query, Zustand and Context API for state, and React Hook Form with Yup for forms and validation.",
  },
  {
    question: "What backend and deployment experience do you have?",
    answer:
      "I build REST APIs with Node.js and Express, including middleware, JWT authentication and role-based authorisation, backed by MongoDB with Mongoose schema design. I've integrated Stripe and Razorpay payments and Socket.IO for real-time features, and deployed Node.js services on AWS EC2 managed with PM2, with GitHub Actions for CI.",
  },
  {
    question: "What AI work have you done?",
    answer:
      "On an EHS SaaS platform I built a Claude API assistant that uses RAG over a vector database to give context-aware safety guidance from the customer's own documents. I also built an AI Report Builder that produces structured summaries and safety recommendations, and a live AI-to-human support handoff using Socket.IO.",
  },
  {
    question: "Are you open to remote work?",
    answer:
      "Yes, I'm open to remote roles. My day-to-day already runs on Agile/Scrum ceremonies, written communication and Git-based pull-request reviews, which carry over directly to a remote team. I'm also open to on-site or hybrid roles in Ahmedabad and elsewhere in India.",
  },
  {
    question: "Are you currently available, and what is your notice period?",
    answer:
      "I'm open to new MERN stack and full stack opportunities. For notice period, start dates and other specifics, please get in touch by email or WhatsApp and I'll share the details.",
  },
  {
    question: "Do you work from Figma files?",
    answer:
      "Yes — most of my front-end work starts from a Figma handoff. I implement accurately against the file, then fill in the states designers usually don't mock: empty, loading, error, overflow and narrow mobile breakpoints.",
  },
  {
    question: "How do you approach performance and SEO?",
    answer:
      "Server components by default so less JavaScript ships, code splitting and lazy loading for heavy routes, optimised images, and deliberate cache keys so data isn't refetched blindly. For SEO I use route-level metadata, semantic HTML, structured data, sitemaps and robots.txt, targeting LCP under 2.5s, CLS under 0.1 and INP under 200ms.",
  },
  {
    question: "What's the fastest way to reach you?",
    answer:
      "Email at priyankahir333@gmail.com or WhatsApp at +91 99797 00935. The contact form on this site reaches the same inbox, and I usually reply within a day.",
  },
];
