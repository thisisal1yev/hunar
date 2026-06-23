import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink, Container, Reveal, Section } from "@/shared/ui";
import { JobCard, type Job } from "@/entities/job";

export function FreshJobs({ jobs }: { jobs: Job[] }) {
  return (
    <Section>
      <Container>
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
            Yangi startup oʻrinlari
          </h2>
          <ButtonLink href="/jobs" variant="secondary" className="hidden sm:inline-flex">
            Barcha oʻrinlar
            <ArrowRight className="size-4" />
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, index) => (
            <Reveal key={job.id} delay={(index % 3) * 0.05} className="h-full">
              <JobCard job={job} className="h-full" />
            </Reveal>
          ))}
        </div>

        <ButtonLink href="/jobs" variant="secondary" className="mt-8 w-full sm:hidden">
          Barcha oʻrinlar
        </ButtonLink>
      </Container>
    </Section>
  );
}
