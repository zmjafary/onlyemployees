
import { useQuery } from '@tanstack/react-query';
import { getCompanyExtendedById } from '@/lib/api/companiesExtended';

export const useCompany = (companyId: string) => {
  return useQuery({
    queryKey: ['company-extended', companyId],
    queryFn: () => getCompanyExtendedById(companyId),
    staleTime: 15 * 60 * 1000, // 15 minutes
    enabled: !!companyId,
  });
};
