
import { CompanyType } from '@/types/company';

// Simulated company data matching the schema exactly
const mockCompanies: CompanyType[] = [
  {
    id: "1",
    name: "Google",
    industry: "Technology",
    website: "https://google.com",
    linkedin_url: "https://linkedin.com/company/google",
    location: "Mountain View, CA",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "2", 
    name: "Microsoft",
    industry: "Technology",
    website: "https://microsoft.com",
    linkedin_url: "https://linkedin.com/company/microsoft",
    location: "Redmond, WA",
    created_at: "2024-01-02T00:00:00Z"
  },
  {
    id: "3",
    name: "Apple",
    industry: "Technology", 
    website: "https://apple.com",
    linkedin_url: "https://linkedin.com/company/apple",
    location: "Cupertino, CA",
    created_at: "2024-01-03T00:00:00Z"
  },
  {
    id: "4",
    name: "Amazon",
    industry: "E-commerce",
    website: "https://amazon.com", 
    linkedin_url: "https://linkedin.com/company/amazon",
    location: "Seattle, WA",
    created_at: "2024-01-04T00:00:00Z"
  },
  {
    id: "5",
    name: "Meta",
    industry: "Technology",
    website: "https://meta.com",
    linkedin_url: "https://linkedin.com/company/meta",
    location: "Menlo Park, CA", 
    created_at: "2024-01-05T00:00:00Z"
  },
  {
    id: "6",
    name: "Netflix",
    industry: "Entertainment",
    website: "https://netflix.com",
    linkedin_url: "https://linkedin.com/company/netflix",
    location: "Los Gatos, CA",
    created_at: "2024-01-06T00:00:00Z"
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getCompanies = async (): Promise<CompanyType[]> => {
  await delay(500); // Simulate network delay
  return mockCompanies;
};

export const getCompanyById = async (id: string): Promise<CompanyType | undefined> => {
  await delay(300);
  return mockCompanies.find(company => company.id === id);
};

export const searchCompanies = async (query: string): Promise<CompanyType[]> => {
  await delay(400);
  if (!query || query.trim() === "") {
    return [];
  }
  
  return mockCompanies.filter(company => 
    company.name.toLowerCase().includes(query.toLowerCase()) ||
    company.industry.toLowerCase().includes(query.toLowerCase()) ||
    company.location?.toLowerCase().includes(query.toLowerCase())
  );
};

export const createCompany = async (company: Omit<CompanyType, 'id' | 'created_at'>): Promise<CompanyType> => {
  await delay(600);
  const newCompany: CompanyType = {
    ...company,
    id: String(mockCompanies.length + 1),
    created_at: new Date().toISOString()
  };
  mockCompanies.push(newCompany);
  return newCompany;
};
