
import { CityType } from '@/types/company';

const mockCities: CityType[] = [
  { id: 1, name: "New York", country_id: 1, created_at: "2024-01-01T00:00:00Z" },
  { id: 2, name: "Los Angeles", country_id: 1, created_at: "2024-01-02T00:00:00Z" },
  { id: 3, name: "San Francisco", country_id: 1, created_at: "2024-01-03T00:00:00Z" },
  { id: 4, name: "Toronto", country_id: 2, created_at: "2024-01-04T00:00:00Z" },
  { id: 5, name: "Vancouver", country_id: 2, created_at: "2024-01-05T00:00:00Z" },
  { id: 6, name: "London", country_id: 3, created_at: "2024-01-06T00:00:00Z" },
  { id: 7, name: "Berlin", country_id: 4, created_at: "2024-01-07T00:00:00Z" },
  { id: 8, name: "Paris", country_id: 5, created_at: "2024-01-08T00:00:00Z" },
  { id: 9, name: "Sydney", country_id: 6, created_at: "2024-01-09T00:00:00Z" }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getCities = async (): Promise<CityType[]> => {
  await delay(250);
  return mockCities;
};

export const getCitiesByCountry = async (countryId: number): Promise<CityType[]> => {
  await delay(200);
  return mockCities.filter(city => city.country_id === countryId);
};
