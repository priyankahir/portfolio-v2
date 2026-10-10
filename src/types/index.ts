/**
 * Central type definitions for every piece of static content on the site.
 * All content lives in `src/data` and is typed against these contracts, so a
 * typo in the data files fails the build rather than the page.
 */

export type IconName = string;

export interface SocialLink {
  /** Display label, e.g. "GitHub" */
  label: string;
  /** Fully-qualified URL */
  url: string;
  /** Key used to resolve the icon in `src/components/ui/SocialIcon.tsx` */
  icon: "github" | "linkedin" | "mail" | "phone" | "whatsapp" | "twitter";
  /** Shown in the contact grid; omitted links are nav/footer only */
  handle?: string;
}

export interface Profile {
  name: string;
  /** Short role used in headings and JSON-LD */
  role: string;
  /** Longer role used for SEO titles */
  headline: string;
  /**
   * ISO date (YYYY-MM-DD) the professional career started. The single source
   * for every experience figure on the site — durations are always computed
   * from it at render time (see `src/lib/experience.ts`), never stored.
   */
  careerStart: string;
  tagline: string;
  /** 2–3 paragraphs for the About section */
  summary: string[];
  location: string;
  /** Short form for badges, e.g. "AHMEDABAD, IN" */
  locationShort: string;
  email: string;
  phone: string;
  /** Digits only, for `tel:` and `wa.me` links */
  phoneRaw: string;
  avatar: string;
  resumePath: string;
  resumeFileName: string;
  availability: {
    open: boolean;
    label: string;
  };
  socials: SocialLink[];
}

export interface Stat {
  label: string;
  value: string;
  /** Optional suffix rendered in the accent colour, e.g. "+" */
  suffix?: string;
  hint: string;
}

export type SkillLevel = "core" | "strong" | "working";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillGroup {
  id: string;
  title: string;
  /** Terminal-style command shown above the group */
  command: string;
  icon: IconName;
  description: string;
  skills: Skill[];
}

/** One stage of employment at a company, e.g. an internship or a full-time role. */
export interface ExperiencePosition {
  title: string;
  type: "Full-time" | "Internship";
  /** ISO `YYYY-MM` */
  start: string;
  /** ISO `YYYY-MM`, or null when current */
  end: string | null;
  /** One line on what this stage covered */
  summary: string;
}

/**
 * One company, with every stage worked there. Responsibilities live at the
 * company level so they're never repeated per stage.
 */
export interface Experience {
  id: string;
  company: string;
  companyUrl?: string;
  location: string;
  /** Most recent first */
  positions: ExperiencePosition[];
  highlights: string[];
  stack: string[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  /** Domain badge, e.g. "EHS SaaS" */
  domain: string;
  year: string;
  status: "Live" | "In Production" | "Internal" | "Archived";
  featured: boolean;
  /** One-liner used on cards and meta descriptions */
  summary: string;
  /** Case-study body */
  problem: string;
  approach: string[];
  outcome: string;
  metrics: ProjectMetric[];
  stack: string[];
  role: string;
  /** Accent hue (0–360) used for the card gradient */
  hue: number;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  board: string;
  start: string;
  end: string;
  score: string;
  location: string;
}

export interface Principle {
  id: string;
  title: string;
  body: string;
  icon: IconName;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export type PostBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "code"; language: string; code: string; caption?: string }
  | { type: "callout"; tone: "info" | "warn" | "tip"; text: string }
  | { type: "quote"; text: string; cite?: string };

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date string */
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  readingMinutes: number;
  featured: boolean;
  body: PostBlock[];
}

export interface NavItem {
  label: string;
  href: string;
  /** Section id used by the scroll-spy on the home page */
  sectionId?: string;
}
