import { ButtonLink, Container, Reveal, Section } from "@/shared/ui";

export function FinalCta() {
  return (
    <Section>
      <Container>
        <Reveal className="border-border bg-surface-2 flex flex-col items-center gap-8 rounded-3xl border px-6 py-16 text-center sm:py-20">
          <h2 className="text-foreground max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Startup karyerangizni shu yerdan boshlang
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/jobs" size="lg">
              Ish topish
            </ButtonLink>
            <ButtonLink href="/for-employers" variant="secondary" size="lg">
              Startup sifatida eʼlon ber
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
