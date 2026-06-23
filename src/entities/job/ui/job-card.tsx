import Link from "next/link";
import { SealCheck, MapPin } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/shared/lib";
import type { Job } from "../model/types";
import { formatSalary, formatEquity } from "../lib/format-salary";
import { gradeLabel, workFormatLabel, stageLabel } from "../lib/labels";

interface JobCardProps {
  job: Job;
  className?: string;
}

export function JobCard({ job, className }: JobCardProps) {
  const salary = formatSalary(job);
  const equity = formatEquity(job);
  const stage = job.company.stage ? stageLabel[job.company.stage] : undefined;
  const monogram = job.company.name.charAt(0).toUpperCase();

  return (
    <Link
      href={`/jobs/${job.slug}`}
      className={cn(
        "group border-line bg-surface flex flex-col gap-4 rounded-2xl border p-5",
        "hover:border-brand/40 transition duration-200 hover:-translate-y-0.5",
        "focus-visible:ring-brand focus-visible:ring-2 focus-visible:outline-none",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span className="bg-brand-soft text-brand-soft-foreground flex size-10 shrink-0 items-center justify-center rounded-xl font-semibold">
          {monogram}
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-ink truncate text-sm font-medium">{job.company.name}</span>
            {job.company.verified && (
              <SealCheck
                weight="fill"
                className="text-accent size-4 shrink-0"
                aria-label="Tasdiqlangan"
              />
            )}
            {stage && (
              <span className="border-line text-muted ml-1 rounded-full border px-1.5 py-0.5 text-[11px] leading-none font-medium">
                {stage}
              </span>
            )}
          </div>
          <span className="text-muted text-xs">{gradeLabel[job.grade]}</span>
        </div>
      </div>

      <h3 className="text-ink text-lg font-semibold tracking-tight">{job.title}</h3>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="bg-surface-2 text-muted inline-flex items-center gap-1 rounded-full px-2.5 py-1">
          <MapPin weight="regular" className="size-3.5" />
          {job.city}
        </span>
        <span className="bg-surface-2 text-muted rounded-full px-2.5 py-1">
          {workFormatLabel[job.workFormat]}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="border-line text-muted rounded-md border px-2 py-0.5 text-xs"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="border-line mt-auto border-t pt-4">
        <div className="text-ink font-mono font-semibold">{salary.primary}</div>
        {salary.secondary && <div className="text-muted font-mono text-xs">{salary.secondary}</div>}
        {equity && (
          <span className="bg-accent-soft text-accent-soft-foreground mt-2 inline-block w-fit rounded-full px-2 py-0.5 text-xs font-medium">
            {equity} equity
          </span>
        )}
      </div>
    </Link>
  );
}
