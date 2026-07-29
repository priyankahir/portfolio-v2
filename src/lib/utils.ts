import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "2025-04" -> "Apr 2025" */
export function formatMonth(value: string): string {
  const [year, month] = value.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

/** "2025-04" + null -> "Apr 2025 — Present" */
export function formatDateRange(start: string, end: string | null): string {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : "Present"}`;
}

/** ISO date -> "18 Jun 2026" */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Inclusive month count between two `YYYY-MM` values, rendered as "1 yr 8 mos". */
export function durationBetween(start: string, end: string | null): string {
  const [sy, sm] = start.split("-").map(Number);
  const endParts = end ? end.split("-").map(Number) : null;
  const now = new Date();
  const ey = endParts ? endParts[0] : now.getFullYear();
  const em = endParts ? endParts[1] : now.getMonth() + 1;

  const months = Math.max(1, (ey - sy) * 12 + (em - sm) + 1);
  const years = Math.floor(months / 12);
  const rest = months % 12;

  const parts: string[] = [];
  if (years) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (rest) parts.push(`${rest} mo${rest > 1 ? "s" : ""}`);
  return parts.join(" ");
}

/** Strips a URL down to its hostname for display, e.g. "vrundavanbuildcon.com". */
export function displayHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
