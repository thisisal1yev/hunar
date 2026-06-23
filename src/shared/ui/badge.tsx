import type { ReactNode } from "react";
import { cn } from "@/shared/lib";

type Tone = "brand" | "accent" | "neutral";

const tones: Record<Tone, string> = {
  brand: "bg-brand-soft text-brand-soft-foreground",
  accent: "bg-accent-soft text-accent-soft-foreground",
  neutral: "border border-line bg-surface-2 text-muted",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
