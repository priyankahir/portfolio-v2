"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[site] unhandled error:", error);
  }, [error]);

  return (
    <div className="flex flex-1 items-center justify-center px-5 py-32">
      <div className="w-full max-w-lg text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">
          Unexpected error
        </p>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
          Something broke on this page
        </h1>
        <p className="mt-4 text-muted">
          That&apos;s on me, not you. Retrying usually clears it.
        </p>

        {error.digest && (
          <p className="mt-5 font-mono text-[11px] text-faint">
            Reference: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-11 items-center rounded-lg bg-primary px-5 text-sm font-medium text-on-primary transition-all hover:brightness-110"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-lg border border-line bg-surface px-5 text-sm font-medium transition-colors hover:border-line-strong"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
