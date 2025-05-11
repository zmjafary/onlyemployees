
import companiesData from "@/data/companies.json";
import { CompanyType } from "@/types/company";
import axios from "axios";

// Type assertion for the imported JSON data
const companies = companiesData as CompanyType[];

export const getAllCompanies = (): CompanyType[] => {
  return companies;
};

export const getCompanyById = (id: string): CompanyType | undefined => {
  return companies.find(company => company.id === id);
};

export const searchCompanies = (query: string): CompanyType[] => {
  const lowercaseQuery = query.toLowerCase();
  return companies.filter(company => 
    company.name.toLowerCase().includes(lowercaseQuery) ||
    company.industry.toLowerCase().includes(lowercaseQuery)
  );
};

export const filterCompaniesByIndustry = (companies: CompanyType[], industry: string): CompanyType[] => {
  if (!industry || industry === "all") return companies;
  return companies.filter(company => 
    company.industry.toLowerCase() === industry.toLowerCase()
  );
};

export const filterCompaniesBySize = (companies: CompanyType[], size: string): CompanyType[] => {
  if (!size || size === "all") return companies;
  
  return companies.filter(company => {
    const employeeCount = parseInt(company.size.replace(/,/g, '').split('+')[0]);
    
    switch(size.toLowerCase()) {
      case "small":
        return employeeCount < 500;
      case "medium":
        return employeeCount >= 500 && employeeCount <= 10000;
      case "large":
        return employeeCount > 10000;
      default:
        return false;
    }
  });
};

export const filterCompaniesByLocation = (companies: CompanyType[], location: string): CompanyType[] => {
  if (!location || location === "all") return companies;
  
  return companies.filter(company => {
    const companyLocation = company.location.toLowerCase();
    
    switch(location.toLowerCase()) {
      case "remote":
        return companyLocation.includes("remote");
      case "hybrid":
        // For hybrid, we'll look for companies that mention both office and remote
        return companyLocation.includes("hybrid") || 
              (companyLocation.includes("remote") && companyLocation.includes("office"));
      case "on-site":
        return !companyLocation.includes("remote") && 
               !companyLocation.includes("hybrid") &&
               (companyLocation.includes("office") || 
                companyLocation.includes("cupertino") ||
                companyLocation.includes("menlo park") ||
                companyLocation.includes("mountain view") ||
                companyLocation.includes("redmond") ||
                companyLocation.includes("seattle"));
      default:
        return false;
    }
  });
};

export const addNewCompany = (company: CompanyType): CompanyType => {
  // In a real application, this would save to a database
  // For our mock implementation, we'll add it to our array
  companies.push(company);
  return company;
};

export const fetchCompanyFromLinkedIn = async (linkedinUrl: string): Promise<CompanyType | null> => {

  try {
    // Validate the LinkedIn URL
    if (!linkedinUrl.includes("linkedin.com/company/")) {
      console.error("Invalid LinkedIn company URL");
      return null;
    }

    // Extract company identifier from URL
    const urlParts = linkedinUrl.split("/");
    const companySlug = urlParts[urlParts.indexOf("company") + 1]?.split("?")[0];

    if (!companySlug) {
      console.error("Could not extract company name from URL");
      return null;
    }

    const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_LINKEDIN_CLIENT_SECRET;

    // Obtain the Bearer token
    const authUrl = "https://www.linkedin.com/oauth/v2/accessToken";
    const authResponse = await axios.post(authUrl, new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log("Auth Response:", authResponse);

    const { access_token } = authResponse.data;

    if (!access_token) {
      console.error("Failed to obtain access token");
      return null;
    }

    // LinkedIn API endpoint
    const apiUrl = `https://api.linkedin.com/v2/organizations?q=vanityName&vanityName=${companySlug}`;

    // Make the API request
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    console.log("Auth Response:", response);

    const data = response.data;

    // Map LinkedIn API response to CompanyType
    const company: CompanyType = {
      id: data.id,
      name: data.localizedName,
      logo: data.logoV2?.original?.url || "https://placehold.co/200",
      industry: data.industry || "Unknown",
      location: data.headquarters?.address?.city || "Unknown",
      size: data.staffCountRange?.localizedName || "Unknown",
      founded: data.foundedOn?.year || "Unknown",
      redFlagCount: 0,
      greenFlagCount: 0,
      reviewCount: 0,
      flags: [],
    };

    return company;
  } catch (error) {
    console.error("Error fetching company data from LinkedIn:", error);
    return null;
  }
};
