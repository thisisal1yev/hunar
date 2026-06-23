import type { ReactNode } from "react";
import { cn } from "@/shared/lib";

const DEFAULT = "Namuna maʼlumotlar · toʻliq baza tez orada";

/** Honest sample-data label. Required wherever demo metrics are shown. */
export function SampleNote({ className, children }: { className?: string; children?: ReactNode }) {
  return <p className={cn("text-xs", className)}>{children ?? DEFAULT}</p>;
}
