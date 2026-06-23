import { ButtonLink, Container, Reveal, Section } from "@/shared/ui";

export function EmployerCta() {
  return (
    <Section>
      <Container>
        <Reveal className="bg-brand text-brand-foreground overflow-hidden rounded-3xl px-6 py-14 sm:px-12 sm:py-16">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Startupingizga mos isteʼdod
            </h2>
            <p className="text-brand-foreground/85 mt-4 text-base leading-relaxed">
              Eʼloningiz moderatsiyadan oʻtadi va faqat mos nomzodlarga koʻrinadi. Maosh va equity
              ochiq — jiddiy nomzodlar keladi.
            </p>
            <ButtonLink
              href="/for-employers"
              size="lg"
              className="text-brand mt-8 bg-white hover:bg-white/90"
            >
              Startup sifatida eʼlon ber
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
