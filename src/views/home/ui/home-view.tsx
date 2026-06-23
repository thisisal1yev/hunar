import { SiteHeader } from "@/widgets/site-header";
import { SiteFooter } from "@/widgets/site-footer";
import { getFreshJobs } from "@/entities/job";
import { getMarketStats } from "@/entities/market";
import { Hero } from "./sections/hero";
import { CompTransparency } from "./sections/comp-transparency";
import { ValueProps } from "./sections/value-props";
import { HowItWorks } from "./sections/how-it-works";
import { FreshJobs } from "./sections/fresh-jobs";
import { EmployerCta } from "./sections/employer-cta";
import { Faq } from "./sections/faq";
import { FinalCta } from "./sections/final-cta";

export async function HomeView() {
  const [jobs, market] = await Promise.all([getFreshJobs(6), getMarketStats()]);

  return (
    <>
      <SiteHeader />
      <main>
        <Hero stats={market.stats} spotlight={jobs.slice(0, 4)} />
        <CompTransparency data={market} />
        <ValueProps />
        <HowItWorks />
        <FreshJobs jobs={jobs} />
        <EmployerCta />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
