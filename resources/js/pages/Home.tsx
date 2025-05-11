
import { CompanySearch } from "@/components/CompanySearch";
import { FlagCards } from "@/components/FlagCards";
import { GitHubSection } from "@/components/GitHubSection";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";

export default function Home() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <CompanySearch />
      <FlagCards />
      <GitHubSection />
    </div>
  );
}
