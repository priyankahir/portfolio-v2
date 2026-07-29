import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { PostCard } from "@/components/blog/PostCard";
import { Section, SectionHeading } from "@/components/ui/Section";
import { sortedPosts } from "@/data/posts";

export function Writing() {
  const recent = sortedPosts.slice(0, 3);

  return (
    <Section id="writing" tinted>
      <SectionHeading
        command="ls ~/notes"
        title="Things I've written down"
        description="Notes from actual work — state architecture, AI interfaces, dynamic forms and the performance problems dashboards have that landing pages don't."
        action={
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 font-mono text-xs transition-colors hover:border-line-strong"
          >
            All articles
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        }
      />

      <Stagger className="grid gap-4 md:grid-cols-3">
        {recent.map((post) => (
          <StaggerItem key={post.slug}>
            <PostCard post={post} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
