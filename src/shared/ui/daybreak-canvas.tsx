"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/shared/lib";

/**
 * Animated sunrise glow + drifting embers behind the hero. Renders nothing animated
 * under reduced-motion (the parent's `bg-daybreak` static gradient carries the look).
 * Pure canvas, `aria-hidden`, `pointer-events-none` — never gates content visibility.
 */
export function DaybreakCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const coral = "oklch(0.72 0.16 48)";

    type Ember = { x: number; y: number; r: number; vy: number; vx: number; a: number };
    let embers: Ember[] = [];

    const seed = () => {
      embers = Array.from({ length: 26 }, (_, i) => ({
        x: (i * 97.13) % 1,
        y: (i * 53.7) % 1,
        r: 0.6 + ((i * 17) % 10) / 6,
        vy: -0.02 - ((i * 13) % 7) / 700,
        vx: ((i % 5) - 2) / 1400,
        a: 0.15 + ((i * 7) % 10) / 28,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // rising sun glow, lower-left
      const cx = w * 0.16;
      const cy = h * 1.02;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.8);
      g.addColorStop(0, "oklch(0.72 0.16 48 / 0.5)");
      g.addColorStop(0.5, "oklch(0.62 0.15 42 / 0.12)");
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      // drifting embers
      for (const e of embers) {
        e.y += e.vy;
        e.x += e.vx;
        if (e.y < -0.05) {
          e.y = 1.05;
          e.x = (e.x + 0.37) % 1;
        }
        ctx.beginPath();
        ctx.arc(e.x * w, e.y * h, e.r, 0, Math.PI * 2);
        ctx.fillStyle = coral;
        ctx.globalAlpha = e.a;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    seed();
    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduce]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
