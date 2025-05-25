
export interface CompanyType {
  id: string;
  name: string;
  industry: string;
  website?: string;
  linkedin_url?: string;
  location?: string;
  created_at?: string;
}

export interface QuestionType {
  id: number;
  question: string;
  topic_id?: number;
  category_id?: number;
  status?: boolean;
  favor_statement?: string;
  favor_description?: string;
  favor_gif?: string;
  against_statement?: string;
  against_description?: string;
  against_gif?: string;
  created_at?: string;
}

export interface SurveyQuestionType {
  question_id: number;
  is_yes: boolean;
  comment?: string;
}

export interface CountryType {
  id: number;
  name: string;
  created_at?: string;
}

export interface CityType {
  id: number;
  name: string;
  country_id?: number;
  created_at?: string;
}

export interface CategoryType {
  id: number;
  name: string;
  created_at?: string;
}

export interface TopicType {
  id: number;
  name: string;
  category_id?: number;
  status?: boolean;
  created_at?: string;
}

export interface SurveyType {
  id?: number;
  user_id?: string;
  company_id: string;
  city_id?: number;
  country_id?: number;
  role_id?: number;
  department_id?: number;
  is_anonymous?: boolean;
  is_employed?: boolean;
  employed_from_date?: string;
  employed_to_date?: string;
  created_at?: string;
}

export interface SurveyAnswerType {
  id?: number;
  survey_id?: number;
  question_id: number;
  is_yes: boolean;
  comment?: string;
  created_at?: string;
}

export interface RoleType {
  id: number;
  name: string;
  created_at?: string;
}

export interface DepartmentType {
  id: number;
  name: string;
  created_at?: string;
}

export interface ProfileType {
  id: string;
  name?: string;
  email?: string;
  created_at?: string;
}

export interface UserRoleType {
  id: string;
  user_id?: string;
  role: string;
  created_at?: string;
}

// Add StoryType for compatibility
export interface StoryType {
  id: string;
  questionId: number;
  answer: boolean;
  comment?: string;
  category: string;
  question: string;
  timestamp: string;
}

// Extended types with computed fields for UI components
export interface CompanyWithFlags extends CompanyType {
  flags?: Array<{
    id: string;
    type: 'red' | 'green';
    text: string;
    votes: number;
    percentage: number;
  }>;
  greenFlagCount?: number;
  redFlagCount?: number;
  surveyCount?: number;
  stories?: StoryType[];
}

export interface QuestionWithCategories extends QuestionType {
  category?: string;
  topic?: string;
}
