import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "safeops-ai",
    slug: "ai-safety-assistant-rag",
    title: "SafeOps AI Assistant",
    subtitle: "Claude API + RAG assistant inside an EHS platform",
    domain: "AI / LLM",
    year: "2025",
    status: "In Production",
    featured: true,
    summary:
      "A Claude API assistant grounded with RAG over a vector database for context-aware EHS guidance, plus an AI Report Builder that turns safety documents into structured summaries and recommendations.",
    problem:
      "Safety officers were working through long policy PDFs and incident reports to find answers that existed somewhere in their own document set. A generic chatbot answering from general knowledge would have been worse than useless in a compliance context — answers had to come from the customer's own material.",
    approach: [
      "Integrated an AI assistant on the Claude API with retrieval-augmented generation (RAG) over a vector database, so answers are grounded in the customer's own EHS documents rather than model recall.",
      "Built the AI Report Builder: users upload an EHS report or document, Claude analyses it, and the UI renders a structured summary with actionable safety recommendations.",
      "Developed AI-driven form flows where follow-up questions adapt to the user's context and earlier answers.",
      "Added answer-quality feedback capture (thumbs and star ratings) to show where the assistant needed improvement.",
      "Connected the assistant to the platform's live support system, so a conversation can be handed from the AI to an available human agent in real time.",
    ],
    outcome:
      "The AI layer became a working part of the product: grounded answers, structured report summaries, and a clear escalation path to a person when the model can't close the loop.",
    metrics: [
      { label: "Answer grounding", value: "RAG + vector DB" },
      { label: "Reporting", value: "AI Report Builder" },
      { label: "Escalation", value: "AI-to-human handoff" },
    ],
    stack: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Claude API",
      "RAG",
      "Vector DB",
      "Socket.IO",
      "Zustand",
      "Tailwind CSS",
    ],
    role: "Full Stack Developer — AI feature integration",
    hue: 152,
  },
  {
    id: "safeops",
    slug: "safeops-ehs-platform",
    title: "SafeOps.work",
    subtitle: "Multi-tenant EHS SaaS platform",
    domain: "EHS SaaS",
    year: "2025",
    status: "In Production",
    featured: true,
    summary:
      "A multi-tenant Environmental, Health & Safety SaaS covering training, incident management, compliance and workforce operations — with ticketing, Action Plan workflows and live support over Socket.IO.",
    problem:
      "EHS compliance is largely a records problem: training history, incidents, corrective actions and audit trails scattered across spreadsheets and email. The platform had to bring all of it together for multiple tenant organisations without turning into an unusable enterprise maze.",
    approach: [
      "Built responsive modules for training management, incident management, compliance tracking and workforce operations on a multi-tenant architecture.",
      "Developed ticket management and Action Plan workflows for tracking corrective and preventive actions (CAPA) from issue to close-out.",
      "Implemented live human support with AI-to-human handoff, agent availability status and real-time messaging over Socket.IO.",
      "Created reusable component libraries and dashboards, keeping server cache in TanStack Query and UI state in Zustand so data-heavy screens stay responsive.",
    ],
    outcome:
      "A shared component and data layer the team keeps building on: new modules ship against existing primitives, and support conversations move from AI to a human without leaving the platform.",
    metrics: [
      { label: "Tenancy", value: "Multi-tenant SaaS" },
      { label: "Workflows", value: "Tickets & Action Plans" },
      { label: "Real-time", value: "Socket.IO support" },
    ],
    stack: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Socket.IO",
      "TanStack Query",
      "Zustand",
      "Tailwind CSS",
      "Shadcn UI",
    ],
    role: "MERN Stack Developer",
    hue: 190,
  },
  {
    id: "franchiseflow",
    slug: "franchiseflow-saas-platform",
    title: "FranchiseFlow",
    subtitle: "Multi-role franchise management SaaS",
    domain: "Fintech / Franchise",
    year: "2025",
    status: "In Production",
    featured: true,
    summary:
      "Franchise operations and payments for admins, franchisors and franchisees — Stripe and Razorpay workflows over REST APIs, role-based access and dashboards scoped to each role.",
    problem:
      "Franchise payments were being reconciled by hand across a franchise network. Three very different user types — admin, franchisor and franchisee — needed the same underlying data, each with a different slice and different permissions.",
    approach: [
      "Built multi-role interfaces for admins, franchisors and franchisees, with role-based access control deciding what each user can see and do.",
      "Implemented payment workflows with both Stripe and Razorpay, integrated through REST APIs, to replace manual reconciliation.",
      "Connected order data through a POS integration so dashboard figures reflect actual sales.",
      "Developed operational dashboards giving each role the insight relevant to its level of the business.",
    ],
    outcome:
      "Payment collection moved from a manual exercise to an automated flow, with every role working from a dashboard scoped to its own permissions.",
    metrics: [
      { label: "Payments", value: "Stripe + Razorpay" },
      { label: "Access", value: "Role-based (3 tiers)" },
      { label: "Data", value: "POS integration" },
    ],
    stack: [
      "React.js",
      "TypeScript",
      "Node.js",
      "REST APIs",
      "Stripe",
      "Razorpay",
      "Zustand",
      "Tailwind CSS",
    ],
    role: "MERN Stack Developer",
    hue: 265,
  },
  {
    id: "mindmetric",
    slug: "mindmetric-assessment-platform",
    title: "MindMetric Insights",
    subtitle: "Psychological assessment & reporting platform",
    domain: "Assessment",
    year: "2025",
    status: "In Production",
    featured: true,
    summary:
      "A dynamic report-template builder for behavioural and psychological assessments, driven by conditional forms and API-driven rendering.",
    problem:
      "Every client wanted their assessment report shaped differently — different sections, scoring narratives and conditional branches. Hard-coding report layouts would have meant a release for every new client.",
    approach: [
      "Built a dynamic report-template builder so customised assessment reports can be composed without a code change.",
      "Implemented conditional form logic to support variable assessment structures and personalised output.",
      "Rendered reports dynamically from API-provided template definitions, so data — not a hard-coded component tree — decides what a report contains.",
    ],
    outcome:
      "New report formats became a configuration task instead of an engineering ticket.",
    metrics: [
      { label: "Reports", value: "Template-driven" },
      { label: "Logic", value: "Conditional forms" },
      { label: "Rendering", value: "API-driven" },
    ],
    stack: ["React.js", "TypeScript", "REST APIs", "Tailwind CSS"],
    role: "MERN Stack Developer",
    hue: 25,
  },
  {
    id: "stockpilot",
    slug: "stockpilot-trading-platform",
    title: "StockPilot",
    subtitle: "Bulk stock ordering, pricing & inventory",
    domain: "Stock Trading",
    year: "2025",
    status: "In Production",
    featured: true,
    summary:
      "Bulk stock purchasing, order processing, pricing and inventory management — high-volume workflows where a stale render is a pricing error.",
    problem:
      "High-volume stock operations with frequently changing prices: the UI had to stay accurate and responsive while data moved underneath it, because a stale render would show a user the wrong price.",
    approach: [
      "Developed modules for bulk stock purchasing, order processing, pricing and inventory management.",
      "Implemented UI logic for high-volume transactions with accurate pricing calculations and consistent data across screens.",
      "Optimised rendering and API data management with TanStack Query so real-time data stays reliable without unnecessary refetches or re-renders.",
    ],
    outcome:
      "Pricing that keeps pace with the data, on screens that stay responsive under transaction volume.",
    metrics: [
      { label: "Data", value: "Real-time pricing" },
      { label: "Scale", value: "Bulk transactions" },
      { label: "Focus", value: "Render optimisation" },
    ],
    stack: ["React.js", "TypeScript", "TanStack Query", "Axios", "REST APIs", "Tailwind CSS"],
    role: "MERN Stack Developer",
    hue: 45,
  },
  {
    id: "skyline",
    slug: "skyline-real-estate-platform",
    title: "Skyline Residences",
    subtitle: "Luxury real estate platform",
    domain: "Real Estate",
    year: "2025",
    status: "Live",
    featured: false,
    summary:
      "A marketing-grade property platform with dynamic layouts, heavy media, and Core Web Vitals that survive it.",
    problem:
      "Real estate sites live or die on imagery, and imagery is exactly what destroys load performance. The brief needed a premium visual feel without a four-second LCP.",
    approach: [
      "Built a fully responsive property platform with dynamic layout sections and seamless navigation for prospective buyers.",
      "Optimised media loading so large property imagery streams in without blocking first paint.",
      "Used Framer Motion for section transitions constrained to transform and opacity, keeping animation off the layout path.",
    ],
    outcome:
      "A visually heavy site that still loads fast on a mid-range phone over mobile data.",
    metrics: [
      { label: "Media", value: "Optimised loading" },
      { label: "Layout", value: "Fully responsive" },
      { label: "Motion", value: "Transform-only" },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    role: "MERN Stack Developer",
    hue: 320,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
