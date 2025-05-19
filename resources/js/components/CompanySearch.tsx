
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { importCompanyFromLinkedIn, searchCompanies } from "@/services/companyService";
import { CompanyType } from "@/types/company";
import { motion } from "framer-motion";
import { Building, Flag, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function CompanySearch() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Don't proceed if search is empty
    if (!url.trim()) {
      toast({
        title: "Search empty",
        description: "Please enter a company name or LinkedIn URL",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);

    try {
      // Check if this is a LinkedIn URL or just a search term
      if (url.includes('linkedin.com/company')) {
        // This is a LinkedIn URL, try to fetch company data
        const company = await importCompanyFromLinkedIn(url);

        if (company) {
          setCompanies([company]);
          toast({
            title: "Company found",
            description: `Successfully retrieved information for ${company.name}`,
          });
        } else {
          // If LinkedIn fetch failed, do a regular search with any company name in the URL
          const companyName = url.split('/').pop()?.split('?')[0] || '';
          const searchResults = await searchCompanies(companyName);
          setCompanies(searchResults);

          if (searchResults.length === 0) {
            toast({
              title: "No companies found",
              description: "We couldn't find any companies matching your search.",
              variant: "destructive",
            });
          }
        }
      } else {
        // This is a regular search term
        const searchResults = await searchCompanies(url);
        setCompanies(searchResults);

        if (searchResults.length === 0) {
          toast({
            title: "No companies found",
            description: "We couldn't find any companies matching your search.",
            variant: "destructive",
          });
        }
      }

      setShowResults(true);
    } catch (error) {
      console.error("Error searching for company:", error);
      toast({
        title: "Search error",
        description: "There was a problem processing your search.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-24">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="font-poppins font-bold text-2xl sm:text-3xl md:text-4xl mb-4">
            Explore Companies
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Paste a LinkedIn company URL to see real employee insights and red/green flags
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              type="text"
              placeholder="https://www.linkedin.com/company/company-name/ or company name"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button type="submit" className="bg-primary" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Searching...
              </span>
            ) : (
              <>
                <Search size={16} className="mr-2" /> Search Company
              </>
            )}
          </Button>
        </form>

        {showResults && companies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12"
          >
            <h3 className="text-xl font-medium mb-4">Search Results</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {companies.map((company, index) => {
                // Get top flag for each type based on highest votes
                const topGreenFlag = company.flags
                  ?.filter(flag => flag.type === "green")
                  ?.sort((a, b) => b.votes - a.votes)[0];

                const topRedFlag = company.flags
                  ?.filter(flag => flag.type === "red")
                  ?.sort((a, b) => b.votes - a.votes)[0];

                return (
                  <motion.div
                    key={company.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex flex-col h-full"
                  >
                    <div className="flex-1 bg-background border border-border rounded-lg p-6 hover:shadow-md transition-all duration-300 h-full flex flex-col">
                      <div className="flex items-start gap-3 mb-4">
                        {company.logo ? (
                          <img
                            src={company.logo}
                            alt={company.name}
                            className="w-12 h-12 rounded-full object-cover border"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center border">
                            <Building className="text-primary" size={20} />
                          </div>
                        )}
                        <div>
                          <h3 className="font-medium text-lg">{company.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {company.industry} • {company.size} • {company.location}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mb-4 px-1">
                        <div className="flex items-center gap-2">
                          <Flag className="text-success" size={16} />
                          <span className="text-sm font-medium">
                            {company.greenFlagCount || 0} <span className="text-muted-foreground font-normal">green flags</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Flag className="text-warning" size={16} />
                          <span className="text-sm font-medium">
                            {company.redFlagCount || 0} <span className="text-muted-foreground font-normal">red flags</span>
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-5 flex-1">
                        {topGreenFlag && (
                          <div className="text-sm py-2 px-3 rounded-md bg-success/10 text-success flex items-start gap-2">
                            <Flag size={14} className="mt-0.5 flex-shrink-0" />
                            <span>{topGreenFlag.text} ({topGreenFlag.percentage}%)</span>
                          </div>
                        )}
                        {topRedFlag && (
                          <div className="text-sm py-2 px-3 rounded-md bg-warning/10 text-warning flex items-start gap-2">
                            <Flag size={14} className="mt-0.5 flex-shrink-0" />
                            <span>{topRedFlag.text} ({topRedFlag.percentage}%)</span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-primary border-primary hover:bg-primary/10w-full"
                          asChild
                        >
                          <Link to={`/company/${company.id}`}>
                            View Insights
                          </Link>
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          className="w-full"
                          asChild
                        >
                          <Link to={`/review?company=${company.id}`}>
                            Share Experience
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Popular searches: <Link to="/company/google" className="text-primary hover:underline">Google</Link>,
            <Link to="/company/microsoft" className="text-primary hover:underline"> Microsoft</Link>,
            <Link to="/company/amazon" className="text-primary hover:underline"> Amazon</Link>,
            <Link to="/company/facebook" className="text-primary hover:underline"> Facebook</Link>,
            <Link to="/company/apple" className="text-primary hover:underline"> Apple</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
