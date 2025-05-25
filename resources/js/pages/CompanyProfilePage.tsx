
import { CompanyProfile } from "@/components/CompanyProfile";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getCompanyExtendedById } from "@/lib/api/companiesExtended";

export default function CompanyProfilePage({ companyId = "" }: { companyId?: string }) {
  console.log('CompanyProfilePage - companyId from props:', companyId);

  const { data: company, isLoading, error } = useQuery({
    queryKey: ['company-page', companyId],
    queryFn: () => getCompanyExtendedById(companyId),
    enabled: !!companyId,
  });
  
  if (!companyId) {
    return (
      <div className="w-full py-20 text-center">
        <div className="container-custom">
          <h2 className="text-xl font-medium mb-2">Invalid Company ID</h2>
          <p className="text-muted-foreground">
            The company ID was not provided in the URL.
          </p>
        </div>
      </div>
    );
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
    console.error('CompanyProfilePage - Error loading company:', error);
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