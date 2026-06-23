import { SiteHeader } from "@/widgets/site-header";
import { SiteFooter } from "@/widgets/site-footer";
import { getFreshJobs } from "@/entities/job";
import { getMarketStats } from "@/entities/market";
import { Hero } from "./sections/hero";
import { OpenComp } from "./sections/open-comp";
import { WhyHatch } from "./sections/why-hatch";
import { HowItWorks } from "./sections/how-it-works";
import { FreshRoles } from "./sections/fresh-roles";
import { SocialProof } from "./sections/social-proof";
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
        <OpenComp data={market} />
        <WhyHatch />
        <HowItWorks />
        <FreshRoles jobs={jobs} />
        <SocialProof />
        <EmployerCta />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
