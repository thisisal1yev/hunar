"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { cn } from "@/shared/lib";

interface StatCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
}

/**
 * Counts up from 0 to `value` when scrolled into view. Static under reduced-motion.
 * Uses a motion value (not React state) so it never re-renders the tree mid-animation
 * and stays serializable across the server/client boundary (`prefix`/`suffix` are strings).
 */
export function StatCounter({ value, prefix = "", suffix = "", durationMs = 1200, className }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const count = useMotionValue(0);
  const text = useTransform(
    count,
    (v) => `${prefix}${Math.round(v).toLocaleString("ru-RU")}${suffix}`,
  );

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, {
      duration: durationMs / 1000,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, reduce, value, durationMs, count]);

  return (
    <motion.span
      ref={ref}
      aria-label={`${prefix}${Math.round(value).toLocaleString("ru-RU")}${suffix}`}
      className={cn("tabular-nums", className)}
    >
      {text}
    </motion.span>
  );
}
