import { CompanySearch } from "@/components/CompanySearch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterCompaniesByIndustry, filterCompaniesByLocation, filterCompaniesBySize, getAllCompanies } from "@/services/companyService";
import { CompanyType } from "@/types/company";
import { motion } from "framer-motion";
import { Building, Flag } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from '@inertiajs/react';

export default function ExplorePage() {
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<CompanyType[]>([]);
  const [filter, setFilter] = useState({
    industry: "all",
    size: "all",
    location: "all",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load all companies
    const allCompanies = getAllCompanies();
    setCompanies(allCompanies);
    setFilteredCompanies(allCompanies);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Apply filters when filter state changes
    let results = [...companies];

    if (filter.industry && filter.industry !== "all") {
      results = filterCompaniesByIndustry(results, filter.industry);
    }

    if (filter.size && filter.size !== "all") {
      results = filterCompaniesBySize(results, filter.size);
    }

    if (filter.location && filter.location !== "all") {
      results = filterCompaniesByLocation(results, filter.location);
    }

    setFilteredCompanies(results);
  }, [filter, companies]);

  const handleClearFilters = () => {
    setFilter({
      industry: "all",
      size: "all",
      location: "all",
    });
  };

  return (
    <div>
      <section className="py-16 md:py-24">
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
              Find real insights about workplaces from people who've actually worked there.
              No login required.
            </p>
          </motion.div>
        </div>
      </section>

      <CompanySearch />

      <section className="py-8 md:py-16">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h2 className="font-poppins font-bold text-2xl">
              Browse Companies
            </h2>
            <div className="flex flex-wrap gap-3">
              <Select
                value={filter.industry}
                onValueChange={(value) =>
                  setFilter({ ...filter, industry: value })
                }
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Software">Software</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filter.size}
                onValueChange={(value) => setFilter({ ...filter, size: value })}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Company Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sizes</SelectItem>
                  <SelectItem value="small">Small (&lt;500)</SelectItem>
                  <SelectItem value="medium">Medium (500-10,000)</SelectItem>
                  <SelectItem value="large">Large (&gt;10,000)</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filter.location}
                onValueChange={(value) =>
                  setFilter({ ...filter, location: value })
                }
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Work Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="on-site">On-site</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-background border border-border rounded-lg p-6 animate-pulse">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-muted rounded-full mr-3"></div>
                    <div>
                      <div className="h-4 bg-muted rounded w-24 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-36"></div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-4/5"></div>
                  </div>
                  <div className="h-8 bg-muted rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company, index) => {
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
                            <span>{topGreenFlag.text}</span>
                          </div>
                        )}
                        {topRedFlag && (
                          <div className="text-sm py-2 px-3 rounded-md bg-warning/10 text-warning flex items-start gap-2">
                            <Flag size={14} className="mt-0.5 flex-shrink-0" />
                            <span>{topRedFlag.text}</span>
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
                          <Link href={`/company/${company.id}`}>
                            View Insights
                          </Link>
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          className="w-full"
                          asChild
                        >
                          <Link href={`/review?company=${company.id}`}>
                            Share Experience
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {filteredCompanies.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-8"
                >
                  <h3 className="text-xl font-medium mb-2">No companies found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try changing your filter criteria or search for different companies.
                  </p>
                  <Button
                    onClick={handleClearFilters}
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}