
import { CompanyWithFlags } from '@/types/company';

// Mock extended company data with computed fields for UI
const mockCompaniesExtended: CompanyWithFlags[] = [
  {
    id: "google",
    name: "Google",
    industry: "Technology",
    website: "https://www.google.com",
    linkedin_url: "https://www.linkedin.com/company/google/",
    location: "Mountain View, CA",
    created_at: "2024-01-01T00:00:00Z",
    greenFlagCount: 8,
    redFlagCount: 3,
    surveyCount: 25,
    flags: [
      {
        id: "flag-1",
        type: "green",
        text: "Great compensation packages",
        votes: 18,
        percentage: 85
      },
      {
        id: "flag-2", 
        type: "green",
        text: "Excellent work-life balance",
        votes: 15,
        percentage: 78
      },
      {
        id: "flag-3",
        type: "red", 
        text: "High pressure environment",
        votes: 8,
        percentage: 67
      }
    ]
  },
  {
    id: "microsoft",
    name: "Microsoft",
    industry: "Technology", 
    website: "https://www.microsoft.com",
    linkedin_url: "https://www.linkedin.com/company/microsoft/",
    location: "Redmond, WA",
    created_at: "2024-01-02T00:00:00Z",
    greenFlagCount: 6,
    redFlagCount: 2,
    surveyCount: 18,
    flags: [
      {
        id: "flag-4",
        type: "green",
        text: "Good benefits package",
        votes: 12,
        percentage: 75
      },
      {
        id: "flag-5",
        type: "red",
        text: "Slow promotion process",
        votes: 6,
        percentage: 45
      }
    ]
  },
  {
    id: "amazon",
    name: "Amazon",
    industry: "E-commerce",
    website: "https://www.amazon.com",
    linkedin_url: "https://www.linkedin.com/company/amazon/",
    location: "Seattle, WA",
    created_at: "2024-01-03T00:00:00Z",
    greenFlagCount: 4,
    redFlagCount: 7,
    surveyCount: 22,
    flags: [
      {
        id: "flag-6",
        type: "red",
        text: "Work-life balance issues",
        votes: 15,
        percentage: 68
      },
      {
        id: "flag-7",
        type: "green",
        text: "Learning opportunities",
        votes: 8,
        percentage: 55
      }
    ]
  },
  {
    id: "apple",
    name: "Apple",
    industry: "Technology",
    website: "https://www.apple.com",
    linkedin_url: "https://www.linkedin.com/company/apple/",
    location: "Cupertino, CA",
    created_at: "2024-01-04T00:00:00Z",
    greenFlagCount: 9,
    redFlagCount: 2,
    surveyCount: 30,
    flags: [
      {
        id: "flag-8",
        type: "green",
        text: "Innovative work environment",
        votes: 22,
        percentage: 88
      },
      {
        id: "flag-9",
        type: "green",
        text: "Great employee benefits",
        votes: 20,
        percentage: 85
      }
    ]
  },
  {
    id: "meta",
    name: "Meta",
    industry: "Technology",
    website: "https://www.meta.com",
    linkedin_url: "https://www.linkedin.com/company/meta/",
    location: "Menlo Park, CA",
    created_at: "2024-01-05T00:00:00Z",
    greenFlagCount: 5,
    redFlagCount: 4,
    surveyCount: 20,
    flags: [
      {
        id: "flag-10",
        type: "green",
        text: "Cutting-edge technology",
        votes: 14,
        percentage: 70
      },
      {
        id: "flag-11",
        type: "red",
        text: "High stress levels",
        votes: 10,
        percentage: 50
      }
    ]
  }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getCompaniesExtended = async (): Promise<CompanyWithFlags[]> => {
  await delay(300);
  return mockCompaniesExtended;
};

export const getCompanyExtendedById = async (id: string): Promise<CompanyWithFlags | undefined> => {
  await delay(200);
  return mockCompaniesExtended.find(company => company.id === id);
};

export const searchCompaniesExtended = async (query: string): Promise<CompanyWithFlags[]> => {
  await delay(400);
  if (!query || query.trim() === "") {
    return [];
  }
  
  return mockCompaniesExtended.filter(company => 
    company.name.toLowerCase().includes(query.toLowerCase()) ||
    company.industry.toLowerCase().includes(query.toLowerCase()) ||
    company.location?.toLowerCase().includes(query.toLowerCase())
  );
};