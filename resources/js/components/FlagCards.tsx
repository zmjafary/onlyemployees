
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAllCompanies } from "@/services/companyService";
import { CompanyType } from "@/types/company";
import { motion } from "framer-motion";
import { Building, Flag } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from '@inertiajs/react';

export function FlagCards() {
  const [redFlagCompanies, setRedFlagCompanies] = useState<CompanyType[]>([]);
  const [greenFlagCompanies, setGreenFlagCompanies] = useState<CompanyType[]>([]);

  useEffect(() => {
    // Get all companies and sort them by flag counts
    const companies = getAllCompanies();

    // Sort by red flag count (high to low) for Red Flag Wall
    const redCompanies = [...companies]
      .sort((a, b) => b.redFlagCount - a.redFlagCount)
      .slice(0, 3); // Get top 3

    // Sort by green flag count (high to low) for Hall of Fame  
    const greenCompanies = [...companies]
      .sort((a, b) => b.greenFlagCount - a.redFlagCount)
      .slice(0, 3); // Get top 3

    setRedFlagCompanies(redCompanies);
    setGreenFlagCompanies(greenCompanies);
  }, []);

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Red Flag Wall */}
          <div>
            <h2 className="font-poppins font-bold text-2xl md:text-3xl mb-6 flex items-center">
              <Flag className="text-warning mr-2" size={24} /> Red Flag Wall
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {redFlagCompanies.map((company, index) => {
                // Get the top red flag from the company
                const topRedFlag = company.flags
                  .filter(flag => flag.type === "red")
                  .sort((a, b) => b.votes - a.votes)[0];

                return (
                  <motion.div
                    key={company.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link href={`/company/${company.id}`}>
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Building size={18} className="text-primary" />
                            <h4 className="text-lg font-medium">{company.name}</h4>
                          </div>
                          <div className="mb-4">
                            {topRedFlag && (
                              <>
                                <p className="text-sm text-warning mb-1 font-medium">{topRedFlag.text}</p>
                                <p className="text-xs text-muted-foreground">
                                  {topRedFlag.percentage}% of employees report this issue
                                </p>
                              </>
                            )}
                          </div>
                          <div className="flex gap-4">
                            <div className="flex items-center gap-1">
                              <Flag size={16} className="text-warning" />
                              <span className="text-sm">{company.redFlagCount} red flags</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Flag size={16} className="text-success" />
                              <span className="text-sm">{company.greenFlagCount} green flags</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                    <div className="text-center mt-2">
                      <Button asChild variant="outline" size="sm" className="text-muted-foreground text-xs w-full">
                        <Link href={`/review?company=${company.id}`}>
                          Add your experience
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Hall of Fame */}
          <div>
            <h2 className="font-poppins font-bold text-2xl md:text-3xl mb-6 flex items-center">
              <Flag className="text-success mr-2" size={24} /> Hall of Fame
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {greenFlagCompanies.map((company, index) => {
                // Get the top green flag from the company
                const topGreenFlag = company.flags
                  .filter(flag => flag.type === "green")
                  .sort((a, b) => b.votes - a.votes)[0];

                return (
                  <motion.div
                    key={company.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link href={`/company/${company.id}`}>
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Building size={18} className="text-primary" />
                            <h4 className="text-lg font-medium">{company.name}</h4>
                          </div>
                          <div className="mb-4">
                            {topGreenFlag && (
                              <>
                                <p className="text-sm text-success mb-1 font-medium">{topGreenFlag.text}</p>
                                <p className="text-xs text-muted-foreground">
                                  {topGreenFlag.percentage}% of employees agree
                                </p>
                              </>
                            )}
                          </div>
                          <div className="flex gap-4">
                            <div className="flex items-center gap-1">
                              <Flag size={16} className="text-warning" />
                              <span className="text-sm">{company.redFlagCount} red flags</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Flag size={16} className="text-success" />
                              <span className="text-sm">{company.greenFlagCount} green flags</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                    <div className="text-center mt-2">
                      <Button asChild variant="outline" size="sm" className="text-muted-foreground text-xs w-full">
                        <Link href={`/review?company=${company.id}`}>
                          Add your experience
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
