
import { CountryType } from '@/types/company';

const mockCountries: CountryType[] = [
  { id: 1, name: "United States", created_at: "2024-01-01T00:00:00Z" },
  { id: 2, name: "Canada", created_at: "2024-01-02T00:00:00Z" },
  { id: 3, name: "United Kingdom", created_at: "2024-01-03T00:00:00Z" },
  { id: 4, name: "Germany", created_at: "2024-01-04T00:00:00Z" },
  { id: 5, name: "France", created_at: "2024-01-05T00:00:00Z" },
  { id: 6, name: "Australia", created_at: "2024-01-06T00:00:00Z" }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getCountries = async (): Promise<CountryType[]> => {
  await delay(250);
  return mockCountries;
};
