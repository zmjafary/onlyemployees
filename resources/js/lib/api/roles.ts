
import { RoleType } from '@/types/company';

const mockRoles: RoleType[] = [
  { id: 1, name: "Software Engineer", created_at: "2024-01-01T00:00:00Z" },
  { id: 2, name: "Product Manager", created_at: "2024-01-02T00:00:00Z" },
  { id: 3, name: "Designer", created_at: "2024-01-03T00:00:00Z" },
  { id: 4, name: "Data Scientist", created_at: "2024-01-04T00:00:00Z" },
  { id: 5, name: "Marketing Manager", created_at: "2024-01-05T00:00:00Z" },
  { id: 6, name: "Sales Representative", created_at: "2024-01-06T00:00:00Z" },
  { id: 7, name: "HR Manager", created_at: "2024-01-07T00:00:00Z" }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getRoles = async (): Promise<RoleType[]> => {
  await delay(200);
  return mockRoles;
};
