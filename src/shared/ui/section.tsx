import type { ComponentProps } from "react";
import { cn } from "@/shared/lib";

export function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("py-20 sm:py-24 lg:py-28", className)} {...props} />;
}
