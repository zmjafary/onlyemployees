
import { CategoryType } from '@/types/company';

const mockCategories: CategoryType[] = [
  { id: 1, name: "Work-Life Balance", created_at: "2024-01-01T00:00:00Z" },
  { id: 2, name: "Compensation", created_at: "2024-01-02T00:00:00Z" },
  { id: 3, name: "Management", created_at: "2024-01-03T00:00:00Z" },
  { id: 4, name: "Career Growth", created_at: "2024-01-04T00:00:00Z" },
  { id: 5, name: "Company Culture", created_at: "2024-01-05T00:00:00Z" }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getCategories = async (): Promise<CategoryType[]> => {
  await delay(300);
  return mockCategories;
};

export const getCategoryById = async (id: number): Promise<CategoryType | undefined> => {
  await delay(200);
  return mockCategories.find(cat => cat.id === id);
};
