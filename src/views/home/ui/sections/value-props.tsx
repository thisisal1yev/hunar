import {
  ShieldCheck,
  CurrencyDollar,
  SealCheck,
  GlobeHemisphereWest,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Container, Reveal, Section } from "@/shared/ui";

const items: { icon: Icon; title: string; body: string }[] = [
  {
    icon: ShieldCheck,
    title: "Tasdiqlangan startuplar",
    body: "Har bir startup va eʼlon moderatsiyadan oʻtadi. Spam va shablon arizalar yoʻq.",
  },
  {
    icon: CurrencyDollar,
    title: "Maosh va equity ochiq",
    body: "Vilka va equity ulushini darhol koʻrasiz. Yashirin shartlar yoʻq.",
  },
  {
    icon: SealCheck,
    title: "Toʻgʻridan-toʻgʻri asoschilar",
    body: "Vositachisiz — ariza maʼqullansa, asoschi bilan bevosita bogʻlanasiz.",
  },
  {
    icon: GlobeHemisphereWest,
    title: "Global darajaga tayyor",
    body: "GitHub orqali kirish, ingliz tilidagi CV — xalqaro startuplarga ham mos.",
  },
];

export function ValueProps() {
  return (
    <Section>
      <Container>
        <Reveal>
          <h2 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
            Nega Hatch
          </h2>
        </Reveal>

        <div className="bg-border border-border mt-10 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2">
          {items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05} className="bg-background p-6 sm:p-8">
              <item.icon weight="duotone" className="text-accent size-8" />
              <h3 className="text-foreground mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="text-muted mt-2 text-sm leading-relaxed">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
