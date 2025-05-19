
import { CompanyProfile } from "@/components/CompanyProfile";
import { getCompanyById } from "@/services/companyService";
import { CompanyType } from "@/types/company";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function CompanyProfilePage() {
  // Get company ID from URL parameters
  const { companyId } = useParams<{ companyId: string }>();
  
  // Fetch company data using React Query
  const { data: company, isLoading, error } = useQuery({
    queryKey: ['company', companyId],
    queryFn: () => getCompanyById(companyId!),
    enabled: !!companyId,
  });
  
  if (!companyId) {
    return <div>Company ID not provided</div>;
  }
  
  if (isLoading) {
    return (
      <div className="w-full py-20 text-center">
        <div className="container-custom">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-1/3 bg-muted rounded mb-4"></div>
            <div className="h-6 w-2/3 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full py-20 text-center">
        <div className="container-custom">
          <h2 className="text-xl font-medium mb-2">Error Loading Company</h2>
          <p className="text-muted-foreground">
            There was a problem loading this company profile. Please try again later.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <div className="py-8 md:py-12 bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
              {company ? company.name : 'Company'} Profile
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Get the real insights about this workplace directly from employees who've been there.
            </p>
          </motion.div>
        </div>
      </div>
      
      <CompanyProfile companyId={companyId} />
    </div>
  );
}
