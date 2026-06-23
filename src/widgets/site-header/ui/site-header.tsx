import Link from "next/link";
import { ButtonLink, Container } from "@/shared/ui";
import { siteConfig } from "@/shared/config";

export function SiteHeader() {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="text-foreground text-lg font-semibold tracking-tight">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/jobs" className="text-muted hover:text-foreground text-sm transition">
            Vakansiyalar
          </Link>
          <Link
            href="/for-employers"
            className="text-muted hover:text-foreground text-sm transition"
          >
            Ish beruvchilarga
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="text-muted hover:text-foreground hidden text-sm transition sm:block"
          >
            Kirish
          </Link>
          <ButtonLink href="/for-employers">Vakansiya joylash</ButtonLink>
        </div>
      </Container>
    </header>
  );
}
