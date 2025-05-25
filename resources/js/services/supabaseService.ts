
// Legacy service - now using local API services
import { getQuestions as apiGetQuestions } from '@/lib/api/questions';
import { getCountries as apiGetCountries } from '@/lib/api/countries';
import { getCities as apiGetCities } from '@/lib/api/cities';
import { getRoles as apiGetRoles } from '@/lib/api/roles';
import { getDepartments as apiGetDepartments } from '@/lib/api/departments';
import { createSurvey as apiCreateSurvey, createSurveyAnswers as apiCreateSurveyAnswers } from '@/lib/api/surveys';
import { 
  QuestionType, 
  CountryType, 
  CityType, 
  RoleType, 
  DepartmentType, 
  SurveyType, 
  SurveyAnswerType 
} from '@/types/company';

// Questions
export const getQuestions = async (): Promise<QuestionType[]> => {
  return await apiGetQuestions();
};

// Countries and Cities
export const getCountries = async (): Promise<CountryType[]> => {
  return await apiGetCountries();
};

export const getCities = async (): Promise<CityType[]> => {
  return await apiGetCities();
};

// Roles and Departments
export const getRoles = async (): Promise<RoleType[]> => {
  return await apiGetRoles();
};

export const getDepartments = async (): Promise<DepartmentType[]> => {
  return await apiGetDepartments();
};

// Surveys
export const createSurvey = async (survey: Omit<SurveyType, 'id' | 'created_at'>): Promise<number> => {
  return await apiCreateSurvey(survey);
};

export const createSurveyAnswers = async (answers: SurveyAnswerType[]) => {
  const answersWithoutId = answers.map(({ id, created_at, ...rest }) => rest);
  await apiCreateSurveyAnswers(answersWithoutId);
};
