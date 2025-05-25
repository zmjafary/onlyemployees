
import { CompanyType } from '@/types/company';

// Helper function to get company logo with fallbacks (using only schema fields)
export const getCompanyLogo = (company: CompanyType): string => {
  if (company.name) {
    const companySlug = company.name.toLowerCase().replace(/\s+/g, '');
    return `https://logo.clearbit.com/${companySlug}.com`;
  }
  return '/placeholder.svg';
};

// Helper function to get company initials for avatar fallback
export const getCompanyInitials = (company: CompanyType): string => {
  return company.name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Helper function to get simplified company name for searching
export const getSearchableCompanyName = (company: CompanyType): string => {
  return company.name.toLowerCase().replace(/\s+/g, '');
};
