import { CompBar, Container, Reveal, SampleNote, Section } from "@/shared/ui";
import { stageLabel } from "@/entities/job";
import type { MarketData } from "@/entities/market";

export function CompTransparency({ data }: { data: MarketData }) {
  const mid = (s: { cashMinUZS: number; cashMaxUZS: number }) => (s.cashMinUZS + s.cashMaxUZS) / 2;
  const max = Math.max(...data.byStage.map(mid));
  const mln = (uzs: number) => Math.round(uzs / 1_000_000);

  return (
    <Section>
      <Container className="max-w-4xl">
        <Reveal>
          <h2 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
            Maosh + equity — bosqich boʻyicha
          </h2>
          <p className="text-muted mt-3 max-w-xl text-pretty">
            Startup bosqichi qancha erta boʻlsa, equity ulushi shuncha katta. Hammasi ochiq
            koʻrsatiladi.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-6">
          {data.byStage.map((s, index) => (
            <Reveal key={s.stage} delay={index * 0.05}>
              <CompBar
                label={stageLabel[s.stage]}
                widthPct={Math.round((mid(s) / max) * 100)}
                cashLabel={`${mln(s.cashMinUZS)}-${mln(s.cashMaxUZS)} mln soʻm`}
                equityLabel={`${s.equityMin}-${s.equityMax}%`}
                delay={index * 0.05}
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {data.sectors.map((sector) => (
            <span
              key={sector.name}
              className="border-border bg-surface-2 text-muted rounded-full border px-3 py-1 text-xs tabular-nums"
            >
              {sector.name} · {Math.round(sector.share * 100)}%
            </span>
          ))}
        </div>

        <SampleNote className="text-muted mt-6" />
      </Container>
    </Section>
  );
}
