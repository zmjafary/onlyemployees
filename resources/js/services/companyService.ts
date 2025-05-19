
import { fetchData, postData } from '@/services/api';
import { CompanyType } from '@/types/company';
import companiesData from "@/data/companies.json";

// Convert the ID to string in the imported data (for fallback use)
const localCompanies: CompanyType[] = companiesData.map(company => ({
  ...company,
  id: String(company.id)
}));

/**
 * Get all companies from API
 * @returns Array of companies
 */
export const getCompanies = async (): Promise<CompanyType[]> => {
  try {
    return await fetchData<CompanyType[]>('/companies');
  } catch (error) {
    console.error('Failed to fetch companies from API, using local data', error);
    return localCompanies;
  }
};

/**
 * Get a company by ID from API
 * @param id Company ID
 * @returns Company or undefined if not found
 */
export const getCompanyById = async (id: string): Promise<CompanyType | undefined> => {
  try {
    return await fetchData<CompanyType>(`/companies/${id}`);
  } catch (error) {
    console.error(`Failed to fetch company ${id} from API, using local data`, error);
    return localCompanies.find((company) => company.id === id);
  }
};

/**
 * Get featured companies from API
 * @param limit Number of companies to return
 * @returns Array of featured companies
 */
export const getFeaturedCompanies = async (limit = 6): Promise<CompanyType[]> => {
  try {
    return await fetchData<CompanyType[]>(`/companies/featured?limit=${limit}`);
  } catch (error) {
    console.error('Failed to fetch featured companies from API, using local data', error);
    return localCompanies
      .filter((company) => company.featured)
      .slice(0, limit);
  }
};

/**
 * Search companies by name from API
 * @param query Search query
 * @returns Array of matching companies
 */
export const searchCompanies = async (query: string): Promise<CompanyType[]> => {
  if (!query || query.trim() === "") {
    return [];
  }
  
  try {
    return await fetchData<CompanyType[]>(`/companies/search?query=${encodeURIComponent(query)}`);
  } catch (error) {
    console.error('Failed to search companies from API, using local data', error);
    
    const normalizedQuery = query.toLowerCase();
    
    return localCompanies.filter((company) =>
      company.name.toLowerCase().includes(normalizedQuery) ||
      (company.display_name && company.display_name.toLowerCase().includes(normalizedQuery)) ||
      (company.industry && company.industry.toLowerCase().includes(normalizedQuery)) ||
      (company.location && company.location.toLowerCase().includes(normalizedQuery))
    );
  }
};

/**
 * Filter companies by industry from API
 * @param industry Industry to filter by
 * @returns Array of matching companies
 */
export const filterCompaniesByIndustry = async (industry: string): Promise<CompanyType[]> => {
  if (!industry || industry === "all") {
    return getCompanies();
  }
  
  try {
    return await fetchData<CompanyType[]>(`/companies/filter/industry/${encodeURIComponent(industry)}`);
  } catch (error) {
    console.error('Failed to filter companies by industry from API, using local data', error);
    
    return localCompanies.filter(
      (company) => company.industry.toLowerCase() === industry.toLowerCase()
    );
  }
};

/**
 * Filter companies by tags from API
 * @param tags Array of tags to filter by
 * @returns Array of matching companies
 */
export const filterCompaniesByTags = async (tags: string[]): Promise<CompanyType[]> => {
  if (!tags || tags.length === 0) {
    return getCompanies();
  }
  
  try {
    return await fetchData<CompanyType[]>('/companies/filter/tags', {
      params: { tags: tags.join(',') }
    });
  } catch (error) {
    console.error('Failed to filter companies by tags from API, using local data', error);
    
    return localCompanies.filter((company) =>
      company.tags?.some((tag) => tags.includes(tag))
    );
  }
};

/**
 * Get companies with the most reviews from API
 * @param limit Number of companies to return
 * @returns Array of companies sorted by review count
 */
export const getCompaniesWithMostReviews = async (limit = 5): Promise<CompanyType[]> => {
  try {
    return await fetchData<CompanyType[]>(`/companies/most-reviewed?limit=${limit}`);
  } catch (error) {
    console.error('Failed to fetch most reviewed companies from API, using local data', error);
    
    return [...localCompanies]
      .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
      .slice(0, limit);
  }
};

/**
 * Get companies with the highest ratings from API
 * @param limit Number of companies to return
 * @returns Array of companies sorted by rating
 */
export const getTopRatedCompanies = async (limit = 5): Promise<CompanyType[]> => {
  try {
    return await fetchData<CompanyType[]>(`/companies/top-rated?limit=${limit}`);
  } catch (error) {
    console.error('Failed to fetch top rated companies from API, using local data', error);
    
    return [...localCompanies]
      .filter((company) => company.rating !== undefined && company.rating > 0)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, limit);
  }
};

/**
 * Get distinct industries from all companies from API
 * @returns Array of unique industry names
 */
export const getDistinctIndustries = async (): Promise<string[]> => {
  try {
    return await fetchData<string[]>('/companies/industries');
  } catch (error) {
    console.error('Failed to fetch industries from API, using local data', error);
    
    const industriesSet = new Set<string>();
    
    localCompanies.forEach((company) => {
      if (company.industry) {
        industriesSet.add(company.industry);
      }
    });
    
    return Array.from(industriesSet).sort();
  }
};

/**
 * Import company from LinkedIn URL via API
 * @param linkedinUrl LinkedIn company URL
 * @returns Company data or null if not found
 */
export const importCompanyFromLinkedIn = async (linkedinUrl: string): Promise<CompanyType | null> => {
  if (!linkedinUrl.includes("linkedin.com/company")) {
    return null;
  }
  
  try {
    return await postData<CompanyType, { url: string }>('/companies/import-linkedin', { 
      url: linkedinUrl 
    });
  } catch (error) {
    console.error('Failed to import company from LinkedIn via API, using mock data', error);
    
    // Extract company name/id from URL
    const urlParts = linkedinUrl.split("/");
    const companySlug = urlParts[urlParts.length - 1].split("?")[0];
    
    // For demo purposes, return a matching company if we have one
    // or a mock company if we don't
    const matchingCompany = localCompanies.find(
      (c) => c.name.toLowerCase().replace(/\s+/g, "-") === companySlug
    );
    
    if (matchingCompany) {
      return matchingCompany;
    }
    
    // Return a mock company with the slug as the name
    return {
      id: String(localCompanies.length + 1),
      name: companySlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
      logo: "https://logo.clearbit.com/" + companySlug + ".com",
      industry: "Technology",
      location: "Unknown",
      size: "Unknown",
      founded: "Unknown",
      redFlagCount: 0,
      greenFlagCount: 0,
      reviewCount: 0,
      flags: []
    };
  }
};
