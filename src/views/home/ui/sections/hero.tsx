import { ButtonLink, Container, SampleNote, StatCounter } from "@/shared/ui";
import { RoleCardCarousel } from "@/features/role-spotlight";
import type { Job } from "@/entities/job";
import type { EcosystemStats } from "@/entities/market";

function Stat({
  value,
  label,
  prefix,
  suffix,
}: {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div>
      <div className="text-2xl font-semibold text-white sm:text-3xl">
        <StatCounter value={value} prefix={prefix} suffix={suffix} />
      </div>
      <div className="mt-1 text-xs leading-snug text-white/55">{label}</div>
    </div>
  );
}

export function Hero({ stats, spotlight }: { stats: EcosystemStats; spotlight: Job[] }) {
  return (
    <section className="bg-band relative overflow-hidden text-white">
      <div className="bg-grain pointer-events-none absolute inset-0" aria-hidden />
      <Container className="relative grid items-center gap-12 pt-16 pb-20 lg:grid-cols-2 lg:gap-16 lg:pt-24 lg:pb-28">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl">
            Oʻzbekiston startupiga qoʻshil.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-pretty text-white/70">
            Maosh va equity — ochiq. Tasdiqlangan startuplar, toʻgʻridan-toʻgʻri asoschilar bilan.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/jobs" size="lg">
              Ish topish
            </ButtonLink>
            <ButtonLink
              href="/for-employers"
              size="lg"
              className="border border-white/25 bg-white/5 text-white hover:bg-white/10"
            >
              Startup sifatida eʼlon ber
            </ButtonLink>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-4">
            <Stat value={stats.hiringStartups} label="Ishga olayotgan startuplar" />
            <Stat value={stats.openRoles} label="Ochiq oʻrinlar" />
            <Stat
              value={Math.round(stats.totalFundingUSD / 1_000_000)}
              label="Jami jalb qilingan"
              prefix="$"
              suffix="M+"
            />
          </div>

          <SampleNote className="mt-4 text-white/45" />
        </div>

        <div className="lg:pl-4">
          <RoleCardCarousel roles={spotlight} />
        </div>
      </Container>
    </section>
  );
}
