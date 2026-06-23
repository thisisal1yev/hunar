import Image from "next/image";
import { cn } from "@/shared/lib";

export function Avatar({
  name,
  src,
  size = 48,
  className,
}: {
  name: string;
  src?: string;
  size?: number;
  className?: string;
}) {
  const monogram = name.trim().charAt(0).toUpperCase() || "?";
  return (
    <span
      className={cn(
        "bg-brand-soft text-brand-soft-foreground relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image src={src} alt={name} fill sizes={`${size}px`} className="object-cover" />
      ) : (
        monogram
      )}
    </span>
  );
}
