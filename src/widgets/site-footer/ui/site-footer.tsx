import Link from "next/link";
import { Container } from "@/shared/ui";
import { siteConfig } from "@/shared/config";

const columns = [
  {
    title: "Platforma",
    links: [
      { label: "Vakansiyalar", href: "/jobs" },
      { label: "Ish beruvchilarga", href: "/for-employers" },
      { label: "Kirish", href: "/login" },
    ],
  },
  {
    title: "Huquqiy",
    links: [
      { label: "Maxfiylik siyosati", href: "/privacy" },
      { label: "Foydalanish shartlari", href: "/terms" },
      { label: "Maʼlumotlarga rozilik", href: "/consent" },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-surface-2 border-t">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="max-w-xs lg:col-span-2">
          <div className="text-foreground text-lg font-semibold tracking-tight">
            {siteConfig.name}
          </div>
          <p className="text-muted mt-2 text-sm leading-relaxed">
            Oʻzbekiston IT bozori uchun kuratsiyalangan ish platformasi.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <div className="text-foreground text-sm font-medium">{column.title}</div>
            <ul className="mt-3 space-y-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-foreground text-sm transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-border border-t">
        <Container className="text-muted flex flex-col gap-2 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {siteConfig.name}. Barcha huquqlar himoyalangan.
          </span>
          <a
            href={siteConfig.contactTelegram}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition"
          >
            Telegram
          </a>
        </Container>
      </div>
    </footer>
  );
}
