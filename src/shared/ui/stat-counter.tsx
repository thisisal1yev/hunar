"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/shared/lib";

interface StatCounterProps {
  value: number;
  format?: (n: number) => string;
  durationMs?: number;
  className?: string;
}

/** Counts up from 0 to `value` when scrolled into view. Static under reduced-motion. */
export function StatCounter({ value, format, durationMs = 1200, className }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const fmt = format ?? ((n: number) => Math.round(n).toLocaleString("ru-RU"));

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: durationMs / 1000,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, reduce, value, durationMs]);

  return (
    <span ref={ref} aria-label={fmt(value)} className={cn("tabular-nums", className)}>
      {fmt(display)}
    </span>
  );
}
