import type { Education, Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "vivansh-web-developer",
    role: "Web Developer",
    company: "Vivansh InfoTech",
    location: "Ahmedabad, India",
    start: "2025-04",
    end: null,
    type: "Full-time",
    summary:
      "Own end-to-end delivery for multi-tenant SaaS products across EHS, AI and fintech domains, from Figma handoff and API design through to production release.",
    highlights: [
      "Design and build scalable web applications in React.js, Next.js, TypeScript and Node.js, holding the line on modern UI/UX and clean-code standards.",
      "Ship pixel-perfect, fully responsive interfaces with Tailwind CSS, backed by a reusable component library that cut duplicate work across the team.",
      "Integrate REST APIs with Axios and TanStack Query — deliberate cache keys, background refetching, and error boundaries instead of silent failures.",
      "Guard cross-browser compatibility and accessibility compliance, pairing with backend engineers and designers through agile sprint cycles.",
    ],
    stack: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
      "Shadcn UI",
    ],
  },
  {
    id: "vivansh-intern",
    role: "Web Developer Intern",
    company: "Vivansh InfoTech",
    location: "Ahmedabad, India",
    start: "2025-01",
    end: "2025-03",
    type: "Internship",
    summary:
      "Joined as an intern and moved onto client delivery within the first sprint, focused on translating design into production-ready React.",
    highlights: [
      "Translated Figma designs into responsive, production-ready interfaces using React.js and Tailwind CSS.",
      "Built and maintained reusable UI components following component-driven development practices.",
      "Handled REST API integration, Yup-based form validation, and client-side data management.",
      "Worked in Git-based branching workflows and took part in agile ceremonies from day one.",
    ],
    stack: ["React.js", "JavaScript", "Tailwind CSS", "Yup", "Git"],
  },
];

export const education: Education[] = [
  {
    id: "be-computer",
    degree: "B.E. Computer Engineering",
    institution: "Government Engineering College, Rajkot",
    board: "Gujarat Technological University",
    start: "2021-06",
    end: "2025-05",
    score: "CPI 7.91 / 10.0",
    location: "Rajkot, Gujarat",
  },
  {
    id: "hsc",
    degree: "Class XII (HSC) — Science",
    institution: "Alpha Vidhya Sankul",
    board: "Gujarat Secondary & Higher Secondary Education Board",
    start: "2020-06",
    end: "2021-05",
    score: "88.30%",
    location: "Junagadh, Gujarat",
  },
];
