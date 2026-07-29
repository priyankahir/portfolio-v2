import type { FaqItem, Post, Project } from "@/types";
import { education, experiences } from "@/data/experience";
import { allSkills } from "@/data/skills";
import { profile } from "@/data/profile";
import { absoluteUrl, siteConfig, siteUrl } from "@/lib/site";

const PERSON_ID = `${siteUrl}/#person`;
const SITE_ID = `${siteUrl}/#website`;

/** Schema.org Person — the anchor node every other graph references. */
export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    givenName: "Priyank",
    familyName: "Baldaniya",
    url: siteUrl,
    image: absoluteUrl(profile.avatar),
    jobTitle: profile.role,
    description: profile.tagline,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    knowsAbout: allSkills,
    sameAs: profile.socials
      .filter((social) => social.url.startsWith("http"))
      .map((social) => social.url),
    worksFor: {
      "@type": "Organization",
      name: experiences[0].company,
    },
    hasOccupation: experiences.map((experience) => ({
      "@type": "Occupation",
      name: experience.role,
      occupationLocation: {
        "@type": "City",
        name: experience.location,
      },
      skills: experience.stack.join(", "),
    })),
    alumniOf: education.map((entry) => ({
      "@type": "EducationalOrganization",
      name: entry.institution,
    })),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: siteUrl,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: { "@id": PERSON_ID },
  };
}

export function profilePageSchema() {
  return {
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#profilepage`,
    url: siteUrl,
    name: siteConfig.title,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": PERSON_ID },
    mainEntity: { "@id": PERSON_ID },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function blogPostingSchema(post: Post) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: url,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    inLanguage: siteConfig.language,
    wordCount: estimateWordCount(post),
    timeRequired: `PT${post.readingMinutes}M`,
    // Per-route OG images carry a build hash, so reference the stable root card.
    image: absoluteUrl("/opengraph-image"),
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": SITE_ID },
  };
}

export function projectSchema(project: Project) {
  const url = absoluteUrl(`/projects/${project.slug}`);
  return {
    "@type": "CreativeWork",
    "@id": `${url}#project`,
    name: project.title,
    alternateName: project.subtitle,
    description: project.summary,
    url,
    dateCreated: project.year,
    genre: project.domain,
    keywords: project.stack.join(", "),
    creator: { "@id": PERSON_ID },
    ...(project.liveUrl && { sameAs: project.liveUrl }),
  };
}

export function collectionPageSchema(options: {
  name: string;
  description: string;
  path: string;
  items: { name: string; path: string }[];
}) {
  return {
    "@type": "CollectionPage",
    "@id": `${absoluteUrl(options.path)}#collection`,
    name: options.name,
    description: options.description,
    url: absoluteUrl(options.path),
    isPartOf: { "@id": SITE_ID },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: options.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
  };
}

/** Wraps any number of schema nodes into a single `@graph` document. */
export function jsonLdGraph(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

function estimateWordCount(post: Post): number {
  return post.body.reduce((total, block) => {
    switch (block.type) {
      case "paragraph":
      case "heading":
      case "quote":
      case "callout":
        return total + block.text.split(/\s+/).length;
      case "list":
        return total + block.items.join(" ").split(/\s+/).length;
      case "code":
        return total + block.code.split(/\s+/).length;
      default:
        return total;
    }
  }, 0);
}
