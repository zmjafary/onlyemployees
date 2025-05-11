import { CompanyProfile } from "../components/CompanyProfile";
import { getCompanyById } from "@/services/companyService";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePage } from '@inertiajs/react';
import { useNavigate } from 'react-router-dom';

type CompanyType = {
  id: string;
  name: string;
  // Add other fields as needed
};

export default function CompanyProfilePage() {
  const { props } = usePage();
  const { companyId } = props;
  const [company, setCompany] = useState<CompanyType | null>(null);
  const navigate = useNavigate();

  // Ensure companyId is treated as a string
  const companyIdString = String(companyId);

  useEffect(() => {
    if (companyIdString) {
      const companyData = getCompanyById(companyIdString);
      if (!companyData) {
        navigate('/404', { replace: true });
      } else {
        setCompany(companyData);
      }
    }
  }, [companyIdString, navigate]);

  if (!companyId) {
    return <div>Company ID not provided</div>;
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

      {/* Ensure CompanyProfile component receives the correct prop type */}
      <CompanyProfile companyId={companyIdString} />
    </div>
  );
}
