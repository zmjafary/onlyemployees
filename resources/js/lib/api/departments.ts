
import { DepartmentType } from '@/types/company';

const mockDepartments: DepartmentType[] = [
  { id: 1, name: "Engineering", created_at: "2024-01-01T00:00:00Z" },
  { id: 2, name: "Product", created_at: "2024-01-02T00:00:00Z" },
  { id: 3, name: "Design", created_at: "2024-01-03T00:00:00Z" },
  { id: 4, name: "Marketing", created_at: "2024-01-04T00:00:00Z" },
  { id: 5, name: "Sales", created_at: "2024-01-05T00:00:00Z" },
  { id: 6, name: "Human Resources", created_at: "2024-01-06T00:00:00Z" },
  { id: 7, name: "Finance", created_at: "2024-01-07T00:00:00Z" }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getDepartments = async (): Promise<DepartmentType[]> => {
  await delay(200);
  return mockDepartments;
};
