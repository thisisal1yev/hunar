import type { Job } from "../model/types";

const usd = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

/**
 * Format a job's salary for display. Primary line in UZS millions, optional
 * secondary USD estimate. Ranges use a plain hyphen.
 */
export function formatSalary(job: Job): { primary: string; secondary?: string } {
  const toMln = (v: number) => Math.round(v / 1_000_000);
  const primary = `${toMln(job.salary.min)}-${toMln(job.salary.max)} mln soʻm`;
  const secondary = job.salaryUsd
    ? `~$${usd.format(job.salaryUsd.min)}-${usd.format(job.salaryUsd.max)}`
    : undefined;
  return { primary, secondary };
}

/** Format a job's equity range as a percent string, e.g. "0.5-2%". */
export function formatEquity(job: Job): string | undefined {
  if (!job.equity) return undefined;
  return `${job.equity.min}-${job.equity.max}%`;
}
