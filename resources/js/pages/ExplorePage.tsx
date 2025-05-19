
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getCompanies,
  importCompanyFromLinkedIn
} from "@/services/companyService";
import { CompanyType } from "@/types/company";
import { motion } from "framer-motion";
import { Search, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from '@inertiajs/react';
import { BriefcaseIcon, MapPinIcon } from "lucide-react";

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [size, setSize] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<CompanyType[]>([]);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch companies on component mount
    const fetchCompanies = async () => {
      const companiesData = getCompanies();
      setCompanies(companiesData);
      setFilteredCompanies(companiesData);
    };
    
    fetchCompanies();
  }, []);

  useEffect(() => {
    // Filter companies based on search criteria
    let results = [...companies];
    
    if (query) {
      results = results.filter(company => 
        company.name.toLowerCase().includes(query.toLowerCase()) ||
        company.description?.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (size && size !== "all") {
      results = results.filter(company => {
        const employeeCount = parseInt(company.size.replace(/,/g, '').split('+')[0]);
        
        switch(size) {
          case "small":
            return employeeCount < 500;
          case "medium":
            return employeeCount >= 500 && employeeCount <= 10000;
          case "large":
            return employeeCount > 10000;
          default:
            return true;
        }
      });
    }
    
    if (industry && industry !== "all") {
      results = results.filter(company => company.industry === industry);
    }
    
    if (location && location !== "all") {
      results = results.filter(company => {
        const companyLocation = company.location.toLowerCase();
        
        switch(location.toLowerCase()) {
          case "remote":
            return companyLocation.includes("remote");
          case "us":
            return companyLocation.includes("us") || 
                  companyLocation.includes("united states") ||
                  companyLocation.includes("ca") ||
                  companyLocation.includes("ny") ||
                  companyLocation.includes("wa");
          case "europe":
            return companyLocation.includes("europe") ||
                  companyLocation.includes("uk") ||
                  companyLocation.includes("germany") ||
                  companyLocation.includes("france");
          case "asia":
            return companyLocation.includes("asia") ||
                  companyLocation.includes("india") ||
                  companyLocation.includes("china") ||
                  companyLocation.includes("japan");
          default:
            return true;
        }
      });
    }
    
    setFilteredCompanies(results);
  }, [query, size, industry, location, companies]);

  const resetFilters = () => {
    setQuery("");
    setSize("");
    setIndustry("");
    setLocation("");
  };

  const handleImportFromLinkedIn = async () => {
    if (!linkedinUrl) {
      toast({
        title: "URL Required",
        description: "Please enter a LinkedIn company URL",
        variant: "destructive",
      });
      return;
    }
    
    if (!linkedinUrl.includes('linkedin.com/company/')) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid LinkedIn company URL (e.g., https://www.linkedin.com/company/google)",
        variant: "destructive",
      });
      return;
    }
    
    setIsImporting(true);
    
    try {
      const company = await importCompanyFromLinkedIn(linkedinUrl);
      
      if (company) {
        toast({
          title: "Company Imported",
          description: `Successfully imported ${company.name}`,
          variant: "default",
        });
        
        // Refresh companies list
        const updatedCompanies = getCompanies();
        setCompanies(updatedCompanies);
        setFilteredCompanies(updatedCompanies);
        setLinkedinUrl("");
      } else {
        toast({
          title: "Import Failed",
          description: "Could not import company data",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error importing company:", error);
      toast({
        title: "Import Error",
        description: "An error occurred while importing company data",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div>
      <section className="py-16 md:py-24 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">
              Explore Companies
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover honest insights about companies from real employees.
              Find the right workplace culture for you.
            </p>
          </motion.div>

          <div className="bg-background rounded-xl p-6 border border-border mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <Label htmlFor="search">Search Company</Label>
                <div className="relative">
                  <Input
                    id="search"
                    type="text"
                    placeholder="Search by name..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                </div>
              </div>

              <div>
                <Label htmlFor="size">Company Size</Label>
                <Select value={size} onValueChange={setSize}>
                  <SelectTrigger id="size">
                    <SelectValue placeholder="All Sizes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sizes</SelectItem>
                    <SelectItem value="small">Small (&lt; 500)</SelectItem>
                    <SelectItem value="medium">Medium (500-10,000)</SelectItem>
                    <SelectItem value="large">Large (&gt; 10,000)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="industry">Industry</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="All Industries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="europe">Europe</SelectItem>
                    <SelectItem value="asia">Asia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                variant="outline" 
                onClick={resetFilters}
                className="text-sm"
              >
                Reset Filters
              </Button>
            </div>
          </div>

          <div className="bg-background rounded-xl p-6 border border-border mb-10">
            <h2 className="text-xl font-semibold mb-4">Import Company from LinkedIn</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="linkedinUrl">LinkedIn Company URL</Label>
                <div className="relative">
                  <Input
                    id="linkedinUrl"
                    type="text"
                    placeholder="https://www.linkedin.com/company/..."
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="pl-10"
                  />
                  <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                </div>
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleImportFromLinkedIn} 
                  disabled={isImporting || !linkedinUrl}
                  className="w-full md:w-auto"
                >
                  {isImporting ? "Importing..." : "Import Company"}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (
                <motion.div
                  key={company.id}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-background">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={company.logoUrl || company.logo || "/placeholder.svg"}
                        alt={company.name}
                        className="h-16 w-16 object-contain"
                      />
                    </div>
                    {company.featured && (
                      <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
                        Featured
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-xl">{company.name}</h3>
                      <div className="bg-accent/50 text-xs rounded-full px-2 py-1">
                        {company.size}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {company.description || "No description available."}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <BriefcaseIcon className="h-3.5 w-3.5" />
                        {company.industry}
                      </span>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <MapPinIcon className="h-3.5 w-3.5" />
                        {company.location}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-5">
                      {company.tags && company.tags.slice(0, 3).map((tag, index) => (
                          <div 
                            key={index}
                          className="bg-accent/30 rounded-full px-2 py-1 text-xs"
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div className="text-success text-lg font-semibold">
                          {company.rating || (company.greenFlagCount / (company.greenFlagCount + company.redFlagCount) * 5).toFixed(1) || 0} / 5
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ({company.reviews || company.reviewCount || 0} reviews)
                        </div>
                      </div>
                      
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/company/${company.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <h3 className="text-xl font-medium mb-2">No companies found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
