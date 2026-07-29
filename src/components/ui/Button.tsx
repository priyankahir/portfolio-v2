import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-primary text-on-primary border-primary hover:brightness-110 shadow-[0_6px_24px_-10px_var(--glow)]",
  secondary:
    "bg-surface text-fg border-line hover:border-line-strong hover:bg-surface-hover",
  ghost: "bg-transparent text-muted border-transparent hover:text-primary",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-3.5 text-xs gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-6 text-sm gap-2.5",
};

const BASE =
  "inline-flex items-center justify-center rounded-lg border font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-55";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps & ComponentProps<"button">;
type LinkButtonProps = CommonProps & {
  href: string;
  external?: boolean;
  download?: string | boolean;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  external,
  download,
  ...props
}: LinkButtonProps) {
  const isExternal = external ?? /^https?:\/\//.test(href);
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if (isExternal || download) {
    return (
      <a
        href={href}
        className={classes}
        {...(download ? { download } : {})}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
