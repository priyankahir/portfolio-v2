import { profile } from "@/data/profile";
import { formatMonth } from "@/lib/utils";
import type { Stat } from "@/types";

/**
 * Total professional experience, computed from `profile.careerStart` at render
 * time. Nothing on the site stores a duration — every figure comes from here.
 *
 * Pages are statically rendered and revalidated daily (see the `(site)`
 * layout), so the value stays current without any client-side JavaScript and
 * the server and client always agree on it during hydration.
 */

/** "Today" is read as a calendar date in the owner's time zone, so the month
 *  ticks over on the right day regardless of where the server runs. */
const TIME_ZONE = "Asia/Kolkata";

export interface Duration {
  years: number;
  months: number;
  totalMonths: number;
}

function calendarDate(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(date);
  const read = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);
  return { year: read("year"), month: read("month"), day: read("day") };
}

/**
 * Completed calendar months between an ISO start date (`YYYY-MM-DD` or
 * `YYYY-MM`) and `now`. A month only counts once its day-of-month has been
 * reached — 15 Jan → 14 Mar is 1 month, 15 Jan → 15 Mar is 2.
 */
export function completedDuration(start: string, now: Date = new Date()): Duration {
  const [startYear, startMonth, startDay = 1] = start.split("-").map(Number);
  const today = calendarDate(now);

  let totalMonths = (today.year - startYear) * 12 + (today.month - startMonth);
  if (today.day < startDay) totalMonths -= 1;
  totalMonths = Math.max(0, totalMonths);

  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
    totalMonths,
  };
}

const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? "" : "s"}`;

/** { years: 1, months: 9 } -> "1 year, 9 months" */
export function formatDuration({ years, months }: Duration): string {
  const parts: string[] = [];
  if (years) parts.push(plural(years, "year"));
  if (months) parts.push(plural(months, "month"));
  return parts.length ? parts.join(", ") : "Less than a month";
}

/** Total professional experience, e.g. `{ label: "1 year, 9 months", … }`. */
export function getExperience(now: Date = new Date()) {
  const duration = completedDuration(profile.careerStart, now);
  return {
    ...duration,
    label: formatDuration(duration),
    /** "Jan 2025" */
    since: formatMonth(profile.careerStart),
  };
}

/**
 * The experience tile for stat grids. The leading number stays numeric so the
 * count-up animation can run on it: "1" + " yr 9 mos".
 */
export function experienceStat(now: Date = new Date()): Stat {
  const { years, months, since } = getExperience(now);
  const monthPart = months ? ` ${months} mo${months === 1 ? "" : "s"}` : "";
  const hint = `Building production web apps since ${since}`;

  return years
    ? {
        label: "Experience",
        value: String(years),
        suffix: ` yr${years === 1 ? "" : "s"}${monthPart}`,
        hint,
      }
    : {
        label: "Experience",
        value: String(months),
        suffix: ` mo${months === 1 ? "" : "s"}`,
        hint,
      };
}
