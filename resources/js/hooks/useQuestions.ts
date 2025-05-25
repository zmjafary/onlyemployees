
import { useQuery } from '@tanstack/react-query';
import { getQuestions, getQuestionsByCategory, getDistinctCategories } from '@/services/companyService';

export const useQuestions = () => {
  return useQuery({
    queryKey: ['questions'],
    queryFn: getQuestions,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

export const useQuestionsByCategory = (categoryId: number) => {
  return useQuery({
    queryKey: ['questions', categoryId],
    queryFn: () => getQuestionsByCategory(categoryId),
    enabled: !!categoryId,
    staleTime: 15 * 60 * 1000,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getDistinctCategories,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};
