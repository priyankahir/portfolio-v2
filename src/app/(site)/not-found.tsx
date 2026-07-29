import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Page not found",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-5 py-32">
      <div className="w-full max-w-lg text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">
          Error 404
        </p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
          This route doesn&apos;t exist
        </h1>
        <p className="mt-4 text-muted">
          The page you were after has moved or never existed. Everything else is
          still where you left it.
        </p>

        <pre className="panel mt-8 overflow-x-auto p-5 text-left font-mono text-[13px] text-muted">
          <code>
            <span className="text-primary">$</span> ls ./requested-path{"\n"}
            ls: no such file or directory
          </code>
        </pre>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton href="/">Back to home</LinkButton>
          <LinkButton href="/projects" variant="secondary">
            Browse projects
          </LinkButton>
        </div>

        <p className="mt-6 font-mono text-[11px] text-faint">
          Or press{" "}
          <kbd className="rounded border border-line px-1.5 py-0.5">⌘K</kbd> to
          search — try{" "}
          <Link href="/blog" className="text-primary link-underline">
            the blog
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
