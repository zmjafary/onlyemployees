
import { SurveyType, SurveyAnswerType } from '@/types/company';

// Mock storage for surveys and answers
let mockSurveys: SurveyType[] = [];
let mockSurveyAnswers: SurveyAnswerType[] = [];
let surveyIdCounter = 1;
let answerIdCounter = 1;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const createSurvey = async (survey: Omit<SurveyType, 'id' | 'created_at'>): Promise<number> => {
  await delay(500);
  
  const newSurvey: SurveyType = {
    ...survey,
    id: surveyIdCounter++,
    created_at: new Date().toISOString()
  };
  
  mockSurveys.push(newSurvey);
  return newSurvey.id!;
};

export const createSurveyAnswers = async (answers: Omit<SurveyAnswerType, 'id' | 'created_at'>[]): Promise<void> => {
  await delay(400);
  
  const newAnswers = answers.map(answer => ({
    ...answer,
    id: answerIdCounter++,
    created_at: new Date().toISOString()
  }));
  
  mockSurveyAnswers.push(...newAnswers);
};

export const getSurveysByCompany = async (companyId: string): Promise<SurveyType[]> => {
  await delay(300);
  return mockSurveys.filter(survey => survey.company_id === companyId);
};
