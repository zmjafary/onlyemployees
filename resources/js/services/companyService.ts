
import { 
  CompanyType, 
  QuestionType, 
  CountryType, 
  CityType, 
  RoleType, 
  DepartmentType, 
  SurveyType, 
  SurveyAnswerType 
} from '@/types/company';
import { getCompanies as apiGetCompanies, getCompanyById as apiGetCompanyById, searchCompanies as apiSearchCompanies, createCompany as apiCreateCompany } from '@/lib/api/companies';

// Helper function to get company logo with fallbacks
export const getCompanyLogo = (company: CompanyType): string => {
  if (company.name) {
    const companySlug = company.name.toLowerCase().replace(/\s+/g, '');
    return `https://logo.clearbit.com/${companySlug}.com`;
  }
  return '/placeholder.svg';
};

export const getCompanies = async (): Promise<CompanyType[]> => {
  return await apiGetCompanies();
};

export const getCompanyById = async (id: string): Promise<CompanyType | undefined> => {
  return await apiGetCompanyById(id);
};

export const getFeaturedCompanies = async (limit = 6): Promise<CompanyType[]> => {
  const companies = await apiGetCompanies();
  return companies.slice(0, limit);
};

export const searchCompanies = async (query: string): Promise<CompanyType[]> => {
  return await apiSearchCompanies(query);
};

export const filterCompaniesByIndustry = async (industry: string): Promise<CompanyType[]> => {
  if (!industry || industry === "all") {
    return getCompanies();
  }
  
  const companies = await apiGetCompanies();
  return companies.filter(company => company.industry === industry);
};

export const getDistinctIndustries = async (): Promise<string[]> => {
  const companies = await apiGetCompanies();
  const industries = [...new Set(companies.map(c => c.industry).filter(Boolean))];
  return industries;
};

export const createCompany = async (company: Omit<CompanyType, 'id' | 'created_at'>): Promise<CompanyType> => {
  return await apiCreateCompany(company);
};

// Questions
export const getQuestions = async (): Promise<QuestionType[]> => {
  const { getQuestions: apiGetQuestions } = await import('@/lib/api/questions');
  return await apiGetQuestions();
};

export const getQuestionsByCategory = async (categoryId: number): Promise<QuestionType[]> => {
  const { getQuestionsByCategory: apiGetQuestionsByCategory } = await import('@/lib/api/questions');
  return await apiGetQuestionsByCategory(categoryId);
};

export const getDistinctCategories = async (): Promise<string[]> => {
  const { getCategories } = await import('@/lib/api/categories');
  const categories = await getCategories();
  return categories.map(c => c.name);
};

// Countries and Cities
export const getCountries = async (): Promise<CountryType[]> => {
  const { getCountries: apiGetCountries } = await import('@/lib/api/countries');
  return await apiGetCountries();
};

export const getCities = async (): Promise<CityType[]> => {
  const { getCities: apiGetCities } = await import('@/lib/api/cities');
  return await apiGetCities();
};

export const getCitiesByCountry = async (countryId: number): Promise<CityType[]> => {
  const { getCitiesByCountry: apiGetCitiesByCountry } = await import('@/lib/api/cities');
  return await apiGetCitiesByCountry(countryId);
};

// Roles and Departments
export const getRoles = async (): Promise<RoleType[]> => {
  const { getRoles: apiGetRoles } = await import('@/lib/api/roles');
  return await apiGetRoles();
};

export const getDepartments = async (): Promise<DepartmentType[]> => {
  const { getDepartments: apiGetDepartments } = await import('@/lib/api/departments');
  return await apiGetDepartments();
};

// Surveys
export const createSurvey = async (survey: Omit<SurveyType, 'id' | 'created_at'>): Promise<number> => {
  const { createSurvey: apiCreateSurvey } = await import('@/lib/api/surveys');
  return await apiCreateSurvey(survey);
};

export const createSurveyAnswers = async (answers: SurveyAnswerType[]) => {
  const { createSurveyAnswers: apiCreateSurveyAnswers } = await import('@/lib/api/surveys');
  const answersWithoutId = answers.map(({ id, created_at, ...rest }) => rest);
  await apiCreateSurveyAnswers(answersWithoutId);
};

// LinkedIn Import - simplified for static version
export const importCompanyFromLinkedIn = async (linkedinUrl: string): Promise<CompanyType | null> => {
  if (!linkedinUrl.includes("linkedin.com/company")) {
    return null;
  }
  
  // Extract company name from URL
  const urlParts = linkedinUrl.split("/");
  const companySlug = urlParts[urlParts.length - 1].split("?")[0];
  
  // Check if company already exists
  const companies = await getCompanies();
  const existingCompany = companies.find(c => c.linkedin_url === linkedinUrl);
  
  if (existingCompany) {
    return existingCompany;
  }
  
  // Create new company from LinkedIn URL
  const companyName = companySlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  
  const newCompany = {
    name: companyName,
    linkedin_url: linkedinUrl,
    industry: "Technology", // Default industry
    location: "Unknown",
    website: `https://${companySlug}.com`
  };
  
  return await createCompany(newCompany);
};

// Utility functions for analytics
export const getCompaniesWithMostReviews = async (limit = 5): Promise<CompanyType[]> => {
  const companies = await getCompanies();
  return companies.slice(0, limit);
};

export const getTopRatedCompanies = async (limit = 5): Promise<CompanyType[]> => {
  const companies = await getCompanies();
  return companies.slice(0, limit);
};
