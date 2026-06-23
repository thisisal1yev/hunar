"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CaretLeft, CaretRight, SealCheck, MapPin } from "@phosphor-icons/react";
import {
  formatSalary,
  formatEquity,
  stageLabel,
  workFormatLabel,
  type Job,
} from "@/entities/job";
import { cn } from "@/shared/lib";

/** Auto-cycling spotlight of startup roles, each showing cash + equity + stage. */
export function RoleCardCarousel({ roles }: { roles: Job[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const count = roles.length;

  useEffect(() => {
    if (reduce || count <= 1) return;
    const id = setInterval(() => setIndex((p) => (p + 1) % count), 4200);
    return () => clearInterval(id);
  }, [reduce, count]);

  if (count === 0) return null;

  const go = (delta: number) => setIndex((p) => (p + delta + count) % count);
  const job = roles[index]!;
  const salary = formatSalary(job);
  const equity = formatEquity(job);
  const stage = job.company.stage ? stageLabel[job.company.stage] : undefined;

  return (
    <div className="relative" aria-roledescription="carousel" aria-label="Startup oʻrinlari">
      <div className="border-border/60 bg-surface/95 relative min-h-[260px] overflow-hidden rounded-3xl border p-6 shadow-[0_30px_80px_-30px_rgba(2,44,40,0.45)] backdrop-blur sm:p-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={job.id}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -14 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2">
              <span className="bg-accent-soft text-accent-soft-foreground flex size-10 shrink-0 items-center justify-center rounded-xl font-semibold">
                {job.company.name.charAt(0).toUpperCase()}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-foreground truncate text-sm font-medium">
                    {job.company.name}
                  </span>
                  {job.company.verified && (
                    <SealCheck
                      weight="fill"
                      className="text-accent size-4 shrink-0"
                      aria-label="Tasdiqlangan"
                    />
                  )}
                </div>
                {stage && <span className="text-muted text-xs">{stage}</span>}
              </div>
            </div>

            <h3 className="text-foreground mt-4 text-xl font-semibold tracking-tight">
              {job.title}
            </h3>

            <div className="mt-4 space-y-1.5">
              <div className="text-foreground tabular-nums">{salary.primary}</div>
              {salary.secondary && (
                <div className="text-muted text-sm tabular-nums">{salary.secondary}</div>
              )}
              {equity && (
                <div className="text-accent-soft-foreground bg-accent-soft inline-block rounded-full px-2.5 py-1 text-sm font-medium">
                  {equity} equity
                </div>
              )}
            </div>

            <div className="text-muted mt-4 flex items-center gap-1.5 text-sm">
              <MapPin className="size-4 shrink-0" />
              <span>
                {job.city} · {workFormatLabel[job.workFormat]}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {count > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1.5" aria-hidden>
            {roles.map((r, i) => (
              <span
                key={r.id}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "bg-brand w-5" : "bg-border w-1.5",
                )}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Oldingi oʻrin"
              className="border-border text-muted hover:text-foreground focus-visible:ring-accent flex size-9 items-center justify-center rounded-full border transition focus-visible:ring-2 focus-visible:outline-none"
            >
              <CaretLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Keyingi oʻrin"
              className="border-border text-muted hover:text-foreground focus-visible:ring-accent flex size-9 items-center justify-center rounded-full border transition focus-visible:ring-2 focus-visible:outline-none"
            >
              <CaretRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
