import type { NavItem } from "@/types";

/** Primary navigation — anchors resolve to sections on the home page. */
export const navItems: NavItem[] = [
  { label: "about", href: "/#about", sectionId: "about" },
  { label: "skills", href: "/#skills", sectionId: "skills" },
  { label: "work", href: "/#work", sectionId: "work" },
  { label: "experience", href: "/#experience", sectionId: "experience" },
  { label: "services", href: "/#services", sectionId: "services" },
  { label: "blog", href: "/blog" },
  { label: "contact", href: "/#contact", sectionId: "contact" },
];

/** Section ids the scroll-spy observes, in document order. */
export const homeSectionIds = [
  "about",
  "skills",
  "work",
  "experience",
  "services",
  "contact",
];

/** Footer columns — real pages only, no machine-readable feeds. */
export const footerLinks: { title: string; items: NavItem[] }[] = [
  {
    title: "Site",
    items: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Blog", href: "/blog" },
      { label: "Résumé", href: "/resume" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
